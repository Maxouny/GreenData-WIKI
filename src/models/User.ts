import { DataTypes, Model } from 'sequelize'
import sequelize from '../utils/database'
import Article from './Article'

class User extends Model {
	public id!: number
	public roleId!: number
	public username!: string
	public email!: string
	public password!: string
	public readonly createdAt!: Date
	public readonly updatedAt!: Date
}

sequelize
	.sync({ force: true }) // Установите force: true, чтобы сбросить существующие таблицы и создать их заново
	.then(async () => {
		console.log('All models were synchronized successfully.')

		// Создаем 3 пользователей после синхронизации моделей
		await User.bulkCreate([
			{
				roleId: 1,
				username: 'defaulUser',
				email: 'defaulUser',
				password:
					'$2b$10$L35xPPbemFz3go//sXCteevMwRSoCgF9CrLyzbqML7jg3Tkr6n5na', // В реальном приложении пароль должен быть захеширован
			},
			{
				roleId: 2,
				username: 'analyst',
				email: 'analyst',
				password:
					'$2b$10$L35xPPbemFz3go//sXCteevMwRSoCgF9CrLyzbqML7jg3Tkr6n5na',
			},
			{
				roleId: 3,
				username: 'admin',
				email: 'admin',
				password:
					'$2b$10$L35xPPbemFz3go//sXCteevMwRSoCgF9CrLyzbqML7jg3Tkr6n5na',
			},
		])
		console.log('Users have been created successfully.')
	})
	.catch(err => {
		console.error('An error occurred while synchronizing models:', err)
	})

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		roleId: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
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

User.hasMany(Article, { foreignKey: 'creatorId' })
Article.belongsTo(User, { foreignKey: 'creatorId' })

export default User
