"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Link extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Link.belongsTo(models.User, { foreignKey: "userId" })
        }
    }
    Link.init(
        {
            title: DataTypes.STRING,
            originalLink: DataTypes.TEXT,
            alias: DataTypes.TEXT,
            userId: DataTypes.INTEGER,
            expiration: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal(
                    "CURRENT_TIMESTAMP + INTERVAL 1 MONTH"
                ),
            },
        },
        {
            sequelize,
            modelName: "Link",
        }
    )
    return Link
}
