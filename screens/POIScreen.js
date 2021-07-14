import React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";

export default function ChatScreen() {
  const listPOI = useSelector(state => state.POIs);

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={{marginTop: '2%'}}>
        {listPOI.map((l, i) => (
          <ListItem key={i} bottomDivider onPress={() => dispatch({ type: 'deletePOI', POI: l })}>
            <Icon name={"map-marker"} type="font-awesome" />            
            <ListItem.Content>
              <ListItem.Title>{l.title}</ListItem.Title>
              <ListItem.Subtitle>{l.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: '5%'
  },
});
