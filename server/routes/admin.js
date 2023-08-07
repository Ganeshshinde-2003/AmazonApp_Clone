const express = require('express');
const adminRouter = express.Router();
const admin = require("../middelwares/admin");

adminRouter.post('/admin/add-product', admin, )