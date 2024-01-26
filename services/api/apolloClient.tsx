import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GRAPHQL_URI, ADMIN_USERNAME, ADMIN_PASSWORD } from '@env';

const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
});

const authLink = setContext(async (_, { headers }) => {
    try {
      const token = await fetchTokenDynamically(ADMIN_USERNAME, ADMIN_PASSWORD);
  
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

const fetchTokenDynamically = async (username:string, password:string) => {
    const response = await fetch(GRAPHQL_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation {
            login(loginAccountInput: {
              username: "${username}"
              password: "${password}"
            }) {
              access_token
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }

    const data = await response.json();
    const token:string = data.data.login.access_token;

    if (!token) {
      throw new Error('Token not found in the response');
    }
  
    return token.toString();
  };
  
export default client;
