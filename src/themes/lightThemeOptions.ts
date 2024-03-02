import { PaletteColorOptions, ThemeOptions } from '@mui/material/styles';

type NaoMentemThemeOptions = ThemeOptions & {
  basketFood?: PaletteColorOptions;
}

const lightThemeOptions: NaoMentemThemeOptions = {
  palette: {
    mode: 'light',
  },
};

export default lightThemeOptions;