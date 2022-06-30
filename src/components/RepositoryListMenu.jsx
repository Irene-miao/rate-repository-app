import React, { useState, useRef } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Repositories from "./Repositories";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../theme";
import {useDebounce} from 'use-debounce';



const styles = StyleSheet.create({
  container: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
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
    width: "10%",
    height: 40,
    textAlign: "center"
  },
  input: {
    backgroundColor: "white",
    padding: 5,
    width: "75%",
    height: 40,
    fontSize: theme.fontSizes.subheading,
  },
  picker: {
    height: 30,
    marginLeft: 65,
    marginRight: 65,
    textAlign: "center",
  },
});

const RepositoryListMenu = () => {
  const [title, setTitle] = useState("");
  const [ keyword, setKeyword] = useState("");
const [searchKeyword] = useDebounce(keyword, 500);



  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

   let variables = [];
  if (searchKeyword) {
    variables = searchKeyword;
    return  <Repositories variables={variables}   />
  }
  else if (title === "Latest repositories") {
    variables = { orderBy:"CREATED_AT", orderDirection:"DESC"};
    return (
      <Repositories  variables={variables} />
    );
  } else if (title === "Highest rated repositories") {
     variables = { orderBy:"RATING_AVERAGE",  orderDirection:"DESC"};
    return (
      <Repositories  variables={variables}/>
    );
  } else if (title === "Lowest rated repositories") {
    variables = {orderBy:"RATING_AVERAGE", orderDirection:"ASC"};
    return (
      <Repositories  variables={variables} />
    );
  };

  console.log(variables);
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
        onSubmit={(values) => setKeyword(values)}
      >
        {({ handleSubmit }) => <Search onSubmit={handleSubmit} />}
      </Formik>
      
      <Picker
      style={styles.picker}
        ref={pickerRef}
        selectedValue={title}
        onValueChange={(itemValue, itemIndex) => setTitle(itemValue)}
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

export default RepositoryListMenu;
