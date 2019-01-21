import * as React from 'react';
import { Component } from 'react';
import { Button, ScrollView } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

class DestinationAndTitle {
  constructor(destination: string, title?: string) {
    this.destination = destination;

    if (title === undefined) {
      this.title = destination;
    } else {
      this.title = title;
    }
  }

  public destination: string;
  public title: string;
}

export class MainScreen extends Component<NavigationScreenProps> {
  public static navigationOptions = {
    title: 'Home',
  };

  public render() {
    return (
      <ScrollView
        style={{
          backgroundColor: '#f4f4f4',
          flex: 1,
        }}
      >
        {this.destinationAndTitlePairs.map((destinationAndTitle) => (
          <Button
            key={destinationAndTitle.destination}
            onPress={() => this.props.navigation.navigate(destinationAndTitle.destination)}
            title={destinationAndTitle.title}
          />
        ))}
      </ScrollView>
    );
  }

  private destinationAndTitlePairs: DestinationAndTitle[] = [
    new DestinationAndTitle('CameraScreen', 'Bing Custom Visual Search'),
  ];
}
