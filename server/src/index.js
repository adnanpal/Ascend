import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { requireAuth } from './lib/middleware/auth.js'
import questsRouter from './lib/routes/quests.js'

const app = express()

const allowedOrigin =
  process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(cors({
  origin: allowedOrigin
}))

app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'ASCEND API',
  })
})

app.use('/api/quests', requireAuth, questsRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, '0.0.0.0',() => {
  console.log(`ASCEND API running on http://localhost:${PORT}`)
})