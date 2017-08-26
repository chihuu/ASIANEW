"use strict";

import React, { PropTypes, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ListView,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
  InteractionManager,
  Modal,
  TextInput,
  Image
} from "react-native";
import styles from "../styles/Styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as viewsActions from "./actionPlaylist";

const { width, height } = Dimensions.get("window");

export class ListAll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      submitted: false,
      countTime: 0 //If countTime 15 return
    };
  }

  componentDidMount() {
    const { receivePlaylist, userInfo, mode, modalVisible } = this.props;

    if (userInfo && userInfo.accessToken) {
      receivePlaylist(userInfo.accessToken, mode);
    }

    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: true, mode: mode });
    });

    this.interval = setInterval(() => {
      this.setState({ countTime: parseInt(this.state.countTime) + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    const { destroyPlaylist, modalVisible } = this.props;

    this.setState({ loading: false });

    destroyPlaylist();

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  addPlaylist(playlistId, contentId) {
    const {
      receivePlaylistAddContent,
      userInfo,
      modalVisible,
      onPress,
      destroyPlaylist
    } = this.props;

    if (playlistId > 0 && contentId > 0) {
      this.setState({ submitted: true });

      receivePlaylistAddContent(userInfo.accessToken, playlistId, contentId);
      onPress(!modalVisible);
    }
  }

  displayRowItems = (playlist, index) => {
    const { contentId } = this.props;

    return (
      //playlist.id: id of playlist,
      <TouchableHighlight
        style={{ width: "100%", paddingVertical: 5 }}
        underlayColor={"#ececec"}
        onPress={() =>
          this.addPlaylist(parseInt(playlist.playlist_id), parseInt(contentId))}
        key={index}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <Image
            style={[{ width: 25, height: 25, marginRight: 12 }]}
            source={require("../common/images/common/playlistPlay.png")}
          />
          <Text>
            {playlist.name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  hideModalAddContent = message => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.setState({ submitted: false });
    }, 800);
    this.timeout = setTimeout(() => {
      this.props.onPress(true, message);
    }, 1200);
  };

  // showMessageAddContent = () => {
  //
  //
  //   // this.timeout = setTimeout(() => {
  //   //   destroyPlaylist();
  //   // }, 4000);
  // }

  render() {
    const { listPlaylist, list } = this.props.data;
    const { addContentPlaylist } = list;
    const { loading, submitted, countTime } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {listPlaylist && listPlaylist.playlists
          ? listPlaylist.playlists.length == 0
            ? null
            : <ScrollView
                showsVerticalScrollIndicator={false}
                automaticallyAdjustContentInsets={true}
                scrollEventThrottle={200}
                style={{ flex: 1, flexDirection: "column" }}
              >
                {listPlaylist.playlists.length > 0
                  ? listPlaylist.playlists.map(this.displayRowItems)
                  : null}
              </ScrollView>
          : countTime < 10
            ? <View
                style={[
                  styles.container,
                  styles.waiting,
                  { justifyContent: "center", alignItems: "flex-start" }
                ]}
              >
                <ActivityIndicator size="small" color="#000000" />
              </View>
            : null}

        {submitted && addContentPlaylist
          ? this.hideModalAddContent(addContentPlaylist.message)
          : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.views
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      receivePlaylist: viewsActions.receivePlaylistApi,
      receivePlaylistAddContent: viewsActions.receivePlaylistAddContentApi,
      destroyPlaylist: viewsActions.destroyPlaylistApi
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAll);
