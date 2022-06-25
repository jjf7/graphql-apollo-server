import { gql } from "apollo-server";
import { pubsub, CoinO } from "./server.js";

const NEW_VALUE = "NEW_VALUE";

export const typeDefs = gql`
  type Coin {
    info: String
    BTC_Bs: String
  }

  extend type Query {
    prices: Coin!
  }

  type Subscription {
    newValue: Coin!
  }
`;

export const resolvers = {
  Query: {
    prices: () => CoinO,
  },
  Subscription: {
    newValue: {
      subscribe: () => pubsub.asyncIterator(NEW_VALUE),
    },
  },
};
