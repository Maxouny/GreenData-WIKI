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
				content: `# Dillinger
				## _The Last Markdown Editor, Ever_
				
				[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)
				
				[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
				
				Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible,
				AngularJS-powered HTML5 Markdown editor.
				
				- Type some Markdown on the left
				- See HTML in the right
				- ✨Magic ✨
				
				## Features
				
				- Import a HTML file and watch it magically convert to Markdown
				- Drag and drop images (requires your Dropbox account be linked)
				- Import and save files from GitHub, Dropbox, Google Drive and One Drive
				- Drag and drop markdown and HTML files into Dillinger
				- Export documents as Markdown, HTML and PDF
				
				Markdown is a lightweight markup language based on the formatting conventions
				that people naturally use in email.
				As [John Gruber] writes on the [Markdown site][df1]
				
				> The overriding design goal for Markdown's
				> formatting syntax is to make it as readable
				> as possible. The idea is that a
				> Markdown-formatted document should be
				> publishable as-is, as plain text, without
				> looking like it's been marked up with tags
				> or formatting instructions.
				
				This text you see here is *actually- written in Markdown! To get a feel
				for Markdown's syntax, type some text into the left window and
				watch the results in the right.`,
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
