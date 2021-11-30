import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_URL } from "../utils/api";

const client = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache()
});


export default client;