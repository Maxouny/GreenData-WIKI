import { Router } from 'express'
import {
	createArticle,
	editArticle,
	getArticle,
	getArticles,
} from '../controllers/articleController'

const router = Router()

// Маршруты для создания и редактирования статей
router.post('/articles', createArticle)
router.put('/articles/:id', editArticle)

// Маршруты для получения статей
router.get('/articles/:id', getArticle) // Получить статью по id
router.get('/articles', getArticles) // Получить все статьи

export default router
