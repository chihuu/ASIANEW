import React, {Component} from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ViewPropTypes, ActivityIndicator} from "react-native";
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 2,
    borderColor: 'red',
  },
});

class Menu extends React.Component {

  componentDidMount() {
    const { itemsFetchDataMenu } = this.props;
    itemsFetchDataMenu();
  }

  render() {
    if(this.props.isFetchingMenu) {
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

Menu.contextTypes = contextTypes;
Menu.propTypes = propTypes;

export default Menu;
