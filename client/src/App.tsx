import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import TabsPage from "./components/TabsPage";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <div className="container mx-auto">
        <TabsPage />
      </div>
    </ApolloProvider>
  );
}

export default App;
