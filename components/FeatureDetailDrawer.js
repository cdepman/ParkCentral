import { Text, View } from "react-native";
import { Center, Actionsheet, Box } from "native-base";
import { AirbnbRating } from "react-native-ratings";

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
        <Box w="100%" h={300} px={4}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 0 }}>
            {feature.title}
          </Text>
          <Text style={{ marginBottom: 10, marginLeft: 3 }}>
            {feature.size}
          </Text>
          <AirbnbRating
            selectedColor="#228B22"
            isDisabled
            size={15}
            defaultRating={feature.rating}
            showRating={false}
            starContainerStyle={{
              alignSelf: "flex-start",
              justifySelf: "flex-start",
              marginBottom: 20,
            }}
          />
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
