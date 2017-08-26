import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Animated,
  Easing,
  AsyncStorage,
  Alert,
  Navigator,
  DeviceEventEmitter,
  AppState,
  InteractionManager
} from 'react-native';
import styles from '../../styles/Style';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';
import TabsWrapper from '../relate/TabsWrapper';
import ToggleInfo from '../relate/ToggleInfo';
import {Progress, ProgressChromecast, ProgressLive} from '../../components';
import Chromecast from "react-native-google-cast";
import Orientation from 'react-native-orientation';
import {CachedImage} from "react-native-img-cache";
import { Icon } from 'react-native-elements';
import KeepAwake from 'react-native-keep-awake';
import TimerMixin from 'react-timer-mixin';
import _ from 'lodash';

let FORWARD_DURATION = 7;
let currentChromecastTime = 0;

Navigator.NavigationBar.Styles = {backgroundColor: 'transparent'}

export default class PlayerVideo extends Component {

  constructor(props) {
    super(props);

    this.chromecastCastMedia = this.chromecastCastMedia.bind(this);
    this.onVideoLoad = this.onVideoLoad.bind(this);
    //this.onVideoEnd = this.onVideoEnd.bind(this);
    //this.onProgress = this.onProgress.bind(this);
    this.onProgressChanged = this.onProgressChanged.bind(this);
    this.updateProgressChanged = this.updateProgressChanged.bind(this);
    this.playOrPauseVideo = this.playOrPauseVideo.bind(this);
    this.playOrPauseChromecastVideo = this.playOrPauseChromecastVideo.bind(this);
    this.resizeModeControl = this.resizeModeControl.bind(this);
    //this.connectToChromecast = this.connectToChromecast.bind(this);
    this.onInfo = this.onInfo.bind(this);

    this.state = ({
      appState: AppState.currentState,
      rate: 1.0,
      volume: 1.0,
      muted: false,
      paused: false,
      pausedChromecast: false,
      duration: 0.0,
      currentTime: 0.0,
      isToggle: false,
      dataVideo: [],
      dataRelate: [],
      selectedTab: 'information',
      imageLoading: true,
      linkVideo: '',
      linkKaraoke: false,
      listDetail: null,
      key: new Date(),
      hideProgress: false,
      clicked: false,
      isBuffering: false,
      isBuffering: false,
      isKaraoke: false,
      currentTimeKara: 0,
      isChangeLink: false,
      loading: false,
      currentItemPlay: -1,
      submitted: false,
    });
  }

  videoPlayer: Video;
  mixins: [TimerMixin];

  componentDidMount() {
    const {receiveDetail, dataDetail, data, passProps, idChild, isLogin} = this.props;

    let handle = InteractionManager.createInteractionHandle();

    if(handle) {
      this.setState({loading: true});

      if(parseInt(idChild) > 0) {
        receiveDetail(idChild);
      } else {
        (passProps && passProps.timelines) && dataDetail(passProps.timelines.content);
      }

      // if(!isLogin) {
      //   this.showMessageIfNotLoggedIn();
      // }

      this.forceUpdate(this.closeAudio());

      //this.props.chromecastId && this.resetChromecast(this.props.chromecastId);
      DeviceEventEmitter.addListener(Chromecast.MEDIA_LOADED, () => { console.log(3333333) });
      DeviceEventEmitter.addListener(Chromecast.DEVICE_CONNECTED, () => {console.log(44444)});

      AppState.addEventListener('change', this._handleAppStateChange);
      KeepAwake.activate();

      InteractionManager.clearInteractionHandle(handle);
    }
    //this.getUserInfo().done();
  }

  closeAudio = () => {
    const {handlePlayerClose} = this.props;
    handlePlayerClose();
  }

  async connectToChromecast(id) {
    const isConnected = await Chromecast.isConnected();
    isConnected ? this.chromecastCastMedia() : Chromecast.connectToDevice(id);
  }

