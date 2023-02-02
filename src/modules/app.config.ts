export default (): Record<string, any> => ({
  app: {
    httpPort: process.env.APP_PORT,
    httpPrefix: process.env.HTTP_PREFIX,
    httpHost: process.env.HTTP_HOST,
    httpVersion: process.env.HTTP_VERSION,
    serviceName: process.env.SERVICE_NAME,
  },
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    logging: process.env.DATABASE_LOGGING,
    migrationsRun: process.env.DATABASE_MIGRATIONS_RUN,
    migrationsTableName: process.env.DATABASE_MIGRATIONS_TABLE_NAME,
  },
})
