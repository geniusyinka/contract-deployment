import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  TextInput,
} from "react-native";
// import { styles } from "../../App";

const InputBox = (props: any) => {
  const { placeholder, style, value, onChangeText, editable } = props;

  return (
    <>
      <TextInput
        placeholder={placeholder}
        style={[styles.textInput2, style]} // Merge default and custom styles
        value={value}
        onChangeText={onChangeText}
        multiline={true}
        textAlignVertical="top"
        editable={false}

      />
    </>
  );
};


export default InputBox;

const styles = StyleSheet.create({
  textInput2: {
    width: '90%',
    height: 150,
    borderWidth: 1,
    color: 'white',
    padding: 10,
    fontFamily: 'Courier' ,
    // borderColor: '#ccc',
    borderRadius: 8,
    // paddingHorizontal: 10,
    // marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#1E1F21'
  },
})