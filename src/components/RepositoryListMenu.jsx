import React, {  useState, useRef } from "react";
import { View } from "react-native";
import {Picker} from '@react-native-picker/picker';
import RepositoryListContainer from "./RepositoryListContainer";



const RepositoryListMenu = () => {
 const [title, setTitle] = useState("");



const pickerRef = useRef();

function open() {
  pickerRef.current.focus();
};

function close() {
  pickerRef.current.blur();
};

if (title === "Latest repositories") {
  return  <RepositoryListContainer orderBy="CREATED_AT" orderDirection="DESC" />;
} else if (title === "Highest rated repositories") {
  return  <RepositoryListContainer orderBy="RATING_AVERAGE" orderDirection="DESC" />;
} else if (title === "Lowest rated repositories") {
  return  <RepositoryListContainer orderBy="RATING_AVERAGE" orderDirection="ASC" />;
}

  




  return (
    <Picker
    ref={pickerRef}
    selectedValue={title}
    onValueChange={(itemValue, itemIndex) =>
    setTitle(itemValue)
  }>
    <Picker.Item label="Select an item..." />
    <Picker.Item label="Latest repositories" value="Latest repositories" />
    <Picker.Item label="Highest rated repositories" value="Highest rated repositories" />
    <Picker.Item label="Lowest rated repositories" value="Lowest rated repositories" />
  </Picker>
      
  );
};

export default RepositoryListMenu;
