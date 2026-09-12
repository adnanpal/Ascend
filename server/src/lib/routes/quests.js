import { Router } from 'express'
import { supabaseAdmin } from '../supabase.js'
import {CATEGORY_TO_ATTRIBUTE,getQuestReward} from '../services/rpg.js'

const router = Router()

router.get('/', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('quests')
    .select('*')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)

    return res.status(500).json({
      error: 'Failed to load quests',
    })
  }

  res.json({
    quests: data,
  })
})

router.post('/', async (req, res) => {
  try {
    const {
      title,
      category,
      difficulty,
      type = 'INSTANT',
      duration = null,
    } = req.body

    if (!title?.trim()) {
      return res.status(400).json({
        error: 'Quest title is required',
      })
    }

    if (!CATEGORY_TO_ATTRIBUTE[category]) {
      return res.status(400).json({
        error: 'Invalid quest category',
      })
    }

    getQuestReward(difficulty)

    if (!['INSTANT', 'FOCUS TIMER'].includes(type)) {
      return res.status(400).json({
        error: 'Invalid quest type',
      })
    }

    const { data, error } = await supabaseAdmin
      .from('quests')
      .insert({
        user_id: req.user.id,
        title: title.trim(),
        category,
        difficulty,
        type,
        duration,
      })
      .select()
      .single()

    if (error) {
      console.error(error)

      return res.status(500).json({
        error: 'Failed to create quest',
      })
    }

    res.status(201).json({
      quest: data,
    })
  } catch (error) {
    console.error(error)

    res.status(400).json({
      error: error.message,
    })
  }
})

router.post('/:id/start', async (req, res) => {
  const { id } = req.params

  const { data: quest, error: findError } = await supabaseAdmin
    .from('quests')
    .select('*')
    .eq('id', id)
    .eq('user_id', req.user.id)
    .single()

  if (findError || !quest) {
    return res.status(404).json({
      error: 'Quest not found',
    })
  }

  if (quest.status !== 'active') {
    return res.status(400).json({
      error: 'Quest cannot be started',
    })
  }

  const { data, error } = await supabaseAdmin
    .from('quests')
    .update({
      status: 'in_progress',
      started_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', req.user.id)
    .select()
    .single()

  if (error) {
    console.error(error)

    return res.status(500).json({
      error: 'Failed to start quest',
    })
  }

  res.json({
    quest: data,
  })
})

router.post('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params

    const { data: quest, error: questError } = await supabaseAdmin
      .from('quests')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.user.id)
      .single()

    if (questError || !quest) {
      return res.status(404).json({
        error: 'Quest not found',
      })
    }

    if (quest.status === 'ascended') {
      return res.status(400).json({
        error: 'Quest already completed',
      })
    }

    const reward = getQuestReward(quest.difficulty)

    const attribute = CATEGORY_TO_ATTRIBUTE[quest.category]

    const { data: stats, error: statsError } = await supabaseAdmin
      .from('stats')
      .select('*')
      .eq('user_id', req.user.id)
      .single()

    if (statsError || !stats) {
      return res.status(500).json({
        error: 'Player stats not found',
      })
    }

    const now = new Date()

    const newTotalXp = stats.total_xp + reward.xp

    // Temporary testing level calculation.
    let newLevel = stats.level
    let currentXp = stats.xp + reward.xp

    while (currentXp >= 100) {
      currentXp -= 100
      newLevel += 1
    }

    const levelUp = newLevel > stats.level

    const newCredits = stats.credits + reward.credits

    const newAttributeLevel =
      stats[attribute] + reward.attribute

    const { data: updatedStats, error: updateError } =
      await supabaseAdmin
        .from('stats')
        .update({
          level: newLevel,
          xp: currentXp,
          total_xp: newTotalXp,
          credits: newCredits,
          quests_completed: stats.quests_completed + 1,
          [attribute]: newAttributeLevel,
          last_completed_at: now.toISOString(),
          updated_at: now.toISOString(),
        })
        .eq('user_id', req.user.id)
        .select()
        .single()

    if (updateError) {
      console.error(updateError)

      return res.status(500).json({
        error: 'Failed to update player stats',
      })
    }

    const { data: completedQuest, error: completeError } =
      await supabaseAdmin
        .from('quests')
        .update({
          status: 'ascended',
          completed_at: now.toISOString(),
        })
        .eq('id', id)
        .eq('user_id', req.user.id)
        .select()
        .single()

    if (completeError) {
      console.error(completeError)

      return res.status(500).json({
        error: 'Failed to complete quest',
      })
    }

    res.json({
      quest: completedQuest,

      reward: {
        xp: reward.xp,
        credits: reward.credits,
        attribute,
        attributeGain: reward.attribute,
      },

      player: {
        level: updatedStats.level,
        xp: updatedStats.xp,
        totalXp: updatedStats.total_xp,
        credits: updatedStats.credits,
        questsCompleted: updatedStats.quests_completed,
      },

      levelUp,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Quest completion failed',
    })
  }
})
export default router;