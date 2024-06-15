import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import articleRoutes from './routes/articleRoutes'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import sequelize from './utils/database'

const app = express()

app.use(cors()) // Добавьте эту строку для использования CORS

app.use(bodyParser.json())

app.use('/auth', authRoutes)
app.use('/api', articleRoutes)
app.use('/user', userRoutes)

sequelize
	.sync()
	.then(() => {
		console.log('Database connected')
	})
	.catch(error => {
		console.error('Unable to connect to the database:', error)
	})

export default app
