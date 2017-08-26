export default function appLayoutAndroid(event: {width:number, height:number}) {
  const { width, height } = event;

  const _size = width < 320 ? getSizeSmall(width, height) : getSize(width, height);
  return { width: width, height: height, ..._size };
}

export function getSize(width, height) {
  const newWidth = parseInt(Math.round((width - 14) * 0.45));
  const newHeight = parseInt(Math.round((width * 0.45) / 16*9));
  const newWidthDevices = parseInt(Math.round((width - 14) * 3/4));
  const newHeightDevices = parseInt(Math.round((width * 3/4) /16*9));
  const newWidthListen = parseInt(Math.round((width - 14) * 0.3));
  const newHeightListen = parseInt(Math.round(((width - 14) * 0.3) / 16 * 9));
  const newWidthCategory = parseInt(Math.round((width - 21) * 0.5));
  const newHeightCategory = parseInt(Math.round(((width - 21) * 0.5) / 16 * 9));
  const newWidthCategoryListen = parseInt(Math.round((width - 35) / 3));
  const newHeightCategoryListen = parseInt(Math.round(((width - 35) / 3) / 16 * 9));

  return {
    sizeContainer: { width: newWidth, height: newHeight + 40 },
    listenSizeContainerPopular: { width: width - 14, height: newHeight },
    sizeCategoryContainer: { width: newWidthCategory, height: newHeightCategory + 40 },
    listenSizeContainer: {width: newWidthListen, height: newWidthListen + 15},
    listenSizeCategoryContainer: {width: newWidthCategoryListen, height: newWidthCategoryListen + 40},
    sizeImage: { width: newWidth, height: newHeight },
    sizeCategoryImage: { width: newWidthCategory, height: newHeightCategory },
    listenSizeImage: { width: newWidthListen, height: newWidthListen },
    listenSizeImagePopular: { width: width - 14, height: (width / 21) * 5 },
    listenSizeCategoryImage: { width: newWidthCategoryListen, height: newWidthCategoryListen },
    sizeText: { width: newWidth },
    sizeCategoryText: { width: newWidthCategory },
    listenSizeText: {width: newWidthListen},
    listenSizeCategoryText: {width: newWidthCategoryListen},
    imageDevice: newWidthDevices+'x'+newHeightDevices,
    imageDeviceLanscape: height+'x'+width,
    width: width,
    height: height,
  }
}

export function getSizeSmall(width, height) {
  const newWidth = ((width - 14) * 3/4);
  const newHeight = (((width - 14) * 3/4) / 16 * 9);
  const newWidthListen = ((width - 14) * 0.5);
  const newHeightListen = (((width - 14) * 3/4) / 16 * 9);
  const newWidthCategory = ((width - 14) * 0.5);
  const newHeightCategory = (((width - 14) * 0.5) / 16 * 9);
  const newWidthCategoryListen = ((width - 28) * 0.33);
  const newHeightCategoryListen = (((width - 14) * 0.33) / 16 * 9);

  return {
    sizeContainer: { width: newWidth, height: newHeight + 15 },
    listenSizeContainerPopular: { width: width - 14, height: newHeight },
    sizeCategoryContainer: { width: newWidthCategory, height: newHeightCategory + 40 },
    listenSizeContainer: {width: newWidthListen, height: newWidthListen + 15},
    listenSizeCategoryContainer: {width: newWidthCategoryListen, height: newWidthCategoryListen + 30},
    sizeImage: { width: newWidth, height: newHeight },
    sizeCategoryImage: { width: newWidthCategory, height: newHeightCategory },
    listenSizeImage: { width: newWidthListen, height: newWidthListen },
    listenSizeImagePopular: { width: width - 14, height: (width / 21) * 5 },
    listenSizeCategoryImage: { width: newWidthCategoryListen, height: newWidthCategoryListen },
    sizeText: { width: newWidth },
    sizeCategoryText: { width: newWidthCategory },
    listenSizeText: {width: newWidthListen},
    listenSizeCategoryText: {width: newWidthCategoryListen},
    imageDevice: width+'x'+height,
    imageDeviceLanscape: height+'x'+width,
    width: width,
    height: height,
  }
}
