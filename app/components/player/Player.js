import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Dimensions, AppState, ActivityIndicator } from 'react-native';
import styles from '../../styles/Style';
import PlayerVideo from './PlayerVideo';

let {width, height} = Dimensions.get('window');

export default class Player extends Component {
  render() {
    return (
        parseInt(this.props.listDetail.content.mode) === 1 && <PlayerVideo listDetail={this.props.listDetail} isLogin={this.props.isLogin} navigator={this.props.navigator} id={5} />
    )
  }
}
