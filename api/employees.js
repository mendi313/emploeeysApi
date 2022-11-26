const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

router
  .route('/')
  .get(employeesController.getAllEmployees)
  .post(employeesController.addEmployees);

router
  .route('/:id')
  .get(employeesController.getEmployee)
  .put(employeesController.updateEmploeey)
  .delete(employeesController.deleteEmploeey)

module.exports = router;
