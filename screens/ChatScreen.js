import React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const list = [
  {
    name: "Alex",
    message: "Parfait et toi ?",
  },
  {
    name: "John",
    message: "Coucou ca roule ?",
  },
];

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <View style={{width: '100%', marginTop: '7%'}}>
        {list.map((l, i) => (
          <ListItem key={i} bottomDivider>            
            <ListItem.Content>
              <ListItem.Title>{l.message}</ListItem.Title>
              <ListItem.Subtitle>{l.name}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>

      <View style={{width: '100%'}}>
        <Input placeholder="Your message" />
        <Button
            icon={<Icon name="envelope" size={15} color="white" />}
            title="Send"
            buttonStyle={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "100%",
    backgroundColor: "#eb4d4b",
  },
});
