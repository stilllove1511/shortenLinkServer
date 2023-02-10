"use strict"
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.renameColumn("Link", "originLink", "originalLink")
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.renameColumn("Link", "originalLink", "originLink")
    },
}