  resetChromecast(id) {
    this.connectToChromecast(id).done();
  }

  // componentWillReceiveProps(nextProps) {
  //   nextProps.chromecastId && this.connectToChromecast(nextProps.chromecastId);
  // }

  async getUserInfo() {
    return await AsyncStorage.getItem('dataUserInfo').then((dataJson) => {
      if(dataJson) {
        let data = JSON.parse(dataJson);
        this.setState({
          //isLogin: data.isLogin,
          isLogin: true,
          paused: data.isLogin ? false : true
        })
      }
    });
  }

  _handleAppStateChange = (nextAppState) => {
    this.setState({paused: this.state.paused, appState: nextAppState});
  };

  componentWillUnmount() {
    if(this.timeout) {
      clearTimeout(this.timeout);
    }
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  onVideoEnd() {
    const {data} = this.props;
    const {currentItemPlay} = this.state;

    if(data.listDetail.episodes && data.listDetail.episodes.length > 1 ) {
      if(data.listDetail.episodes.length !== parseInt(currentItemPlay) + 1) {
        this.videoPlayer.seek(0);
        this.processWhenEnd();
      } else {
        return false;
      }
    } else {
      this.setState({paused: true});
    }
  }

  processWhenEnd() {
    const {data} = this.props;
    const {currentItemPlay} = this.state;

    let rowCurrentItemPlay = parseInt(currentItemPlay) + 1 || 0;

    this.setState({
      submitted: true,
      duration: 0,
      currentTime: 0,
      currentItemPlay: rowCurrentItemPlay
    });
  }

  onVideoLoad(e) {
    const {data} = this.props;

    this.setState({
      //duration: !this.props.isLogin ? 0.0 : e.duration,
      duration: e.duration,
      currentTime: e.currentTime,
      imageLoading: false,
      paused: false
    });

    if(this.timeout) {
      clearTimeout(this.timeout);
    }

    if(data.listDetail.episodes && data.listDetail.episodes.length > 1 && !this.state.submitted) {
      let currentIndex = _.findIndex(data.listDetail.episodes, { 'id': data.listDetail.content.id  });

      this.setState({ currentItemPlay: currentIndex });
    }

    this.timeout = setTimeout(() => {
      this.setState({hideProgress: true});
    }, 8000);
    // _.delay(() => {
    //   this.setState({hideProgress: true});
    // }, 8000, 'later');
  }

  onProgress = (e) => {
    this.setState({
      currentTime: e.currentTime,
      imageLoading: false
    });
  }

  onBackward(currentTime) {
    let newTime = Math.max(currentTime - FORWARD_DURATION, 0);
    this.videoPlayer.seek(newTime);
    this.setState({currentTime: newTime})
  }

  onForward(currentTime, duration) {
    if (currentTime + FORWARD_DURATION > duration) {
        this.onVideoEnd();
    } else {
        let newTime = currentTime + FORWARD_DURATION;
        this.videoPlayer.seek(newTime);
        this.setState({currentTime: newTime});
    }
  }

  getCurrentTimePercentage(currentTime, duration) {
    if (parseFloat(this.state.currentTime) > 0 && parseFloat(this.state.duration) > 0) {
      return parseFloat(currentTime) / parseFloat(duration);
    } else {
      return 0;
    }
  }

  onProgressChanged(newPercent, paused) {
    let {duration} = this.state;
    let newTime = newPercent * duration / 100;

    if(newTime <= 0) {
      newTime = 0;
    }

    if(newTime > duration) {
      newTime = duration;
    }

    this.setState({currentTime: newTime, paused: paused});
    this.videoPlayer.seek(newTime);
  }

  toHHMMSS(duration) {
    var hours = Math.floor(duration / 3600) < 10 ? ("00" + Math.floor(duration / 3600)).slice(-2) : Math.floor(duration / 3600);
    var minutes = ("00" + Math.floor((duration % 3600) / 60)).slice(-2);
    var seconds = ("00" + (duration % 3600) % 60).slice(-2);
    return hours + ":" + minutes + ":" + seconds;
  }

  playOrPauseVideo() {
    // if(!this.props.isLogin) {
    //   this.showMessageIfNotLoggedIn();
    // } else {
    //   if(this.state.paused && this.state.playVideoEnd) {
    //     this.setState({currentTime: 0});
    //     this.videoPlayer.seek(0);
    //   }
    //   this.setState({paused: !this.state.paused, playVideoEnd: false});
    // }
    //this.setState({paused: !this.state.paused});
    //
    this.setState({paused: !this.state.paused});
  }

  playOrPauseChromecastVideo() {
    if(!this.props.isLogin) {
      this.showMessageIfNotLoggedIn();
    } else {
      Chromecast.togglePauseCast();
      this.setState({pausedChromecast: !this.state.pausedChromecast})
    }
    // Chromecast.togglePauseCast();
    // this.setState({pausedChromecast: !this.state.pausedChromecast})
  }

  onInfo() {
    this.setState({isToggle: !this.state.isToggle, hideProgress: true});
  }

  changeLinkKaraoke = (link) => {
    const linkKaraoke = link.replace('kara.', 'sing.');
    this.setState({
      paused: true,
      isKaraoke: !this.state.isKaraoke,
      link: linkKaraoke,
      currentTimeKara: this.state.currentTime,
      isChangeLink: true
    });

    if(this.timeout) {
        clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.forceUpdate(this.changePlayVideoKara());
    }, 4000);
  }

