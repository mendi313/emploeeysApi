const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const usersDB = {
  users: require('../data/users.json'),
  setUsers: async function (data) {
    this.users = data;
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'data', 'users.json'),
      JSON.stringify(this.users)
    );
  },
};
const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    res.status(400).json({ message: 'UserName and password arr required.' });

  const exsistUser = usersDB.users.find(
    (userItem) => userItem.userName === user
  );

  if (exsistUser) res.status(409).json({ message: 'userName alredy exsist' });
  else {
    try {
      const newUser = {
        id: usersDB.users[usersDB.users.length - 1]?.id + 1 || 1,
        userName: user,
        password: await bcrypt.hash(pwd, 10),
      };
      usersDB.setUsers([...usersDB.users, newUser]);
      console.log(usersDB.users);
      res.status(201).json({ success: `New user ${user} created!` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = { handleNewUser };
