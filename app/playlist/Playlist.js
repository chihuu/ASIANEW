"use strict";

import React, { Component } from "react";
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
import styles from "../styles/Style";
import { CachedImage } from "react-native-img-cache";
import { CheckBox } from "react-native-elements";
import {
  ProgressAudio,
  ModalEdit,
  ModalPlaylist,
  ModalEditDetails,
  ModalMessage,
  AddPlaylistModalButton,
  ModalCreatePlaylist,
  ModalDeleteConfirm,
  ModalEditForm,
  Button
} from "../../components";
import ListAll from "./ListAll";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as viewsActions from "../common/redux/actions/playlist";
import { AppErrors, Config } from "../common/config";
import { Icon } from "react-native-elements";

const { width, height } = Dimensions.get("window");

export class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      modalMessageVisible: false,
      modalDeleteConfirmVisible: false,
      modalCreateVisible: false,
      editModalVisible: false,
      audioChecked: false,
      videoChecked: false,
      message: null,
      loading: false,
      playlistId: null,
      item: null
    };
  }

  componentDidMount() {
    this._receivePlaylist();

    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: true });
    });

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      if (!!this.props.data.list.error) {
        this.forceUpdate(this.showErrors(this.props.data.list.message));
      } else {
        this.forceUpdate(this._interact());
      }
    }, 800);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  _interact() {
    const { handlePlayerClose } = this.props;
    this.setState({ loading: true });
    //handlePlayerClose();
  }

  _receivePlaylist() {
    const { receivePlaylist, userInfo } = this.props;

    if (userInfo && userInfo.accessToken) {
      receivePlaylist(userInfo.accessToken, -1);
    }
  }

  _setModalVisible = (visible, item = null) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.setState({ modalVisible: visible, item: item });
  };

  _setModalMessageVisible = visible => {
    this.setState({ modalVisible: false, modalMessageVisible: visible });

    // this.timeout = setTimeout(() => {
    //   this.setState({modalMessageVisible: false});
    //   this._receivePlaylist();
    // }, 6000);
  };

  _videoRadioChecked() {
    const { audioChecked } = this.state;

    this.setState({
      audioChecked: false,
      videoChecked: true
    });
  }

  _audioRadioChecked() {
    const { audioChecked } = this.state;

    this.setState({
      audioChecked: true,
      videoChecked: false
    });
  }

  _onContentPlaylist = playlistId => {
    const { navigator } = this.props;

    navigator.push({
      id: 12,
      idChild: playlistId
    });
  };

  _setCancelModalCreatePlaylist = () => {
    this.setState({
      modalCreateVisible: false,
      modalMessageVisible: false,
      modalVisible: false,
      modalDeleteConfirmVisible: false,
      editModalVisible: false
    });
  };

  _setEditModalVisible = visible => {
    this.setState({ editModalVisible: visible, modalVisible: false });
  };

  _setModalDeleteConfirmVisible = visible => {
    this.setState({ modalDeleteConfirmVisible: visible, modalVisible: false });
  };

  _setModalDeleteContentVisible = () => {
    this.setState({ modalDeleteConfirmVisible: false, modalVisible: false });
  };

  showPlaylist = (item, index) => {
    const { sizeCategoryContainer, sizeCategoryImage } = this.props;

    return (
      <View
        style={[
          {
            flexDirection: "row",
            borderBottomWidth: 0.5,
            borderColor: "#CCCCCC",
            paddingVertical: 10
          }
        ]}
        key={index}
      >
        <TouchableOpacity
          style={[styles.row, { flex: 1 }]}
          onPress={() => this._onContentPlaylist(item.playlist_id)}
        >
          <CachedImage
            style={[
              styles.centering,
              styles.imageBorderRadius,
              { width: 50, height: 50, marginHorizontal: 7 }
            ]}
            defaultSource={require("../../../common/images/common/default_thumbnail_radio.png")}
            source={{ uri: item.image }}
            mutable
          />

          <View style={styles.sectionPlaylistHeader}>
            <Text style={styles.sectionPlaylistTitle}>
              {item.name}
            </Text>
            <Text style={styles.sectionPlaylistSubTitle}>
              {item.content_count} songs
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            bottom: 0
          }}
          onPress={() => this._setModalVisible(!this.state.modalVisible, item)}
        >
          <Image source={Config.ACTION_IMAGE} style={styles.actionImage} />
        </TouchableOpacity>
      </View>
    );
  };

  modalEditDetails = () => {
    const { modalVisible, modalDeleteConfirmVisible, item } = this.state;

    return (
      item !== null &&
      <ModalEditDetails
        modalVisible={modalVisible}
        onPress={() => this._setModalVisible(!modalVisible)}
      >
        <View style={[styles.row, { margin: 7 }]}>
          <Image
            style={[styles.imageContentPlaylist, styles.imageBorderRadius]}
            source={{ uri: item.image }}
          />
          <View style={{ justifyContent: "flex-end" }}>
            <Text style={styles.black}>
              {item.name}
            </Text>
            <Text style={styles.sectionPlaylistSubTitle}>
              {item.content_count} songs
            </Text>
          </View>
        </View>

        <View style={[styles.row]}>
          <TouchableHighlight
            style={{ width: "100%", paddingLeft: 7, paddingVertical: 15 }}
            underlayColor={"#ececec"}
            onPress={() =>
              this._setEditModalVisible(!this.state.editModalVisible)}
          >
            <View style={styles.row}>
              <Icon
                name="pencil-square-o"
                type="font-awesome"
                size={16}
                color={"#505050"}
                containerStyle={{ marginRight: 7 }}
              />

              <Text style={styles.black}>Rename Playlist</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={[styles.row]}>
          <TouchableHighlight
            style={{ width: "100%", paddingLeft: 7, paddingVertical: 15 }}
            underlayColor={"#ececec"}
            onPress={() =>
              this._setModalDeleteConfirmVisible(!modalDeleteConfirmVisible)}
          >
            <View style={styles.row}>
              <Icon
                name="trash-o"
                type="font-awesome"
                size={16}
                color={"#505050"}
                containerStyle={{ marginRight: 10 }}
              />
              <Text style={styles.black}>Delete Playlist</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View
          style={[
            styles.border1pxPlaylist,
            {
              bottom: 0,
              position: "relative",
              width: this.props.width - 14,
              alignItems: "center"
            }
          ]}
        >
          <TouchableHighlight
            onPress={() => this._setModalVisible(!this.state.modalVisible)}
            style={{ paddingVertical: 15, width: this.props.width - 14 }}
            underlayColor={"#ececec"}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#45cbe2",
                fontFamily: "RobotoCondensed-Bold"
              }}
            >
              CLOSE
            </Text>
          </TouchableHighlight>
        </View>
      </ModalEditDetails>
    );
  };

  modalEditForm = () => {
    const { editModalVisible, item } = this.state;

    return (
      item !== null &&
      <ModalEditForm
        modalVisible={editModalVisible}
        onCancel={this._setCancelModalCreatePlaylist}
        name={item.name}
        item={item}
        updatePlaylist={this._updatePlaylist}
      />
    );
  };

  modalDeleteConfirm = () => {
    const { modalDeleteConfirmVisible, item } = this.state;

    return (
      item !== null &&
      <ModalDeleteConfirm
        modalVisible={modalDeleteConfirmVisible}
        onCancel={() =>
          this._setModalDeleteContentVisible(!modalDeleteConfirmVisible)}
        onDelete={this._deletePlaylist}
        playlistId={item.playlist_id}
      />
    );
  };

  _setModalCreateVisible = visible => {
    this.setState({ modalCreateVisible: visible, modalVisible: false });
  };

  _setModalStoreVisible = visible => {
    this.timeout = setTimeout(() => {
      this.setState({
        modalCreateVisible: false,
        modalVisible: false,
        modalMessageVisible: true
      });
    }, 1000);

    this.timeout = setTimeout(() => {
      this.setState({ modalMessageVisible: false, message: null });
    }, 3000);

    this.timeout = setTimeout(() => {
      !this.state.modalMessageVisible && this._receivePlaylist();
    }, 3100);
  };

  _updatePlaylist = item => {
    const {
      receiveUpdatePlaylist,
      destroyDeletePlaylist,
      userInfo,
      data
    } = this.props;
    const mode = 0;

    this.setState({
      editModalVisible: false,
      modalDeleteConfirmVisible: false,
      modalMessageVisible: true
    });

    if (userInfo.accessToken && parseInt(item.playlist_id) > 0 && item.name) {
      destroyDeletePlaylist();
      receiveUpdatePlaylist(
        userInfo.accessToken,
        item.playlist_id,
        item.name,
        mode
      );
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.setState({ modalMessageVisible: false });
    }, 3000);

    this.timeout = setTimeout(() => {
      this._receivePlaylist();
    }, 3100);
  };

  _deletePlaylist = playlistId => {
    const { navigator, receiveDeletePlaylist, userInfo } = this.props;

    this.setState({
      modalDeleteConfirmVisible: false,
      modalMessageVisible: true
    });

    if (parseInt(playlistId) > 0 && userInfo && userInfo.accessToken) {
      receiveDeletePlaylist(userInfo.accessToken, playlistId);
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.setState({ modalMessageVisible: false });
    }, 3000);

    this.timeout = setTimeout(() => {
      this._receivePlaylist();
    }, 3100);
  };

  showErrors = message => {
    return AppErrors.showErrors(message);
  };

  showMessage(message) {
    const { modalMessageVisible } = this.state;
    return (
      <ModalMessage modalVisible={modalMessageVisible}>
        <Text style={[{ color: "red", fontSize: 14 }]}>
          {message}
        </Text>
      </ModalMessage>
    );
  }

  displayedConfirm(message) {
    this.showMessage(message);

    setTimeout(() => {
      this.setState({ editModalVisible: false, modalMessageVisible: false });
    }, 4000);
  }

  render() {
    const {
      sizeContainer,
      listenSizeContainer,
      sizeImage,
      listenSizeImage,
      sizeText,
      data,
      userInfo
    } = this.props;
    const { modalMessageVisible, loading, modalVisible } = this.state;

    return (
      <View style={[styles.container, { paddingTop: 64 }]}>
        <ModalCreatePlaylist
          mode={-1}
          modalVisible={this.state.modalCreateVisible}
          userInfo={userInfo}
          onPress={() =>
            this._setModalStoreVisible(!this.state.modalCreateVisible)}
          onCancel={this._setCancelModalCreatePlaylist}
        />

        <TouchableOpacity
          style={styles.btnPlaylistContainer}
          onPress={() =>
            this._setModalCreateVisible(!this.state.modalCreateVisible)}
        >
          <Text style={[styles.textGreen, styles.marginRight]}>
            Create Playlist
          </Text>
          <Text style={styles.textGreen}>+</Text>
        </TouchableOpacity>

        {loading
          ? data.listPlaylist && data.listPlaylist.playlists
            ? <ScrollView
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
              >
                {data.listPlaylist.playlists.map(this.showPlaylist)}
                {this.modalEditDetails()}
                {this.modalEditForm()}
                {this.modalDeleteConfirm()}
              </ScrollView>
            : null
          : <View style={[styles.container, styles.centering, styles.waiting]}>
              <ActivityIndicator size="small" color="white" />
            </View>}

        {modalMessageVisible &&
          data.list.addPlaylist &&
          <ModalMessage
            modalVisible={modalMessageVisible}
            onPress={() =>
              this._setCancelModalCreatePlaylist(!modalMessageVisible)}
          >
            <Text style={[styles.white, { fontSize: 14 }]}>
              {data.list.addPlaylist.message}
            </Text>
          </ModalMessage>}

        {modalMessageVisible &&
          data.list.updatePlaylist &&
          <ModalMessage
            modalVisible={modalMessageVisible}
            onPress={() =>
              this._setCancelModalCreatePlaylist(!modalMessageVisible)}
          >
            <Text style={[styles.white, { fontSize: 14 }]}>
              {data.list.updatePlaylist.message}
            </Text>
          </ModalMessage>}

        {modalMessageVisible &&
          data.deletePlaylist &&
          <ModalMessage
            modalVisible={modalMessageVisible}
            onPress={() =>
              this._setCancelModalCreatePlaylist(!modalMessageVisible)}
          >
            <Text style={[styles.white, { fontSize: 14 }]}>
              {data.deletePlaylist.message}
            </Text>
          </ModalMessage>}
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
      receiveDestroyAddPlaylist: viewsActions.receiveDestroyAddPlaylistApi,
      receiveUpdatePlaylist: viewsActions.receiveUpdatePlaylistApi,
      receiveDeletePlaylist: viewsActions.receiveDeletePlaylistApi,
      destroyDeletePlaylist: viewsActions.destroyDeletePlaylistApi
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
