import { ApolloServer, PubSub } from "apollo-server";
import { typeDefs, resolvers } from "./schema.js";
import axios from "axios";

export let CoinO = {
  info: "",
  BTC_Bs: "",
};

const NEW_VALUE = "NEW_VALUE";

export const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url, subscriptionsUrl }) => {
  console.log(`Server running on ${url}`);
  console.log(`WS at ${subscriptionsUrl}`);
});

setInterval(async () => {
  try {
    const { data } = await axios.get(
      "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
    );

    if (data.price > CoinO.BTC_Bs) {
      CoinO = { ...CoinO, BTC_Bs: data.price, info: "Up" };
      pubsub.publish(NEW_VALUE, { newValue: CoinO });
    } else if(data.price < CoinO.BTC_Bs) {
      CoinO = { ...CoinO, BTC_Bs: data.price, info: "Down" };
      pubsub.publish(NEW_VALUE, { newValue: CoinO });
    }

    console.log("consulting api...");
  } catch (e) {
    console.log(e.message);
  }
}, 2000);
