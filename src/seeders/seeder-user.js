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
