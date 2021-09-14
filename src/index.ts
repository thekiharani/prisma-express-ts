import express from 'express'
import usersRouter from './routes/user.routes'
import postsRouter from './routes/post.routes'

const app = express()
app.use(express.json())

app.use('/users', usersRouter)
app.use('/posts', postsRouter)

const PORT = 4001
app.listen(PORT, () => {
  console.log(`Dev server running on: http://localhost:${PORT}`)
})
