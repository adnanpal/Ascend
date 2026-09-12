import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { mockUser, mockAttributes, mockQuests, marketItems } from '../data/mockData'

const AppStateContext = createContext(null)

// This provider intentionally mimics the shape of a future API-backed store:
// state lives here, actions are async-shaped, and components never touch
// mock data directly. Swapping these internals for real fetch/mutation calls
// later should not require touching any page or component.
export function AppStateProvider({ children }) {
  const [user, setUser] = useState(mockUser)
  const [attributes, setAttributes] = useState(mockAttributes)
  const [quests, setQuests] = useState(mockQuests)
  const [market, setMarket] = useState(marketItems)
  const [levelUpPayload, setLevelUpPayload] = useState(null)

  const completeQuest = useCallback((questId) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, status: 'ascended' } : q))
    )
    const quest = quests.find((q) => q.id === questId)
    if (quest) {
      setUser((prev) => ({
        ...prev,
        xp: prev.xp + quest.xp,
        credits: prev.credits + quest.credits,
        questsCompleted: prev.questsCompleted + 1,
      }))
    }
  }, [quests])

  const addQuest = useCallback((quest) => {
    setQuests((prev) => [{ ...quest, id: `q${prev.length + 1}-${Date.now()}`, status: 'active' }, ...prev])
  }, [])

  const buyItem = useCallback((itemId) => {
    setMarket((prev) => prev.map((item) => (item.id === itemId ? { ...item, owned: true } : item)))
    const item = market.find((i) => i.id === itemId)
    if (item) {
      setUser((prev) => ({ ...prev, credits: prev.credits - item.price }))
    }
  }, [market])

  const triggerLevelUp = useCallback(() => {
    setLevelUpPayload({
      fromLevel: user.level,
      toLevel: user.level + 1,
      xpGained: 120,
      creditsGained: 30,
      attributeKey: 'study',
      attributeGain: 2,
    })
  }, [user.level])

  const clearLevelUp = useCallback(() => setLevelUpPayload(null), [])

  const value = useMemo(
    () => ({
      user,
      attributes,
      quests,
      market,
      levelUpPayload,
      completeQuest,
      addQuest,
      buyItem,
      triggerLevelUp,
      clearLevelUp,
    }),
    [user, attributes, quests, market, levelUpPayload, completeQuest, addQuest, buyItem, triggerLevelUp, clearLevelUp]
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}
