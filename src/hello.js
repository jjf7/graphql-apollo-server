import { gql } from "apollo-server";

export const typeDefs = gql`
  extend type Query {
    welcome: String
  }
`;

export const resolvers = {
  Query: {
    welcome: () => {
      return "Bienvenidos a la GraphQL Api creado por JFdeSousa"
    },
  },
};
