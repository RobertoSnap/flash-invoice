// import { ThemeType } from "grommet";
import { deepFreeze } from "grommet/utils";

export const Theme = deepFreeze({
  rounding: 4,
  spacing: 24,
  defaultMode: "dark",
  global: {
    font: {
      family: "Sen"
    },
    colors: {
      background: {
        dark: "#171717",
        light: "#fff"
      },
      "background-back": "background",
      "background-front": {
        dark: "#2b2b2b",
        light: "#fafafa"
      },
      "background-contrast": {
        dark: "#FFFFFF08",
        light: "#11111108"
      },
      pink: {
        light: "#424874",
        dark: "#cce6f0"
      },
      green: {
        light: "#1eb2a6",
        dark: "#9dfbca"
      },
      yellow: {
        light: "#ffa34d",
        dark: "##f8efa0"
      },
      orange: {
        light: "#f2783a",
        dark: "#fabd9e"
      },
      black: {
        light: "#2c2c2c",
        dark: "#dbdbdb"
      },
      white: {
        light: "#fdfcfc",
        dark: "#525252"
      },
      blue: {
        light: "#4a8ce3",
        dark: "#c1c7f4"
      },
      grey: {
        light: "#737373",
        dark: "#d1d1d1"
      },

      brand: "orange",
      "status-ok": "green",
      "status-warning": "yellow",
      "status-error": "red",
      "status-critical": "red",
      "status-disabled": "grey",
      "status-unknown": "blue",
      focus: "brand",
      text: "brand",
      control: "brand",
      active: "brand",
      selected: "brand",
      icon: "brand"
    },
    active: {
      color: "#fff"
    }
  },
  button: {
    primary: {
      color: "brand"
    }
  }
});
