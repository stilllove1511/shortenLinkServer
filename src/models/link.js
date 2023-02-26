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
            title: { type: DataTypes.STRING, allowNull: true },
            originalLink: DataTypes.TEXT,
            alias: DataTypes.TEXT,
            timeVisited: { type: DataTypes.INTEGER, defaultValue: 0 },
            expiration: {
                type: DataTypes.DATE
            },
        },
        {
            sequelize,
            modelName: "Link",
            tableName: "links",
        }
    )
    return Link
}
