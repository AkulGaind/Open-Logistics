import { createTheme } from '@mui/material/styles';
import components from './components';
import typography from './typography';
import palette from './palette';

// Define your custom theme using the createTheme function
const theme = createTheme({
	palette: palette,
	typography: typography,
	components: components,
});
export default theme;
