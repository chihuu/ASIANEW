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

export default class AudioPlaylist extends Component {

  changeLink = (content) => {
    const {fetchAudio} = this.props;

    fetchAudio({
      idChild: content.id
    });
  }

  _renderRow (rowData, sectionID, rowID) {
    return (
        rowID == 0 &&
          <View key={rowID} style={styles.column}>
            {
              rowData.playlist.map((items, i) => {
                return(
                    <TouchableOpacity key={'child'+i} onPress={() => this.changeLink(items)}
                        style={[styles.row, styles.wrapperRelated]}>
                      <View style={styles.wrapperTextCount}><Text style={styles.textCount}>{i+1}</Text></View>
                      <View style={[styles.caption]}>
                          <Text style={[styles.titleAudio]}>{items.name}</Text>
                          <Text style={[styles.subTitleAudio]}>{items.start + ' - ' + items.end}</Text>
                      </View>
                    </TouchableOpacity>
                )
              })
            }
          </View>
    );
  }

  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return(
      <View>
        {
          this.props.playlist &&
          <View>
            <View style={styles.sectionTitleAudioWrapper}><Text style={styles.sectionTitleAudio}>PLAYLIST</Text></View>
              <ListView
                dataSource={ds.cloneWithRows(this.props.playlist)}
                pageSize={6}
                initialListSize={8}
                scrollEnabled={true}
                renderRow={this._renderRow.bind(this)} />
            </View>
        }
      </View>
    )
  }

}
