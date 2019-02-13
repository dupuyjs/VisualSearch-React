import ImageResizer from 'react-native-image-resizer';

const MAX_DISPLAY_WIDTH = 2000;
const MAX_DISPLAY_HEIGHT = 2000;
const MAX_WIDTH = 1000;
const MAX_HEIGHT = 1000;
const QUALITY = 80;

export enum ORIENTATION {
  ROTATE_0 = 0,
  ROTATE_90 = 90,
  ROTATE_180 = 180,
  ROTATE_270 = 270,
}

export interface ResizedImageInfo {
  path: string;
  uri: string;
  size?: number;
  name?: string;
}

export class ImageHelper {
  static setSizeAndRotationAsync = async (uri: string, angle: ORIENTATION): Promise<ResizedImageInfo> => {
    let data: ResizedImageInfo = undefined;

    try {
      data = await ImageResizer.createResizedImage(uri, MAX_DISPLAY_WIDTH, MAX_DISPLAY_HEIGHT, 'JPEG', QUALITY, angle);
    } catch (err) {
      console.log(err);
    }

    return data;
  };

  static limitImageSizeAsync = async (uri: string) => {
    let data: ResizedImageInfo = undefined;

    try {
      data = await ImageResizer.createResizedImage(uri, MAX_WIDTH, MAX_HEIGHT, 'JPEG', QUALITY, 0);
      if (data.size >= 100000) {
          console.error('Image size should be less than 1MB, please reduce MAX_WIDTH, MAX_HEIGHT or QUALITY');
      }
    } catch (err) {
      console.log(err);
    }

    return data;
  };

  static fixRotationFromExifAsync = async (uri: string, exifOrientation: number) => {
    switch (exifOrientation) {
      case 6:
        return await ImageHelper.setSizeAndRotationAsync(uri, ORIENTATION.ROTATE_90);
      case 3:
        return await ImageHelper.setSizeAndRotationAsync(uri, ORIENTATION.ROTATE_180);
      case 8:
        return await ImageHelper.setSizeAndRotationAsync(uri, ORIENTATION.ROTATE_270);
      default:
        return await ImageHelper.setSizeAndRotationAsync(uri, ORIENTATION.ROTATE_0);
    }
  };
}
