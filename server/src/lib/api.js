import { supabase } from './supabase'

const API_URL = 'http://localhost:5000/api'

async function getAccessToken() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.access_token) {
    throw new Error('You are not authenticated')
  }

  return session.access_token
}

async function request(path, options = {}) {
  const token = await getAccessToken()

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Request failed')
  }

  return data
}

export const api = {
  getQuests() {
    return request('/quests')
  },

  createQuest(quest) {
    return request('/quests', {
      method: 'POST',
      body: JSON.stringify(quest),
    })
  },

  startQuest(id) {
    return request(`/quests/${id}/start`, {
      method: 'POST',
    })
  },

  completeQuest(id) {
    return request(`/quests/${id}/complete`, {
      method: 'POST',
    })
  },
}