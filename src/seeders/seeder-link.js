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
                    createdAt: "2000-01-01 00:00:00.000000",
                    updatedAt: "2000-01-01 00:00:00.000000",
                },
                {
                    title: "youtube",
                    originLink: "https://youtube.com",
                    shortenLink: "ytb",
                    userId: 1,
                    createdAt: "2000-01-01 00:00:00.000000",
                    updatedAt: "2000-01-01 00:00:00.000000",
                },
                {
                    title: "instagram",
                    originLink: "https://instagram.com",
                    shortenLink: "ins",
                    userId: 2,
                    createdAt: "2000-01-01 00:00:00.000000",
                    updatedAt: "2000-01-01 00:00:00.000000",
                },
                {
                    title: "zalo",
                    originLink: "https://zalo.me",
                    shortenLink: "zl",
                    userId: 2,
                    createdAt: "2000-01-01 00:00:00.000000",
                    updatedAt: "2000-01-01 00:00:00.000000",
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
