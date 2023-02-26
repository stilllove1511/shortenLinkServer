module.exports= {
    "development": {
        "username": "postgres",
        "password": "1",
        "database": "shorten_link",
        "host": process.env.DB_HOST||'localhost',
        "dialect": "postgres"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "onbrxfqj",
        "password": "BI3VZErCq3ikgW2-lyohAOvocUhmZgoe",
        "database": "onbrxfqj",
        "host": "tiny.db.elephantsql.com",
        "dialect": "postgres",
        "logging": false
    }
}
