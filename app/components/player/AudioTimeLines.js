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

export default class AudioTimeLines extends Component {

  changeLink = (content, rowID) => {
    const {changeLinkAudio} = this.props;

    changeLinkAudio({
      submitted: true,
      linkAudio: content.link,
      audioName: content.name,
      currentItemPlay: parseInt(rowID),
      nextItemPlay: parseInt(rowID) + 1,
      paused: false,
      duration: 0.0,
      currentTime: 0.0,
      isCurrentLive: false
    });
  }

  _renderRow (rowData, sectionID, rowID) {
    const {currentItemPlay, isCurrentLive, isLive, currentTime, paused} = this.props;

    return (
        <View key={rowID} style={styles.column}>
          <TouchableOpacity onPress={() => this.changeLink(rowData, rowID)}
              style={[styles.row, styles.wrapperRelated]}>
              {
                ((currentItemPlay == rowID) && isCurrentLive && !isLive) ?
                  <View style={{marginRight: 30, width: 30}}>
                  {
                    currentTime == 0 || paused ?
                      <CachedImage source={Config.ICON_CURRENT_PAUSE} resizeMode="contain" style={[styles.iconCurrentPlay]} mutable />
                    :
                      <CachedImage source={Config.ICON_CURRENT_PLAY} resizeMode="contain" style={[styles.iconCurrentPlay]} mutable />
                  }
                  </View>
                :
                  <View style={styles.wrapperTextCount}><Text style={styles.textCount}>{(parseInt(rowID)+1)}</Text></View>
              }
            <View style={[styles.caption, {flex: 1}]}>
                <Text style={[styles.titleAudio]}>{rowData.name}</Text>
                <Text style={[styles.subTitle, {textAlign: 'left', color: 'rgba(255, 255, 255, 0.5)', paddingTop: 5, fontSize: 14}]}>{rowData.start + ' - ' + rowData.end}</Text>
            </View>
          </TouchableOpacity>
        </View>
    );
  }

  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return(
      <View>
        {
          this.props.timelines &&
            <ListView
              dataSource={ds.cloneWithRows(this.props.timelines)}
              pageSize={6}
              initialListSize={8}
              scrollEnabled={true}
              contentContainerStyle={{paddingBottom: 30}}
              renderRow={this._renderRow.bind(this)} />
        }
      </View>
    )
  }

}
