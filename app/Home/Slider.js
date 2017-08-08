import React, { Component, PropTypes } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList} from "react-native";
import Button from "react-native-button";
import { MessageBarAlert, MessageBarManager } from 'react-native-message-bar';
import DataListItem from './DataListItem';

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

export default class Slider extends Component {

  state = {
    selected: (new Map(): Map<string, boolean>),
    imageLoading: true,
  }

  _keyExtractor = (item, index) => item.objectID;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _renderItem = ({item}) => (
    <DataListItem
      data={item}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.objectID)}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
