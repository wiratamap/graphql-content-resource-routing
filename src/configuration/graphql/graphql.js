const expressGraphql = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('./types');

const resolvers = require('../graphql/resolver/index');

const schema = makeExecutableSchema({
  typeDefs,
  root: resolvers,
});


module.exports = expressGraphql({
  schema,
  rootValue: resolvers,
  customFormatErrorFn: error => ({ message: error.message }),
});
