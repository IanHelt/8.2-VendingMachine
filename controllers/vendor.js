const models = require('../models');

module.exports = {
addProduct: (req, res) => {
  models.Product.create({
  name: req.body.name,
  price: req.body.price,
  stock: req.body.stock,
  isInStock: req.body.isInStock
    }).then((results) => {
    return res.json(results);
    });
  },
  modifyProduct: (req, res) => {
    models.Product.findOne({
      where: {
        id: req.params.id
      }
    }).then((results) => {
        if(req.body.name == undefined){
          results.name = results.name;
        }else{
          results.name = req.body.name;
        };
        if(req.body.price == undefined){
          results.price = results.price;
        }else{
          results.price = req.body.price;
        };
        if(req.body.stock == undefined){
          results.stock = results.stock
        }else{
          results.stock = req.body.stock;
        };
        results.save({
          fields: ['name', 'price', 'stock']
        });
        return res.send('Modification successful')
      });
  },
  removeProduct: (req,res) => {
    models.Product.findOne({
      where: {
        id: req.body.id
      }
    }).then((results) => {
      results.destroy();
      return res.send('Product deleted')
    });
  },
  viewProducts: (req, res) => {
    models.Product.findAll().then((results) => {
      return res.json(results)
    });
  },
  viewMachineData: (req, res) => {
    models.MachineData.findAll().then((results) => {
      return res.json(results)
    });
  },
  viewPurchases: (req, res) => {
    models.Purchase.findAll().then((results) => {
      return res.json(results)
    });
  }
};
