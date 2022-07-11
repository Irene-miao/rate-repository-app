import React, { useState, useRef } from "react";
import {useNavigate} from 'react-router-dom';
import {useDebounce} from 'use-debounce';
import { Formik } from "formik";
import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";


import {useRepositories} from '../hooks/useRepositories';
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import RepositoryItem from './RepositoryItem';


const styles = StyleSheet.create({
  container: {
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: theme.fontSizes.subheading,
  },
  button: {
    borderRadius: theme.roundness,
    padding: 5,
    width: "20%",
    height: 40,
    textAlign: "center"
  },
  input: {
    backgroundColor: "white",
    padding: 5,
    width: "70%",
    height: 40,
    fontSize: theme.fontSizes.subheading,
  },
  picker: {
    height: 30,
    width: "70%",
    marginLeft: 25,
    textAlign: "center",
  },
  separator: {
    height: 10,
  },
});



const RepositoryListMenu = ({value, onChange, onSubmit}) => {

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }


  const Search = ({ onSubmit }) => {
    return (
      <View style={styles.container}>
        <FormikTextInput
          style={styles.input}
          name="searchKeyword"
          placeholder="Type in keyword to search"
        />
        <Pressable
          onPress={onSubmit}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#020202" : "#1E90FF",
            },
            styles.button,
          ]}
        >
          <Text style={styles.btnText}>Search</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View>
      <Formik
        initialValues={{ searchKeyword: "" }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => <Search onSubmit={handleSubmit} />}
      </Formik>
      
      <Picker
      style={styles.picker}
        ref={pickerRef}
        selectedValue={value}
        onValueChange={onChange}
      >
        <Picker.Item label="Select an item..." />
        <Picker.Item label="Latest repositories" value="Latest repositories" />
        <Picker.Item
          label="Highest rated repositories"
          value="Highest rated repositories"
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="Lowest rated repositories"
        />
      </Picker>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;


export class RepositoryListContainer extends React.Component {
  
  renderHeader = () => {
   
const {value, onChange, onSubmit} = this.props;
console.log(value, onChange, onSubmit);

    return (<RepositoryListMenu value={value} onSubmit={onSubmit} onChange={onChange} />);
  };


   
  render() {
   const {repositories, onEndReach, onRepositoryPress} = this.props;
   console.log(repositories);
console.log(onEndReach);

    return (
      <FlatList
        data={repositories}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onRepositoryPress(item.id)}
          >
            <RepositoryItem item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        ListHeaderComponentStyle={{ height: 120 }}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}


 const RepositoryList = () => {
  const [keyword, setKeyword] = useState("");
  const [value, setValue] = useState("");
  const searchKeyword = useDebounce(keyword, 500);
  let navigate = useNavigate();


   const onSubmit = (values) => {
    const {searchKeyword} = values;
    
    setKeyword(searchKeyword);
   };

   const onChange = (itemValue) => {
    console.log(itemValue);
    setValue(itemValue);
   }


let variables;
if (keyword) {
variables = {searchKeyword: searchKeyword[0], first: 3, orderBy: "CREATED_AT", orderDirection: "DESC"}
} else if (value === "Highest rated repositories"){
  variables = {searchKeyword: "", first: 3, orderBy: "RATING_AVERAGE", orderDirection: "DESC"}
} else if (value === "Lowest rated repositories") {
  variables = {searchKeyword: "", first: 3, orderBy: "RATING_AVERAGE", orderDirection: "ASC"}
} else if (value === "Latest repositories") {
  variables = {searchKeyword: "", first: 3, orderBy: "CREATED_AT", orderDirection: "DESC"}
};



const {repositories, error, fetchMore} = useRepositories(
  {
    variables: variables
  }
);
  
console.log(error)



    const onEndReach = () => {
fetchMore();
console.log("Reached the end");
    };

   
const finalRepositories = repositories ? repositories.repositories.edges.map(edge => edge.node) : [];

console.log(finalRepositories);

    return (
      <RepositoryListContainer 
repositories={finalRepositories}
onEndReach={onEndReach}
onSubmit={onSubmit}
onChange={onChange}
value={value}
onRepositoryPress={(id) => {
  navigate( `/${id}`,  {replace:true });
}}
      />
    )  
};

export default RepositoryList;