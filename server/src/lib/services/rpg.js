export const QUEST_REWARDS = {
  EASY: {
    xp: 60,
    credits: 15,
    attribute: 1,
  },

  MEDIUM: {
    xp: 120,
    credits: 30,
    attribute: 2,
  },

  HARD: {
    xp: 220,
    credits: 55,
    attribute: 3,
  },
}

export const CATEGORY_TO_ATTRIBUTE = {
  FITNESS: 'fitness',
  STUDY: 'study',
  COOKING: 'cooking',
  MIND: 'mind',
  VITALITY: 'vitality',
  FOCUS: 'focus',
}

export function getQuestReward(difficulty) {
  const reward = QUEST_REWARDS[difficulty]

  if (!reward) {
    throw new Error(`Invalid difficulty: ${difficulty}`)
  }

  return reward
}

export function getXPRequired(level) {
  return Math.floor(100 * Math.pow(level, 1.5))
}

export function calculateLevel(totalXp) {
  let level = 1
  let xpSpent = 0

  while (
    totalXp - xpSpent >= getXPRequired(level)
  ) {
    xpSpent += getXPRequired(level)
    level += 1
  }

  return {
    level,
    currentXp: totalXp - xpSpent,
    xpToNext: getXPRequired(level),
  }
}
