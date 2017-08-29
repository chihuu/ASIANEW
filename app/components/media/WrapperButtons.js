import React, {Component} from 'react';
import _ from "lodash";
import {
  Animated,
  PanResponder,
  Slider,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import styles from '../../styles/Style';
import { Icon } from 'react-native-elements';

let {width, height} = Dimensions.get('window');
let radiusOfHolder = 5;
let radiusOfActiveHolder = 7;
export default class Progress extends Component {

  constructor(props, context, ...args) {
      super(props, context, ...args);
      this.state = {lineX: new Animated.Value(0), slideX: new Animated.Value(0)};
  }

  componentWillReceiveProps(nextProps) {
      if (!this.state.moving) {
          this.state.slideX.setValue(this.computeScreenX(nextProps.percent));
      }
  }

  computeScreenX(percent) {
      return percent * this.state.width / 100;
  }

  componentWillMount() {
      this.holderPanResponder = PanResponder.create({
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onPanResponderGrant: (e, gestureState) => {
              let {slideX} = this.state;
              this.setState({moving: true});
              slideX.setOffset(slideX._value);
              slideX.setValue(0);
          },
          onPanResponderMove: (e, gestureState) => {
              let totalX = this.state.slideX._offset + gestureState.dx;
              let newPercent = (totalX / this.state.width) * 100;
              this.notifyPercentChange(newPercent, true);
              Animated.event([
                  null, {dx: this.state.slideX}
              ])(e, gestureState);
          },
          onPanResponderRelease: (e, gesture) => {
              this.state.slideX.flattenOffset();
              let newPercent = (this.state.slideX._value / this.state.width) * 100;
              this.setState({moving: false});
              this.notifyPercentChange(newPercent, false);
          }
      });
  }

  notifyPercentChange(newPercent, paused) {
      let {onNewPercent} = this.props;
      if (onNewPercent instanceof Function) {
          onNewPercent(newPercent, paused);
      }
  }

  onLayout(e) {
      this.setState({width: e.nativeEvent.layout.width - (radiusOfHolder * 2)});
  }

  getHolderStyle() {
      let {moving, slideX, width} = this.state;

      if (width > 0) {
          var interpolatedAnimation = slideX.interpolate({
              inputRange: [0, width],
              outputRange: [0, width],
              extrapolate: "clamp"
          });
          return [styles.holder, moving && styles.activeHolder,
              {transform: [{translateX: interpolatedAnimation}]}
          ];
      } else {
          return [styles.holder];
      }
  }

  onLinePressed(e) {
      let newPercent = (e.nativeEvent.locationX / this.state.width) * 100;
      this.notifyPercentChange(newPercent, false);
  }

  // formatSeconds(duration = 0) {
  //   var hours = Math.floor(duration / 3600) < 10 ? ("00" + Math.floor(duration / 3600)).slice(-2) : Math.floor(duration / 3600);
  //   var minutes = ("00" + Math.floor((duration % 3600) / 60)).slice(-2);
  //   var seconds = ("00" + (duration % 3600) % 60).slice(-2);
  //   return hours + ":" + minutes + ":" + seconds;
  // }

  formatSeconds(seconds = 0) {
        // let {duration = 0} = this.props;
        // seconds = Math.min(Math.max(seconds, 0), duration);
        // var minutes = seconds / 60;
        // var remainingSeconds = seconds % 60;
        // return _.padStart(minutes.toFixed(0), 2, 0) + ":" + _.padStart(remainingSeconds.toFixed(0), 2, 0);
        return 1;
    }

  render() {
    let {paused, playOrPauseVideo, onInfo } = this.props;
    let iconPlayOrPause = paused ? 'play' : 'pause';

    return (
      <View style={{flex: 1}}>
        <View style={styles.iconInfo}>
          <Icon
            name='info-circle'
            type='font-awesome'
            color='#fff'
            size={14}
            onPress={() => onInfo()} />
        </View>

        <View style={[styles.iconPlay, {top: ((width/16*9)/2 - 10)}]}>
          <Icon
            name={iconPlayOrPause}
            type='font-awesome'
            color='#fff'
            size={14}
            onPress={() => playOrPauseVideo()} />
        </View>

        {this.props.children}
      </View>
    )
  }
}
