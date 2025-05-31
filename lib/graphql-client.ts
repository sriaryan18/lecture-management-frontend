import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getBaseURL } from "./axiosClient";

const httpLink = new HttpLink({
  uri: `${getBaseURL()}/graphql`,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const newHeaders = {
    headers: {  
      ...headers,

      "Content-Type": "application/json",
    },
  };

  return newHeaders;
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
