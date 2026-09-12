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
  const {
    levelUpPayload,
    clearLevelUp,
    revealCharacter,
  } = useAppState()

  return (
    <LevelUpModal
      payload={levelUpPayload}
      onClose={clearLevelUp}
      onRevealCharacter={revealCharacter}
    />
  )
}


/*
 * Checks whether the user has a valid Supabase session.
 */
function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    let mounted = true

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession()

      if (!mounted) return

      if (error) {
        console.error('Failed to load session:', error)
        setSession(null)
        return
      }

      setSession(data.session)
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Supabase is still checking the session.
  if (session === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="font-display text-xs tracking-[0.3em] text-cyan">
          CONNECTING...
        </p>
      </div>
    )
  }

  // No authenticated session.
  if (!session) {
    return <Navigate to="/login" replace />
  }

  // Authenticated.
  return children
}

function PlayerGate({ children }) {
  const { user, loading } = useAppState()

  // Player data is still loading.
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="font-display text-xs tracking-[0.3em] text-cyan">
          ASCENDING...
        </p>
      </div>
    )
  }

  // Loading finished but there is no player.
  // This can happen briefly during auth/session changes.
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="font-display text-xs tracking-[0.3em] text-cyan">
          INITIALIZING CHARACTER...
        </p>
      </div>
    )
  }

  return children
}


export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppStateProvider>
        <HashRouter>
          <Routes>

         

            <Route path="/" element={<Splash />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />



            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <PlayerGate>
                    <Onboarding />
                  </PlayerGate>
                </ProtectedRoute>
              }
            />


            {/* =========================
                DEVELOPMENT TEST PAGES
            ========================== */}

            <Route
              path="/character-test"
              element={<CharacterTest />}
            />

            <Route
              path="/animation-test"
              element={<AnimationTest />}
            />


         

            <Route
              element={
                <ProtectedRoute>
                  <PlayerGate>
                    <AppShell />
                  </PlayerGate>
                </ProtectedRoute>
              }
            >
              <Route
                path="/command"
                element={<CommandCenter />}
              />

              <Route
                path="/quests"
                element={<Quests />}
              />

              <Route
                path="/attributes"
                element={<Attributes />}
              />

              <Route
                path="/market"
                element={<Market />}
              />
            </Route>


            <Route
              path="/focus"
              element={
                <ProtectedRoute>
                  <PlayerGate>
                    <FocusQuest />
                  </PlayerGate>
                </ProtectedRoute>
              }
            />


            {/* =========================
                FALLBACK
            ========================== */}

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>


          {/* Global level-up modal */}
          <GlobalLevelUp />

        </HashRouter>
      </AppStateProvider>
    </MotionConfig>
  )
}