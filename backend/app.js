const express = require('express');

const app = express();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const config = require('dotenv');

config.config();
const { sendResponse } = require('./utils/util');

app.use(express.json());
app.set('port', process.env.PORT || 8080);
app.use(cors());
app.use(morgan('dev'));

const { apiRouter } = require('./routes/apiRoute');
const { authMiddleware } = require('./middleware/authmiddleware');

// test for git
app.use(express.static(path.join(__dirname, '../frontend/build/')));
app.use('/api', authMiddleware, apiRouter);

app.use('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/build/index.html'));
});

app.use((err, _req, res, _next) => {
  console.log(err);

  return sendResponse(res, {}, 500);
});

app.listen(app.get('port'), () => {
  console.log(`listening on port ${app.get('port')}!`);
});
