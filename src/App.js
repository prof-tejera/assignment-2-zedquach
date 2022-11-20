import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import AddTimer from "./views/AddTimer";
import Home from "./views/Home";

const Container = styled.div`
  background: #060126;
  height: 100vh;
  width: 100vw;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Add</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Container>
      <Router basename="/assignment-2-zedquach">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add" element={<AddTimer />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
