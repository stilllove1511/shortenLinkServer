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
            "users",
            [
                {
                    username: "user1",
                    password:
                        "$2a$10$PsbfONDoBN/moJstrnkheO0Sf6.nO1dlNCO1XzbrfaBtsS63Ct60.", //q
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: "user2",
                    password:
                        "$2a$10$PsbfONDoBN/moJstrnkheO0Sf6.nO1dlNCO1XzbrfaBtsS63Ct60.", //q
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
        await queryInterface.bulkInsert(
            "links",
            [
                {
                    title: "google",
                    originalLink: "https://google.com",
                    alias: "ggle",
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: "youtube",
                    originalLink: "https://youtube.com",
                    alias: "ytb",
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: "instagram",
                    originalLink: "https://instagram.com",
                    alias: "ins",
                    userId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: "zalo",
                    originalLink: "https://zalo.me",
                    alias: "zl",
                    userId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
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
