import React, { useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { Input, Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen(props) {
  const [pseudo, setPseudo] = useState("");

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Input
          placeholder="John"
          leftIcon={{ type: "font-awesome", name: "user", color: "#eb4d4b" }}
          onChangeText={(value) => setPseudo(value)}
          value={pseudo}
        />
        <Button
          icon={<Icon name="arrow-right" size={15} color="#eb4d4b" />}
          title="Go to Map"
          onPress={() => {
            dispatch({ type: "savePseudo", pseudo });
            props.navigation.navigate("BottomNavigator", {
              screen: "MapScreen",
            });
          }}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
