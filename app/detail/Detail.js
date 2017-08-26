"use strict";

import React, { PropTypes, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
  InteractionManager
} from "react-native";
import styles from "../styles/Styles";
import PlayerVideo from "../player/PlayerVideo";

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentWillMount() {
    const { receiveDetail, dataDetail, data } = this.props;

    if (parseInt(this.props.idChild) > 0) {
      receiveDetail(this.props.idChild);
    } else {
      this.props.passProps &&
        this.props.passProps.timelines &&
        dataDetail(this.props.passProps.timelines.content);
    }

    this.forceUpdate(this.closeAudio());

    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: true });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentTime: nextProps.currentTime
    });
  }

  closeAudio = () => {
    const { handlePlayerClose } = this.props;
    handlePlayerClose();
  };

  render() {
    const {
      data,
      isLogin,
      navigator,
      fullscreenPlayer,
      width,
      height,
      fullscreen,
      imageDeviceLanscape,
      chromecastId
    } = this.props;
    const { loading } = this.state;

    let paddingTop = fullscreen ? 0 : 64;
    let resizeMode = fullscreen ? "stretch" : "contain";

    return (
      <View style={[styles.container, { paddingTop: paddingTop }]}>
        {loading && data.listDetail
          ? <PlayerVideo
              listDetail={data.listDetail}
              isLogin={isLogin}
              navigator={navigator}
              id={5}
              {...this.state}
              handleChromecastList={this.handleChromecastList}
              width={width}
              height={height}
              resizeMode={resizeMode}
              updateVideoCurrentTime={this.updateVideoCurrentTime}
              dataSource={this.props.data.dataSource}
              imageDeviceLanscape={imageDeviceLanscape}
              chromecastId={chromecastId}
              fullscreenPlayer={fullscreenPlayer}
              fullscreen={fullscreen}
              connected={this.props.connected}
            />
          : <View style={[styles.centering, styles.waiting]}>
              <ActivityIndicator size="small" color="white" />
            </View>}
      </View>
    );
  }
}

Detail.propTypes = {
  navigator: PropTypes.object,
  navigate: PropTypes.func
};

export default Detail;
