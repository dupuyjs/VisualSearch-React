import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import { NavigationScreenProps } from 'react-navigation';
import { Assets } from '../assets/Assets';
import { ImageHelper } from '../utils/ImageHelper';
import { ImageData } from './ImageData';

export class CameraScreen extends React.Component<NavigationScreenProps> {
  public static navigationOptions = {
    title: 'Bing Custom Visual Search',
  };

  private camera: RNCamera;

  state = {
    flashMode: RNCamera.Constants.FlashMode.auto,
    flashModeImageSource: Assets.FlashAuto,
  };

  getNextFlashMode = (flashMode) => {
    if (flashMode === RNCamera.Constants.FlashMode.off) {
      return RNCamera.Constants.FlashMode.on;
    }
    if (flashMode === RNCamera.Constants.FlashMode.on) {
      return RNCamera.Constants.FlashMode.auto;
    }
    if (flashMode === RNCamera.Constants.FlashMode.auto) {
      return RNCamera.Constants.FlashMode.off;
    }
  };

  getFlashModeImage = (flashMode) => {
    if (flashMode === RNCamera.Constants.FlashMode.off) {
      return Assets.FlashOff;
    }
    if (flashMode === RNCamera.Constants.FlashMode.on) {
      return Assets.Flash;
    }
    if (flashMode === RNCamera.Constants.FlashMode.auto) {
      return Assets.FlashAuto;
    }
  };

  toggleFlash = () => {
    let newFlashMode = this.getNextFlashMode(this.state.flashMode);
    let newFlashModeImageSource = this.getFlashModeImage(newFlashMode);

    this.setState({
      flashMode: newFlashMode,
      flashModeImageSource: newFlashModeImageSource,
    });
  };

  launchImageLibrary = () => {
    this.getImagesAsync();
  };

  triggerCameraSnapshotAsync = async () => {
    if (this.camera) {
      const options: any = { fixOrientation: false, exif: true };

      this.camera.takePictureAsync(options).then(async (data) => {
        let uri: any = await ImageHelper.fixRotationFromExifAsync(data.uri, data.exif.Orientation);

        const imageData: ImageData = {
          uri: uri,
          imageRotation: undefined,
        };
        this.props.navigation.navigate('PreviewScreen', { data: imageData });
      });
    }
  };

  getImagesAsync = async () => {
    const options = {
      title: 'select an image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const launchImagePromise = () =>
      new Promise<any>((rs, rj) => {
        ImagePicker.launchImageLibrary(options, (response) => {
          if (response.didCancel) rs(null);
          if (response.error) rj(response.error);
          rs(response);
        });
      });

    let data = await launchImagePromise();
    const imageData: ImageData = {
      uri: data.uri,
      imageRotation: data.originalRotation,
    };

    this.props.navigation.navigate('PreviewScreen', { data: imageData });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          flashMode={this.state.flashMode}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={styles.hint}>please take a picture</Text>
          </View>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.sideCircleShape} onPress={this.launchImageLibrary.bind(this)}>
              <Image style={{ width: 26, height: 26, alignSelf: 'center' }} source={Assets.Image} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mainCircleShape} onPress={this.triggerCameraSnapshotAsync.bind(this)}>
              <Image style={{ width: 48, height: 48, alignSelf: 'center' }} source={Assets.Camera} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideCircleShape} onPress={this.toggleFlash.bind(this)}>
              <Image
                style={{ width: 26, height: 26, alignSelf: 'center' }}
                source={this.state.flashModeImageSource}
              />
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  hint: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    color: 'white',
    backgroundColor: 'black',
    opacity: 0.7,
    fontSize: 11,
  },
  menu: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainCircleShape: {
    width: 76,
    height: 76,
    borderRadius: 76 / 2,
    opacity: 0.9,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  sideCircleShape: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    opacity: 0.9,
    marginHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
