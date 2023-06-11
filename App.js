import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { MapStyle } from "./styles/MapStyle";
import FeatureDetailDrawer from "./components/FeatureDetailDrawer";
import FeatureMarker from "./components/FeatureMarker";
import { useDisclose, NativeBaseProvider } from "native-base";
import { isWithinDistance } from "./util/isWithinDistance";

import parks from "./data/parkData.json";

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectedFeature, setSelectedFeature] = useState(parks[0]);
  const [zoomedPark, setZoomedPark] = useState(null);
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <MapView
          onRegionChangeComplete={(region) => {
            // only render park features when park is within zoomed map region
            const parkInRegion = parks.find((park) => {
              const parklatLon = {
                latitude: park.latitude,
                longitude: park.longitude,
              };
              const regionLatLon = {
                latitude: region.latitude,
                longitude: park.longitude,
              };
              const isZoomedIn =
                region.latitudeDelta + region.longitudeDelta < 0.15;
              if (isWithinDistance(parklatLon, regionLatLon, 2) && isZoomedIn) {
                return true;
              }
            });
            setZoomedPark(parkInRegion);
          }}
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
            <FeatureMarker
              key={index}
              onOpen={onOpen}
              setSelectedFeature={setSelectedFeature}
              location={park}
            />
          ))}
          {zoomedPark &&
            zoomedPark.features.map((feature, index) => (
              <FeatureMarker
                key={index}
                onOpen={onOpen}
                setSelectedFeature={setSelectedFeature}
                location={feature}
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
});
