const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./src/app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    socketTimeoutMS: 45000,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
