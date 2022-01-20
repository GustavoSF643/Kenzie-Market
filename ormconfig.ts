const developmentEnv = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: ["./src/entities/*.ts"],
    migrations: ["./src/database/migrations/*.ts"],
    cli: {
      migrationsDir: "./src/database/migrations",
    },
    ssl: false,
};
  

const productionEnv = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["./dist/entities/*.js"],
  migrations: ["./dist/database/migrations/*.js"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
};

const testEnv = {
  type: "postgres",
  url: process.env.TEST_DATABASE_URL,
  entities: ["./src/entities/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  ssl: false,
}

if (process.env.NODE_ENV === "test") module.exports = testEnv
if (process.env.NODE_ENV === "production") module.exports = productionEnv
if (process.env.NODE_ENV === "development") module.exports = developmentEnv
