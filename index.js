const express = require('express');
const models = require('./models');
const CustomerController = require('./controllers/customer');
const VendorController = require('./controllers/vendor');
const MachineController = require('./controllers/machinedata');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get("/api/customer/items", CustomerController.viewProducts);
//Display each item in json format

app.post("/api/customer/items/:id/purchase", CustomerController.purchase);
//Example body: {"moneyGiven": int}
//Designates how much money the customer is attempting to give the machine

app.post("/api/vendor/add", VendorController.addProduct);
//Example body: {"name": "string", "price": int, "stock": int, "isInStock": true}
//Creates

app.post("/api/vendor/:id/modify", VendorController.modifyProduct);
//Example body: {"name": "string2", "isInStock": false}
//Will change just the name and in-stock status of the product

app.post("/api/vendor/remove", VendorController.removeProduct);
//Example body: {"id": 2}
//Removes the item with an id of 2 from the api

app.get("/api/vendor/items", VendorController.viewProducts);
//Same as customer/items

app.get("/api/vendor/purchases", VendorController.viewPurchases);
//Displays data about each purchase made

app.get("/api/vendor/data", VendorController.viewMachineData);
//Displays the amount of money in the machine and the number of successful and unsuccessful purchases
//Will display all machinedata instances, there should only be one

app.post("/api/machinedata/create", MachineController.create);
//Example body: {"currentMoney": int, "successfulPurchases": int, "unsuccessfulPurchases": int
//Used for initial data creation

app.post("/api/machinedata/delete", MachineController.delete);
//Example body: {"id": 2}
//Used if multiple machinedatas are created
//machinedata update functions target id:1, deleting it will cause conflicts

app.listen(3000);
