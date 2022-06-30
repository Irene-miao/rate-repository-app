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



  render() {
   const { repositories, searchRepositories} = this.props;
   console.log(repositories, searchRepositories);
   const selectData = searchRepositories ? searchRepositories : repositories;
   console.log(selectData);
   const {navigate} = this.props;

    return (
      <FlatList
        data={selectData}
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
      />
    );
  }
}

export default RepositoryListContainer;
