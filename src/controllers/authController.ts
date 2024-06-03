import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'

export const register = async (req: Request, res: Response) => {
	const { username, email, password } = req.body
	try {
		const hashedPassword = await bcrypt.hash(password, 10)
		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		})
		res
			.status(201)
			.json({ message: 'User registered successfully', username, email })
	} catch (error) {
		res.status(500).json({ message: 'Error registering user', error })
	}
}

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body
	try {
		const user = await User.findOne({ where: { email } })
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: 'Invalid credentials' })
		}
		res.status(200).json({ message: 'Login successful' })
	} catch (error) {
		res.status(500).json({ message: 'Error logging in', error })
	}
}
