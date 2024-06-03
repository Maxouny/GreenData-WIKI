import { DataTypes, Model, Sequelize } from 'sequelize'
import sequelize from '../utils/database'

class User extends Model {
	public id!: number
	public name!: string
	public email!: string
	public password!: string
	public readonly createdAt!: Date
	public readonly updatedAt!: Date
	username: any
}

sequelize
	.sync({ force: true }) // Установите force: true, чтобы сбросить существующие таблицы и создать их заново
	.then(() => {
		console.log('All models were synchronized successfully.')
	})
	.catch((err) => {
		console.error('An error occurred while synchronizing models:', err)
	})
User.init(
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'User',
	}
)

export default User
