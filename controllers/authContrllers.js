const bcrypt = require('bcrypt');

const usersDB = {
  users: require('../data/users.json'),
};

const handleLogIn = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    res.status(400).json({ message: 'UserName and password arr required.' });

  const exsistUser = usersDB.users.find(
    (userItem) => userItem.userName === user
  );

  if (!exsistUser) res.status(401).json({ message: 'userName not exsist' });
  const logIn = await bcrypt.compare(pwd, exsistUser.password);
  if (logIn) res.status(201).json({ message: `User ${user} is logeed in!` });
  else res.status(409).json({ message: 'password not cuurect' });
};

module.exports = { handleLogIn };
