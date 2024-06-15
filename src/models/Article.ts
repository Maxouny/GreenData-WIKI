import { DataTypes, Model } from 'sequelize'
import sequelize from '../utils/database'

class Article extends Model {
	public id!: number
	public title!: string
	public content!: string
	public creatorId!: number
	public readonly createdAt!: Date
	public updatedAt!: Date
}
sequelize
	.sync({ force: true }) // Установите force: true, чтобы сбросить существующие таблицы и создать их заново
	.then(async () => {
		console.log('All models were synchronized successfully.')

		// Создаем 3 пользователей после синхронизации моделей
		await Article.bulkCreate([
			{
				title: 'Статья defaultUser',
				content: 'Content for article 1',
				creatorId: 1, // Привязываем статью к defaulUser
			},
			{
				title: 'Статья analyst',
				content: 'Content for article 2',
				creatorId: 2, // Привязываем статью к analyst
			},
			{
				title: 'Статья admin',
				content: 'Content for article 3',
				creatorId: 3, // Привязываем статью к admin
			},
		])
		console.log('Users have been created successfully.')
	})
	.catch(err => {
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
			type: DataTypes.TEXT('long'),
			allowNull: false,
		},
		creatorId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		modelName: 'Article',
	}
)

export default Article
