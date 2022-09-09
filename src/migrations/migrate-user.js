"use strict"
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("User", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            username: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            groupId: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("User")
    },
}
