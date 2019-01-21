import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { VisualSearchRequest } from '../services/VisualSearchRequest';
import { ImageData } from './ImageData';

export interface VisualSearchSate {
  items?: any[];
}

export class SearchScreen extends React.Component<NavigationScreenProps, VisualSearchSate> {
  public static navigationOptions = {
    title: 'Bing Visual Search sample',
  };

  private _imageData: ImageData;

  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  async getVisualSearchAsync() {
    const vs = new VisualSearchRequest();
    let items = await vs.postAsync(this._imageData.uri, undefined, 60);

    if (!items) return;

    this.setState({
      items: items,
    });
  }

  async componentDidMount() {
    try {
      this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload));

    } catch (error) {
      console.log(error);
    }
  }

  componentDidFocus = async (payload) => {
    await this.getVisualSearchAsync();
  }

  render() {
    this._imageData = this.props.navigation.getParam('data', null);

    let i = 0;
    return (
      <View style={styles.container}>
        <Image
          resizeMode='contain'
          style={{ backgroundColor: 'gray', height: 100 }}
          source={{ uri: this._imageData.uri }}
        />
        <FlatList
          data={this.state.items}
          keyExtractor={() => (i++).toString()}
          renderItem={(renderedItem: any) => {
            return (
              <TouchableOpacity>
                <View style={styles.card}>
                  <Image source={{ uri: renderedItem.item.contentUrl }} style={styles.avatar} />
                  <View style={styles.description}>
                    <Text style={styles.title}>{renderedItem.item.Article}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  progressbar: {
    marginTop: 10,
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  avatar: {
    padding: 10,
    width: 50,
    height: 50,
  },
  description: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 10,
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#000',
    fontSize: 12,
  },
  countContainer: {
    flexDirection: 'row',
  },
  count: {
    fontSize: 10,
  },
});
