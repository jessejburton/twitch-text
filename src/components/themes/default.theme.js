import { faInfoCircle, faExclamationCircle, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export const defaultTheme = {
  colors: {
    primary: "#9147FF",
    primaryDark: "#6d35b8;",
    background: "#1F1F23",
    backgroundHeader: "#18181B",
    font: "#DEDEE3",
    fontHeader: "#9147FF",
    focus: "#90CDF4"
  },
  sizes: {
    maxContentWidth: "1200px",
  },
  buttons: {
    textColor: "#FFFFFF",
    textColorDark: "#1A202C",
    borderRadius: "5px",
    isRound: false
  },
  message: {
    base: {
      borderRadius: "5px",
      isRound: false,
      isToast: true
    },
    default: {
      color: "#2A4365",
      backgroundColor: "#BEE3F8",
      borderColor: "#90CDF4",
      icon: faInfoCircle
    },
    success: {
      color: "#22543D",
      backgroundColor: "#C6F6D5",
      borderColor: "#9AE6B4",
      icon: faCheckCircle
    },
    warning: {
      color: "#7B341E",
      backgroundColor: "#FEEBC8",
      borderColor: "#FBD38D",
      icon: faExclamationTriangle
    },
    error: {
      color: "#742A2A",
      backgroundColor: "#FED7D7",
      borderColor: "#FEB2B2",
      icon: faExclamationCircle
    },
  },
}