import {
  ApolloProvider as ApolloClientProvider,
} from '@apollo/client';
import apolloClient from './client';

interface ApolloProviderProps {
  children: React.ReactNode;
}

export const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {

  return (
    <ApolloClientProvider client={apolloClient}>{children}</ApolloClientProvider>
  );
};

export default ApolloProvider;