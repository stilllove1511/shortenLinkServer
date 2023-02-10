"use strict"
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Link", "timeVisited", {
            type: Sequelize.INTEGER,
            allowNull: true,
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropColumn("Link", "timeVisited")
    },
}
