import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Animated,
  Easing,
  AsyncStorage,
  TouchableWithoutFeedback,
  ScrollView,
  InteractionManager,
  Alert,
  findNodeHandle
} from 'react-native';
import styles from '../../styles/Style';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';
import { AppRoutes, Config, AppErrors } from '../../../common/config';
import { validURL } from '../../../common/validates/validation';
import { Button } from '../../components';
import Icon                 from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../../common/redux/actions/audio';
import * as Animatable from 'react-native-animatable';
import PlayerAudioBottom from './PlayerAudioBottom';
import AudioTimeLines from './AudioTimeLines';
import AudioRelated from './AudioRelated';
import AudioEpisodes from './AudioEpisodes';
import AudioMyPlaylist from './AudioMyPlaylist';
import {ProgressAudio} from '../../components';
import {CachedImage} from "react-native-img-cache";
import { BlurView } from 'react-native-blur';
import _ from 'lodash';
let {width, height} = Dimensions.get('window');

export class PlayerAudio extends Component {

  constructor(props) {
    super(props);

    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.handleAudioScale = this.handleAudioScale.bind(this);
    this.playOrPause = this.playOrPause.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
    this.changeLinkAudio = this.changeLinkAudio.bind(this);
    this.onProgressChanged = this.onProgressChanged.bind(this);
    //this.onEnd = this.onEnd.bind(this);

    this.state = ({
      rate: 1.0,
      volume: 1.0,
      muted: false,
      duration: 0.0,
      currentTime: 0.0,
      paused: true,
      dataAudio: [],
      imageLoading: true,
      imageBgLoading: true,
      linkVideo: '',
      spinValue: new Animated.Value(0),
      modalY: new Animated.Value(0),
      displayed: true,
      height: height,
      audioScale: false,
      isFirstAnimate: false,
      loading: false,
      isBuffering: false,
      submitted: false, //Check timelines click
      currentItemPlay: 0, //If has episodes, series auto next play
      nextItemPlay: 0, //If has episodes, series auto next play
      repeat: false,
      isNextItem: false,
      isPrevItem: false,
      isRandom: false,
      repeatNumber: 0,
      isEnd: false,
      playAudioEnd: false,
      viewRef: null
    });
  }

