import { ApolloServer } from "apollo-server-micro";
import { schema } from "../modules/graphql/schema";
import { prisma } from "./prisma";

const server = new ApolloServer({
  schema: schema,
  context: ({ req }) => ({ req, prisma }),
  introspection: true,
});

export { server };
