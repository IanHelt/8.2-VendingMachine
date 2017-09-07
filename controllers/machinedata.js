const models = require('../models');

module.exports = {
create: (req, res) => {
  models.MachineData.create({
  currentMoney: req.body.currentMoney,
  successfulPurchases: req.body.successfulPurchases,
  unsuccessfulPurchases: req.body.unsuccessfulPurchases
    }).then((results) => {
    return res.json(results);
    });
},
delete: (req, res) => {
  models.MachineData.findOne({
    where: {
      id: req.body.id
    }
  }).then((results) => {
    results.destroy();
  }).then(() => {
    return res.send('Data deleted');
  });
}
};
