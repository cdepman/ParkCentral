import { View, Text } from "react-native";
import { Button } from "native-base";

export default FilterButton = ({
  icon,
  selectedFeatureFilterName,
  isSelected,
  updateFilterSelection,
}) => (
  <View>
    <Button
      style={{
        margin: 5,
        backgroundColor: "white",
        shadowRadius: "2px",
        borderRadius: 30,
      }}
      onPress={() => updateFilterSelection(selectedFeatureFilterName)}
    >
      <Text style={{ fontSize: 26 }}>{icon}</Text>
    </Button>
    {isSelected && (
      <Text
        style={{
          position: "absolute",
          alignSelf: "flex-end",
        }}
      >
        ✅
      </Text>
    )}
  </View>
);
