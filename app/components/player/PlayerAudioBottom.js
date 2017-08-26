import React, { Component } from 'react';
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
  ScrollView,
  TouchableHighlight
} from 'react-native';
import styles from '../../styles/Style';
import Video from 'react-native-video';
import Swipeable from 'react-native-swipeable';
//import SwipeableElement from 'react-native-swipeable-element';
import { Icon } from 'react-native-elements';
import {CachedImage} from "react-native-img-cache";

let {width, height} = Dimensions.get('window');

export default class PlayerAudioBottom extends Component {

  constructor(props) {
    super(props);

    this.handleAudioScale = this.handleAudioScale.bind(this);

    this.state = ({
      rate: 1.0,
      volume: 1.0,
      muted: false,
      duration: 0.0,
      currentTime: 0.0,
    });
  }

  onLoad(data) {
    this.setState({
      duration: data.duration,
      imageLoading: false
    });
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  onPaused() {
    this.setState({paused: !this.state.paused});
  }

  onCloseAudio() {
      const {closeAudio} = this.props;
      closeAudio();
  }

  handleAudioScale() {
    const {handleAudioScale}  = this.props;
    handleAudioScale();
  }

  onForward() {
    const {dataItems, currentItemPlay, changeLinkAudio} = this.props;

    if(dataItems.length == parseInt(currentItemPlay) + 1) {
      return false;
    }

    changeLinkAudio({
      submitted: true,
      linkAudio: dataItems[parseInt(currentItemPlay) + 1].link,
      songName: dataItems[parseInt(currentItemPlay) + 1].name,
      currentItemPlay: parseInt(currentItemPlay) + 1,
      duration: 0.0,
      currentTime: 0.0,
      isCurrentLive: false
    })
  }

  onPrev() {
    const {dataItems, currentItemPlay, changeLinkAudio} = this.props;

    if(parseInt(currentItemPlay) - 1 < 0) {
      return false;
    }

    changeLinkAudio({
      submitted: true,
      linkAudio: dataItems[parseInt(currentItemPlay) - 1].link,
      songName: dataItems[parseInt(currentItemPlay) - 1].name,
      currentItemPlay: parseInt(currentItemPlay) - 1,
      duration: 0.0,
      currentTime: 0.0,
      isCurrentLive: false
    })
  }


  render() {
    const {image, name, paused, flexCompleted, playOrPause, height, isLive, actors, currentTime} = this.props;

    let swipeoutRightBtn = [
      <TouchableOpacity onPress={this.onCloseAudio.bind(this)} style={[{justifyContent: 'center', alignItems: 'center', width: 75, height: '100%', backgroundColor: 'red'}]}>
          <Text style={{color: '#FFFFFF'}}>Close</Text>
      </TouchableOpacity>
    ];

    return (
      <Swipeable
        rightButtons={swipeoutRightBtn}
        rightButtonWidth={75}
      >
            <View style={[styles.row, {height: height, alignItems: 'center'}]}>

                  <TouchableOpacity style={{paddingLeft: 7, flexDirection: 'row', flex: 1}} onPress={this.handleAudioScale}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                       <Image
                           source={{uri: image}}
                           style={{width: 40, height: 40, borderRadius: 20}}
                           mutable
                         />

                       <View style={styles.wrapperTextBottom}>
                        <Text style={[styles.white, {backgroundColor: 'transparent'}]} ellipsizeMode='tail' numberOfLines={1}>{name}</Text>
                        { <Text style={[styles.subTitleAudio, {backgroundColor: 'transparent'}]} ellipsizeMode='tail' numberOfLines={1}>{actors || 'Unknown Artist'}</Text> }
                       </View>
                     </View>
                   </TouchableOpacity>

                 <View style={styles.groupButtonRadioBottom}>
                    {
                      (!isLive && showHideButtons) ?
                         <TouchableOpacity onPress={() => this.onPrev()}>
                            <Image source={require('../../../common/images/player/Previous_icon_new_95.png')} style={{height: 30, width: 30}} />
                         </TouchableOpacity>
                      :
                         <Image source={require('../../../common/images/player/previousTransparent95.png')} style={{height: 30, width: 30}} />
                    }

                    {
                      paused || currentTime == 0 ?
                        <TouchableOpacity onPress={() => playOrPause()}>
                          <Image source={require('../../../common/images/player/Play_95.png')} style={{height: 40, width: 40, marginLeft: 5, marginRight: 5}} />
                        </TouchableOpacity>
                      :
                        <TouchableOpacity onPress={() => playOrPause()}>
                          <Image source={require('../../../common/images/player/Pause_95.png')} style={{height: 40, width: 40, marginLeft: 5, marginRight: 5}} />
                        </TouchableOpacity>
                    }

                    {
                      (!isLive && showHideButtons) ?
                        <TouchableOpacity onPress={() => this.onForward()}>
                          <Image source={require('../../../common/images/player/Next_icon_new_95.png')} style={{height: 30, width: 30}} />
                        </TouchableOpacity>
                      :
                        <Image source={require('../../../common/images/player/nextTransparent95.png')} style={{height: 30, width: 30}} />
                    }

                  </View>
            </View>
        </Swipeable>
    )
  }
}
