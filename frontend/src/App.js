import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Homepage} exact />
        <Route path="/chat" component={ChatPage} />
      </div>
    </Router>
  );
}

export default App;
