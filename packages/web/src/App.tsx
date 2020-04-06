import React, { useState } from 'react';
import { Box, Grid, Grommet, Heading } from 'grommet';
import { Navigation } from './components/Navigation';
import { Sidebar } from './components/Sidebar';
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { HomePage } from './pages/Home';
import { Theme } from './utils/Theme';
import { CustomerPage } from './pages/CustomerPage';
import { InvoiceCreate } from './components/invoice/InvoiceCreate';

export const DarkTheme = React.createContext<[boolean, (boolean: boolean) => void]>([false, (arg: boolean) => { }])

function App() {
  const [darkTheme, setDarkTheme] = useState(true);


  const GridBox: React.FC<{ gridArea: string }> = ({ children, gridArea }) => (
    <Box gridArea={gridArea} border="all" background="background-front">
      {children}
    </Box>
  )

  return (
    <BrowserRouter>
      <DarkTheme.Provider value={[darkTheme, setDarkTheme]}>

        <Grommet theme={Theme} themeMode={darkTheme ? "dark" : "light"} full>
          <Box background="background-back" fill >
            <Grid
              rows={["xsmall", "flex", "xsmall"]}
              columns={["small", "flex"]}
              gap="small"
              areas={[
                { name: "header", start: [0, 0], end: [1, 0] },
                { name: "nav", start: [0, 1], end: [0, 1] },
                { name: "main", start: [1, 1], end: [1, 1] },
                { name: "footer", start: [0, 2], end: [1, 2] }
              ]}
              fill="vertical"
            >
              <GridBox gridArea="header">
                <Navigation></Navigation>
              </GridBox>

              <GridBox gridArea="nav">
                <Sidebar></Sidebar>
              </GridBox>

              <GridBox gridArea="main">

                <Box pad="small"> {/* Need som custom margin, dunno why yet. */}
                  <Switch>
                    <Route exact path="/">
                      <HomePage></HomePage>
                    </Route>
                    <Route exact path="/customers">
                      <CustomerPage></CustomerPage>
                    </Route>
                    <Route exact path="/invoice">
                      <InvoiceCreate></InvoiceCreate>
                    </Route>
                  </Switch>
                </Box>

              </GridBox>

              <GridBox gridArea="footer">
                <Heading level={3}>Footer</Heading>
              </GridBox>

            </Grid>
          </Box>
        </Grommet>
      </DarkTheme.Provider>
    </BrowserRouter>
  );
}

export default App;
