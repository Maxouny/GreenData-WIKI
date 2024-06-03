import { DataTypes, Model } from 'sequelize'
import sequelize from '../utils/database'

class Article extends Model {
	public id!: number
	public title!: string
	public content!: string
	public creatorName!: string
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
Article.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		creatorName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'Article',
	}
)

export default Article
