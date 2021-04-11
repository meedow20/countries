import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
});