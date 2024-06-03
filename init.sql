-- Удаление пользователя (если существует)
DROP USER IF EXISTS 'username'@'%';

-- Создание пользователя, который может подключаться с любого хоста
CREATE USER 'username'@'%' IDENTIFIED BY 'password';

-- Предоставление всех прав пользователю
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'%';

-- Применение изменений
FLUSH PRIVILEGES;
