import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import { CachedImage } from "react-native-img-cache";
import Carousel from "react-native-looped-carousel";
import styles from "../styles/Styles";

export default class DataListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: true,
      interval: null
    };
  }

  _onPress = id => {
    this.props.onPressItem(id);
  };

  renderSlider(listImage) {
    return (
      <View>
        {listImage.length > 1
          ? <Carousel
              style={this.props.size}
              delay={5000} // Set Animation delay between slides
              autoplay
            >
              {listImage.map((data, index) => {
                return (
                  //<TouchableOpacity key={index} style={this.state.size}>
                  <TouchableOpacity
                    key={index}
                    style={this.props.size}
                    onPress={() => {}}
                    activeOpacity={1}
                  >
                    <Image
                      source={{ uri: data.image }}
                      style={[styles.centering, this.props.size]}
                      onLoadEnd={e => this.setState({ imageLoading: false })}
                      mutable
                    >
                      <ActivityIndicator
                        animating={this.state.imageLoading}
                        size="small"
                      />
                    </Image>
                  </TouchableOpacity>
                );
              })}
            </Carousel>
          : //<TouchableOpacity style={this.state.size}>
            listImage.length == 1
            ? <TouchableOpacity
                style={this.props.size}
                onPress={() => this.handleNavButtonPress(listImage[0])}
                activeOpacity={1}
              >
                <Image
                  source={{ uri: listImage[0].image }}
                  onLoadEnd={e => this.setState({ imageLoading: false })}
                  style={[styles.centering, this.props.size]}
                >
                  <ActivityIndicator
                    animating={this.state.imageLoading}
                    size="small"
                  />
                </Image>
              </TouchableOpacity>
            : null}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.data && this.renderSlider(this.props.data)}
      </View>
    );
  }
}
