import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/channels" replace />} />
            <Route path="/channels" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
