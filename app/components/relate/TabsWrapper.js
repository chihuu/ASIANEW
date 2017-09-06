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
  render() {
    const { _layout, payload } = this.props;

    const TabNav = TabNavigator(
      {
        TabInformations: {
          screen: TabInformations,
          navigationOptions: {
            tabBarLabel: "INFORMATION"
          }
        },
        TabRelates: {
          screen: TabRelates,
          navigationOptions: {
            tabBarLabel: "RELATES"
          }
        },
        TabEpisodes: {
          screen: TabEpisodes,
          navigationOptions: {
            tabBarLabel: "EPISODES"
          }
        },
        TabTimelines: {
          screen: TabEpisodes,
          navigationOptions: {
            tabBarLabel: "TIMELINES"
          }
        }
      },
      {
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
      }
    );

    return <TabNav screenProps={this.props} />;
  }
}
