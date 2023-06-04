import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { MapStyle } from "./styles/MapStyle";
import { ParkMarker } from "./components/MapMarkers/ParkMarker";
import { CastleMarker } from "./components/MapMarkers/CastleMarker";
import {
  Actionsheet,
  useDisclose,
  Box,
  Center,
  NativeBaseProvider,
} from "native-base";

import parks from "./data/parkData.json";

// Marker Lookup
const markersByFeatureType = {
  park: ParkMarker,
  castle: CastleMarker,
};

const FeatureMarker = ({ location, onOpen, setSelectedFeature }) => {
  return (
    <View style={{ width: 40, height: 56 }}>
      <Marker
        onPress={() => {
          setSelectedFeature(location);
          onOpen();
        }}
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
      >
        {markersByFeatureType[location.type]}
      </Marker>
    </View>
  );
};

const ParkMarkers = ({ park, onOpen, setSelectedFeature }) => (
  <>
    <FeatureMarker
      onOpen={onOpen}
      setSelectedFeature={setSelectedFeature}
      location={park}
    />
    {park.features.map((feature, index) => (
      <FeatureMarker
        key={index}
        onOpen={onOpen}
        setSelectedFeature={setSelectedFeature}
        location={feature}
      />
    ))}
  </>
);

const FeatureDetailDrawer = ({ isOpen, onClose, feature }) => (
  <Center>
    <Actionsheet isOpen={isOpen} onClose={onClose} disableOverlay>
      <Actionsheet.Content>
        <Box w="100%" h={100} px={4} justifyContent="center">
          <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 0 }}>
            {feature.name}
          </Text>
          <Text style={{ marginBottom: 10, marginLeft: 3 }}>
            {feature.size}
          </Text>
          <View
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {feature.tags.map((tag, index) => (
              <ParkTag tag={tag} key={index} />
            ))}
          </View>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  </Center>
);

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectedFeature, setSelectedFeature] = useState(parks[0]);
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <MapView
          onPress={(event) => {
            // close the drawer unless another marker is selected
            if (event.nativeEvent.action !== "marker-press") {
              onClose();
            }
          }}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={MapStyle}
          initialRegion={{
            latitude: 40.7829,
            longitude: -73.9654,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {parks.map((park, index) => (
            <ParkMarkers
              key={index}
              onOpen={onOpen}
              setSelectedFeature={setSelectedFeature}
              park={park}
            />
          ))}
        </MapView>
      </View>
      <FeatureDetailDrawer
        isOpen={isOpen}
        onClose={onClose}
        feature={selectedFeature}
      />
    </NativeBaseProvider>
  );
}

const ParkTag = ({ tag, index }) => (
  <Text
    style={{
      alignSelf: "flex-start",
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 3,
      paddingBottom: 3,
      margin: 3,
      borderWidth: 1,
      borderRadius: 5,
    }}
    key={index}
  >
    {tag}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  ...StyleSheet.absoluteFill,
});
