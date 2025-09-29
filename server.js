const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./src/graphql/schema');
const resolvers = require('./src/graphql/resolvers');
const { authMiddleware } = require('./src/utils/auth');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { authDirectiveTransformer, authDirectiveTypeDefs } = require('./src/graphql/directives');

// Build schema with custom directives
let schema = makeExecutableSchema({
  typeDefs: [authDirectiveTypeDefs, typeDefs],
  resolvers,
});
schema = authDirectiveTransformer(schema);

const server = new ApolloServer({
  schema,
  context: ({ req }) => authMiddleware(req),
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    return server.listen({ port: process.env.PORT });
  })
  .then((res) => {
    console.log(`🚀 Server running at ${res.url}`);
  })
  .catch((err) => console.error(err));
