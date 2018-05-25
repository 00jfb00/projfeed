const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  container:{
    width: deviceWidth * 0.7
  },
  header: {
    top: -1,
    backgroundColor: '#fff',
    height: deviceHeight / 3.5,
    shadowColor: '#000000',
    shadowRadius: 5,
    elevation: 5
  },
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: deviceWidth * 0.8,
    position: "absolute",
    top: 0,
    left: 0,
    // marginBottom: 10
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: "cover"
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  }
};
