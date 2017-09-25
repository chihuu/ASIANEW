import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import styles from "../../styles/Styles";
import { Icon, Tabs, Tab } from "react-native-elements";
import TabInformations from "./TabInformations";
import TabEpisodes from "./TabEpisodes";
import TabRelates from "./TabRelates";
import TabTimelines from "./TabTimelines";
import { TabNavigator } from "react-navigation";

export default class TabsWrapper extends Component {
  tabs(payload) {
    let tab = {
      TabInformations: {
        screen: TabInformations,
        navigationOptions: {
          tabBarLabel: "INFORMATION"
        }
      }
    };
    if (payload.listDetail.episodes.length > 0) {
      let tab1 = {
        TabEpisodes: {
          screen: TabEpisodes,
          navigationOptions: {
            tabBarLabel: "EPISODES"
          }
        }
      };
      tab = Object.assign({}, tab, tab1);
    }
    if (payload.listDetail.timelines.length > 0) {
      let tab1 = {
        TabTimelines: {
          screen: TabTimelines,
          navigationOptions: {
            tabBarLabel: "TIMELINES"
          }
        }
      };
      tab = Object.assign({}, tab, tab1);
    }
    if (payload.listDetail.related.length > 0) {
      let tab1 = {
        TabRelates: {
          screen: TabRelates,
          navigationOptions: {
            tabBarLabel: "RELATES"
          }
        }
      };
      tab = Object.assign({}, tab, tab1);
    }
    return tab;
  }
  render() {
    const { _layout, payload } = this.props;
    const TabNav = TabNavigator(this.tabs(payload), {
      tabBarOptions: {
        activeTintColor: "#e91e63",
        labelStyle: {
          fontSize: 12,
          marginBottom: 15
        },
        tabStyle: {
          width: 100,
          justifyContent: "flex-start",
          alignItems: "flex-start"
        }
      },
      tabBarPosition: "top",
      swipeEnabled: true
    });

    return <TabNav screenProps={this.props} />;
  }
}
