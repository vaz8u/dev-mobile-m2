import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GRAPHQL_URI } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
});

let retest: React.Dispatch<React.SetStateAction<boolean>> = () => {};
export const PageContext= React.createContext(retest);

export const authLink = setContext(async (_, { headers }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
  
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    } catch (error: any) {
      return { headers };
    }
  });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
  
export default client;
