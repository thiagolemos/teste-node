const express = require('express');
require('dotenv').config();

const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const moment = require('moment');

app.use(helmet());
morgan.token('date', (req, res, tz) => {
  return moment()
    .tz(process.env.NOME_TIMEZONE)
    .format();
});

morgan.format(
  'myformat',
  '[:date[iso]] :method | URL: :url | Status: :status | TamanhoRes: :res[content-length] | TamanhoReq: :req[content-length] | Tempo: :response-time ms',
);
app.use(morgan('myformat'));

/*
 * Configura o body parser
 */
const bodyParser = require('body-parser');

app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '300kb',
  }),
);
app.use(
  bodyParser.json({
    limit: '300kb',
  }),
);

/*
 * Configura o Swagger
 */
const swagger = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocs));

/*
 * Configura as rotas da aplicação
 */
const v1ProprietarioRoute = require('./api/v1/routes/ProprietarioRoute');
app.use('/api/v1/proprietario/', v1ProprietarioRoute.default);

// Rota para Health check do serviço
app.use('/api/v1/check', async (req, res) => {
  res.writeHead(200, {'Content-Type': 'none'});
  return res.json();
});

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.redirect(`http://${req.headers.host}/api-docs`);
});


if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(port, () => {
    console.log(`Express server listening on port ${server.address().port}`);
  });

  module.exports = server;
} else {
  module.exports = app;
}
