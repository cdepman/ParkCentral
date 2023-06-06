import { Text, View } from "react-native";
import { Center, Actionsheet, Box } from "native-base";

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

export default FeatureDetailDrawer = ({ isOpen, onClose, feature }) => (
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
