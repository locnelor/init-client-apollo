import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { cookies } from "next/headers";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const AuthLink = setContext((_, { headers }) => {
    const token = cookies().get("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token.value}` : "",
      },
    };
  })
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: AuthLink.concat(new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URI
    }))
  });
});