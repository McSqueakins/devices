import React from "react";
import { Dashboard } from "./dashboard/Dashboard";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

const Page = styled.main({
  height: "100vh"
});

const PageHeader = styled(Typography)({
  "&&": { marginLeft: "16px" }
});

const App = () => (
  <Page className="App">
    <AppBar position="static">
      <PageHeader variant="h6" component="h1">
        Device Manager
      </PageHeader>
    </AppBar>
    <Dashboard />
  </Page>
);

export default App;
