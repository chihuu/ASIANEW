import React, { Component, PropTypes } from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import { connect } from 'react-redux';
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import { MessageBarAlert, MessageBarManager } from 'react-native-message-bar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: 'red',
  }
});

export default class Home extends React.Component {

  static propTypes = {
    routes: PropTypes.object,
  };


  componentDidMount() {
    const { itemsFetchData } = this.props;
    itemsFetchData();
    // Actions.refresh({
    //   rightButtonIconStyle: { width: 22, height: 22 },
    //   rightButtonImage: require('../images/search.png'),
    //   onRight: () => {console.log(123)},
    // });
  }

  render() {

    if(this.props.isFetching) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color="#000000" size="large" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Launch page</Text>
        <Button onPress={()=>Actions.login({data:"Custom data", title:"Custom title" })}>Go to Login page</Button>
        <Button onPress={()=>Actions.register()}>Go to Register page</Button>
        <Button onPress={()=>Actions.error("Error message")}>Popup error</Button>
        <Button onPress={()=>MessageBarManager.showAlert({
          title: 'Your alert title goes here',
          message: 'Your alert message goes here',
          alertType: 'success',
          // See Properties section for full customization
          // Or check `index.ios.js` or `index.android.js` for a complete example
        })}>MessageBar alert</Button>
        <Button onPress={()=>Actions.tabbar()}>Go to TabBar page</Button>
        <Button onPress={()=>Actions.pop()}>back</Button>
      </View>
    );
  }
}