  changePlayVideoKara() {
    this.state.currentTimeKara > 0 && this.videoPlayer.seek(this.state.currentTimeKara);
    this.setState({paused: false, currentTime: this.state.currentTimeKara, isChangeLink: false});
  }

  showMessageIfNotLoggedIn() {
    this.setState({
      paused: true,
      duration: 0.0
    });

    return(
      Alert.alert(
          'Message',
          'You need to login to view contents. Are you want to login now',
          [
            { text: 'Login', onPress: () => this.onLogin() },
            { text: 'Cancel', onPress: () => this.setState({paused: true}) }
          ]
        )
    )
  }

  onLogin() {
    const { navigator } = this.props;
    navigator.push({
      id: 6
    })
  }

  displayProgress() {
    this.setState({hideProgress: false, isToggle: false});

    if(this.timeout) {
        clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.setState({hideProgress: true});
    }, 8000);
  }

  chromecastCastMedia() {
    const { listDetail } = this.props.data;
    Chromecast.castMedia(listDetail.content.link, listDetail.content.name, listDetail.content.image, 0);
  }

  // async connectToChromecast() {
  //   const isConnected = await Chromecast.isConnected();
  //   isConnected && this.chromecastCastMedia()
  // }

  resizeModeControl() {
    const {fullscreenPlayer, width, height} = this.props;
    let fullscreen = '';

    Orientation.getOrientation(function(err, orientation) {
        if(err) { return console.log('Error rotate') }

        if(orientation === 'LANDSCAPE') {
          Orientation.lockToPortrait();
          fullscreen = false;
        } else {
          Orientation.lockToLandscape();
          fullscreen = true;
        }

        fullscreenPlayer({
          fullscreen: fullscreen,
          width: height,
          height: width
        })
    });
  }

  updateProgressChanged() {
    const {currentTime} = this.props;
    this.setState({paused: false, pausedChromecast: true});
    currentTime > 0 && this.videoPlayer.seek(currentTime);
  }

  async parseChromeCastCurrentTime() {
    currentChromecastTime = await Chromecast.getStreamPosition();
    //this.setState({currentTime: currentTime});
  }

  onAudioBecomingNoisy = () => {
    this.setState({ pause: true })
  }

  onAudioFocusChanged(event: { hasAudioFocus: boolean }) {
    if (!this.state.paused && !event.hasAudioFocus) {
      this.setState({ paused: true })
    }
  }

  render() {
    let {data, width, height, fullscreen, showChromecast} = this.props;

    let isLogin = true;

    let {
        currentTime, duration, paused, dataVideo, volume, hideProgress, isToggle,
        pausedChromecast, currentTimeKara, isChangeLink, loading, submitted, currentItemPlay} = this.state;

    let flexCompleted = this.getCurrentTimePercentage(currentTime, duration) * 100;
    let flexRemaining = (1 - this.getCurrentTimePercentage(currentTime, duration)) * 100;

    let backgroundVideo = !fullscreen ? styles.backgroundVideo : styles.backgroundVideoFull;
    let backgroundHeightVideo = !fullscreen ? {height: width/16*9} : {height: height};
    let resizeMode = fullscreen ? 'stretch' : 'contain';
    let link = '';
    let iconPlayOrPause = paused ? 'play' : 'pause';
    //let isTimeline = (listDetail.content.isTimeline && listDetail.content.isTimeline == true) ? true : false;
    let isTimeline = false;
    let id = 0;

    const selectedTab = this.state.selectedTab;

    if(data.listDetail && data.listDetail.content) {
      if(!submitted) {
        // check if is albums then play first episodes
        if(data.listDetail.content.type == 1) {
          currentItemPlay = (currentItemPlay == -1) && 0;
          link = data.listDetail.episodes[currentItemPlay].link;
          id = data.listDetail.episodes[currentItemPlay].id;
        } else {
          link = this.state.isKaraoke ? this.state.link : data.listDetail.content.link;
          id = data.listDetail.content.id;
        }

      } else {
        link = data.listDetail.episodes[currentItemPlay].link;
        id = data.listDetail.episodes[currentItemPlay].id;
      }
    }

    if(showChromecast) {
      currentTime = currentChromecastTime;
    }

    let paddingTop = fullscreen ? 0 : 64;

    if(!loading || data.listDetail == null) {
      return(
        <View style={[styles.centering, styles.waiting]}><ActivityIndicator size="small" color="white" /></View>
      )
    }

    return (
        <View style={[styles.container, {marginTop: paddingTop}]}>
          <TouchableWithoutFeedback onPress={this.displayProgress.bind(this)}>
              <View style={[backgroundVideo, backgroundHeightVideo]}>
                {
                  <View style={[backgroundVideo, backgroundHeightVideo]}>
                    <Video source={{uri: link, mainVer: 1, patchVer: 0}}
                    ref={(ref: Video) => this.videoPlayer = ref}
                    rate={this.state.rate}                     // 0 is paused, 1 is normal.
                    volume={Math.max(Math.min(1, volume), 0)}                  // 0 is muted, 1 is normal.
                    muted={false}                  // Mutes the audio entirely.
                    paused={paused}                // Pauses playback entirely.
                    resizeMode={resizeMode}            // Fill the whole screen at aspect ratio.
                    repeat={false}                  // Repeat forever.
                    progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
                    onLoadStart={this.loadStart}   // Callback when video starts to load
                    onLoad={this.onVideoLoad}
                    onProgress={this.onProgress}      // Callback every ~250ms with currentTime
                    onEnd={_.debounce(this.onVideoEnd.bind(this), 100)}            // Callback when playback finishes
                    onError={this.videoError}      // Callback when video cannot be loaded
                    onAudioBecomingNoisy={this.onAudioBecomingNoisy.bind(this)} // Callback when audio is becoming noisy - should pause video
                    onAudioFocusChanged={this.onAudioFocusChanged.bind(this)} // Callback when audio focus has been lost - pause if focus has been lost
                    style={[backgroundVideo, backgroundHeightVideo]}
                    />
                    {
                      (!data.listDetail.content.isLive && duration == 0) &&
                        <View style={[styles.centering, {width: width, height: width/16*9}]}>
                          <ActivityIndicator size="small" color="#CCCCCC" />
                        </View>
                    }
                    {
                      (data.listDetail.content.isLive && currentTime == 0) &&
                        <View style={[styles.centering, {width: width, height: width/16*9}]}>
                          <ActivityIndicator size="small" color="#CCCCCC" />
                        </View>
                    }
                      {
                        (isLogin) ?
                          (data.listDetail.content.isLive == true) ?
                                  <ProgressLive isLive={data.listDetail.content.isLive} categoryId={dataVideo.cat_id}
                                  paused={paused} isLogin={isLogin}
                                  playOrPauseVideo={this.playOrPauseVideo}
                                  widthLayout={width} heightLayout={height}
                                  fullscreen={fullscreen}
                                  resizeModeControl={this.resizeModeControl}
                                  duration={duration} currentTime={currentTime}
                                  hideProgress={hideProgress} />
                              :
                                  <Progress isLive={data.listDetail.content.isLive} categoryId={data.listDetail.content.cat_id}
                                  paused={paused} isLogin={isLogin}
                                  playOrPauseVideo={this.playOrPauseVideo}
                                  widthLayout={width} heightLayout={height}
                                  changeLinkKaraoke={this.changeLinkKaraoke} link={link}
                                  resizeModeControl={this.resizeModeControl}
                                  duration={duration} currentTime={currentTime}
                                  percent={flexCompleted} remain={flexRemaining}
                                  onNewPercent={this.onProgressChanged.bind(this)}
                                  fullscreen={fullscreen}
                                  onInfo={this.onInfo}
                                  isTimeline={isTimeline}
                                  hideProgress={hideProgress} />
                        :
                            duration == 0 ?
                                <View style={[styles.centering, {width: width, height: width/16*9}]}>
                                {
                                  !isLogin ?
                                      <View style={[styles.iconPlay]}>
                                        <Icon
                                          name='play'
                                          type='font-awesome'
                                          color='#fff'
                                          size={22}
                                          onPress={this.playOrPauseVideo.bind(this)} />
                                      </View>
                                  :
                                    <ActivityIndicator size="small" color="black" />
                                }
                                </View>
                          : null
                      }
                    </View>
                }
               {
                 showChromecast &&
                  <View style={[backgroundVideo, backgroundHeightVideo]}>
                    <CachedImage source={{uri: data.listDetail.content.image}}
                      style={[styles.centering, {width: width, height: width/16*9}]}
                      mutable
                      >
                      {
                        !isLogin &&
                          <View style={[styles.iconPlay]}>
                            <Icon
                              name='play'
                              type='font-awesome'
                              color='#fff'
                              size={22}
                              onPress={this.playOrPauseChromecastVideo.bind(this)} />
                          </View>
                      }
                      </CachedImage>

                     <ProgressChromecast isLive={data.listDetail.content.isLive} categoryId={dataVideo.cat_id}
                      widthLayout={width} heightLayout={height}
                       paused={pausedChromecast} isLogin={isLogin}
                       playOrPauseVideo={this.playOrPauseChromecastVideo}
                       changeLinkKaraoke={this.changeLinkKaraoke} link={link}
                       resizeModeControl={this.resizeModeControl}
                       duration={duration} currentTime={currentTime}
                       percent={flexCompleted} remain={flexRemaining}
                       onNewPercent={this.onProgressChanged.bind(this)}
                       onInfo={this.onInfo}
                       hideProgress={hideProgress} />
                   </View>
                 }
               </View>
            </TouchableWithoutFeedback>

           {
              (isToggle && fullscreen) ?
                <ToggleInfo navigator={this.props.navigator} imageDevice={this.props.imageDeviceLanscape} dataRelate={data.listDetail} onInfo={this.onInfo} width={width} height={height} id={5} />
              :
                !fullscreen &&
                  <TabsWrapper navigator={this.props.navigator} dataRelate={data.listDetail} id={5} isLive={data.listDetail.content.isLive}
                    height={this.props.height} width={this.props.width} idCurrent={id} />
           }
        </View>
    )
  }
}
