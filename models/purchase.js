'use strict';
module.exports = function(sequelize, DataTypes) {
  var Purchase = sequelize.define('Purchase', {
    purchaseSuccessful: DataTypes.BOOLEAN,
    moneyGiven: DataTypes.INTEGER,
    moneyReturned: DataTypes.INTEGER,
    itemPurchased: DataTypes.STRING
  });
  return Purchase;
};
