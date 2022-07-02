import React from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import RepositoryListMenu from "./RepositoryListMenu";



const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  
  renderHeader = () => {
   
    return <RepositoryListMenu />;
  };

  

   onEndReach = () => {
    const { onEndReach} = this.props;
     if (onEndReach) {
      onEndReach();
    console.log("Reached the end");
    } else {
      return null;
    };
   };

   
  render() {
   const {repositories, navigate} = this.props;
   console.log(repositories, navigate);


    return (
      <FlatList
        data={repositories}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigate( `/${item.id}`,  {replace:true });
            }}
          >
            <RepositoryItem item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        ListHeaderComponentStyle={{ height: 120 }}
        onEndReached={this.onEndReach}
        onEndReachedThreshold={1}
      />
    );
  }
}

export default RepositoryListContainer;
