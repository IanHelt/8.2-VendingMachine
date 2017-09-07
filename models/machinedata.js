'use strict';
module.exports = function(sequelize, DataTypes) {
  var MachineData = sequelize.define('MachineData', {
    currentMoney: DataTypes.INTEGER,
    successfulPurchases: DataTypes.INTEGER,
    unsuccessfulPurchases: DataTypes.INTEGER
  });
  return MachineData;
};
