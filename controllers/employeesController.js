const fsPromises = require('fs').promises;
const path = require('path');

const employeesDB = {
  employees: require('../data/employees.json'),
  setEmploeeys: async function (data) {
    data.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    this.employees = data;
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'data', 'employees.json'),
      JSON.stringify(this.employees)
    );
  },
};

const getAllEmployees = (req, res) => {
  res.json(employeesDB.employees);
};

const addEmployees = (req, res) => {
  const newEmploeey = {
    id: employeesDB.employees[employeesDB.employees.length - 1].id + 1 || 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  if (!req.body.firstName || !req.body.lastName)
    res.status(401).json({ message: 'fields reqaierds' });

    employeesDB.setEmploeeys([...employeesDB.employees, newEmploeey]);
  res.status(201).json(employeesDB.employees);
};
const deleteEmploeey = (req, res) => {
  const emploeey = employeesDB.employees.find((emp) => emp.id ===parseInt( req.params.id));
  if (!emploeey) res.status(401).json({ message: 'emploeey not found' });
  else {
    employeesDB.employees = employeesDB.employees.filter((emp) => emp.id !== emploeey.id);

    employeesDB.setEmploeeys([...employeesDB.employees]);
    res.status(201).json(employeesDB.employees);
  }
};

const updateEmploeey = (req, res) => {
  let emploeey = employeesDB.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  employeesDB.employees = employeesDB.employees.filter(
    (emp) => emp.id !== parseInt(req.params.id)
  );
  if (!emploeey) res.status(401).json({ message: 'emploeey not found' });
  else {
    emploeey.firstName = req.body.firstName
      ? req.body.firstName
      : emploeey.firstName;
    emploeey.lastName = req.body.lastName
      ? req.body.lastName
      : emploeey.lastName;
    employeesDB.setEmploeeys([...employeesDB.employees, emploeey]);
    res.status(201).json(employeesDB.employees);
  }
};

const getEmployee = (req, res) => {
  const emploeey = employeesDB.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!emploeey) res.status(401).json({ message: 'emploeey not found' });
  else res.json(emploeey);
};

module.exports = {
  getAllEmployees,
  addEmployees,
  getEmployee,
  updateEmploeey,
  deleteEmploeey,
};
