import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
});

export default class extends React.Component {
    componentDidMount() {
      Actions.refresh({
        leftTitle: 'leftTitle',
        onLeft: () => { Actions.pop() },
      });
    }
    render(){
        return (
            <View style={styles.container}>
                <Text>Search page 3</Text>
                <Button onPress={Actions.pop}>Back</Button>
            </View>
        );
    }
}
