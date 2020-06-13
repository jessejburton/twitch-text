import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Layout } from './components/layout'
import { Home } from './components/pages'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Layout>
    </Router>

  );
}

export default App;
