import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  UIManager,
  ActivityIndicator,
  ListView
} from "react-native";
import styles from "../../styles/Styles";
import { CachedImage } from "react-native-img-cache";

export default class TabTimelines extends Component {
  constructor(props) {
    super(props);

    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) =>
      dataBlob[sectionId][rowId];

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionData,
      getRowData
    });

    const { dataBlob, sectionIds, rowIds } = this.formatData(
      props.screenProps.payload.listDetail.timelines
    );

    this.state = {
      expanded: false,
      animation: new Animated.Value(0),
      icon: "More",
      dataTimelines: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
      imageLoading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dataBlob, sectionIds, rowIds } = this.formatData(
      nextProps.timelines
    );
    this.setState({
      dataTimelines: this.state.dataTimelines.cloneWithRowsAndSections(
        dataBlob,
        sectionIds,
        rowIds
      )
    });
  }

  formatData(data) {
    // Need somewhere to store our data
    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    data.map((items, i) => {
      sectionIds.push(i);
      dataBlob[i] = { title: items.title };

      rowIds[i] = [];

      items.timeline.map((item, index) => {
        rowIds[i].push(item.id);
        dataBlob[i][item.id] = item;
      });
    });

    return { dataBlob, sectionIds, rowIds };
    /*
     * Removed for brevity
     */
  }

  handleNavButtonPress = item => {
    const { dataRelate } = this.props.screenProps.payload.listDetail;
    dataRelate["content"] = item;
    dataRelate["content"]["isTimeline"] = true;
  };

  renderSectionHeader(data, sectionId) {
    let icon = !this.state.expanded ? "More" : "Less";
    return null;
  }

  renderRow(rowData) {
    const { _layout } = this.props.screenProps;
    return (
      <View style={styles.row} key={"item" + rowData.id}>
        <View style={[styles.blocksColumn]}>
          <TouchableOpacity onPress={() => this.handleNavButtonPress(rowData)}>
            <View
              style={[styles.row, styles.oneRowContainer, { width: width }]}
            >
              <CachedImage
                source={{ uri: rowData.image }}
                defaultSource={require("../../common/images/common/default_thumbnail.png")}
                style={[
                  styles.marginRight,
                  styles.imageBorderRadius,
                  {
                    width: _layout.newWidthTimeLines,
                    height: _layout.newHeightTimeLines,
                    marginLeft: 7
                  }
                ]}
                mutable
              />
              <View
                style={[styles.titleContainer, { flex: 1, flexWrap: "wrap" }]}
              >
                <Text style={[styles.mainTextInfo]}>
                  {rowData.name}
                </Text>
                <Text style={[styles.subTitle]}>
                  {rowData.start} - {rowData.end}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { _layout } = this.props.screenProps;
    return (
      <View style={[styles.timelinesContainer]}>
        <ListView
          ref="listView"
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={{
            paddingLeft: 7,
            paddingTop: 7,
            height: _layout.height + 100,
            flexDirection: "row",
            flexWrap: "wrap"
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          dataSource={this.state.dataTimelines}
          renderRow={data => this.renderRow(data)}
          renderSectionHeader={sectionData =>
            this.renderSectionHeader(sectionData)}
          renderSeparator={(sectionId, rowId) =>
            <View key={rowId} style={styles.border1px} />}
          enableEmptySections={true}
          pageSize={2}
          stickySectionHeadersEnabled={true}
          initialListSize={10}
          scrollRenderAheadDistance={500}
        />
      </View>
    );
  }
}
