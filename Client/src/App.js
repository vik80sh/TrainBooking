import React from 'react';
import Layout from './layout';
import { BrowserRouter as Router} from "react-router-dom";


function App() {
  return (
    <div className="container-fluid">
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
