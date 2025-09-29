const { gql } = require('apollo-server');

module.exports = gql`
  directive @auth(requires: String) on FIELD_DEFINITION

  type User {
    id: ID!
    username: String!
    email: String!
    roles: [Role!]!
  }

  type Role {
    id: ID!
    name: String!
    permissions: [String!]!
  }

  type Ticket {
    id: ID!
    title: String!
    description: String!
    owner: User!
  }

  type Query {
    me: User! @auth(requires: "USER")
    getUsers: [User!]! @auth(requires: "ADMIN")
    getTickets: [Ticket!]!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): String
    login(username: String!, password: String!): String
    createTicket(title: String!, description: String!): Ticket!
    assignRole(userId: ID!, roleName: String!): User! @auth(requires: "ADMIN")
  }
`;
