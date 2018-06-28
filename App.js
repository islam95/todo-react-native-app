import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  Keyboard
} from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import Row from "./Row";

export default class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      value: "",
      items: [],
      allComplete: false,
      dataSource: ds.cloneWithRows([])
    };
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.setSource = this.setSource.bind(this);
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
    this.setSource(newItems, newItems, { value: "" });
  }

  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return item;
      return {
        ...item,
        complete
      };
    });
    this.setSource(newItems, newItems);
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map(item => ({
      ...item,
      complete
    }));
    this.setSource(newItems, newItems, { allComplete: complete });
  }

  handleRemoveItem(key) {
    const newItems = this.state.items.filter(item => {
      return item.key !== key;
    });
    this.setSource(newItems, newItems);
  }

  setSource(items, itemsDataSource, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ...otherState
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={value => this.setState({ value })}
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({ key, ...value }) => {
              return (
                <Row
                  key={key}
                  onRemove={() => this.handleRemoveItem(key)}
                  onComplete={complete =>
                    this.handleToggleComplete(key, complete)
                  }
                  {...value}
                />
              );
            }}
            renderSeparator={(sectionId, rowId) => {
              return <View key={rowId} style={styles.separator} />;
            }}
          />
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
  },
  list: {
    backgroundColor: "#FFF"
  },
  separator: {
    borderWidth: 1,
    borderColor: "#F5FCFF"
  }
});
