module.exports = function(sequelize, Sequelize) {
    var UserEvent = sequelize.define("user_event", {
        host: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: false
        },
        attending: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        food: {
            type: Sequelize.STRING,
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
                UserEvent.belongsTo(models.user);
            }
        }  
      
    }
    
    );
    return UserEvent;
};



