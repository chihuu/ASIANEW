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
  ListView,
  InteractionManager
} from 'react-native';
import styles from '../../styles/Style';
import {CachedImage} from "react-native-img-cache";
import { Config } from '../../../common/config';

export default class AudioEpisodes extends Component {

  changeLink = (content, rowID) => {
    const {changeLinkAudio} = this.props;

    changeLinkAudio({
      submitted: true,
      linkAudio: content.link,
      audioName: content.name,
      currentItemPlay: rowID,
      paused: false,
      duration: 0.0,
      currentTime: 0.0,
      isCurrentLive: false
    });
  }

  _renderRow (rowData, sectionID, rowID) {
    let actors = '';

    const {currentItemPlay, currentTime, paused, id, submitted} = this.props;

    if(rowData.actors && rowData.actors != '') {
      if(typeof(rowData.actors) === 'string') {
        actors = rowData.actors;
      } else {
        let arrActors = [];
        rowData.actors.map(function(data, value) {
                   arrActors.push(data.name);
                 });
         actors = arrActors.join(', ')
      }
    }

    return (
      <View key={rowID} style={styles.column}>
          {
            !submitted ?
              (id == rowData.id) ?
                <View style={[styles.row, styles.wrapperRelated]}>
                  <View style={{marginRight: 30, width: 35}}>
                  {
                    currentTime == 0 || paused ?
                      <Image source={Config.ICON_CURRENT_PAUSE} resizeMode="contain" style={[styles.iconCurrentPlay]} />
                    :
                      <Image source={Config.ICON_CURRENT_PLAY} resizeMode="contain" style={[styles.iconCurrentPlay]} />
                  }
                  </View>
                  <View style={[{justifyContent: 'center', flex: 1}]}>
                      <Text style={[styles.titleAudio, {lineHeight: 32}]} ellipsizeMode='tail' numberOfLines={1}>{rowData.name || ''}</Text>
                  </View>
                </View>
                :
                  <TouchableOpacity key={rowID} onPress={() => this.changeLink(rowData, rowID)}
                    style={[styles.row, styles.wrapperRelated]}>
                    <View style={styles.wrapperTextCount}><Text style={styles.textCount}>{parseInt(rowID)+1}</Text></View>
                    <View style={[{justifyContent: 'center', flex: 1}]}>
                        <Text style={[styles.titleAudio, {lineHeight: 32}]} ellipsizeMode='tail' numberOfLines={1}>{rowData.name || ''}</Text>
                    </View>
                  </TouchableOpacity>
            :
              (currentItemPlay == rowID) ?
                    <View style={[styles.row, styles.wrapperRelated]}>
                        <View style={{marginRight: 30, width: 35}}>
                        {
                          currentTime == 0 || paused ?
                            <Image source={Config.ICON_CURRENT_PAUSE} resizeMode="contain" style={[styles.iconCurrentPlay]} />
                          :
                            <Image source={Config.ICON_CURRENT_PLAY} resizeMode="contain" style={[styles.iconCurrentPlay]} />
                        }
                        </View>
                        <View style={[{justifyContent: 'center', flex: 1}]}>
                            <Text style={[styles.titleAudio, {lineHeight: 32}]} ellipsizeMode='tail' numberOfLines={1}>{rowData.name || ''}</Text>
                        </View>
                    </View>
                :
                    <TouchableOpacity key={rowID} onPress={() => this.changeLink(rowData, rowID)}
                      style={[styles.row, styles.wrapperRelated]}>
                      <View style={styles.wrapperTextCount}><Text style={styles.textCount}>{parseInt(rowID)+1}</Text></View>
                      <View style={[{justifyContent: 'center', flex: 1}]}>
                          <Text style={[styles.titleAudio, {lineHeight: 32}]} ellipsizeMode='tail' numberOfLines={1}>{rowData.name || ''}</Text>
                      </View>
                    </TouchableOpacity>
          }
      </View>
    );
  }

  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return(
          this.props.episodes &&
            <View>
              <View style={styles.sectionTitleAudioWrapper}><Text style={styles.sectionTitleAudio}>ALBUM</Text></View>
              <ListView
                dataSource={ds.cloneWithRows(this.props.episodes)}
                pageSize={6}
                initialListSize={8}
                scrollEnabled={true}
                renderRow={this._renderRow.bind(this)} />
            </View>
    )
  }

}
