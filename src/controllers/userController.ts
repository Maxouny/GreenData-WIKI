import { Request, Response } from 'express'
import User from '../models/User'
export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.findAll()
		res.status(200).json([...users])
	} catch (error) {
		console.error('Error retriving users:', error)
		res.status(500).json({ message: 'Error retriving users:', error })
	}
}
