const express = require('express');
const models = require('./models');
const CustomerController = require('./controllers/customer');
const VendorController = require('./controllers/vendor');
const MachineController = require('./controllers/machinedata');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get("/api/customer/items", CustomerController.viewProducts);
app.post("/api/customer/items/:id/purchase", CustomerController.purchase);
app.post("/api/vendor/add", VendorController.addProduct);
app.post("/api/vendor/:id/modify", VendorController.modifyProduct);
app.post("/api/vendor/remove", VendorController.removeProduct);
app.get("/api/vendor/items", VendorController.viewProducts);
app.get("/api/vendor/purchases", VendorController.viewPurchases);
app.get("/api/vendor/data", VendorController.viewMachineData);

//There should only be one instance of machinedata
app.post("/api/machinedata/create", MachineController.create);
app.post("/api/machinedata/delete", MachineController.delete);

app.listen(3000);
