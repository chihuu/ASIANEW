'use strict';

import React, {
  PropTypes,
  Component
}                             from 'react';
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
  TouchableWithoutFeedback,
  Keyboard,
  Image
}                             from 'react-native';
import styles from '../../styles/Style';
import {CachedImage} from "react-native-img-cache";
import {
  ProgressAudio, ModalEdit, ModalPlaylist, ModalEditDetails, ModalMessage, AddPlaylistModalButton,
  ModalCreatePlaylist, ModalDeleteConfirm, ModalEditForm
} from '../../components';
import ListAll from '../playlist/ListAll';
import RowContentPlaylist from './RowContentPlaylist';
import Video from 'react-native-video';
import { Config }        from '../../../common/config';
import debounce from 'lodash/debounce';
import { Icon } from 'react-native-elements';

const {width, height} = Dimensions.get('window');

export default class ContentPlaylist extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      submitted: false,
      currentItemPlay: 0, //If has episodes, series auto next play
      nextItemPlay: 0, //If has episodes, series auto next play
      repeat: false,
      isNextItem: false,
      isPrevItem: false,
      isRandom: false,
      isEnd: false,
      modalVisible: false,
      editModalVisible: false,
      modalMessageVisible: false,
      modalPlaylistVisible: false,
      modalPlaylistAddContentVisible: false,
      modalCreateVisible: false,
      modalDeleteConfirmVisible: false,
      name: null,
      isActive: 0,
      repeatNumber: 0,
    }
  }

  componentWillMount() {
    setTimeout(() => {
      const {receiveContentPlaylist, userInfo, idChild} = this.props;

      if(userInfo && userInfo.accessToken) {
        receiveContentPlaylist(userInfo.accessToken, idChild);
      }
    }, 500);

    InteractionManager.runAfterInteractions(() => {
      this.setState({loading: true});
    })
  }

  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      this.forceUpdate(this._interact())
    }, 2000);
  }

  _interact() {
      let name = null;

      if(this.props.data.list.listContentPlaylist && this.props.data.list.listContentPlaylist.playlists) {
        name = this.props.data.list.listContentPlaylist.playlists.name;
      }
      this.setState({loading: true, name: name});
  }

  _receiveContentPlaylist() {
    const {receiveContentPlaylist, userInfo, idChild} = this.props;

    if(userInfo && userInfo.accessToken) {
      receiveContentPlaylist(userInfo.accessToken, idChild);
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   setTimeout(() => {
  //     this.setState({loading: true});
  //   }, 3000)
  //   return true;
  // }

  componentWillUnmount() {
    const { receiveDestroyContentPlaylist } = this.props;

    receiveDestroyContentPlaylist();

    this.setState({
      paused: true,
      link: null
    });
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  _renderRow(item, sectionID, rowID) {

    const {currentItemPlay, currentTime, paused, modalPlaylistVisible} = this.state;
    const {listAudio, data, idChild} = this.props;
    let dataContent = null;

    if(data.list && data.list.listContentPlaylist && data.list.listContentPlaylist.playlists && data.list.listContentPlaylist.playlists.contents) {
        dataContent = data.list.listContentPlaylist.playlists.contents;
    } else if((data.listContentPlaylist && data.listContentPlaylist.playlists && data.listContentPlaylist.playlists.contents)) {
        dataContent = data.listContentPlaylist.playlists.contents;
    }

    return(
      <RowContentPlaylist item={item} rowID={rowID} dataContent={dataContent} playlistId={idChild}
      _setModalPlaylistVisible={this._setModalPlaylistVisible} modalPlaylistVisible={modalPlaylistVisible} currentItemPlay={currentItemPlay}
      currentTime={currentTime} paused={paused} changeLink={this.changeLink} listAudio={listAudio} />
    )
  }

  _setModalVisible = (visible, item = null) => {
    this.setState({modalVisible: visible, item: item});
  }

  _setEditModalVisible = (visible) => {
    this.setState({editModalVisible: visible, modalVisible: false});
  }

  _setModalMessageVisible = (visible) => {
      this.setState({editModalVisible: false, modalVisible: false, modalMessageVisible: visible, isAction: 1});

      //After 6 seconds, hide modal message. re-fetch data content playlist
      this.timeout = setTimeout(() => {
        this.setState({modalMessageVisible: false});
        this._receiveContentPlaylist();
      }, 6000);
  }

  _setModalMessageDeleteVisible = (visible) => {
    const {navigator} = this.props;

    this.setState({editModalVisible: false, modalVisible: false, modalDeleteConfirmVisible: false, modalMessageVisible: visible, isAction: 2});

    //After 6 seconds, hide modal message. re-fetch data content playlist
    setTimeout(() => {
      this.setState({modalMessageVisible: false});
    }, 4000);

    setTimeout(() => {
      navigator.push({id: 11});
    }, 6000);
  }

  _setCurrentModalVisible = () => {
    this.setState({editModalVisible: false, modalVisible: false});
  }

  _updatePlaylist = (items) => {
    const { receiveUpdatePlaylist, userInfo, data} = this.props;
    const {playlist_id, mode} = (data.list.listContentPlaylist && data.list.listContentPlaylist.playlists) || (data.listContentPlaylist && data.listContentPlaylist.playlists);

    if(userInfo.accessToken && parseInt(playlist_id) > 0 && items.name) {
      receiveUpdatePlaylist(userInfo.accessToken, playlist_id, items.name, mode);
      //Hide all modal, show modal message
      this._setModalMessageVisible(!this.state.modalMessageVisible);
    }
  }

  _deletePlaylist = (playlistId) => {
    const {navigator, receiveDeletePlaylist, userInfo} = this.props;

    if(parseInt(playlistId) > 0 && userInfo && userInfo.accessToken) {
      receiveDeletePlaylist(userInfo.accessToken, playlistId);
      this._setModalMessageDeleteVisible(!this.state.modalMessageVisible);
      //this.setState({modalMessageVisible: !this.state.modalMessageVisible, modalVisible: false});
    }

    this.timeout = setTimeout(() => {
      navigator.replace({id: 11});
    }, 6000)
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onEnd = (e) => {
    const {isRandom, repeat, repeatNumber} = this.state;

    this.setState({
      paused: true,
    });

    if(isRandom || (!repeat && repeatNumber == 2)) {
      this.forceUpdate(this.processWhenEnd());
    }
  }

  processWhenEnd = () => {
    const {isRandom, repeat, currentItemPlay, repeatNumber} = this.state;

    const {contents} =  this.props.data.list.listContentPlaylist.playlists || this.props.data.listContentPlaylist.playlists;

    let rowCurrentItemPlay = 0;

    if(((parseInt(currentItemPlay) + 1) == contents.length) || contents.length <= 1) {
      return false;
    }

    if(contents.length == 2) {
        rowCurrentItemPlay = currentItemPlay == 1 ? 0 : 1;
    }

    if(isRandom) {
        rowCurrentItemPlay = this.getRandomIntInclusive(0, (contents.length - 1));
    }

    if(repeatNumber == 2 && !repeat) {
      rowCurrentItemPlay = currentItemPlay + 1;
    }

    if(contents[rowCurrentItemPlay]) {
      this.changeLinkAudio({
        paused: true,
        submitted: true,
        linkAudio: contents[rowCurrentItemPlay].link,
        audioName: contents[rowCurrentItemPlay].name,
        currentItemPlay: rowCurrentItemPlay,
        isNextItem: true,
        currentTime: 0,
        duration: 0,
        isPrevItem: (rowCurrentItemPlay == 0) ? false : true,
      });
    }
  }

  _setModalPlaylistVisible = (visible, dataId = null, mode: -1) => {
    this.setState({modalPlaylistVisible: visible, contentId: dataId, modalPlaylistAddContentVisible: false, mode: mode});
  }

  _setModalPlaylistCreateVisible = (visible) => {
    this.setState({modalPlaylistCreateVisible: visible, modalPlaylistVisible: false});
  }

  _setModalPlaylistAddContentVisible = (visible) => {
      this.timeout = setTimeout(() => {
        this.setState({modalMessageVisible: visible, modalPlaylistVisible: false, contentId: null, isAction: 0});
      }, 1000);

      this.timeout = setTimeout(() => {
        this.setState({modalMessageVisible: false});
      }, 6000);
  }

  _setModalCreateVisible = (visible) => {
    this.timeout = setTimeout(() => {
      this.setState({modalCreateVisible: visible, modalPlaylistVisible: false, modalMessageVisible: true});
    });

    this.timeout = setTimeout(() => {
      this.setState({modalMessageVisible: false});
    }, 6000);
  }

  _setModalDeleteConfirmVisible = (visible) => {
      this.setState({modalDeleteConfirmVisible: visible, modalVisible: false});
  }

  render() {
    const {data} = this.props;
    const {list} = data;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let message = '';
    let dataListContentPlaylist = null;
    let dataContent = null;

    if(list && list.listContentPlaylist && list.listContentPlaylist.playlists && list.listContentPlaylist.playlists.contents) {
        dataContent = list.listContentPlaylist.playlists;
    } else if((data.listContentPlaylist && data.listContentPlaylist.playlists && data.listContentPlaylist.playlists.contents)) {
        dataContent = data.listContentPlaylist.playlists;
    }

    let {
      modalMessageVisible, audioScale, loading, submitted, isAction
    } = this.state;

    if(list.addContentPlaylist && isAction == 0) {
      message = list.addContentPlaylist.message;
    } else if(data.updatePlaylist && isAction == 1) {
      message = data.updatePlaylist.message;
    } else if(data.deletePlaylist && isAction == 2) {
      message = data.deletePlaylist.message;
    }

    return (
      <View style={[{flex: 1, paddingTop: 64, backgroundColor: '#000000'}]}>

        {
          (loading && data && dataContent && dataContent.contents)
          ?
            <View style={{flex: 1}}>
              <View style={[styles.row, styles.paddingDefault]}>
                  <Image
                      style={[styles.imageContentPlaylist, styles.imageBorderRadius]}
                      source={{uri: dataContent.image}}
                  />
                  <View style={{justifyContent: 'flex-end'}}>
                    <Text style={styles.sectionContentPlaylistTitle}>{dataContent.name}</Text>
                    <Text style={styles.sectionPlaylistSubTitle}>{dataContent.content_count} songs</Text>
                  </View>
              </View>

              <View style={[styles.row, styles.paddingDefault, styles.sectionHeaderBgGrey]}>

                  <TouchableOpacity style={{alignItems: 'flex-end', flex: 1}} onPress={() => this._setModalVisible(!this.state.modalVisible, dataContent)}>
                    <Image source={Config.ACTION_IMAGE} style={styles.actionImage} />
                  </TouchableOpacity>
              </View>

              <View style={{flex: 1}}>
                <ListView
                  dataSource={ds.cloneWithRows(dataContent.contents)}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={true}
                  pageSize={6}
                  initialListSize={8}
                  enableEmptySections={true}
                  renderRow={this._renderRow.bind(this)} />
              </View>

              <ModalEditDetails modalVisible={this.state.modalVisible} onPress={() => this._setModalVisible(!this.state.modalVisible)}>

                <View style={[styles.row, {margin: 7}]}>
                    <Image
                        style={[styles.imageContentPlaylist, styles.imageBorderRadius]}
                        source={{uri: dataContent.image}}
                    />
                    <View style={{justifyContent: 'flex-end'}}>
                      <Text style={styles.black}>{dataContent.name}</Text>
                      <Text style={styles.sectionPlaylistSubTitle}>{dataContent.content_count} songs</Text>
                    </View>
                </View>

                <View style={[styles.row]}>
                  <TouchableHighlight style={{width: '100%', paddingLeft: 7, paddingVertical: 15}} underlayColor={'#ececec'} onPress={() => this._setEditModalVisible(!this.state.editModalVisible)}>
                    <View style={styles.row}>
                      <Icon
                          name='pencil-square-o'
                          type='font-awesome'
                          size={16}
                          color={'#505050'}
                          containerStyle={{marginRight: 7}}
                        />

                      <Text style={styles.black}>Rename Playlist</Text>
                    </View>
                  </TouchableHighlight>
                </View>

                <View style={[styles.row]}>
                  <TouchableHighlight style={{width: '100%', paddingLeft: 7, paddingVertical: 15}} underlayColor={'#ececec'}
                      onPress={() => this._setModalDeleteConfirmVisible(!this.state.modalDeleteConfirmVisible)}>
                    <View style={styles.row}>
                      <Icon
                          name='trash-o'
                          type='font-awesome'
                          size={16}
                          color={'#505050'}
                          containerStyle={{marginRight: 10}}
                        />
                        <Text style={styles.black}>Delete Playlist</Text>
                    </View>
                  </TouchableHighlight>
                </View>

                <View style={[styles.border1pxPlaylist, {bottom: 0, position: 'relative', width: this.props.width - 14, alignItems: 'center'}]}>
                  <TouchableHighlight onPress={() => this._setModalVisible(!this.state.modalVisible)}
                    style={{paddingVertical: 15, width: this.props.width - 14}} underlayColor={'#ececec'}>
                    <Text style={{textAlign: 'center', color: '#45cbe2', fontFamily: 'RobotoCondensed-Bold'}}>CLOSE</Text>
                  </TouchableHighlight>
                </View>
              </ModalEditDetails>

              <ModalEditForm modalVisible={this.state.editModalVisible} onCancel={() => this._setEditModalVisible(!this.state.editModalVisible)}
               name={dataContent.name} item={dataContent} updatePlaylist={this._updatePlaylist} />

              <ModalCreatePlaylist userInfo={this.props.userInfo} contentId={dataContent.playlist_id} mode={dataContent.mode}
                modalVisible={this.state.modalCreateVisible} onPress={() => this._setModalCreateVisible(!this.state.modalCreateVisible)} />

              <ModalPlaylist
                  modalVisible={this.state.modalPlaylistVisible}
                  mode={dataContent.mode}
                  onPress={() => this._setModalPlaylistVisible(!this.state.modalPlaylistVisible)}>

                  <TouchableWithoutFeedback onPress={() => this._setModalPlaylistVisible(!this.state.modalPlaylistVisible)}>
                    <View style={{height: '60%', position: 'absolute', top: 0, right: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
                    </View>
                  </TouchableWithoutFeedback>

                  <View style={{height: '40%', backgroundColor: '#FFFFFF', position: 'absolute', right: 0, bottom: 0, left: 0, padding: 7, alignItems: 'center'}}>
                    <AddPlaylistModalButton
                      style={styles.row}
                      onPress={() => this._setModalCreateVisible(!this.state.modalCreateVisible)}>
                      <Text>Create playlist</Text>
                    </AddPlaylistModalButton>

                    <ListAll style={{height: '30%'}} userInfo={this.props.userInfo} playlistId={dataContent.playlistId} contentId={this.state.contentId} mode={dataContent.mode}
                              onPress={this._setModalPlaylistAddContentVisible}
                              modalVisible={!this.state.modalMessageVisible} />
                  </View>
              </ModalPlaylist>

              <ModalDeleteConfirm  modalVisible={this.state.modalDeleteConfirmVisible} onCancel={() => this._setModalDeleteConfirmVisible(!this.state.modalDeleteConfirmVisible)}
                onDelete={this._deletePlaylist} playlistId={dataContent.playlist_id} />

              {
                (modalMessageVisible) &&
                  <ModalMessage modalVisible={modalMessageVisible}>
                    <Text style={[styles.white, {fontSize: 14}]}>{message}</Text>
                  </ModalMessage>
              }

            </View>
          :
              <View style={[styles.container, styles.centering, styles.waiting]}>
                <ActivityIndicator size="small" color="white" />
              </View>
        }
      </View>
    );
  }

}
