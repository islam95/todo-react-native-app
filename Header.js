import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <TextInput
          placeholder="What to do?"
          blurOnSubmit={false}
          returnKeyType="done"
          style={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 50,
  },
});