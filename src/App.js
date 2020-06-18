import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import { Home } from './components/pages'
import { Text } from './components/pages'
import { defaultTheme } from './components/themes'

const GRAPHCMS_API = 'https://api-euwest.graphcms.com/v1/ck1z5mgr22jxj01a0cifs57yw/master'

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/text/:id" component={Text} />
          </Switch>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
