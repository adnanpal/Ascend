import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import Button from '../components/ui/Button'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    console.log('Login successful:', data)

    navigate('/command')
  }

  return (
    <AuthLayout tagline="Your journey begins here.">
      <h2 className="mb-8 text-xs font-semibold tracking-[0.24em] text-muted">
        LOGIN
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-muted"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sm border border-line bg-white/5 px-4 py-3 text-sm text-white transition-all duration-200 placeholder:text-faint focus:border-cyan/50 focus:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-cyan focus:shadow-[0_0_0_4px_rgba(95,227,211,0.08)]"
            placeholder="you@ascend.io"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-muted"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-sm border border-line bg-white/5 px-4 py-3 text-sm text-white transition-all duration-200 placeholder:text-faint focus:border-cyan/50 focus:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-cyan focus:shadow-[0_0_0_4px_rgba(95,227,211,0.08)]"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-xs text-red-400">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full">
          {loading ? 'Entering...' : 'Enter The Journey'}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted md:text-left">
        Don&apos;t have a character yet?{' '}
        <Link
          to="/signup"
          className="font-semibold text-cyan hover:text-white"
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  )
}