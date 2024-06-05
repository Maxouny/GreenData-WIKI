import { DataTypes, Model } from 'sequelize'
import sequelize from '../utils/database'
import Article from './Article'

class User extends Model {
	public id!: number
	public username!: string
	public email!: string
	public password!: string
	public readonly createdAt!: Date
	public readonly updatedAt!: Date
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
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
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
