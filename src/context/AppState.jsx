import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { supabase } from '../lib/supabase'
import { api } from '../lib/api'
import { marketItems } from '../data/mockData'

const AppStateContext = createContext(null)

const initialAttributes = [
  { key: 'fitness', level: 0, xp: 0, xpToNext: 100 },
  { key: 'study', level: 0, xp: 0, xpToNext: 100 },
  { key: 'cooking', level: 0, xp: 0, xpToNext: 100 },
  { key: 'mind', level: 0, xp: 0, xpToNext: 100 },
  { key: 'vitality', level: 0, xp: 0, xpToNext: 100 },
  { key: 'focus', level: 0, xp: 0, xpToNext: 100 },
]

function getXPRequired(level) {
   return Math.floor(100 * Math.pow(level, 1.5))
}

export function AppStateProvider({ children }) {
  const [user, setUser] = useState(null)
  const [characterLevel, setCharacterLevel] = useState(1)
  const [attributes, setAttributes] = useState(initialAttributes)
  const [quests, setQuests] = useState([])
  const [market, setMarket] = useState(marketItems)
  const [levelUpPayload, setLevelUpPayload] = useState(null)
  const [loading, setLoading] = useState(true)

  const revealCharacter = useCallback(() => {
  if (!user) return

  setCharacterLevel(user.level)
}, [user])
  


  const loadPlayerData = useCallback(async () => {
    setLoading(true)

    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !authUser) {
      setUser(null)
      setQuests([])
      setLoading(false)
      return
    }

    const [
      { data: profile, error: profileError },
      { data: stats, error: statsError },
      questsResult,
    ] = await Promise.all([
      supabase
        .from('profiles')
        .select('username')
        .eq('id', authUser.id)
        .single(),

      supabase
        .from('stats')
        .select('*')
        .eq('user_id', authUser.id)
        .single(),

      api.getQuests().catch((error) => ({
        error,
        quests: [],
      })),
    ])

    if (profileError) {
      console.error('Failed to load profile:', profileError)
    }

    if (statsError) {
      console.error('Failed to load stats:', statsError)
    }

    if (questsResult.error) {
      console.error('Failed to load quests:', questsResult.error)
    }

    if (!profile || !stats) {
      setUser(null)
      setQuests([])
      setLoading(false)
      return
    }

    setUser({
      username: profile.username,
      level: stats.level,
      xp: stats.xp,
      totalXp: stats.total_xp,
      credits: stats.credits,
      streak: stats.streak,
      questsCompleted: stats.quests_completed,
      xpToNext: getXPRequired(stats.level),
    })
    setCharacterLevel(stats.level)

    setAttributes([
      {
        key: 'fitness',
        level: stats.fitness,
        xp: 0,
        xpToNext: 100,
      },
      {
        key: 'study',
        level: stats.study,
        xp: 0,
        xpToNext: 100,
      },
      {
        key: 'cooking',
        level: stats.cooking,
        xp: 0,
        xpToNext: 100,
      },
      {
        key: 'mind',
        level: stats.mind,
        xp: 0,
        xpToNext: 100,
      },
      {
        key: 'vitality',
        level: stats.vitality,
        xp: 0,
        xpToNext: 100,
      },
      {
        key: 'focus',
        level: stats.focus,
        xp: 0,
        xpToNext: 100,
      },
    ])

    setQuests(questsResult.quests || [])

    setLoading(false)
  }, [])

  useEffect(() => {
    loadPlayerData()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        loadPlayerData()
      } else {
        setUser(null)
        setQuests([])
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [loadPlayerData])

  const completeQuest = useCallback(async (questId) => {
    try {
      const result = await api.completeQuest(questId)

      setQuests((prev) =>
        prev.map((quest) =>
          quest.id === questId
            ? result.quest
            : quest
        )
      )

      setUser((prev) => ({
        ...prev,
        level: result.player.level,
        xp: result.player.xp,
        totalXp: result.player.totalXp,
        credits: result.player.credits,
        questsCompleted: result.player.questsCompleted,
        xpToNext: getXPRequired(result.player.level),
      }))

      setAttributes((prev) =>
        prev.map((attribute) =>
          attribute.key === result.reward.attribute
            ? {
                ...attribute,
                level:
                  attribute.level +
                  result.reward.attributeGain,
              }
            : attribute
        )
      )

      if (result.levelUp) {
        setLevelUpPayload({
          fromLevel: result.player.level - 1,
          toLevel: result.player.level,
          xpGained: result.reward.xp,
          creditsGained: result.reward.credits,
          attributeKey: result.reward.attribute,
          attributeGain: result.reward.attributeGain,
        })
      }

      return result
    } catch (error) {
      console.error('Failed to complete quest:', error)
      throw error
    }
  }, [])

  const addQuest = useCallback(async (quest) => {
    try {
      const { quest: createdQuest } = await api.createQuest({
        title: quest.title,
        category: quest.category,
        difficulty: quest.difficulty,
        type: quest.type || 'INSTANT',
        duration: quest.duration || null,
      })

      setQuests((prev) => [
        createdQuest,
        ...prev,
      ])

      return createdQuest
    } catch (error) {
      console.error('Failed to create quest:', error)
      throw error
    }
  }, [])

  const buyItem = useCallback((itemId) => {
    console.log(
      'Market purchase will be moved to backend:',
      itemId
    )
  }, [])

  const triggerLevelUp = useCallback(() => {
    if (!user) return

    setLevelUpPayload({
      fromLevel: user.level,
      toLevel: user.level + 1,
      xpGained: 100,
      creditsGained: 0,
      attributeKey: 'study',
      attributeGain: 1,
    })
  }, [user])

  const clearLevelUp = useCallback(() => {
    setLevelUpPayload(null)
  }, [])

  const value = useMemo(
    () => ({
    user,
    characterLevel,
    attributes,
    quests,
    market,
    levelUpPayload,
    loading,
    completeQuest,
    addQuest,
    buyItem,
    triggerLevelUp,
    clearLevelUp,
    revealCharacter,
    reloadPlayerData: loadPlayerData,
    }),
    [
  user,
  characterLevel,
  attributes,
  quests,
  market,
  levelUpPayload,
  loading,
  completeQuest,
  addQuest,
  buyItem,
  triggerLevelUp,
  clearLevelUp,
  revealCharacter,
  loadPlayerData,
]
  )

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const ctx = useContext(AppStateContext)

  if (!ctx) {
    throw new Error(
      'useAppState must be used within AppStateProvider'
    )
  }

  return ctx
}