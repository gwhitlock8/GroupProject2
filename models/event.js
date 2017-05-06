module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("events", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING
  },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          Event.belongsToMany(models.User, {through: UserEvents});
        }
      }
    }
  );
  return Events;
};