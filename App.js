/**
 * ToDo React Native App
 */
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Header from "./Header";
import Footer from "./Footer";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
        
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    ...Platform.select({
      ios: {
        paddingTop: 30
      }
    })
  },
  content: {
    flex: 1
  }
});
