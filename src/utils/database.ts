import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
import { Dialect } from 'sequelize/types'

// Загрузка переменных окружения из файла .env
dotenv.config()

// Создание объекта sequelize с учетом переменной окружения DATABASE_URL
const sequelize = new Sequelize({
	dialect: 'mysql' as Dialect,
	host: process.env.DB_HOST || 'localhost',
	port: parseInt(process.env.DB_PORT || '3306'),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	logging: false, // Вы можете включить логирование запросов, если необходимо
})

export default sequelize
