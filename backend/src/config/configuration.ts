export default () => ({
  port: process.env.PORT,
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  admin: {
    id: process.env.ADMIN_ID,
    password: process.env.ADMIN_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES,
  },
  lent_term: {
    private: parseInt(process.env.LENT_TERM_PRIVATE, 10),
    share: parseInt(process.env.LENT_TERM_SHARE, 10),
  },
  expire_term: {
    soonoverdue: parseInt(process.env.EXPIRE_TERM_SOONOVERDUE, 10),
    overdue: parseInt(process.env.EXPIRE_TERM_OVERDUE, 10),
    lastoverdue: parseInt(process.env.EXPIRE_TERM_LASTOVERDUE, 10),
    forcedreturn: parseInt(process.env.EXPIRE_TERM_FORCEDRETURN, 10),
  },
  penalty_day_share: parseInt(process.env.PENALTY_DAY_SHARE, 10),
});
