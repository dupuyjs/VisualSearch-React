import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation';

import { CameraScreen } from './src/components/CameraScreen';
import { CropScreen } from './src/components/CropScreen';
import { MainScreen } from './src/components/MainScreen';
import { PreviewScreen } from './src/components/PreviewScreen';
import { SearchScreen } from './src/components/SearchScreen';

const AppNavigator = createStackNavigator({
  MainScreen: { screen: MainScreen },
  CameraScreen: { screen: CameraScreen },
  PreviewScreen: { screen: PreviewScreen },
  CropScreen: { screen: CropScreen },
  SearchScreen: { screen: SearchScreen },
});

export default createAppContainer(AppNavigator);