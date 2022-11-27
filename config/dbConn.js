const mongoose = require('mongoose');
const DATABASE_URI= 'mongodb+srv://mendi:313mendi@cluster0.wjzlrke.mongodb.net/employeesDB?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI, {
      useunifiedtopology: true,
      usenewurlparser: true,
    });
  } catch (err) {
    console.error(err);
  }
};
module.exports = connectDB
