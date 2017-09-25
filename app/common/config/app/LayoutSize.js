export default function appLayout(width, height) {
  let widthLayout = width;
  let heightLayout = height;

  if (widthLayout > heightLayout) {
    widthLayout = height;
    heightLayout = width;
  }

  const _size =
    width < 375
      ? getSizeSmall(widthLayout, heightLayout)
      : getSize(widthLayout, heightLayout);
  return { width: widthLayout, height: heightLayout, ..._size };
}

export function getSize(width, height) {
  const newHeightSlider = width / 16 * 9;
  const newWidth = (width - 21) * 0.45;
  const newHeight = (width - 21) * 0.45 / 16 * 9;
  const newWidthDevices = parseInt(Math.round((width - 14) * 3 / 4));
  const newHeightDevices = parseInt(Math.round(width * 3 / 4 / 16 * 9));
  const newWidthListen = (width - 14) * 0.3;
  const newHeightListen = (width - 14) * 0.3 / 16 * 9;
  const newWidthCategory = (width - 21) * 0.5;
  const newHeightCategory = (width - 21) * 0.5 / 16 * 9;
  const newWidthCategoryListen = (width - 35) / 3;
  const newHeightCategoryListen = (width - 35) / 3 / 16 * 9;
  const newWidthContainerImageSize = (width - 14) * 0.5;
  const newHeightContainerImageSize = (width - 14) * 0.5 / 16 * 9;
  const newWidthTimeLines = width / 2 - 20;
  const newHeightTimeLines = (width / 2 - 20) / 16 * 9;
  const newWidthProgress = width / 16 * 9 / 2;

  return {
    size: { width: width, height: newHeightSlider },
    sizeContainer: { width: newWidth, height: newHeight + 15 },
    listenSizeContainerPopular: { width: width - 14, height: newHeight },
    sizeCategoryContainer: {
      width: newWidthCategory,
      height: newHeightCategory + 80
    },
    listenSizeContainer: { width: newWidthListen, height: newWidthListen + 15 },
    listenSizeCategoryContainer: {
      width: newWidthCategoryListen,
      height: newWidthCategoryListen + 80
    },
    sizeImage: { width: newWidth, height: newHeight + 15 },
    sizeCategoryImage: { width: newWidthCategory, height: newHeightCategory },
    listenSizeImage: { width: newWidthListen, height: newWidthListen },
    listenSizeImagePopular: { width: width - 14, height: width / 21 * 5 },
    listenSizeCategoryImage: {
      width: newWidthCategoryListen,
      height: newWidthCategoryListen
    },
    sizeText: { width: newWidth },
    sizeCategoryText: { width: newWidthCategory },
    listenSizeText: { width: newWidthListen },
    listenSizeCategoryText: { width: newWidthCategoryListen },
    imageDevice: newWidthDevices + "x" + newHeightDevices,
    imageDeviceLanscape: height + "x" + width,
    width: width,
    height: height,

    containerImageSize: {
      width: newWidthContainerImageSize,
      height: newHeightContainerImageSize
    },
    newWidthTimeLines: newWidthTimeLines,
    newHeightTimeLines: newHeightTimeLines,
    newWidthProgress: newWidthProgress
  };
}

export function getSizeSmall(width, height) {
  const newWidth = (width - 14) * 0.75;
  const newHeight = (width - 14) * 0.75 / 16 * 9;
  const newWidthDevices = parseInt(Math.round((width - 14) * 3 / 4));
  const newHeightDevices = parseInt(Math.round(width * 3 / 4 / 16 * 9));
  const newWidthListen = (width - 14) * 0.45;
  const newHeightListen = (width - 14) * 0.45 / 16 * 9;
  const newWidthCategory = (width - 21) * 0.5;
  const newHeightCategory = (width - 21) * 0.5 / 16 * 9;
  const newWidthCategoryListen = (width - 28) * 0.33;
  const newHeightCategoryListen = (width - 14) * 0.33 / 16 * 9;
  const newWidthContainerImageSize = (width - 14) * 0.5;
  const newHeightContainerImageSize = (width - 14) * 0.5 / 16 * 9;
  const newWidthTimeLines = width / 2 - 20;
  const newHeightTimeLines = (width / 2 - 20) / 16 * 9;
  const newWidthProgress = width / 16 * 9 / 2;

  return {
    sizeContainer: { width: newWidth, height: newHeight + 15 },
    listenSizeContainerPopular: { width: width - 14, height: newHeight },
    sizeCategoryContainer: {
      width: newWidthCategory,
      height: newHeightCategory + 80
    },
    listenSizeContainer: { width: newWidthListen, height: newWidthListen + 15 },
    listenSizeCategoryContainer: {
      width: newWidthCategoryListen,
      height: newWidthCategoryListen + 80
    },
    sizeImage: { width: newWidth, height: newHeight },
    sizeCategoryImage: { width: newWidthCategory, height: newHeightCategory },
    listenSizeImage: { width: newWidthListen, height: newWidthListen },
    listenSizeImagePopular: { width: width - 14, height: width / 21 * 5 },
    listenSizeCategoryImage: {
      width: newWidthCategoryListen,
      height: newWidthCategoryListen
    },
    sizeText: { width: newWidth },
    sizeCategoryText: { width: newWidthCategory },
    listenSizeText: { width: newWidthListen },
    listenSizeCategoryText: { width: newWidthCategoryListen },
    imageDevice: newWidthDevices + "x" + newHeightDevices,
    imageDeviceLanscape: height + "x" + width,
    width: width,
    height: height,
    containerImageSize: {
      width: newWidthContainerImageSize,
      height: newHeightContainerImageSize
    },
    newWidthTimeLines: newWidthTimeLines,
    newHeightTimeLines: newHeightTimeLines,
    newWidthProgress: newWidthProgress
  };
}
