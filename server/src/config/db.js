const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "edpmanager",
    password: "post",
    port: 5432
})

module.exports = pool;