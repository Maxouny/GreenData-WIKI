import { Request, Response } from 'express'
import Article from '../models/Article'
import User from '../models/User'

interface AuthRequest extends Request {
	userId?: number
}

export const createArticle = async (req: AuthRequest, res: Response) => {
	const { title, content, userId } = req.body

	if (!title || !content || !userId) {
		return res
			.status(400)
			.json({ message: 'Title, content, and userId are required' })
	}

	try {
		// Найти пользователя по userId
		const user = await User.findByPk(userId)
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		// Создать статью с указанием имени пользователя
		const article = await Article.create({
			title,
			content,
			creatorName: user.username,
		})

		res.status(201).json({ message: 'Article created successfully', article })
	} catch (error) {
		console.error('Error creating article:', error)
		res.status(500).json({ message: 'Error creating article', error })
	}
}

export const editArticle = async (req: AuthRequest, res: Response) => {
	const { title, content, id } = req.body

	if (!id) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	if (!title || !content) {
		return res.status(400).json({ message: 'Title and content are required' })
	}

	try {
		// Найти статью по id
		const article = await Article.findByPk(id)
		if (!article) {
			return res.status(404).json({ message: 'Article not found' })
		}

		// Найти пользователя по userId
		const user = await User.findByPk(id)
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		// Проверить, что текущий пользователь является создателем статьи
		if (article.creatorName !== user.username) {
			return res.status(403).json({ message: 'Forbidden' })
		}

		// Обновить статью
		await article.update({ title, content })
		res.status(200).json({ message: 'Article updated successfully', article })
	} catch (error) {
		console.error('Error updating article:', error)
		res.status(500).json({ message: 'Error updating article', error })
	}
}
export const getArticle = async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		// Найти статью по id
		const article = await Article.findByPk(id)
		if (!article) {
			return res.status(404).json({ message: 'Article not found' })
		}

		res.status(200).json({ message: 'Article retrieved successfully', article })
	} catch (error) {
		console.error('Error retrieving article:', error)
		res.status(500).json({ message: 'Error retrieving article', error })
	}
}

export const getArticles = async (req: Request, res: Response) => {
	try {
		// Получить все статьи
		const articles = await Article.findAll()
		res.status(200).json([...articles])
	} catch (error) {
		console.error('Error retrieving articles:', error)
		res.status(500).json({ message: 'Error retrieving articles', error })
	}
}
