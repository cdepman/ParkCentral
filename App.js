import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import Svg, { Path, Circle } from "react-native-svg";

// Dummy data
const parks = [
  {
    name: "Central Park",
    size: "843 acres",
    tags: ["castle", "lakes", "dog-friendly", "bathrooms", "water fountains"],
    latitude: 40.7829,
    longitude: -73.9654,
  },
  {
    name: "Prospect Park",
    size: "585 acres",
    tags: ["bike-friendly", "bathrooms"],
    latitude: 40.6616,
    longitude: -73.9692,
  },
  // Add more parks here
];

// Map styling
const customMapStyle = [
  {
    featureType: "landscape.man_made",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.natural.landcover",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#50d78b",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "landscape.natural.terrain",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#54876a",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.government",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.medical",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#00a347",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#14ffbd",
      },
      {
        visibility: "on",
      },
      {
        weight: 1,
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.icon",
    stylers: [
      {
        color: "#149974",
      },
      {
        weight: 3.5,
      },
    ],
  },
  {
    featureType: "poi.school",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.sports_complex",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={customMapStyle}
        initialRegion={{
          latitude: 40.7829,
          longitude: -73.9654,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {parks.map((park, index) => (
          <View key={index} style={{ width: 40, height: 56 }}>
            <Marker
              key={index}
              coordinate={{
                latitude: park.latitude,
                longitude: park.longitude,
              }}
              title={park.name}
              description={park.tags}
            >
              <Callout
                tooltip
                style={{
                  backgroundColor: "#ffffff",
                  width: 250,
                  padding: 15,
                  borderRadius: 4,
                  borderColor: "#007fff",
                  borderWidth: 1,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, marginLeft: 3 }}
                >
                  {park.name}
                </Text>
                <Text style={{ marginBottom: 10, marginLeft: 3 }}>
                  {park.size}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                  }}
                >
                  {park.tags.map((tag, index) => (
                    <ParkTag tag={tag} index={index} />
                  ))}
                </View>
              </Callout>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlSpace="preserve"
                width={60}
                height={40}
                viewBox="0 0 1187 1187"
              >
                <Circle cx="593.5" cy="593.5" r="593.5" fill="#007fff" />
                <Path
                  d="M532.13 619.419H427.781C413.37 619.419 401.694 631.095 401.694 645.506V932.912C401.694 947.323 413.37 959 427.781 959H532.13C546.541 959 558.217 947.323 558.217 932.912V645.506C558.217 631.095 546.541 619.419 532.13 619.419Z"
                  fill="#A66342"
                />
                <Path
                  d="M532.13 619.419H479.956V959H532.13C546.541 959 558.217 947.323 558.217 932.912V645.506C558.217 631.095 546.541 619.419 532.13 619.419Z"
                  fill="#995B3D"
                />
                <Path
                  d="M966.912 959H219.087C204.677 959 193 947.323 193 932.912C193 918.502 204.677 906.825 219.087 906.825H966.914C981.316 906.825 993.002 918.502 993.002 932.912C993.002 947.323 981.314 959 966.912 959Z"
                  fill="#7BCC29"
                />
                <Path
                  d="M774.216 828.586L688.652 914.5C683.63 919.608 681.111 926.267 681.089 932.912H743.927L810.389 865.631L877.808 932.912H940.864C940.842 926.267 938.281 919.608 933.173 914.5L847.783 828.588L933.173 742.675C939.638 736.209 942.02 727.261 940.339 719H883.08L810.389 791.542L738.289 719H681.608C679.955 727.261 682.297 736.209 688.653 742.675L774.216 828.586Z"
                  fill="#A66342"
                />
                <Path
                  d="M940.866 932.912C940.844 926.267 938.283 919.608 933.175 914.5L847.784 828.588L933.175 742.675C939.639 736.209 942.022 727.261 940.341 719H883.081L810.391 791.542V865.63L877.809 932.912H940.866Z"
                  fill="#995B3D"
                />
                <Path
                  d="M966.912 750.327H653.87C639.459 750.327 627.783 738.65 627.783 724.239C627.783 709.828 639.459 698.152 653.87 698.152H966.914C981.325 698.152 993.002 709.828 993.002 724.239C993 738.65 981.323 750.327 966.912 750.327Z"
                  fill="#FFDE33"
                />
                <Path
                  d="M966.912 698.153H810.391V750.327H966.912C981.323 750.327 993 738.65 993 724.239C993 709.83 981.323 698.153 966.912 698.153Z"
                  fill="#FFBC33"
                />
                <Path
                  d="M966.912 906.827H479.956V959H966.912C981.314 959 993 947.323 993 932.913C993 918.502 981.314 906.827 966.912 906.827Z"
                  fill="#6EB825"
                />
                <Path
                  d="M662.391 333.783C658.217 236.739 578.044 159 479.956 159C382.044 159 302.044 236.391 297.522 333.261C233.35 363.695 193 430.305 193 498.13C193 598.825 274.913 680.739 375.609 680.739C413 680.739 449.175 669.088 479.958 647.348C510.741 669.088 546.914 680.739 584.306 680.739C685.002 680.739 766.916 598.827 766.916 498.13C766.913 427.522 725.695 363.695 662.391 333.783Z"
                  fill="#7BCC29"
                />
                <Path
                  d="M766.912 498.13C766.912 598.825 685 680.739 584.303 680.739C546.913 680.739 510.737 669.088 479.955 647.348V159C578.042 159 658.216 236.739 662.389 333.783C725.695 363.695 766.912 427.522 766.912 498.13Z"
                  fill="#6EB825"
                />
              </Svg>
            </Marker>
          </View>
        ))}
      </MapView>
    </View>
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
      backgroundColor: "bone",
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
