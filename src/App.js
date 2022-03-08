import HomePage from './pages/HomePage';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  typography: {
    fontFamily: ' sans-serif',
  },
  palette: {
    primary: {
      main: '#488FB1',
    },
    background: {
      default: '#C3DBD9',
    },
  },
});

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HomePage />
      </ThemeProvider>
    </div>
  );
}
export default App;
