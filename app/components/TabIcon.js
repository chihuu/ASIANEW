import React, { PropTypes } from "react";
import { Text, ViewPropTypes } from "react-native";

const propTypes = {
  selected: ViewPropTypes.bool,
  title: ViewPropTypes.string
};

const TabIcon = props => {
  return (
    <Text style={{ color: props.focused ? "red" : "black" }}>
      {props.title}
    </Text>
  );
};

TabIcon.PropTypes = propTypes;

export default TabIcon;
