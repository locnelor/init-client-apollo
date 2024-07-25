import { ApolloError, DocumentNode, OperationVariables, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers"

import {
    registerApolloClient,
    ApolloClient,
    InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(() => {
    const token = cookies().get("token")?.value
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`
            },
        };
    });
    const httpLink = createHttpLink({
        uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`
    })
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink),
    });
});
export const getQuery = async <T>(
    query: DocumentNode,
    variables?: OperationVariables
) => {
    const result = await getClient()
        .query<T>({ query, variables })
        .catch((error: ApolloError) => {
            return { data: undefined, error }
        })
    return result
}