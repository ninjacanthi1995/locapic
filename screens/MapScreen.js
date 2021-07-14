import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Button, Overlay, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";

export default function MapScreen() {
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [addPOI, setAddPOI] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [coordsPOI, setCoordsPOI] = useState({latitude: 0, longitude: 0});

  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const listPOI = useSelector(state => state.POIs);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLatitude(location.coords.latitude);
      setCurrentLongitude(location.coords.longitude);
    })();
  }, []);

  const handleAddPOI = (e) => {
    if (addPOI) {
      setCoordsPOI(e.nativeEvent.coordinate);
      setAddPOI(false);
      setTitleInput('');
      setDescriptionInput('');
      toggleOverlay();
    }
  }

  const handlePressModalButton = () => {
    dispatch({ type: 'addPOI', POI: {...coordsPOI, title: titleInput, description: descriptionInput} });
    toggleOverlay();
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.866667,
          longitude: 2.333333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => handleAddPOI(e)}
      >
        <Marker
          coordinate={{
            latitude: currentLatitude,
            longitude: currentLongitude,
          }}
          pinColor={"red"}
          title={"Hello"}
          description={"I am here"}
        />
        {listPOI.map((POI) => (
          <Marker
            coordinate={{
              latitude: POI.latitude,
              longitude: POI.longitude,
            }}
            pinColor={"blue"} 
            title={POI.title}
            description={POI.description}
          />
        ))}
      </MapView>
      <Button
        buttonStyle={{ width: "100%", backgroundColor: "#eb4d4b" }}
        icon={<Icon name="map-marker" size={15} color="white" />}
        title="Add POI"
        onPress={() => setAddPOI(true)}
        disabled={addPOI}
      />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay}>
        <Input placeholder="titre" onChangeText={value => setTitleInput(value)} value={titleInput} />
        <Input placeholder="description" onChangeText={value => setDescriptionInput(value)} value={descriptionInput} />
        <Button
          buttonStyle={{ width: "100%", backgroundColor: "#eb4d4b" }}
          title="Ajouter POI"
          onPress={handlePressModalButton}
        />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  overlay: {
    width: '80%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
  }
});
