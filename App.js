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

// Marker Lookup
const markersByFeatureType = {
  park: ParkMarker,
  castle: CastleMarker,
};

// Dummy data
const parks = [
  {
    name: "Central Park",
    size: "843 acres",
    tags: ["castle", "lakes", "dog-friendly", "bathrooms", "water fountains"],
    latitude: 40.7829,
    longitude: -73.9654,
    type: "park",
    features: [
      {
        name: "Belvedere Castle",
        latitude: 40.779447,
        longitude: -73.96906,
        type: "castle",
        tags: ["historic", "fun", "romantic"],
      },
    ],
  },
  {
    name: "Prospect Park",
    size: "585 acres",
    tags: ["bike-friendly", "bathrooms"],
    latitude: 40.6616,
    longitude: -73.9692,
    type: "park",
    features: [],
  },
  // Add more parks here
];

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
        title={location.name}
        description={location.tags}
      >
        <Callout
          tooltip
          style={{
            opacity: 0,
          }}
        ></Callout>
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

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectedFeature, setSelectedFeature] = useState(parks[0]);
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <MapView
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
      <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose} disableOverlay>
          <Actionsheet.Content>
            <Box w="100%" h={100} px={4} justifyContent="center">
              <Text
                style={{ fontWeight: "bold", fontSize: 20, marginTop: 0 }}
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                {selectedFeature.name}
              </Text>
              <Text style={{ marginBottom: 10, marginLeft: 3 }}>
                {selectedFeature.size}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                }}
              >
                {selectedFeature.tags.map((tag, index) => (
                  <ParkTag tag={tag} key={index} />
                ))}
              </View>
            </Box>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
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
