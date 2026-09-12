import { supabaseAdmin } from '../supabase.js'

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Missing authentication token',
      })
    }

    const token = authHeader.replace('Bearer ', '').trim()

    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token)

    if (error || !user) {
      return res.status(401).json({
        error: 'Invalid or expired authentication token',
      })
    }

    req.user = user

    next()
  } catch (error) {
    console.error('Auth error:', error)

    return res.status(401).json({
      error: 'Authentication failed',
    })
  }
}