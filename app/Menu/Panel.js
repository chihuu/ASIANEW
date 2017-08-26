import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Animated
} from "react-native";
import styles from "../styles/Styles";

class Panel extends Component {
  constructor(props) {
    super(props);

    this.icons = {
      up: require("../common/images/menu/arrowhead_up.png"),
      down: require("../common/images/menu/arrowhead_down.png")
    };

    this.state = {
      title: props.title,
      expanded: true,
      animation: new Animated.Value()
    };
  }

  toggle() {
    let initialValue = this.state.expanded
        ? this.state.maxHeight + this.state.minHeight
        : this.state.minHeight,
      finalValue = this.state.expanded
        ? this.state.minHeight
        : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue
    }).start();
  }

  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  }

  render(key) {
    let icon = this.icons["down"];

    if (this.state.expanded) {
      icon = this.icons["up"];
    }

    return (
      <Animated.View
        style={[styles.panelContainer, { height: this.state.animation }]}
      >
        <View
          style={styles.paneltitleContainer}
          onLayout={this._setMinHeight.bind(this)}
        >
          <Text style={styles.panelTitle}>
            {this.state.title}
          </Text>
          <TouchableHighlight
            style={styles.panelButton}
            onPress={this.toggle.bind(this)}
            underlayColor="#00508C"
          >
            <Image style={styles.panelbuttonImage} source={icon} />
          </TouchableHighlight>
        </View>

        <View style={styles.panelBody} onLayout={this._setMaxHeight.bind(this)}>
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

export default Panel;
