const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const darkModeStyle = {
  text: '#fff',
  background: '#000',
  tint: tintColorDark,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColorDark,
}

const lightModeStyle = {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
}

export default {
  colorPrimary: tintColorLight,
  colorDangerLight: '#FF8C00',
  colorDanger: '#DC143C',
  colorSuccess: '#3CB371',

  bgDarkSecondary: "#1C1C1C",
  
  light: darkModeStyle,
  dark: darkModeStyle,
};
