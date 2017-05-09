module.exports = function(sequelize, DataTypes) {
    var UsersEvents = sequelize.define("UserEvents", {
        host: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        },
        attending: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        food: {
            type: DataTypes.STRING,
            allowNull: true
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
        },
    },{
        classMethods: {
            associate: function(models) {
                UsersEvents.belongsTo(models.Users);
            }
        }  
      
    });
    return UsersEvents;
};



