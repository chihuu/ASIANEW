import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  ActivityIndicator
} from "react-native";
import styles from "../../styles/Styles";

import { CachedImage } from "react-native-img-cache";

export default class ToggleInfo extends Component {
  constructor(props) {
    super(props);

    this.createItem = this.createItem.bind(this);

    this.state = {
      expanded: false,
      animation: new Animated.Value(),
      imageLoading: true
    };
  }

  createItem = dataRelate => {
    const { width, height, onInfo } = this.props;

    let items = [];
    let text = "";
    let widthImage = width * 0.3 - 14;
    let heightImage = (width * 0.3 - 10) / 16 * 9;
    let sizeImage = height + "x" + width;

    if (dataRelate.timelines.length > 0) {
      //items = dataRelate.timelines;
      //text = 'Timelines';
      items = dataRelate.related;
      text = "Relates";
    } else if (dataRelate.episodes.length > 0) {
      items = dataRelate.episodes;
      text = "Episodes";
    } else {
      items = dataRelate.related;
      text = "Relates";
    }

    return (
      <View style={[styles.column]}>
        <View
          style={[
            {
              padding: 5,
              top: 0,
              left: 0,
              right: 0,
              height: 40,
              alignItems: "center"
            },
            styles.row
          ]}
        >
          <Text style={styles.white}>
            {text}
          </Text>
          <TouchableOpacity
            onPress={() => onInfo()}
            style={{ alignItems: "flex-end", flex: 1 }}
          >
            <Image
              source={require("../../common/images/player/close_button@2x.png")}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
        </View>
        {items.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => this.handleNavButtonPress(item.id)}
              key={item.id + "_" + index}
            >
              <View
                style={[
                  styles.column,
                  styles.border1px,
                  { width: width * 0.3, marginBottom: 7, paddingBottom: 7 }
                ]}
              >
                <View
                  style={[
                    styles.centering,
                    styles.imageBorderRadius,
                    { width: widthImage, height: heightImage }
                  ]}
                >
                  <CachedImage
                    source={{ uri: item.image }}
                    defaultSource={require("../../common/images/common/default_thumbnail.png")}
                    style={[
                      styles.centering,
                      styles.imageBorderRadius,
                      { width: widthImage, height: heightImage }
                    ]}
                    onLoadEnd={() => {
                      this.setState({ imageLoading: false });
                    }}
                    mutable
                  />
                  {this.state.imageLoading &&
                    <ActivityIndicator
                      size="small"
                      color="white"
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                      }}
                    />}
                </View>
                <View style={{ flex: 1, marginTop: 5 }}>
                  <Text
                    style={[styles.white, { flexWrap: "wrap" }]}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  handleNavButtonPress = idChild => {};

  render() {
    const { width, height } = this.props;

    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={[styles.toggleData, { width: width * 0.3, height: height }]}
      >
        {this.createItem(this.props.dataRelate)}
      </ScrollView>
    );
  }
}
