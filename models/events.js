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
        // hooks: {
        //     afterCreate: function(models,options){
        //        models.user_events.create({
        //             eventId: events.id,
        //             userId: 1
        //         }).then(function(){
        //             console.log('Success');
        //         });
        //     }
        // }
    });
    Events.hook('afterCreate',function(models){
        var userId;
        var url = window.location.href;
        if(url.indexOf("/dashboard/") !== -1) {
        userId = url.split("/")[2];
        models.user_event.create({
            eventId: events.id,
            userId: userId,
            host: true
        });
        };
        
    });
    // sequelize.query(
    // "CREATE TRIGGER create_user_event AFTER INSERT ON events FOR EACH ROW INSERT into user_events (eventId,userId) VALUES (new.id,1);");
    return Events;  
}


    
