import { createMuiTheme } from '@material-ui/core/styles';
import { overrides } from './overrides.theme'
import { palette } from './palette.theme'
import { typography } from './typography.theme'

export const mainTheme = createMuiTheme({
  overrides,
  palette,
  typography
});
