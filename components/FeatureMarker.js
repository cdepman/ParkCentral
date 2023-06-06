import { ParkMarker } from "./MapMarkers/ParkMarker";
import { CastleMarker } from "./MapMarkers/CastleMarker";
import { View } from "react-native";
import { Marker } from "react-native-maps";

// Marker Lookup
const markerByFeatureType = {
  park: ParkMarker,
  castle: CastleMarker,
};

export default FeatureMarker = ({ location, onOpen, setSelectedFeature }) => {
  return (
    <View style={{ width: 20, height: 20 }}>
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
        {markerByFeatureType[location.type]}
      </Marker>
    </View>
  );
};
