const models = require('../models');

module.exports = {
purchase: (req, res) => {
  models.Product.findOne({
    where: {
      id: req.params.id
    }
  }).then((results) => {
    if (req.body.moneyGiven >= results.price && results.isInStock == true){
      var calculatedChange;
      if (req.body.moneyGiven == results.price){
        calculatedChange = 0;
      }else{
        calculatedChange = (req.body.moneyGiven - results.price);
      };
    models.Purchase.create({
      purchaseSuccessful: true,
      moneyGiven: req.body.moneyGiven,
      moneyReturned: calculatedChange,
      itemPurchased: results.name
    }).then(() => {
      models.MachineData.findOne({
        where: {
          id: 1
        }
      }).then((goodMachineData) => {
        goodMachineData.currentMoney = (goodMachineData.currentMoney + results.price);
        goodMachineData.successfulPurchases = (goodMachineData.successfulPurchases + 1);
        goodMachineData.save({
          fields: ['currentMoney', 'successfulPurchases']
        })
      })
    }).then(() => {
        results.stock = (results.stock - 1);
        if(results.stock == 0){
          results.isInStock = false;
        };
        results.save({
          fields: ['stock', 'isInStock']
        })
      }).then(() => {
        return res.send('Purchase Successful');
      });
  }else if(req.body.moneyGiven < results.price){
    models.Purchase.create({
      purchaseSuccessful: false,
      moneyGiven: req.body.moneyGiven,
      moneyReturned: req.body.moneyGiven,
      itemPurchased: results.name
    }).then(() => {
      models.MachineData.findOne({
        where: {
          id: 1
        }
    }).then((badMachineData) => {
      badMachineData.unsuccessfulPurchases = (badMachineData.unsuccessfulPurchases + 1);
      badMachineData.save({
        fields: ['unsuccessfulPurchases']
      })
    })
  }).then(() => {
      return res.send('Insufficient funds');
    });
  }else if(results.isInStock == false){
    models.Purchase.create({
      purchaseSuccessful: false,
      moneyGiven: req.body.moneyGiven,
      moneyReturned: req.body.moneyGiven,
      itemPurchased: results.name
    }).then(() => {
      models.MachineData.findOne({
        where: {
          id: 1
        }
    }).then((outOfStockMachineData) => {
      outOfStockMachineData.unsuccessfulPurchases = (outOfStockMachineData.unsuccessfulPurchases + 1);
      outOfStockMachineData.save({
        fields: ['unsuccessfulPurchases']
      })
    })
  }).then(() => {
  return res.send('Product is currently out of stock');
      });
    };
  });
},
viewProducts: (req, res) => {
  models.Product.findAll().then((results) => {
    return res.json(results)
  });
}
};
