const express = require('express');
const graphql = require('./src/configuration/graphql/graphql');

const app = express();
const port = process.env.PORT || 4000;

app.use('/graphql', graphql);

app.listen(port);
