"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  InteractionManager,
  ScrollView,
  Animated,
  Image,
  ActivityIndicator
} from "react-native";
import styles from "../styles/Styles";
import * as viewsActions from "./actions";
import { Actions } from "react-native-router-flux";
import SideMenuLink from "./SideMenuLink";
import Panel from "./Panel";

//import shallowCompare from 'react-addons-shallow-compare';

export class SideMenuCategory extends Component {
  renderSectionHeader(key, icon) {
    return (
      <View style={[styles.menuContentHeadView]} key={key}>
        <Text style={styles.menuContentHeadText}>
          {key.toUpperCase()}
        </Text>
      </View>
    );
  }
  renderCategoryName(id, name, key) {
    let iconName = null;
    let iconSize = null;

    if (key === "provider") {
      switch (parseInt(id)) {
        case 4:
          iconName = require("../common/images/menu/provider_onworld.png");
          iconSize = { width: 20, height: 20 };
          break;
        case 9:
          iconName = require("../common/images/menu/provider_setttv.png");
          iconSize = { width: 25, height: 25 };
          break;
        case 15:
          iconName = require("../common/images/menu/provider_vstar.png");
          iconSize = { width: 30, height: 30 };
          break;
        case 21:
          iconName = require("../common/images/menu/provider_byn.png");
          iconSize = { width: 30, height: 30 };
          break;
        case 24:
          iconName = require("../common/images/menu/provider_ntm.png");
          iconSize = { width: 25, height: 25 };
          break;
        case 36:
          iconName = require("../common/images/menu/provider_myApp.png");
          iconSize = { width: 25, height: 25 };
          break;
        case 42:
          iconName = require("../common/images/menu/provider_laintotv.png");
          iconSize = { width: 30, height: 30 };
          break;

        default:
          iconName = require("../common/images/menu/icon_live_tv.png");
          iconSize = { width: 20, height: 18 };
          break;
      }
    } else {
      switch (parseInt(id)) {
        case 4:
          iconName = require("../common/images/menu/icon_live_tv.png");
          iconSize = { width: 20, height: 18 };
          break;
        case 3:
          iconName = require("../common/images/menu/icon_show.png");
          iconSize = { width: 20, height: 18 };
          break;
        case 2:
          iconName = require("../common/images/menu/icon_movieseri.png");
          iconSize = { width: 20, height: 18 };
          break;
        case 6:
          iconName = require("../common/images/menu/icon_music.png");
          iconSize = { width: 20, height: 20 };
          break;
        case 8:
          iconName = require("../common/images/menu/icon_musicvideo.png");
          iconSize = { width: 20, height: 20 };
          break;
        case 7:
          iconName = require("../common/images/menu/icon_radio.png");
          iconSize = { width: 20, height: 20 };
          break;
        case 33:
          iconName = require("../common/images/menu/icon_music.png");
          iconSize = { width: 20, height: 20 };
          break;
        default:
          iconName = require("../common/images/menu/icon_live_tv.png");
          iconSize = { width: 20, height: 18 };
          break;
      }
    }

    let isProvider = key === "provider" ? true : false;
    return (
      <View key={name + "_" + id}>
        <SideMenuLink
          key={key + "_" + id}
          id={3}
          idChild={parseInt(id)}
          iconName={iconName}
          iconSize={iconSize}
          handleNavButtonPress={() => this.handleNavButtonPress(id, isProvider)}
          sideMenuButtonText={name}
        />
      </View>
    );
  }
  renderData(dataList, key) {
    //  let style = key === "provider" ? { height: 0 } : "";
    return (
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {dataList[key] &&
          dataList[key].length > 0 &&
          dataList[key].map((data, index) => {
            return this.renderCategoryName(data.id, data.name, key);
          })}
      </ScrollView>
    );
  }

  render() {
    const { payload } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {payload.menu &&
          Object.keys(payload.menu).map(key => {
            return (
              <View key={key} style={styles.panelBody}>
                <Panel title={key.toUpperCase()}>
                  {this.renderData(payload.menu, key)}
                </Panel>
              </View>
            );
          })}
      </View>
    );
  }

  handleNavButtonPress = (idChild, isProvider) => {
    const { id, handleNavButtonPress } = this.props;
    //const idChild = data.idChild;
    //  const refView = "Category";
    //  handleNavButtonPress(e, { id, idChild, refView, isProvider });
    Actions.category({ id, idChild, isProvider });
  };
}

export default SideMenuCategory;
