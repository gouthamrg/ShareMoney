import React, { useEffect, useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import SignUp from './RouteComponents/SignUp';
import NavigationDrawer from './components/NavigationDrawer';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#006F99"
    },
    secondary: {
      main: "#51BC32"
    },
  },
});

function App() {
  const [state] = useState({
    user1: { name: 'Goutham RG' }
  });

  useEffect(() => {

  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* {state.user ? */}
        <NavigationDrawer />
        {/* : <SignUp />} */}
      </div>
    </ThemeProvider>
  );
}

export default App;
