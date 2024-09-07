import { query } from "@/libs/apollo/ApolloClient";
import { gql } from "@apollo/client";
import Link from "next/link";

const QUERY = gql`
  query test($skip: Int!, $take: Int!) {
    testGetUserList(skip: $skip, take: $take) {
      skip
      take
      total
      data {
        id
        name
      }
    }
  }
`;
export default async function Home() {
  const q = await query({ query: QUERY, variables: { skip: 0, take: 1 } });
  return (
    <div>
      <Link href="/auth">to auth</Link>
      <div>{JSON.stringify(q.data)}</div>
    </div>
  );
}
