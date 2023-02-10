"use strict"
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.renameColumn("Link", "shortenLink", "alias")
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.renameColumn("Link", "alias", "shortenLink")
    },
}
