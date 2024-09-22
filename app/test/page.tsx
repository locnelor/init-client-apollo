import { getQuery } from "@/libs/apollo/ApolloClient";
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

const TestPage = async () => {
  const [res, err] = await getQuery({
    query: QUERY,
    variables: {
      skip: 123,
      take: 456,
    },
  });
  return (
    <div>
      <Link href="/auth">to auth</Link>
      <div>{!!err ? "error" : "none"}</div>
      <div>{JSON.stringify(res?.data)}</div>
    </div>
  );
};
export default TestPage;
