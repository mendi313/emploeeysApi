const fsPromises = require('fs').promises;
const path = require('path');

const data = {
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
  res.json(data.employees);
};

const addEmployees = (req, res) => {
  const newEmploeey = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  if (!req.body.firstName || !req.body.lastName)
    res.status(401).json({ message: 'fields reqaierds' });

  data.setEmploeeys([...data.employees, newEmploeey]);
  res.status(201).json(data.employees);
};
const deleteEmploeey = (req, res) => {
  const emploeey = data.employees.find((emp) => emp.id ===parseInt( req.params.id));
  if (!emploeey) res.status(401).json({ message: 'emploeey not found' });
  else {
    data.employees = data.employees.filter((emp) => emp.id !== emploeey.id);

    data.setEmploeeys([...data.employees]);
    res.status(201).json(data.employees);
  }
};

const updateEmploeey = (req, res) => {
  let emploeey = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  data.employees = data.employees.filter(
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
    data.setEmploeeys([...data.employees, emploeey]);
    res.status(201).json(data.employees);
  }
};

const getEmployee = (req, res) => {
  const emploeey = data.employees.find(
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
