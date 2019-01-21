import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Assets } from '../assets/Assets';
import { ImageData } from './ImageData';

export class PreviewScreen extends React.Component<NavigationScreenProps> {
  public static navigationOptions = {
    title: 'Preview',
  };

  private _imageData: ImageData;

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.navigateToCropScreen = this.navigateToCropScreen.bind(this);
    this.navigateToVisualSearch = this.navigateToVisualSearch.bind(this);
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  navigateToCropScreen = () => {
    this.props.navigation.navigate('CropScreen', { data: this._imageData });
  };

  navigateToVisualSearch = () => {
    this.props.navigation.navigate('SearchScreen', { data: this._imageData });
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
        <Image
          resizeMode='contain'
          style={{ flex: 1, backgroundColor: 'gray' }}
          source={{ uri: this._imageData.uri }}
        />
        <View style={styles.menu}>
          <TouchableOpacity style={styles.sideCircleShape} onPress={this.navigateToCropScreen}>
            <Image style={{ width: 28, height: 28, alignSelf: 'center' }} source={Assets.Crop} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mainCircleShape} onPress={this.navigateToVisualSearch}>
            <Image style={{ width: 48, height: 48, alignSelf: 'center' }} source={Assets.Check} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideCircleShape} onPress={this.goBack}>
            <Image style={{ width: 28, height: 28, alignSelf: 'center' }} source={Assets.Reload} />
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
