"use strict";

import React, { PropTypes, Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  InteractionManager,
  Dimensions,
  Image
} from "react-native";
import Slider from "./Slider";
import ListItem from "./ListItem";
import ListItemListen from "./ListItemListen";
import styles from "../styles/Styles";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      imageLoading: true,
      loading: false
    };
  }

  componentWillMount() {
    const { itemsFetchData } = this.props;
    itemsFetchData();
  }

  // componentWillUnmount() {
  //   const { destroyHome } = this.props;
  //   destroyHome();
  // }

  render() {
    console.log(this.props);
    const { payload, height, isFetching } = this.props;

    return (
      <View style={styles.container}>
        {!isFetching && payload.dataHome
          ? <ScrollView style={{ flex: 1, height: height }}>
              <Slider
                data={payload.dataHome.banners}
                {...this.props}
                screenProps={this.props._layout}
              />
              <ListItem
                data={payload.dataHome.view}
                {...this.props}
                screenProps={this.props._layout}
              />
              <ListItemListen
                data={payload.dataHome.listen}
                {...this.props}
                screenProps={this.props._layout}
              />
            </ScrollView>
          : <View style={[styles.centering, styles.waiting]}>
              <ActivityIndicator size="small" color="white" />
            </View>}
      </View>
    );
  }
}

export default Home;
