import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'

import { AppStateProvider, useAppState } from './context/AppState'
import AppShell from './components/layout/AppShell'
import LevelUpModal from './components/progression/LevelUpModal'

import Splash from './pages/Splash'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Onboarding from './pages/Onboarding'
import CommandCenter from './pages/CommandCenter'
import Quests from './pages/Quests'
import Attributes from './pages/Attributes'
import Market from './pages/Market'
import FocusQuest from './pages/FocusQuest'
import CharacterTest from './pages/CharacterTest'
import AnimationTest from './pages/AnimationTest'

import { supabase } from './lib/supabase'

function GlobalLevelUp() {
  const { levelUpPayload, clearLevelUp } = useAppState()

  return (
    <LevelUpModal
      payload={levelUpPayload}
      onClose={clearLevelUp}
    />
  )
}

function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    let mounted = true

    async function loadSession() {
      const { data } = await supabase.auth.getSession()

      if (mounted) {
        setSession(data.session)
      }
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Still checking Supabase
  if (session === undefined) {
    return null
  }

  // Not logged in
  if (!session) {
    return <Navigate to="/login" replace />
  }

  // Logged in
  return children
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppStateProvider>
        <HashRouter>
          <Routes>

            {/* Public routes */}
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected onboarding */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              }
            />

            {/* Development test pages */}
            <Route path="/character-test" element={<CharacterTest />} />
            <Route path="/animation-test" element={<AnimationTest />} />

            {/* Protected application */}
            <Route
              element={
                <ProtectedRoute>
                  <AppShell />
                </ProtectedRoute>
              }
            >
              <Route path="/command" element={<CommandCenter />} />
              <Route path="/quests" element={<Quests />} />
              <Route path="/attributes" element={<Attributes />} />
              <Route path="/market" element={<Market />} />
            </Route>

            {/* Protected focus quest */}
            <Route
              path="/focus"
              element={
                <ProtectedRoute>
                  <FocusQuest />
                </ProtectedRoute>
              }
            />

          </Routes>

          <GlobalLevelUp />
        </HashRouter>
      </AppStateProvider>
    </MotionConfig>
  )
}