  componentDidMount() {
    const {receiveAudio, dataAudio} = this.props;

    if(parseInt(dataAudio.idChild) > 0) {
      receiveAudio(parseInt(dataAudio.idChild));
    }
    let handle = InteractionManager.createInteractionHandle();

    if(handle) {
      setTimeout(() => {
        this.setState({loading: true, paused: true, submitted: false, currentItemPlay: dataAudio.currentItemPlay || 0});
        this.handleAudioScale();
        this.spin();
        InteractionManager.clearInteractionHandle(handle);
      }, 1000);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {receiveAudio, dataAudio, destroyAudio} = this.props;

    let handle = InteractionManager.createInteractionHandle();

    if(dataAudio.idChild != nextProps.dataAudio.idChild) {
      destroyAudio();
      receiveAudio(parseInt(nextProps.dataAudio.idChild));

      if(handle) {
        setTimeout(() => {
          this.setState({
            isFirstAnimate: true,
            audioScale: false,
            height: height,
            loading: true,
            imageBgLoading: true,
            paused: true,
            submitted: false,
            duration: 0,
            currentTime: 0,
            currentItemPlay: nextProps.dataAudio.currentItemPlay
          });
        }, 1000);
      }
    } else if(nextProps.dataAudio.playlistId != dataAudio.playlistId) {
      destroyAudio();
      receiveAudio(parseInt(nextProps.dataAudio.idChild));

      if(handle) {
        setTimeout(() => {
          this.setState({
            isFirstAnimate: true,
            audioScale: false,
            height: height,
            loading: true,
            imageBgLoading: true,
            paused: true,
            submitted: false,
            duration: 0,
            currentTime: 0,
            currentItemPlay: nextProps.dataAudio.currentItemPlay
          });
        }, 1000);
      }
    }
    InteractionManager.clearInteractionHandle(handle);
  }

  componentWillUnmount() {
    const { destroyAudio } = this.props;
    destroyAudio();
  }

  onLoad(data) {
    this.setState({
      duration: data.duration,
      imageLoading: false,
      paused: false
    });
  }

  onProgress(data) {
    this.setState({
        currentTime: data.currentTime
    });
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
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

  getCurrentTimePercentage() {
    if (parseFloat(this.state.currentTime) > 0 && parseFloat(this.state.duration) > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  handleBackAction = () => {
    this.state.modalY.setValue(1);
    Animated.spring(this.state.modalY, {
        toValue: 0,
        friction: 7,
     }).start();

    this.setState({
      audioScale: true,
      height: 50,
      isFirstAnimate: false
    })
  }

  // handleHomeAction = () => {
  //   const {navigator} = this.props;
  //   navigator.resetTo(AppRoutes.getRouteFromRouteId(1));
  // }

  spin() {
    this.state.spinValue.setValue(0);
  	Animated.timing(
    	this.state.spinValue,
      {
      	toValue: 1,
        duration: 12000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  handleAudioScale() {
    this.setState({
      audioScale: false,
      height: height
    });
  }

  closeAudio = () => {
    const {closeAudio, paused} = this.props;
    this.setState({paused: paused});
    closeAudio();
  }

  playOrPause() {
    if(this.state.playAudioEnd) {
      this.videoPlayer.seek(0);
    }
    this.setState({paused: !this.state.paused, playAudioEnd: false});
  }

  changeLinkAudio = (items) => {
    this.setState(items);

    setTimeout(() => {
      this.setState({paused: false});
    }, 4000);
  }

  onRandom = (items) => {
    this.setState(items);
  }

  onRepeat = (items) => {
    this.setState(items);
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  processWhenEnd = () => {
    const {fetchAudio, dataAudio} = this.props;
    const {isRandom, repeat, repeatNumber, currentItemPlay} = this.state;
    let {listAudio} = this.props.data;
    let linkAudio = name =  '';
    let idChild = 0;
    let rowCurrentItemPlay = 0;
    let data = null;
    let autoContinue = false;

    if(dataAudio.isPlaylist) {
      data = dataAudio.contents;
      autoContinue = true;

      if(data.length == parseInt(currentItemPlay) + 1) {
        return false;
      } else {
        rowCurrentItemPlay = parseInt(currentItemPlay) + 1;
      }
    } else {
      if(listAudio && listAudio.timelines && listAudio.timelines[0] && listAudio.timelines[0].timeline && listAudio.timelines[0].timeline.length > 1 ) {
        data = listAudio.timelines[0].timeline;
      } else if(listAudio && listAudio.episodes && listAudio.episodes.length > 1 ) {
        data = listAudio.episodes;
        autoContinue = true;

        if(data.length == parseInt(currentItemPlay) + 1 && repeatNumber != 2) {
          return false;
        } else {
          rowCurrentItemPlay = parseInt(currentItemPlay) + 1;
        }

      } else if(listAudio && listAudio.series && listAudio.series.length > 1) {
        data = listAudio.series;
      }
    }

    if(!autoContinue && !isRandom && repeatNumber != 2) {
      return false;
    }

    if(data.length == 2) {
      rowCurrentItemPlay = currentItemPlay == 1 ? 0 : 1;
    }

    if(isRandom) {
      rowCurrentItemPlay = this.getRandomIntInclusive(0, (data.length - 1));
    }

    if(repeatNumber == 2) {
      if(data.length == parseInt(currentItemPlay) + 1) {
        rowCurrentItemPlay = 0;
      } else {
        rowCurrentItemPlay = parseInt(currentItemPlay) + 1;
      }
    }

    this.changeLinkAudio({
      submitted: true,
      linkAudio: data[rowCurrentItemPlay].link,
      albumName: data[rowCurrentItemPlay].name,
      duration: 0,
      currentTime: 0,
      currentItemPlay: rowCurrentItemPlay,
      isNextItem: true,
      isPrevItem: (rowCurrentItemPlay == 0) ? false : true,
    });
  }

  onEnd() {
    if(!this.state.repeat) {
      this.setState({playAudioEnd: true});
      this.processWhenEnd();
    } else {
      this.videoPlayer.seek(0);
    }
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
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
    let {listAudio, list} = this.props.data;
    let {fetchAudio, navigator, dataAudio, isLogin, userInfo} = this.props;

    let {
      currentTime, duration, paused, volume, audioScale, loading, height, imageBgLoading,
      submitted, isFirstAnimate, isNextItem, isPrevItem, currentItemPlay, repeatNumber, isRandom
    } = this.state;
    currentItemPlay = currentItemPlay || 0;

    let scale = audioScale ? "slideInDown" : "slideInUp";
    let modeResize = imageBgLoading ? 'repeat' : 'cover';
    let linkAudio = '';
    let linkImage = '';
    let albumName = '';
    let actors = 'Unknown Artist'; //songName: displayed only for albums type
    let songName = null;
    //dataItems When Click Next Or Previous Button
    let showDataRelate = dataItems = null;
    let isLive = isShowRelated = showHideButtons = showHideShuffleButton = showHideReapeatButton
               = showHideOnlyRepeatOneButton = showHideOnlyRepeatAllButton = false;
    let isCurrentLive = (listAudio && listAudio.content && listAudio.content.isLive == true) ? true : false;

    const rowLive = listAudio && listAudio.content.isLive ? styles.rowBottom : styles.rowBottomNoLive;

    let flexCompleted = 100;
    let flexRemaining = 0;

    // if(listAudio && listAudio.content && listAudio.content.link != '') {
    //   const isValid = validURL(listAudio.content.link);
    //   if(!isValid) {
    //     this.closeAudio();
    //   }
    // }

    if(listAudio && listAudio.content && listAudio.content.isLive == false) {
      flexCompleted = this.getCurrentTimePercentage(currentTime, duration) * 100;
      flexRemaining = (1 - this.getCurrentTimePercentage(currentTime, duration)) * 100;
    }

    const spin = this.state.spinValue.interpolate({
       inputRange: [0, 1],
       outputRange: ['0deg', '360deg']
     });

     if(listAudio && listAudio.content.link && !submitted) {
        linkAudio = listAudio.content.link;
     } else {
       linkAudio = this.state.linkAudio;
     }

     if(listAudio && listAudio.actors && listAudio.actors != '' && !isLive) {
       if(typeof(listAudio.content.actors) === 'string') {
         actors = listAudio.content.actors;
       } else {
         let arrActors = [];
         listAudio.actors.map(function(data, value) {
                    arrActors.push(data.name);
                  });
          actors = arrActors.join(', ');
       }
     }

     if(listAudio && listAudio.content.isLive && !submitted) {
        isLive = listAudio.content.isLive;
     }

     if(submitted && !isLive) {
       flexCompleted = this.getCurrentTimePercentage(currentTime, duration) * 100;
       flexRemaining = (1 - this.getCurrentTimePercentage(currentTime, duration)) * 100;
     }

    if (dataAudio.isPlaylist) {

      dataItems = dataAudio.contents;
      songName = dataItems[currentItemPlay].name;
      linkAudio = dataItems[currentItemPlay].link;
      linkImage = dataItems[currentItemPlay].image;
      isShowRelated = true;

      if(dataItems.length > 1) {
        showHideButtons = true;
      }

      if(dataItems[currentItemPlay].actors) {
        if(typeof(dataItems[currentItemPlay].actors) === 'string') {
          actors = dataItems[currentItemPlay].actors;
        } else {
          let arrActors = [];
          dataItems[currentItemPlay].actors.map(function(data, value) {
            arrActors.push(data.name);
          });
          actors = arrActors.join(', ')
        }

      }

      showDataRelate = <AudioMyPlaylist playlist={dataItems} changeLinkAudio={this.changeLinkAudio} currentItemPlay={currentItemPlay} id={dataItems[currentItemPlay].id}
                         audioScale={audioScale} showHideButtons={showHideButtons} currentTime={currentTime} paused={paused} submitted={submitted} actors={actors} />
    } else {
      if(listAudio && listAudio.content && listAudio.content.cat_id == 7 && isCurrentLive) {
        if(listAudio && listAudio.timelines && listAudio.timelines.length > 0) {
           dataItems = listAudio.timelines[0].timeline;
           linkImage = listAudio.content.image;
           isShowRelated = true;

           if(dataItems.length > 1) {
             showHideButtons = true;
           }

           showDataRelate = <AudioTimeLines timelines={listAudio.timelines[0].timeline} changeLinkAudio={this.changeLinkAudio} currentItemPlay={currentItemPlay}
                            audioScale={audioScale} showHideButtons={showHideButtons} isCurrentLive={isCurrentLive} isLive={isLive}
                            currentTime={currentTime} paused={paused} submitted={submitted} id={dataItems[currentItemPlay].id} />
        } else if(listAudio && listAudio.episodes && listAudio.episodes.length > 0 ) {
           dataItems = listAudio.episodes;
           linkImage = listAudio.content.image;
           albumName = listAudio.content.name;
           songName = dataItems[currentItemPlay].name;
           linkAudio = dataItems[currentItemPlay].link;
           isShowRelated = true;

           if(dataItems.length > 1) {
             showHideButtons = true;
           }

           showDataRelate = <AudioEpisodes episodes={listAudio.episodes} changeLinkAudio={this.changeLinkAudio} currentItemPlay={currentItemPlay} id={dataItems[currentItemPlay].id}
                              audioScale={audioScale} showHideButtons={showHideButtons} currentTime={currentTime} paused={paused} submitted={submitted} />
        } else if(listAudio && listAudio.related && listAudio.related.length > 0) {
          dataItems = listAudio.related;
          linkImage = listAudio.content.image;
          songName = dataItems[currentTime].name;
          isShowRelated = true;
          showHideButtons = false;
          showHideOnlyRepeatOneButton = true;

          showDataRelate = <AudioRelated related={listAudio.related} fetchAudio={fetchAudio} currentItemPlay={currentItemPlay}
                            audioScale={audioScale} showHideButtons={showHideButtons} showHideOnlyRepeatOneButton={showHideOnlyRepeatOneButton}
                            submitted={submitted} />
        } else {
           if(listAudio && listAudio.playlist && listAudio.playlist.length > 0 && !listAudio.content.isLive) {
             dataItems = listAudio.playlist;
             linkImage = listAudio.content.image;
             isShowRelated = true;

             if(dataItems.length > 1) {
               showHideButtons = true;
             }

             showDataRelate = <AudioPlaylist playlist={listAudio.playlist} currentItemPlay={currentItemPlay} audioScale={audioScale} id={dataItems[currentItemPlay].id}
                                showHideButtons={showHideButtons} currentTime={currentTime} paused={paused} submitted={submitted} />
           }
         }
      } else {
        if(listAudio && listAudio.episodes && listAudio.episodes.length > 0 ) {
          dataItems = listAudio.episodes;
          linkImage = listAudio.content.image;
          // if(listAudio.content.mode == 0 && listAudio.content.type == 3) {
          //   linkImage = listAudio.content.image_poster;
          // }
          albumName = listAudio.content.name;
          songName = dataItems[currentItemPlay].name;
          actors = dataItems[currentItemPlay].actors;
          linkAudio = dataItems[currentItemPlay].link;
          isShowRelated = true;

          if(dataItems.length > 1) {
            showHideButtons = true;
          }

          showDataRelate = <AudioEpisodes episodes={listAudio.episodes} changeLinkAudio={this.changeLinkAudio} currentItemPlay={currentItemPlay} id={dataItems[currentItemPlay].id}
                            audioScale={audioScale} showHideButtons={showHideButtons} currentTime={currentTime} paused={paused} submitted={submitted} albumName={albumName} />
        } else if(listAudio && listAudio.related && listAudio.related.length > 0) {
          dataItems = listAudio.related;
          linkImage = listAudio.content.image;
          songName = listAudio.content.name;
          isShowRelated = true;
          showHideButtons = false;
          showHideOnlyRepeatOneButton = true;
          showDataRelate = <AudioRelated related={listAudio.related} fetchAudio={fetchAudio} currentItemPlay={currentItemPlay} submitted={submitted}
                            audioScale={audioScale} showHideButtons={showHideButtons} showHideOnlyRepeatOneButton={showHideOnlyRepeatOneButton}
                            currentTime={currentTime} paused={paused} />
        }
      }
    }

    return (

      (listAudio && loading) ?
        <Animatable.View style={[{position: 'absolute', bottom: 0, left: 0, right: 0, height: height}]} animation={scale}>
          <Image
              source={{uri: linkImage}} style={[{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}]}
              ref={(img) => { this.backgroundImage = img; }}
              blurRadius={100} onLoadEnd={this.imageLoaded.bind(this)}
          />
          {
            (this.state.viewRef != null) &&
                <BlurView blurAmount={100} blurType="dark" style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}
                          viewRef={this.state.viewRef} />
          }

              <View style={{backgroundColor: 'rgba(0, 0, 0, 0.3)', flex: 1}}>

                <Video source={{uri: linkAudio, mainVer: 1, patchVer: 0}} // Looks for .mp4 file (background.mp4) in the given expansion version.
                   ref={videoPlayer => this.videoPlayer = videoPlayer}
                   rate={this.state.rate}                     // 0 is paused, 1 is normal.
                   volume={this.state.volume}                  // 0 is muted, 1 is normal.
                   muted={false}                  // Mutes the audio entirely.
                   paused={paused}                // Pauses playback entirely.
                   resizeMode="cover"             // Fill the whole screen at aspect ratio.
                   repeat={this.state.repeat}                  // Repeat forever.
                   progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
                   onLoad={this.onLoad}      // Callback when video loads
                   onProgress={this.onProgress}      // Callback every ~250ms with currentTime
                   onEnd={this.onEnd.bind(this)}
                   onError={this.videoError}      // Callback when video cannot be loaded
                   controls={true}
                   disableFocus={true} // disables audio focus and wake lock (default false)
                   playInBackground={true}
                   onAudioBecomingNoisy={this.onAudioBecomingNoisy.bind(this)} // Callback when audio is becoming noisy - should pause video
                   onAudioFocusChanged={this.onAudioFocusChanged.bind(this)} // Callback when audio focus has been lost - pause if focus has been lost
                   poster={linkImage}
                />

                {
                  audioScale ?
                    <PlayerAudioBottom image={linkImage} name={songName} flexCompleted={flexCompleted} currentTime={currentTime}
                      paused={paused} playOrPause={this.playOrPause} handleAudioScale={this.handleAudioScale} height={height}
                      closeAudio={this.closeAudio} isNextItem={isNextItem} isPrevItem={isPrevItem} isShowRelated={isShowRelated}
                      dataItems={dataItems} changeLinkAudio={this.changeLinkAudio} currentItemPlay={currentItemPlay}
                      showHideButtons={showHideButtons} isLive={listAudio.content.isLive} actors={actors}  />
                  :
                   <View style={[styles.column, {flex: 1, paddingTop: 20}]}>
                      <View style={styles.row}>
                          <TouchableOpacity style={styles.leftNavButtonRadio} onPress={this.handleBackAction}>
                           <Icon name='ios-arrow-back' size={32} color={'#FFFFFF'} />
                          </TouchableOpacity>

                          <View style={{backgroundColor: 'transparent', width: '78%', alignItems: 'center'}}>
                             <Image source={Config.IMAGE_LOGO} style={styles.logo} mutable />
                          </View>
                      </View>
                    {
                      isShowRelated == true ?
                          <Swiper showsPagination={true}
                                   dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                                   activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                                   loop={false}
                                   index={1}
                                   paginationStyle={styles.paginationAudio}
                                   height={height - 150}
                          >
                            <View style={[styles.wrapperAudioSwipper, {height: height - 225, overflow: 'hidden'}]}>
                              {
                                (listAudio.content.lyric && listAudio.content.lyric != '') ?
                                  <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                    <View style={{flex: 1, overflow: 'hidden'}}>
                                      <Text style={[styles.white, {textAlign: 'center', lineHeight: 22}]}>{listAudio.content.lyric}</Text>
                                    </View>
                                  </ScrollView>
                                :
                                  <Text style={styles.white}>Not Found Lyrics</Text>
                              }

                            </View>

                            <View style={styles.wrapperAudioSwipper}>
                              <View style={{width: width - 100, height: width - 100, marginBottom: '10%', borderRadius: ((width - 100)/2), overflow: 'hidden'}}>
                                <Animated.Image source={{uri: linkImage, cache: 'reload'}}
                                   style={[styles.centering, {width: width - 100, height: width - 100, borderRadius: ((width - 100)/2), transform: [{rotate: spin}]}]}
                                   key={listAudio.content.image}
                                   resizeMode="contain"
                                />
                                {
                                  (this.state.imageLoading || this.state.currentTime <= 0) &&
                                    <View style={[styles.centering, {width: width - 100, height: width - 100, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}]}>
                                      <ActivityIndicator size="small" color="white" />
                                    </View>
                                }
                              </View>
                              <View style={[{marginTop:10}]}>
                                <Text style={[styles.white, {fontSize: 20, textAlign: 'center', lineHeight: 30}]}>{albumName}</Text>
                                {(songName !== null) && <Text style={[styles.white, {fontSize: 16, textAlign: 'center'}]}>{songName}</Text>}
                              </View>
                            </View>

                            <View style={[styles.wrapperAudioTimelines, {height: height - 225, overflow: 'hidden'}]}>
                              {showDataRelate}
                            </View>

                          </Swiper>
                        :
                        <Swiper showsPagination={true}
                                 dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                                 activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                                 loop={false}
                                 index={1}
                                 paginationStyle={styles.paginationAudio}
                                 height={height - 150}
                        >
                          <View style={styles.wrapperAudioSwipper}>
                            {
                              (listAudio.content.lyric && listAudio.content.lyric != '') ?
                                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                  <View>
                                    <Text style={[styles.white, {textAlign: 'center', lineHeight: 22, paddingLeft: 15, paddingRight: 15}]}>{listAudio.content.lyric}</Text>
                                  </View>
                                </ScrollView>
                              :
                                <Text style={[styles.white, {padding: 7}]}>Not Found Lyrics</Text>
                            }

                          </View>

                          <View style={styles.wrapperAudioSwipper}>
                            <View style={{width: width - 100, height: width - 100, marginBottom: 100, borderRadius: ((width - 100)/2), overflow: 'hidden'}}>
                              <Animated.Image source={{uri: listAudio.content.image, cache: 'reload'}}
                                               style={[styles.centering, {width: width - 100, height: width - 100, borderRadius: ((width - 100)/2), transform: [{rotate: spin}]}]}
                                               onLoadEnd={(e) => this.setState({imageLoading: false})}
                              />
                              {
                                (this.state.imageLoading || this.state.currentTime <= 0) &&
                                  <View style={[styles.centering, {width: width - 100, height: width - 100, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}]}>
                                    <ActivityIndicator size="small" color="white" />
                                  </View>
                              }
                            </View>
                            <Text style={[styles.white, {fontSize: 20, textAlign: 'center', lineHeight: 30}]}>{albumName}</Text>
                            {(songName != '') && <Text style={[styles.white, {fontSize: 16, textAlign: 'center'}]}>{songName}</Text>}
                          </View>

                        </Swiper>
                    }

                      <View style={[styles.column, {flex: 1, padding: 7}]}>

                          <ProgressAudio
                           isLive={listAudio.content.isLive}
                           contentId={listAudio.content.id}
                           userInfo={userInfo}
                           paused={paused}
                           playOrPause={this.playOrPause}
                           duration={duration} currentTime={currentTime}
                           percent={flexCompleted} remain={flexRemaining}
                           onForward={this.onForward}
                           changeLinkAudio={this.changeLinkAudio}
                           submitted={submitted}
                           isCurrentLive={isCurrentLive}
                           onNewPercent={this.onProgressChanged}
                           isNextItem={isNextItem} isPrevItem={isPrevItem}
                           dataItems={dataItems} currentItemPlay={currentItemPlay}
                           onRandom={this.onRandom} isShowRelated={isShowRelated}
                           showHideButtons={showHideButtons}
                           onRepeat={this.onRepeat}
                           isRandom={isRandom} repeatNumber={repeatNumber}
                           isPlaylist={dataAudio.isPlaylist}
                           isLogin={isLogin}
                           list={list}
                           width={this.props.width}
                           albumName={albumName}
                           showHideOnlyRepeatOneButton={showHideOnlyRepeatOneButton}
                            />

                       </View>
                    </View>
                    }
                    </View>
        </Animatable.View>
      :
      <View style={[styles.container, styles.centering, styles.waiting]}>
        <ActivityIndicator size="small" color="white" />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data:  state.views
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
      {
        receiveAudio: viewsActions.receiveAudioApi,
        destroyAudio: viewsActions.destroyAudioApi
      },
      dispatch
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerAudio);
