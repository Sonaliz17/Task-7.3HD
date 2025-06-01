const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/yourdb')
  .then(() => {
    app.listen(3000, () => console.log('Server started'));
  })
  .catch(err => console.error(err));
