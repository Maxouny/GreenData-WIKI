import express from 'express'
import bodyParser from 'body-parser'
import authRoutes from './routes/authRoutes'
import articleRoutes from './routes/articleRoutes'
import sequelize from './utils/database'
import cors from 'cors'

const app = express()

app.use(cors()) // Добавьте эту строку для использования CORS

app.use(bodyParser.json())

app.use('/auth', authRoutes)
app.use('/api', articleRoutes)

sequelize
	.sync()
	.then(() => {
		console.log('Database connected')
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error)
	})

export default app
