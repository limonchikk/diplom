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
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    logging: process.env.DATABASE_LOGGING,
    migrationsRun: process.env.DATABASE_MIGRATIONS_RUN,
    migrationsTableName: process.env.DATABASE_MIGRATIONS_TABLE_NAME,
  },
  jwt: {
    accessSecret: process.env.ACCESS_JWT_SECRET,
    refreshSecret: process.env.REFRESH_JWT_SECRET,
    accessExp: process.env.JWT_ACCESS_EXP,
  },
  user: {
    defaultLogin: process.env.DEFAULT_USER_LOGIN,
    defaultPassword: process.env.DEFAULT_USER_PASSWORD,
  },
  mailer: {
    host: process.env.MAILER_HOST,
    user: process.env.MAILER_USER,
    password: process.env.MAILER_PASSWORD,
  },
  files: {
    folder: process.env.DOCUMENTS_FOLDER || 'files',
  },
})
