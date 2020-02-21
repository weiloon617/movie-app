/**
 * time conversion
 * @param {*} num
 */
export const timeConvert = num => {
  const hours = num / 60;
  const formattedHours = Math.floor(hours);
  const minutes = (hours - formattedHours) * 60;
  const formattedMinutes = Math.round(minutes);

  return formattedHours + "h " + formattedMinutes + "m";
};

/**
 * check is the scroll reach bottom of container
 * @param layoutMeasurement
 * @param contentOffset
 * @param contentSize
 * @returns {boolean}
 */
export const checkIsCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize
}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
