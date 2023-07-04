export const isWithinDistance = (
  firstPoint,
  secondPoint,
  distanceLimitInKilometers = 1
) => {
  const convertDegreesToRadians = (degreeValue) =>
    (degreeValue * Math.PI) / 180;

  const earthRadiusInKilometers = 6371;
  const differenceInLatitude = convertDegreesToRadians(
    secondPoint.latitude - firstPoint.latitude
  );
  const differenceInLongitude = convertDegreesToRadians(
    secondPoint.longitude - firstPoint.longitude
  );

  const firstPointLatitudeInRadians = convertDegreesToRadians(
    firstPoint.latitude
  );
  const secondPointLatitudeInRadians = convertDegreesToRadians(
    secondPoint.latitude
  );

  const haversineFormulaComponent =
    Math.sin(differenceInLatitude / 2) * Math.sin(differenceInLatitude / 2) +
    Math.sin(differenceInLongitude / 2) *
      Math.sin(differenceInLongitude / 2) *
      Math.cos(firstPointLatitudeInRadians) *
      Math.cos(secondPointLatitudeInRadians);

  const angularDistance =
    2 *
    Math.atan2(
      Math.sqrt(haversineFormulaComponent),
      Math.sqrt(1 - haversineFormulaComponent)
    );

  const calculatedDistance = earthRadiusInKilometers * angularDistance;
  return calculatedDistance <= distanceLimitInKilometers;
};
