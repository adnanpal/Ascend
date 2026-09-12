import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import Button from '../components/ui/Button'
import { supabase } from '../lib/supabase'

export default function Signup() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (field) => (e) => {
    setForm((f) => ({
      ...f,
      [field]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          username: form.username,
        },
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    console.log('Signup successful:', data)

    navigate('/onboarding')
  }

  return (
    <AuthLayout tagline="Every ascension starts with a single quest. Create your character and begin.">
      <h2 className="mb-8 text-xs font-semibold tracking-[0.24em] text-muted">
        BEGIN YOUR ASCENSION
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label
            htmlFor="username"
            className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-muted"
          >
            Username
          </label>

          <input
            id="username"
            required
            value={form.username}
            onChange={update('username')}
            className="w-full rounded-sm border border-line bg-white/5 px-4 py-3 text-sm text-white transition-all duration-200 placeholder:text-faint focus:border-cyan/50 focus:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-cyan focus:shadow-[0_0_0_4px_rgba(95,227,211,0.08)]"
            placeholder="ADNAN"
          />
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-muted"
          >
            Email
          </label>

          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={update('email')}
            className="w-full rounded-sm border border-line bg-white/5 px-4 py-3 text-sm text-white transition-all duration-200 placeholder:text-faint focus:border-cyan/50 focus:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-cyan focus:shadow-[0_0_0_4px_rgba(95,227,211,0.08)]"
            placeholder="you@ascend.io"
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-muted"
          >
            Password
          </label>

          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            required
            value={form.password}
            onChange={update('password')}
            className="w-full rounded-sm border border-line bg-white/5 px-4 py-3 text-sm text-white transition-all duration-200 placeholder:text-faint focus:border-cyan/50 focus:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-cyan focus:shadow-[0_0_0_4px_rgba(95,227,211,0.08)]"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-muted"
          >
            Confirm Password
          </label>

          <input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            value={form.confirm}
            onChange={update('confirm')}
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
          {loading ? 'Creating Character...' : 'Create Character'}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted md:text-left">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-cyan hover:text-white">
          Enter the journey
        </Link>
      </p>
    </AuthLayout>
  )
}