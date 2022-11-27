const bcrypt = require('bcrypt');
const User = require('../data/User');

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'UserName and password arr required.' });

  const duplicate = await User.findOne({ userName: user }).exec();

  if (duplicate) return res.sendStatus(409);

  try {
    const result = await User.create({
      userName: user,
      password: await bcrypt.hash(pwd, 10),
    });
    console.log(result);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
