/**
 * ToDo React Native App
 */
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Header from "./Header";
import Footer from "./Footer";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      items: []
    };
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleAddItem() {
    if (!this.state.value) return;
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ];
    this.setState({
      items: newItems,
      value: ""
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={value => this.setState({ value })}
        />
        <View style={styles.content} />
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
