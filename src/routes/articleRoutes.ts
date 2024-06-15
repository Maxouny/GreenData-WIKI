import { Router } from 'express'
import {
	createArticle,
	deleteArticle,
	editArticle,
	getArticle,
	getArticles,
} from '../controllers/articleController'

const router = Router()

// Маршруты для создания и редактирования статей
router.post('/articles', createArticle)
router.put('/articles', editArticle)

// Маршруты для получения статей
router.get('/articles/:id', getArticle) // Получить статью по id
router.get('/articles', getArticles) // Получить все статьи
router.delete('/articles/:id', deleteArticle)

export default router
