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

export default class AudioMyPlaylist extends Component {

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

  renderActors(dataActors) {
    let actors = '';

    if(dataActors) {
      if(typeof(dataActors) === 'string') {
        actors = dataActors;
      } else {
        let arrActors = [];
        dataActors.map(function(data, value) {
          arrActors.push(data.name);
        });
        actors = arrActors.join(', ')
      }
      return actors;
    }
  }

  _renderRow (rowData, sectionID, rowID) {

    const {currentItemPlay, currentTime, paused, id, submitted} = this.props;

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
                          {
                            rowData.name && <Text style={[styles.titleAudio, {lineHeight: 32}]} ellipsizeMode='tail' numberOfLines={1}>{rowData.name}</Text>
                          }
                          {
                            <Text style={[styles.subTitleAudio]} ellipsizeMode='tail' numberOfLines={1}>{this.renderActors(rowData.actors) || 'Unknown Artist'}</Text>
                          }
                      </View>
                    </View>
                  :
                    <TouchableOpacity onPress={() => this.changeLink(rowData, rowID)}
                        style={[styles.row, styles.wrapperRelated]}>
                      <View style={styles.wrapperTextCount}><Text style={styles.textCount}>{parseInt(rowID)+1}</Text></View>
                      <View style={[{justifyContent: 'center', flex: 1}]}>
                          {
                            rowData.name && <Text style={[styles.titleAudio, {lineHeight: 32}]} ellipsizeMode='tail' numberOfLines={1}>{rowData.name}</Text>
                          }
                          {
                            <Text style={[styles.subTitleAudio]} ellipsizeMode='tail' numberOfLines={1}>{this.renderActors(rowData.actors) || 'Unknown Artist'}</Text>
                          }
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
                        {
                          rowData.name && <Text style={[styles.titleAudio, {lineHeight: 32}]} ellipsizeMode='tail' numberOfLines={1}>{rowData.name}</Text>
                        }
                        {
                          <Text style={[styles.subTitleAudio]} ellipsizeMode='tail' numberOfLines={1}>{this.renderActors(rowData.actors) || 'Unknown Artist'}</Text>
                        }
                    </View>
                  </View>
              :
                  <TouchableOpacity onPress={() => this.changeLink(rowData, rowID)}
                      style={[styles.row, styles.wrapperRelated]}>
                    <View style={styles.wrapperTextCount}><Text style={styles.textCount}>{parseInt(rowID)+1}</Text></View>
                    <View style={[{justifyContent: 'center', flex: 1}]}>
                        {
                          rowData.name && <Text style={[styles.titleAudio, {lineHeight: 32}]} ellipsizeMode='tail' numberOfLines={1}>{rowData.name}</Text>
                        }
                        {
                          <Text style={[styles.subTitleAudio]} ellipsizeMode='tail' numberOfLines={1}>{this.renderActors(rowData.actors) || 'Unknown Artist'}</Text>
                        }
                    </View>
                  </TouchableOpacity>

          }
      </View>
    );
  }

  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return(
          this.props.playlist &&
            <View>
              <View style={styles.sectionTitleAudioWrapper}><Text style={styles.sectionTitleAudio}>PLAYLIST</Text></View>
              <ListView
                dataSource={ds.cloneWithRows(this.props.playlist)}
                pageSize={6}
                initialListSize={8}
                scrollEnabled={true}
                contentContainerStyle={{paddingBottom: 30}}
                renderRow={this._renderRow.bind(this)} />
            </View>
    )
  }

}
