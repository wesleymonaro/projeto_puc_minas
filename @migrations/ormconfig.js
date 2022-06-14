
require('dotenv').config({
  path: './@config/.development.env'
})

module.exports = {
  type: "mysql",
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_URL,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: false,
  migrations: ["./dist/*{.ts,.js}"],
  migrationsTableName: "migrations_typeorm",
  migrationsRun: true,
}
