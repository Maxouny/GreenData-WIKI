import { Request, Response } from 'express'
import Article from '../models/Article'
import User from '../models/User'

export const createArticle = async (req: Request, res: Response) => {
	const { title, content, userId } = req.body

	if (!title || !content || !userId) {
		return res
			.status(400)
			.json({ message: 'Title, content, and userId are required' })
	}

	try {
		const user = await User.findByPk(userId)
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		const article = await Article.create({
			title,
			content,
			creatorId: user.id,
		})

		res.status(201).json({ message: 'Article created successfully', article })
	} catch (error) {
		console.error('Error creating article:', error)
		res.status(500).json({ message: 'Error creating article', error })
	}
}

export const editArticle = async (req: Request, res: Response) => {
	const { title, content, id, userId } = req.body

	if (!id) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	if (!title || !content) {
		return res.status(400).json({ message: 'Title and content are required' })
	}

	try {
		const article = await Article.findByPk(id)
		if (!article) {
			return res.status(404).json({ message: 'Article not found' })
		}

		// Логирование для отладки
		console.log(`Article.creatorId: ${article.creatorId}, userId: ${userId}`)

		const user = await User.findByPk(userId)
		if (!userId) {
			return res.status(404).json({ message: 'User not found' })
		}
		if (article.creatorId !== user?.id) {
			return res.status(403).json({ message: 'Forbidden' })
		}

		await article.update({ title, content })
		res.status(200).json({ message: 'Article updated successfully', article })
		article.updatedAt = new Date()
	} catch (error) {
		console.error('Error updating article:', error)
		res.status(500).json({ message: 'Error updating article', error })
	}
}

export const getArticle = async (req: Request, res: Response) => {
	const { id } = req.params

	try {
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
		const articles = await Article.findAll()
		res.status(200).json([...articles])
	} catch (error) {
		console.error('Error retrieving articles:', error)
		res.status(500).json({ message: 'Error retrieving articles', error })
	}
}
export const deleteArticle = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const article = await Article.findByPk(id)
		if (!article) {
			return res.status(404).json({ message: 'Article not found' })
		}
		await article.destroy()
		return res.status(200).json({ message: 'Article deleted successfully' })
	} catch (error) {
		console.error(error)
		return res
			.status(500)
			.json({ message: 'An error occurred while deleting the article' })
	}
}
