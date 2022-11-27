const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

router
  .route('/')
  .get(employeesController.getAllEmployees)
  .post(employeesController.addEmployees)
  .delete(employeesController.deleteEmploeey)
  .put(employeesController.updateEmploeey);

router
  .route('/:id')
  .get(employeesController.getEmployee);

module.exports = router;
