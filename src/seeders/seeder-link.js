"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            "Link",
            [
                {
                    title: "google",
                    originLink: "https://google.com",
                    shortenLink: "ggle",
                    userId: 1,
                },
                {
                    title: "youtube",
                    originLink: "https://youtube.com",
                    shortenLink: "ytb",
                    userId: 1,
                },
                {
                    title: "instagram",
                    originLink: "https://instagram.com",
                    shortenLink: "ins",
                    userId: 2,
                },
                {
                    title: "zalo",
                    originLink: "https://zalo.me",
                    shortenLink: "zl",
                    userId: 2,
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
