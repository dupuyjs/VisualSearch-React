import ImageResizer from 'react-native-image-resizer';

const MAX_WIDTH = 2000;
const MAX_HEIGHT = 2000;
const QUALITY = 80;

export enum ORIENTATION {
  ROTATE_0 = 0,
  ROTATE_90 = 90,
  ROTATE_180 = 180,
  ROTATE_270 = 270,
}

export class ImageHelper {
  static postRotateAsync = async (uri: string, angle: ORIENTATION) => {
    let uriUpdated: string = undefined;

    try {
      let data = await ImageResizer.createResizedImage(uri, MAX_WIDTH, MAX_HEIGHT, 'JPEG', QUALITY, angle);
      uriUpdated = data.uri;
    } catch (err) {
      console.log(err);
    }

    return uriUpdated;
  };

  static fixRotationFromExifAsync = async (uri: string, exifOrientation: number) => {
    switch (exifOrientation) {
      case 6:
        return await ImageHelper.postRotateAsync(uri, ORIENTATION.ROTATE_90);
      case 3:
        return await ImageHelper.postRotateAsync(uri, ORIENTATION.ROTATE_180);
      case 8:
        return await ImageHelper.postRotateAsync(uri, ORIENTATION.ROTATE_270);
      default:
        return await ImageHelper.postRotateAsync(uri, ORIENTATION.ROTATE_0);
    }
  };
}
