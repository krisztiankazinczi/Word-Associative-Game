const mainBackgroundColor = "rgb(23,34,44)";

const css = {
  palette: {
    primary: {
      light: "#dd33fa",
      main: "#d500f9",
      dark: "#9500ae",
      contrastText: "#fff",
    },
    secondary: {
      light: "#70d9e7",
      main: "#4dd0e1",
      dark: "#35919d",
      contrastText: "#fff",
    },
    common: {
      light: "#ff785b",
      main: "#ff5733",
      dark: "#b23c23",
      contrastText: "#fff",
    },
  },
  otherStyles: {
    mainBackgroundColor: {
      backgroundColor: "rgb(23,34,44)",
    },
    secondaryBackgroundColor: {
      backgroundColor: '#30445C',
    },
    secondaryBackgroundColorHovered: {
      backgroundColor: '#3c5573',
    },
    mainTextColor: {
      color: '#9BA8B5',
    },
    selectedColor: {
      backgroundColor: "#E78230",
    },
    orangeColor: {
      color: "#ff5733"
    },
    correctAnswer: {
      backgroundColor: '#8FE6C5',
    },
    correctOption: {
      backgroundColor: '#36f443',
      color: 'white'
    },
    incorrectAnswer: {
      backgroundColor: '#F08080',
    },
    incorrectOption: {
      backgroundColor: '#ff3d00',
      color: 'white'
    },
    button: {
      backgroundColor: '#30445C',
      color: "#ff5733",
      cursor: "pointer",
      '&:hover': {
        background: "#3c5573",
        transition: "100ms transform ease-in",
        transform: "scale(1.08)"
     }
    },
    halfWidth: {
      width: '50%'
    },
    spinner: {
      display: "flex",
      backgroundColor: mainBackgroundColor,
      alignItems: "center",
      justifyContent: "center",
      height: '100vh'
    }
  }
};

export default css;