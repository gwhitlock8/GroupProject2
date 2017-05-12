module.exports = function(sequelize, Sequelize) {
    var Events = sequelize.define("events", {
        event_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        event_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING,
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
                Events.belongsToMany(models.user,{through: models.user_event});
                Events.belongsTo(models.user_event);
            }
        }
    });
    return Events;  
}


    
