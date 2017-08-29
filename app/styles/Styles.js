import { StyleSheet } from "react-native";
import { Config } from "../common/config";

export default StyleSheet.create({
  //Menu
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  containerColumn: {
    flexDirection: "column",
    backgroundColor: "#000000",
    overflow: "hidden",
    marginRight: 5,
    alignItems: "center"
  },
  containerSlide: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  containerTimelines: {
    overflow: "hidden"
  },
  containerAuth: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  scrollArea: {
    marginBottom: 10
  },
  scrollContainer: {
    flex: 1
  },
  content: {
    alignItems: "flex-start",
    flex: 1
  },
  sectionHeader: {
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    paddingTop: 13.5,
    paddingBottom: 6.5,
    paddingLeft: 7
  },
  sectionTitle: {
    color: Config.SECTION_TITLE_COLOR,
    fontSize: Config.SECTION_TITLE_FONT_SIZE,
    fontFamily: "RobotoCondensed-Bold"
  },
  sectionTitleAudio: {
    color: Config.COLOR_WHITE,
    fontSize: Config.SECTION_TITLE_AUDIO_FONT_SIZE,
    fontFamily: "RobotoCondensed-Bold"
  },
  sectionTitleAudioWrapper: {
    alignItems: "center",
    marginBottom: 7,
    width: "100%",
    paddingRight: 15
  },
  sectionText: {
    color: Config.SECTION_TITLE_COLOR,
    fontFamily: "RobotoCondensed-Bold"
  },
  playlistHeaderText: {
    color: "#FFFFFF",
    fontFamily: "RobotoCondensed-Bold",
    fontSize: 20,
    flex: 1,
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: Config.BACKGROUND_HEADER_PLAYLIST
  },
  imageBorderRadius: {
    borderRadius: 10,
    overflow: "hidden"
  },
  itemContainer: {
    marginLeft: 7,
    overflow: "hidden"
  },
  titleContainer: {
    flexDirection: "column",
    flex: 1,
    marginTop: 4,
    flexWrap: "wrap"
  },
  itemPadding: {
    paddingRight: 7
  },
  itemMarginRight: {
    marginRight: 7
  },
  title: {
    color: Config.CONTENT_TITLE_COLOR,
    fontSize: Config.CONTENT_TITLE_FONT_SIZE,
    fontWeight: "bold",
    overflow: "hidden"
  },
  titleActive: {
    color: Config.COLOR_WHITE,
    fontSize: Config.CONTENT_TITLE_FONT_SIZE,
    fontWeight: "bold",
    overflow: "hidden"
  },
  titlePopular: {
    color: Config.CONTENT_TITLE_COLOR,
    fontSize: Config.CONTENT_TITLE_FONT_SIZE,
    justifyContent: "center"
  },
  titleAudio: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "left"
  },
  titleAudioPlaylist: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "left"
  },
  //Menu User View
  menuView: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Config.BACKGROUND_MENU
  },
  menuUserView: {
    paddingVertical: Config.PADDING_MENU_USER,
    paddingHorizontal: 10,
    flexDirection: "column",
    flexWrap: "wrap",
    backgroundColor: Config.BACKGROUND_MENU_USER
  },
  menuUserInfoView: {
    flexDirection: "row",
    alignItems: "center"
  },
  menuUserAvatar: {
    justifyContent: "center",
    paddingVertical: 5,
    paddingRight: 5
  },
  menuUserAvatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "white"
  },
  menuUserName: {
    justifyContent: "center",
    flex: 1,
    paddingRight: 10,
    paddingVertical: 5
  },
  menuUserNameText: {
    color: "white",
    fontSize: 11.67,
    fontFamily: "Roboto-Light"
  },
  loginButton: {
    backgroundColor: Config.BACKGROUND_BUTTON_LOGIN,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    height: 20,
    justifyContent: "center"
  },
  disabledLoginButton: {
    backgroundColor: Config.BACKGROUND_BUTTON_LOGIN,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    height: 20,
    justifyContent: "center",
    opacity: 0.5
  },
  textBtnLogin: {
    fontFamily: "RobotoCondensed-Bold",
    textAlign: "center",
    fontSize: 14
  },
  textBtnLoginForm: {
    fontFamily: "RobotoCondensed-Bold",
    textAlign: "center",
    fontSize: 20
  },
  separatorButton: {
    backgroundColor: "transparent",
    textAlign: "center",
    paddingBottom: 7,
    color: "#CCCCCC",
    fontSize: 20,
    fontFamily: "Roboto Condensed"
  },
  menuContentView: {
    backgroundColor: "#0099cc"
  },
  menuContentItemView: {
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
    borderBottomWidth: 1,
    padding: 10
  },
  menuContentItemText: {
    color: "white",
    fontSize: 16.67,
    paddingHorizontal: 10,
    fontFamily: "Roboto Condensed"
  },
  menuContentHeadView: {
    backgroundColor: Config.BACKGROUND_CATEGORY,
    paddingTop: 1
  },
  menuContentHeadText: {
    color: "white",
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontFamily: "Futura-CondensedExtraBold"
  },
  white: {
    color: "#FFFFFF"
  },
  navigator: {
    flex: 1,
    backgroundColor: "#000"
  },
  navigationBar: {
    backgroundColor: Config.NAVIGATION_BAR_BACKGROUND_COLOR
  },

  navBar: {
    //backgroundColor: '#fff',
    //borderBottomWidth:      StyleSheet.hairlineWidth,
    borderBottomColor: "#F1F1F1"
  },
  leftNavButton: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 20,
    paddingRight: 10
  },
  leftNavButtonRadio: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: "transparent"
  },
  rightNavButton: {
    flexDirection: "column",
    alignItems: "flex-end",
    paddingLeft: 10,
    paddingRight: 10
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  titleNavText: {
    flex: 1,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center"
  },
  logo: {
    width: Config.IMAGE_LOGO_WIDTH,
    height: Config.IMAGE_LOGO_HEIGHT,
    marginTop: Config.LOGO_MARGIN_TOP
  },
  logoAudio: {
    color: "#FFFFFF",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold"
  },
  iconSearch: {
    marginTop: 10,
    marginRight: 15
  },
  iconBack: {
    marginTop: 5,
    marginLeft: 5
  },

  row: {
    flexDirection: "row"
  },
  column: {
    flexDirection: "column"
  },
  // thumbnailContainer: {
  //   marginLeft: 5,
  //   overflow: 'hidden'
  // },
  textCount: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold"
  },
  textCountPlaylist: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold"
  },
  contentContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  searchBar: {
    height: 100,
    flex: 1,
    backgroundColor: Config.BACKGROUND_CONTAINER_SEARCH_BAR_TEXTBOX
  },
  searchBarInput: {
    backgroundColor: Config.BACKGROUND_SEARCH_BAR_TEXTBOX
  },
  tabs: {
    backgroundColor: Config.BACKGROUND_SEARCH_BAR_TABS,
    marginBottom: 10
  },
  tabStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  tabsVideo: {
    backgroundColor: Config.COLOR_WHITE,
    position: "absolute"
  },
  tabStyleVideo: {
    justifyContent: "center",
    alignItems: "center"
  },
  tabSelectedstyle: {
    borderBottomWidth: 1,
    borderBottomColor: Config.COLOR_SEARCH_BORDER_BOTTOM_TABS_SELECTED,
    justifyContent: "center"
  },
  titleStyle: {
    color: Config.COLOR_WHITE,
    fontSize: 14,
    fontFamily: "RobotoCondensed-Bold"
  },
  titleTabStyle: {
    color: Config.COLOR_GREY,
    fontSize: 14,
    fontFamily: "RobotoCondensed-Bold"
  },
  selectedTitleStyle: {
    color: Config.COLOR_SEARCH_TITLE_TABS_SELECTED
  },
  // sectionHeader: {
  //   justifyContent: 'flex-start'
  // },
  textRight: {
    borderWidth: 1,
    borderColor: "#0099cc",
    backgroundColor: "#000000",
    borderRadius: 3,
    padding: 2,
    position: "absolute",
    right: 10,
    top: 14
  },
  btnMoreContainer: {
    borderWidth: 1,
    borderColor: Config.BORDER_BTN_MORE_COLOR,
    backgroundColor: Config.BACKGROUND_BTN_MORE,
    borderRadius: 3,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
    top: 5,
    position: "absolute",
    right: 5
  },
  btnMoreContainerTimelines: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: "transparent",
    borderRadius: 3,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
    top: 5,
    position: "absolute",
    right: 5
  },
  btnMore: {
    color: Config.BTN_MORE_COLOR,
    fontFamily: "RobotoCondensed-Bold",
    fontSize: 14
  },
  btnMoreWrapper: {
    backgroundColor: Config.BACKGROUND_BTN_MORE,
    borderRadius: 3,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 2,
    paddingBottom: 2,
    overflow: "hidden",
    position: "absolute",
    right: 10,
    top: 10
  },
  btnMoreText: {
    color: "#FFFFFF",
    fontSize: 9
  },
  blocks: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  blocksColumn: {
    flex: 1,
    overflow: "hidden",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  hidden: {
    width: 0,
    height: 0
  },

  // Video Player
  containerVideo: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: Config.COLOR_BLACK
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  backgroundVideoFull: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  backgroundAudioFull: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1
  },
  navigationBarAudio: {
    backgroundColor: "transparent"
  },
  playerContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    flex: 1,
    zIndex: 1000
  },
  playerAudioContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  bgOpacity: {
    backgroundColor: "#000000",
    opacity: 0.3,
    padding: 7,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: "absolute",
    zIndex: 1
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20
  },
  trackingControls: {
    flex: 1,
    justifyContent: "center"
  },
  progress: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 4,
    overflow: "hidden",
    position: "absolute"
  },
  innerProgressCompleted: {
    height: 4,
    backgroundColor: "#cccccc"
  },
  innerProgressRemaining: {
    height: 4,
    backgroundColor: "#2C2C2C"
  },
  generalControls: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 2,
    overflow: "hidden",
    paddingBottom: 10
  },
  rateControl: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  volumeControl: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  controlOption: {
    alignSelf: "center",
    fontSize: 13,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12
  },
  textDuration: {
    color: "#FFFFFF",
    fontSize: 14,
    width: 70,
    marginLeft: 5
  },
  startDuration: {
    zIndex: 2
  },
  endDuration: {
    marginRight: 5
  },
  iconKaraoke: {
    marginRight: 5
  },
  isLive: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
    borderRadius: 4,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  },
  liveImage: {
    width: 39,
    height: 24
  },
  isLiveText: {
    fontSize: 8,
    paddingLeft: 2
  },
  resizeImage: {
    width: 24,
    height: 24
  },
  isCast: {
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 1,
    padding: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  isCastText: {
    paddingRight: 2,
    fontSize: 8
  },
  waiting: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    opacity: 0.5
  },
  waitingAudio: {
    position: "relative",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    opacity: 0.5
  },
  iconInfo: {
    position: "absolute",
    top: 10,
    right: 10
  },
  toggleData: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 7
  },
  toggleRelate: {
    position: "absolute",
    left: 0
  },
  borderAround: {
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 2,
    borderColor: "#696969",
    borderWidth: 1,
    marginLeft: 7
  },
  textInfo: {
    fontSize: 14,
    paddingTop: 7,
    paddingBottom: 7
  },
  mainTextInfo: {
    color: Config.COLOR_BLACK,
    fontSize: 16
  },
  textInfoValue: {
    padding: 7,
    flexWrap: "wrap",
    overflow: "hidden",
    color: Config.COLOR_GREY,
    fontSize: 14
  },
  titleWrapper: {
    padding: 7,
    flexWrap: "wrap",
    overflow: "hidden",
    flex: 1
  },
  textInfoHeader: {
    color: Config.TITLE_COLOR,
    fontSize: 14,
    marginBottom: 5
  },
  containerRelate: {
    flex: 1
  },
  timelinesContainer: {
    flex: 1,
    position: "absolute"
  },
  oneRowContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5
  },
  border1px: {
    borderBottomWidth: 0.3,
    borderBottomColor: Config.COLOR_GREY
  },
  border1pxPlaylist: {
    shadowColor: "#B0B0B0",
    shadowOffset: {
      width: 0,
      height: -1
    },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    borderColor: "#ccc"
  },
  border1pxPlaylistRight: {
    borderRightWidth: 1,
    borderColor: "#ccc"
  },
  imageGrid: {
    flexDirection: "row",
    flex: 1
  },
  marginRight: {
    marginRight: 7
  },
  centering: {
    alignItems: "center",
    justifyContent: "center"
    //padding: 8,
  },
  iconPlay: {
    alignItems: "center",
    justifyContent: "center"
  },
  iconPause: {
    alignItems: "center",
    justifyContent: "center"
  },
  timelinesntainer: {
    padding: 5,
    justifyContent: "flex-start"
  },
  timelinesSectionHeaderBgColor: {
    padding: 5,
    backgroundColor: "#0099cc"
  },
  subTitle: {
    fontSize: 14,
    color: Config.COLOR_GREY
  },
  subTitleAudio: {
    fontSize: 11,
    color: "#D3D3D3"
  },
  subTitleAudioPopular: {
    fontSize: 11,
    color: "#696969"
  },
  black: {
    color: "#000000"
  },
  imageCircle: {
    borderRadius: 50
  },
  wrapperAudio: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  circle: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
    borderColor: "#FFFFFF"
  },
  circlePause: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 10,
    borderColor: "#FFFFFF"
  },
  circlePlay: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 18,
    borderWidth: 1,
    marginRight: 10,
    borderColor: "#FFFFFF"
  },
  circleBottom: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 10,
    borderColor: "#FFFFFF"
  },
  circlePauseBottom: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 14,
    borderWidth: 1,
    marginRight: 10,
    borderColor: "#FFFFFF"
  },
  circlePlayBottom: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 14,
    borderWidth: 1,
    marginRight: 10,
    borderColor: "#FFFFFF"
  },
  iconRandom: {
    alignItems: "flex-start",
    justifyContent: "center"
  },
  iconList: {
    alignItems: "flex-end",
    justifyContent: "center"
  },
  groupButtonRadio: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  groupButtonRadioBottom: {
    flex: 0.6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5
  },
  rowBottom: {
    marginBottom: 5,
    marginTop: 10,
    backgroundColor: "transparent",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  rowBottomNoLive: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  containerAudioBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: "center",
    zIndex: 1000
  },
  circleCloseButtonBottom: {
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: "#000000"
  },
  wrapperCloseButton: {
    position: "absolute",
    right: 2,
    top: -8,
    zIndex: 1000
  },
  wrapperTextBottom: {
    flexWrap: "wrap",
    flex: 1,
    marginLeft: 10,
    height: 35,
    justifyContent: "center",
    overflow: "hidden"
  },
  wrapperBtnPackage: {
    alignItems: "flex-end"
  },
  btnPackage: {
    padding: 2,
    backgroundColor: "#0099cc",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0099cc"
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalWrapper: {
    backgroundColor: "#0099cc",
    borderRadius: 5,
    padding: 5
  },
  txtPromotion: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    height: 30
  },
  formGroup: {
    marginTop: 10
  },
  link: {
    color: "#0099cc"
  },
  textinput: {
    height: 20
  },
  logoNavBarAudio: {
    flex: 1,
    left: -5
  },
  wrapperAudioSwipper: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 60
  },
  wrapperAudioTimelines: {
    justifyContent: "flex-start",
    marginTop: 60,
    paddingLeft: 15
  },
  paginationAudio: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 26,
    marginTop: 10
  },
  wrapperBtnLogin: {
    marginTop: 10,
    marginBottom: 10
  },
  btnLogin: {
    backgroundColor: Config.BACKGROUND_BUTTON_LOGIN,
    paddingTop: 7,
    paddingBottom: 7,
    width: 110,
    borderRadius: 3,
    marginRight: 10
  },
  textCenter: {
    textAlign: "center"
  },
  formInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
    marginBottom: 5
  },
  btnLoginForm: {
    backgroundColor: Config.BACKGROUND_BUTTON_LOGIN,
    paddingVertical: 12,
    flex: 1,
    borderRadius: 3,
    marginBottom: 7
  },
  formInputLogin: {
    height: 40,
    paddingLeft: 40,
    paddingRight: 5,
    marginTop: 5,
    marginBottom: 5,
    color: "#FFFFFF"
  },
  formGroupWrapper: {
    borderBottomWidth: 1,
    borderColor: "#CCCCCC"
  },
  formInputSecondary: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    paddingLeft: 7,
    width: "86%",
    marginTop: 7
  },
  formModalInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 7,
    height: 30,
    paddingLeft: 7,
    paddingRight: 7
  },
  formModalInputPlaylist: {
    borderRadius: 7,
    height: 30,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: "#ececec"
  },
  formCheckbox: {
    borderWidth: 0,
    marginLeft: 0,
    paddingLeft: 0,
    backgroundColor: "transparent"
  },
  formModalCheckbox: {
    borderWidth: 0,
    margin: 0,
    padding: 0,
    backgroundColor: "transparent"
  },
  formModalGroup: {
    marginTop: 7
  },
  content: {
    justifyContent: "center",
    alignItems: "center"
  },

  controller: {
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  controllerButton: { height: 20, width: 20 },
  videoView: {
    flex: 1
  },
  progressBar: {
    alignSelf: "stretch",
    margin: 20
  },

  line: { padding: 0, height: 0.1 },
  holder: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    shadowOpacity: 0.8
  },
  activeHolder: {
    height: 18,
    width: 18,
    borderRadius: 9,
    //top: 14,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    shadowOpacity: 0.8
  },

  holderLive: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    shadowOpacity: 0.8
  },

  iconCurrentPlay: {
    width: Config.ICON_CURRENT_PLAY_WIDTH,
    height: Config.ICON_CURRENT_PLAY_HEIGHT
  },
  wrapperRelated: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.3,
    borderColor: "#CCCCCC"
  },
  wrapperPlaylist: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.3,
    borderColor: "#CCCCCC",
    flex: 1,
    flexDirection: "row"
  },
  wrapperTextCount: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    marginRight: 30,
    width: 35
  },
  wrapperTextCountContentPlaylist: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    marginRight: 10,
    width: 15
  },
  playlistArea: {
    marginLeft: 7,
    marginBottom: 7,
    flexDirection: "row"
  },
  btnPlaylistContainer: {
    backgroundColor: Config.BACKGROUND_WHITE,
    borderColor: Config.COLOR_GREEN,
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
    margin: 7
  },
  textGreen: {
    color: Config.COLOR_GREEN,
    fontSize: 18,
    fontFamily: "RobotoCondensed-Bold"
  },
  sectionPlaylistHeader: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column"
  },
  sectionPlaylistTitle: {
    color: Config.COLOR_BLACK
  },
  sectionContentPlaylistTitle: {
    color: Config.COLOR_WHITE
  },
  sectionPlaylistSubTitle: {
    color: Config.COLOR_GREY
  },
  formTitle: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 7
  },
  paddingDefault: {
    padding: 7
  },
  sectionHeaderBgGrey: {
    backgroundColor: Config.COLOR_GREY
  },
  actionImage: {
    width: Config.PLAYSTLIST_ICON_WIDTH,
    height: Config.PLAYSTLIST_ICON_HEIGHT
  },
  shuffleImage: {
    width: Config.PLAYSTLIST_ICON_WIDTH,
    height: Config.PLAYSTLIST_ICON_HEIGHT,
    justifyContent: "flex-start"
  },
  imageContentPlaylist: {
    width: 50,
    height: 50,
    marginRight: 7
  },
  btnPrimary: {
    backgroundColor: Config.BACKGROUND_BUTTON_LOGIN,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 3,
    marginTop: 7,
    width: 110
  },
  //Episode Active
  rowActive: {
    backgroundColor: Config.COLOR_GREY,
    padding: 7
  },
  panelContainer: {
    backgroundColor: "#00508C",
    // margin: 10,
    flex: 1,
    overflow: "hidden"
  },
  paneltitleContainer: {
    flexDirection: "row"
  },
  panelTitle: {
    flex: 1,
    padding: 10,
    color: "#fff",
    fontSize: 16
  },
  panelButton: {},
  panelbuttonImage: {
    width: 30,
    height: 25
  },
  panelBody: {
    flex: 1,
    backgroundColor: Config.BACKGROUND_MENU,
    flexDirection: "column"
  },
  tabBarStyle: {
    backgroundColor: "#eee"
  },
  tabBarSelectedItemStyle: {
    backgroundColor: "#ddd"
  },
  playerProgress: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    zIndex: 1000
  }
});
