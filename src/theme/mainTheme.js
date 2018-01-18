import { createMuiTheme } from 'material-ui/styles';
import breakpoints from './breakpoints';

export default createMuiTheme({
  "direction": "ltr",
  "palette": {
    "common": {
      "black": "#000",
      "white": "#fff",
      "transparent": "rgba(0, 0, 0, 0)",
      "lightWhite": "rgba(250,250,250,0.7)",
      "darkGrey": "rgba(0, 0, 0, 0.4)",
    },
    "contrast": "#fff",
    "primary": {
      "50": "#189AB4",
      "100": "#189AB4",
      "200": "#189AB4",
      "300": "#189AB4",
      "400": "#189AB4",
      "500": "#189AB4", //main
      "600": "#189AB4",
      "700": "#6a88c0",
      "800": "#6a88c0",
      "900": "#6a88c0",
      "A100": "#189AB4",
      "A200": "#6a88c0",
      "A400": "#6a88c0",
      "A700": "#189AB4",
      "contrastDefaultColor": "light"
    },
    "secondary": {
      "50": "#FF632B",
      "100": "#FF632B",
      "200": "#FF632B",
      "300": "#FF632B",
      "400": "#FF632B",
      "500": "#FF632B",
      "600": "#FF632B",
      "700": "#FF632B",
      "800": "#FF632B",
      "900": "#FF632B",
      "A100": "#FF632B",
      "A200": "#FF632B",
      "A400": "#FF632B",
      "A700": "#FF632B",
      "contrastDefaultColor": "light"
    },
    "error": {
      "50": "#ffebee",
      "100": "#ffcdd2",
      "200": "#ef9a9a",
      "300": "#e57373",
      "400": "#ef5350",
      "500": "#f44336",
      "600": "#e53935",
      "700": "#d32f2f",
      "800": "#c62828",
      "900": "#b71c1c",
      "A100": "#ff8a80",
      "A200": "#ff5252",
      "A400": "#ff1744",
      "A700": "#d50000",
      "contrastDefaultColor": "light"
    },
    "grey": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      "A100": "#d5d5d5",
      "A200": "#aaaaaa",
      "A400": "#303030",
      "A700": "#616161",
      "contrastDefaultColor": "dark"
    },
  },
  "typography": {
    "display4": { // step label, don't change!
      "fontSize": 40,
      "fontWeight": 600,
      "fontFamily": "\"Open Sans\", sans-serif",
      "marginBottom": "30px",
      "lineHeight": 1
    },
    "display3": { // card detail headline, don't change!
      "fontSize": 40,
      "fontWeight": 600,
      "fontFamily": "\"Lato\", sans-serif",
    },
    "display2": {// price's style, don't change!
      "fontSize": '1.8rem',
      "fontWeight": 400,
      "fontFamily": "\"Lato\", sans-serif",
      "textDecoration": "line-through"
    },
    "display1": { // price's style, don't change!
      "fontSize": '1.8rem',
      "fontWeight": 600,
      "fontFamily": "\"Lato\", sans-serif",
      "color": "#189AB4"
    },
    "headline": {
      "fontSize": 40,
      "fontWeight": 800,
      "fontFamily": "\"Open Sans\", sans-serif",
      "textTransform": "uppercase",
      "marginBottom": "30px",
      "lineHeight": 1
    },
    "title": {
      "fontSize": "1.3rem",
      "lineHeight": 1.4 ,
      "fontWeight": 600,
      "fontFamily": "\"Open Sans\", sans-serif",
      "marginBottom": "5px",
      "color": 'rgba(0,0,0,0.8)'
    },
    "subheading": {
      "fontSize": '0.9rem',
      "fontWeight": 600,
      "fontFamily": "\"Open Sans\", sans-serif",
      "color": "rgba(0, 0, 0, 0.87)"
    },
    "body2": { // tour stats, don't change
      "fontSize": '0.8rem',
      "fontWeight": 400,
      "fontFamily": "\"Lato\", sans-serif",
      "color": "white"
    },
    "body1": {
      "fontSize": '0.9rem',
      "fontWeight": 400,
      "fontFamily": "\"Open Sans\", sans-serif",
      "color": "rgba(0, 0, 0, 0.87)"
    },
    // "caption": {
    // },
  //   "button": {
  //   }
  },
  "breakpoints": {
    "keys": Object.keys(breakpoints),
    "values": breakpoints,
  },
  "spacing": {
    "unit": 8
  },
  "shadows": [
    "none",
    "0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
    "0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    "0px 1px 8px 0px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 3px 3px -2px rgba(0, 0, 0, 0.12)",
    "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    "0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0, 0, 0, 0.12)",
    "0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
    "0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0, 0, 0, 0.12)",
    "0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)",
    "0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0, 0, 0, 0.12)",
    "0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0, 0, 0, 0.12)",
    "0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0, 0, 0, 0.12)",
    "0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0, 0, 0, 0.12)",
    "0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0, 0, 0, 0.12)",
    "0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)"
  ],
  "transitions": {
    "easing": {
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    "duration": {
      "shortest": 150,
      "shorter": 200,
      "short": 250,
      "standard": 300,
      "complex": 375,
      "enteringScreen": 225,
      "leavingScreen": 195
    }
  },
  custom: {
    tag: {
      display: 'inline-block',
      opacity: 0.9,
      textTransform: 'uppercase',
      backgroundColor: "#FF632B",
      padding: "0 8px",
    }
  },
  overrides: {
    MuiTypography: {
      headline: {
        [`@media (max-width: ${breakpoints['sm']}px)`]:{
          "fontSize": "1.5rem"
        } 
      },
      title: {
        [`@media (max-width: ${breakpoints['sm']}px)`]:{
          "fontSize": "1.2rem"
        } 
      },
      body1: {
        [`@media (max-width: ${breakpoints['sm']}px)`]:{
          "fontSize": "0.8rem",
          "lineHeight": 1.5,
        } 
      },
      subheading: {
        [`@media (max-width: ${breakpoints['sm']}px)`]:{
          "fontSize": "0.8rem"
        } 
      },
      display4: {
        [`@media (max-width: ${breakpoints['sm']}px)`]:{
          "fontSize": 25,
          marginBottom: 10
        } 
      },
      display3: {
        [`@media (max-width: ${breakpoints['sm']}px)`]:{
          "fontSize": 30
        }
      }
    },
    MuiInput: {
      underline: {
        '&:before': {
        height: "0.8px"
        }
      }
    },
    MuiTab: {
      root: {
        textTransform: 'capitalize'
      },
      rootPrimarySelected: {
        "color": "rgba(0, 0, 0, 0.87)"
      },
      label: {
        "fontSize": "0.9rem",
        "lineHeight": 1.4 ,
        "fontWeight": 400,
        "fontFamily": "\"Lato\", sans-serif",
        [`@media (min-width: ${breakpoints['sm']}px)`]:{
          "fontSize": "1.3rem",
        }
      }
    },
    MuiTabIndicator: {
      root: {
        height: 4
      }
    },
    MuiMobileStepper: {
      root: {
        backgroundColor: "rgba(0,0,0,0.2)",
        padding: 0,
        height: '30px'
      },
      dot: {
        backgroundColor: "rgba(250,250,250,0.56)",
        borderColor: "#189AB4"
      }
    },
    MuiIconButton: {
      root: {
        height: 27,
        width: 27
      },
      disabled: {
        color: "rgba(250,250,250,0.56)"
      }
    },
    StepLabel: {
      root: {
        '& div + div': {
          display: 'none'
        },
      },
    },
    MuiCollapse: {
      wrapper: {
        minHeight: 150
      },
      wrapperInner: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }
    },
    MuiListItemText: {
      root: {
        '&>h3': {
          "fontSize": '0.9rem',
          "fontWeight": 400,
          "fontFamily": "\"Open Sans\", sans-serif",
          "color": "rgba(0, 0, 0, 0.87)"  
        }
        
      }
    },
    MuiCardActions: {
      root: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
      }
    },
    MuiDialogContent: {
      root: {
        padding: '0 !important'
      }
    },
    MuiFormHelperText: {
      root: {
        color: "#189AB4"
      }
    },
    MuiButton: {
      root: {
        color: "#189AB4"
      },
    },
    MuiModal: {
      root: {
        zIndex: 1502
      }
    },
    MuiSwitch: {
      default: {
        transform: 'translateX(8px)'
      },
      checked: {
        transform: 'translateX(100%)'
      }
    },
  }
});