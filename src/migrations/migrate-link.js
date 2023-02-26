"use strict"
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Link", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
            },
            originalLink: {
                type: Sequelize.TEXT,
            },
            alias: {
                type: Sequelize.TEXT,
            },
            userId: {
                type: Sequelize.INTEGER,
            },
            expiration:{
                type: Sequelize.DATE,
                allowNull: true,
            },
            timeVisited:{
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Link")
    },
}
