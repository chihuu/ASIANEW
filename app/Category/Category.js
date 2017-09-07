"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  InteractionManager
} from "react-native";
import styles from "../styles/Styles";
import { _ } from "lodash";
import GroupCategory from "./GroupCategory";
import ChildGroupCategory from "./ChildGroupCategory";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listGroupCategory: null,
      sizeContainer: 0,
      listenSizeContainer: 0,
      sizeImage: 0,
      listenSizeImage: 0,
      sizeText: 0,
      listenSizeText: 0,
      imageDevice: 0,
      loading: false,
      modalVisible: false,
      modalCreateVisible: false,
      modalAddContentVisible: false,
      modalMessage: false,
      editModalVisible: false
    };
  }

  componentWillMount() {
    const { itemsFetchDataCategory, idChild, isProvider, payload } = this.props;

    console.log(this.props);
    itemsFetchDataCategory(idChild, isProvider);
  }

  // componentWillUnmount() {
  //   const { itemsUnFetchDataCategory } = this.props;
  //   console.log(this.props);
  //   itemsUnFetchDataCategory();
  // }

  renderItems(list) {
    const { _layout } = this.props;

    return list.map((data, i) => {
      return (
        <GroupCategory
          length={data.items.length}
          mode={data.mode}
          moreItems={data.items}
          name={data.name}
          key={i}
        >
          {data.items.map((item, index) => {
            let sizeContainer =
              parseInt(data.mode) === 0
                ? _layout.listenSizeCategoryContainer
                : _layout.sizeCategoryContainer;
            let sizeImage =
              parseInt(data.mode) === 0
                ? _layout.listenSizeCategoryImage
                : _layout.sizeCategoryImage;
            let sizeText =
              parseInt(data.mode) === 0
                ? _layout.listenSizeCategoryText
                : _layout.sizeCategoryText;

            let checkSizeReplaceUrlImage = item.image;

            if (_.includes(item.image, "1280x720")) {
              checkSizeReplaceUrlImage = _.replace(
                item.image,
                new RegExp("1280x720", "g"),
                _layout.imageDevice
              );
            } else if (_.includes(item.image, "720x720")) {
              checkSizeReplaceUrlImage = _.replace(
                item.image,
                new RegExp("720x720", "g"),
                _layout.imageDevice
              );
            } else {
              checkSizeReplaceUrlImage = item.image;
            }

            return (
              index < 6 &&
              <View
                style={[sizeContainer, { marginLeft: 7, marginBottom: 7 }]}
                key={item.id}
              >
                <ChildGroupCategory
                  index={index}
                  key={index}
                  id={item.id}
                  item={item}
                  items={data}
                  image={checkSizeReplaceUrlImage}
                  name={item.name}
                  sizeContainer={sizeContainer}
                  sizeImage={sizeImage}
                  sizeText={sizeText}
                  _layout={_layout}
                />
              </View>
            );
          })}
        </GroupCategory>
      );
    });
  }

  render() {
    const { payload, isFetching } = this.props;

    if (isFetching && !payload.listCategory) {
      return (
        <View style={[styles.centering, styles.waiting]}>
          <ActivityIndicator size="small" color="#000000" />
        </View>
      );
    }
    return (
      <ScrollView
        scrollEnabled={true}
        scrollEventThrottle={200}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {this.renderItems(payload.listCategory)}
      </ScrollView>
    );
  }
}

export default Category;
