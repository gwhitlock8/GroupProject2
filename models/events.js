module.exports = function(sequelize, DataTypes) {
    var Events = sequelize.define("Events", {
        event_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        event_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },{
        classMethods: {
            associate: function(models) {
                Events.belongsToMany(models.Users,{through: models.UserEvents});
            }
        }  
    });
    return Events;
}