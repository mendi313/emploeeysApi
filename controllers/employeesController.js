const Employee = require('../data/Employee');

const getAllEmployees = async (req, res) => {
  const emploeeys = await Employee.find();
  if (!emploeeys || emploeeys.length == 0) {
    return res.status(204).json({ message: 'no emploeeys found!' });
  } else res.json(emploeeys);
};

const addEmployees = async (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName)
    res.status(401).json({ message: 'fields reqaierds' });

  const result = await Employee.create({
    firstName: firstName,
    lastName: lastName,
  });
  console.log(result);
  res.status(201).json(result);
};

const deleteEmploeey = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'id params required!' });
  }
  const emploeey = await Employee.findOne({ _id: req.body.id }).exec();
  if (!emploeey) return res.status(201).json({ message: 'emploeey not found' });
  const result = await emploeey.deleteOne({ _id: req.body.id });
  console.log(result);
  res.status(201).json(result);
};

const updateEmploeey = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'id params required!' });
  }

  const emploeey = await Employee.findOne({ _id: !req?.body?.id }).exec();
  if (!emploeey) return res.status(204).json({ message: 'emploeey not found' });

  emploeey.firstName = req.body.firstName
    ? req.body.firstName
    : emploeey.firstName;
  emploeey.lastName = req.body.lastName ? req.body.lastName : emploeey.lastName;
  const result = await emploeey.save();
  res.status(201).json(result);
};

const getEmployee = async(req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: 'id params required!' });
  }
  
  const emploeey = await Employee.findOne({ _id: req.params.id }).exec();
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
