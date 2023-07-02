module.exports = {
  name: "ParkFinder",
  version: "1.0.0",
  credentials: {
    googleMapsApiKey: process.env.API_URL,
  },
  extra: {
    eas: {
      projectId: "de469ced-e00e-4412-b2f9-e691b3bf3ae3",
    },
  },
  ios: {
    bundleIdentifier: "com.madpen.parkcentral",
    buildNumber: "1.0.0",
  },
};
