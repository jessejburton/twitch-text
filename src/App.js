import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import { Layout } from './components/layout'
import { Home } from './components/pages'
import { Text } from './components/pages'
import { defaultTheme } from './components/themes'

const GRAPHCMS_API = 'https://api-us-east-1.graphcms.com/v2/ckbiiw2xy0ihs01z17lxs59c4/master'

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache()
});

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/text" component={Text} />
          </Switch>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
