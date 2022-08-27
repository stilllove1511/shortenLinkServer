// test db connection
import { Sequelize } from "sequelize"

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
    "onbrxfqj",
    "onbrxfqj",
    "BI3VZErCq3ikgW2-lyohAOvocUhmZgoe",
    {
        host: "tiny.db.elephantsql.com",
        dialect: "postgres",
    }
)

const connection = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connection has been established successfully.")
    } catch (error) {
        console.error("Unable to connect to the database:", error)
    }
}
module.exports = {
    connection,
}
