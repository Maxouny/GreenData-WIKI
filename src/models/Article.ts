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
				content: `Настройка шлюзов ETL-процесса
В случае распараллеливании схем ETL-процессов используются шлюзы. При этом настраиваемые элементы управляют порядком загрузки данных ETL.

![Схема ETL шлюза](../assets/4.jpg)
Схема ETL шлюза

Для изменения типа шлюза используется пиктограмма ![Пиктограмма изменения типа шлюза](../assets/5.jpg).

Типы шлюзов
Эксклюзивный шлюз.
Шлюз данного типа срабатывает при поступлении хотя бы одного потока данных. При нескольких потоках исходящих данных, выполнение схемы продолжается только по одному из них. Для этого шлюз в цикле проверяет все потоки и выбирает первый, для которого выполнится одно из условий:
нет признака условного перехода;
есть признак условного перехода, но не задан алгоритм для условия;
алгоритм условного перехода вернул true.

Если ни для одного из исходящих потоков не выполнилось ни одно условие, то выполнение продолжится по переходу по умолчанию.


Инклюзивный (неэксклюзивный) шлюз.
Элемент срабатывает каждый раз при получении потока данных. Данный шлюз может инициировать от одного до нескольких исходящих потоков данных. Определение перечня сработавших исходящих потоков данных выполняется синхронно (аналогично алгоритму эксклюзивного шлюза). Если в настройках задается количество потоков больше 1, то запускаются все сработавшие потоки в соответствии с их количеством. Если указан 1, все сработавшие потоки данных запустятся по порядку в синхронном режиме.

Параллельный шлюз.
Данный шлюз срабатывает только при выполнении всех входящих потоков. Далее обработка элемента и инициация исходящих потоков выполняется аналогично работе с инклюзивным шлюзом.

Количество входящих потоков для инклюзивного (неэксклюзивный) и параллельного шлюзов указывается при настройке посредством пиктограммы ![Пиктограмма количества входящих потоков](../assets/6.jpg).`,
				creatorId: 2, // Привязываем статью к defaulUser
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
