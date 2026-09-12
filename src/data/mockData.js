import { Dumbbell, BookOpen, ChefHat, Brain, HeartPulse, Target } from 'lucide-react'

export const mockUser = {
  username: 'ADNAN',
  level: 7,
  xp: 1240,
  xpToNext: 1500,
  totalXp: 12840,
  credits: 840,
  streak: 12,
  questsCompleted: 84,
}

export const attributeMeta = {
  fitness: { label: 'FITNESS', description: 'Strength', icon: Dumbbell, color: 'ember' },
  study: { label: 'STUDY', description: 'Knowledge', icon: BookOpen, color: 'cyan' },
  cooking: { label: 'COOKING', description: 'Craft', icon: ChefHat, color: 'amber' },
  mind: { label: 'MIND', description: 'Clarity', icon: Brain, color: 'violet' },
  vitality: { label: 'VITALITY', description: 'Energy', icon: HeartPulse, color: 'teal' },
  focus: { label: 'FOCUS', description: 'Discipline', icon: Target, color: 'blue' },
}

export const mockAttributes = [
  { key: 'fitness', level: 4, xp: 340, xpToNext: 500 },
  { key: 'study', level: 8, xp: 610, xpToNext: 900 },
  { key: 'cooking', level: 2, xp: 80, xpToNext: 200 },
  { key: 'mind', level: 5, xp: 220, xpToNext: 450 },
  { key: 'vitality', level: 6, xp: 390, xpToNext: 600 },
  { key: 'focus', level: 3, xp: 140, xpToNext: 300 },
]

export const questCategories = ['FITNESS', 'STUDY', 'COOKING', 'MIND', 'VITALITY', 'FOCUS']
export const questDifficulties = [
  { key: 'EASY', xp: 60, credits: 15 },
  { key: 'MEDIUM', xp: 120, credits: 30 },
  { key: 'HARD', xp: 220, credits: 55 },
]

export const mockQuests = [
  {
    id: 'q1',
    title: 'Study React',
    category: 'STUDY',
    difficulty: 'MEDIUM',
    xp: 120,
    credits: 30,
    status: 'active',
    type: 'FOCUS TIMER',
    duration: 60,
  },
  {
    id: 'q2',
    title: 'Complete Workout',
    category: 'FITNESS',
    difficulty: 'HARD',
    xp: 220,
    credits: 55,
    status: 'active',
    type: 'INSTANT',
  },
  {
    id: 'q3',
    title: 'Read 20 Pages',
    category: 'MIND',
    difficulty: 'EASY',
    xp: 60,
    credits: 15,
    status: 'active',
    type: 'INSTANT',
  },
  {
    id: 'q4',
    title: 'Cook Dinner',
    category: 'COOKING',
    difficulty: 'MEDIUM',
    xp: 120,
    credits: 30,
    status: 'ascended',
    type: 'INSTANT',
  },
  {
    id: 'q5',
    title: 'Meditate 15 Minutes',
    category: 'VITALITY',
    difficulty: 'EASY',
    xp: 60,
    credits: 15,
    status: 'ascended',
    type: 'FOCUS TIMER',
    duration: 15,
  },
  {
    id: 'q6',
    title: 'Build Portfolio Feature',
    category: 'FOCUS',
    difficulty: 'HARD',
    xp: 220,
    credits: 55,
    status: 'active',
    type: 'FOCUS TIMER',
    duration: 90,
  },
]

export const marketItems = [
  {
    id: 'm1',
    name: 'VOID THEME',
    description: 'Cloak your command center in absolute obsidian.',
    price: 500,
    kind: 'theme',
    owned: false,
  },
  {
    id: 'm2',
    name: 'CELESTIAL BADGE',
    description: 'A mark of early ascension, worn beside your name.',
    price: 300,
    kind: 'badge',
    owned: true,
  },
  {
    id: 'm3',
    name: 'AURA: ECLIPSE',
    description: 'A slow violet corona that follows your character.',
    price: 750,
    kind: 'aura',
    owned: false,
  },
  {
    id: 'm4',
    name: 'STARFORGED TITLE',
    description: 'Display "The Starforged" beneath your username.',
    price: 1000,
    kind: 'title',
    owned: false,
  },
]
