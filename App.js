import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { MapStyle } from "./styles/MapStyle";
import FeatureDetailDrawer from "./components/FeatureDetailDrawer";
import FeatureMarker from "./components/FeatureMarker";
import { useDisclose, NativeBaseProvider } from "native-base";
import { isWithinDistance } from "./util/isWithinDistance";
import FilterButton from "./components/FilterButton";

import parks from "./data/parkData.json";

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectedFeature, setSelectedFeature] = useState(parks[0]);
  const [zoomedPark, setZoomedPark] = useState(null);
  const [selectedFeatureFilters, setSelectedFeatureFilters] = useState({
    drinkingFountain: true,
    restroom: true,
  });
  const [zoomedParkFeatures, setZoomedParkFeatures] = useState(
    zoomedPark?.features
  );

  const filterFeatures = (features) => {
    return features.filter(({ type }) => {
      if (selectedFeatureFilters[type]) {
        return true;
      }
      return false;
    });
  };

  const updateFilterSelection = (selectedFeatureFilterName) => {
    setSelectedFeatureFilters({
      ...selectedFeatureFilters,
      [selectedFeatureFilterName]:
        !selectedFeatureFilters[selectedFeatureFilterName],
    });
  };

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
            if (parkInRegion) {
              setZoomedPark(parkInRegion);
              setZoomedParkFeatures(parkInRegion.features);
            } else {
              setZoomedPark(null);
            }
          }}
          onPress={(event) => {
            // close the drawer unless another marker is selected
            if (event.nativeEvent.action !== "marker-press") {
              onClose();
            }
          }}
          showsMyLocationButton={true}
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
            zoomedParkFeatures &&
            filterFeatures(zoomedParkFeatures).map((feature, index) => (
              <FeatureMarker
                key={index}
                onOpen={onOpen}
                setSelectedFeature={setSelectedFeature}
                location={feature}
              />
            ))}
        </MapView>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: "17%",
          alignSelf: "flex-start",
          backgroundColor: "#414a4c90",
          padding: 4,
          borderBottomRightRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <FilterButton
          icon="💧"
          filterName="drinkingFountain"
          isSelected={selectedFeatureFilters["drinkingFountain"]}
          updateFilterSelection={() =>
            updateFilterSelection("drinkingFountain")
          }
        ></FilterButton>
        <FilterButton
          icon="🚽"
          filterName="restroom"
          isSelected={selectedFeatureFilters["restroom"]}
          updateFilterSelection={() => updateFilterSelection("restroom")}
        ></FilterButton>
        <FilterButton
          icon="🪑"
          filterName="bench"
          isSelected={selectedFeatureFilters["bench"]}
          updateFilterSelection={() => updateFilterSelection("bench")}
        ></FilterButton>
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
