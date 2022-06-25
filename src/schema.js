import { gql } from "apollo-server";
import { typeDefs as HelloDefs, resolvers as HelloResolvers } from "./hello.js";
import { typeDefs as CoinDefs, resolvers as CoinResolvers } from "./coin.js";

const rootTypeDefs = gql`
  type Query {
    _: String
  }
  
`;

export const typeDefs = [rootTypeDefs, HelloDefs, CoinDefs];
export const resolvers = [HelloResolvers, CoinResolvers];
