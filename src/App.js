import React from "react";
import { Dashboard } from "./dashboard/Dashboard";
import styled from "styled-components";

const Page = styled.main({
  backgroundColor: "#303331",
  height: "100vh"
});

const App = () => (
  <Page className="App">
    <div>
      <h1>Device Manager</h1>
    </div>
    <Dashboard />
  </Page>
);

export default App;
