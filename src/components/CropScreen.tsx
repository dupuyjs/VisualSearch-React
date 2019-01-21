import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Assets } from '../assets/Assets';
import { ImageCrop } from './ImageCrop';
import { ImageData } from './ImageData';

export class CropScreen extends React.Component<NavigationScreenProps> {
  public static navigationOptions = {
    title: 'Crop',
  };

  private _imageCrop: ImageCrop;
  private _imageData: ImageData;

  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.cropPicture = this.cropPicture.bind(this);
  }

  cropPicture = () => {
    this._imageCrop.cropImage((uri) => {
      const imageData: ImageData = {
        uri: uri,
        imageRotation: undefined,
      };
      this.props.navigation.navigate('PreviewScreen', { data: imageData });
    });
  };

  setRef = (ref) => {
    this._imageCrop = ref;
  };

  render = () => {
    this._imageData = this.props.navigation.getParam('data', null);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}
      >
        <ImageCrop
          ref={this.setRef}
          imageUri={this._imageData.uri}
          imageRotation={this._imageData.imageRotation}
        />

        <View style={styles.menu}>
          <TouchableOpacity style={styles.mainCircleShape} onPress={this.cropPicture}>
            <Image style={{ width: 48, height: 48, alignSelf: 'center' }} source={Assets.Check} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  menu: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
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
});
