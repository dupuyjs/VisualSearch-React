import React from "react";
import { Text, View, FlatList, StyleSheet, PermissionsAndroid, Image, TouchableOpacity, Button } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { VisualSearchRequest } from "../services/VisualSearchRequest";
import ImagePicker from "react-native-image-picker";

export interface FetchExampleSate {
  items?: Array<any>;
  imageLibraryUri?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export class FetchVisualSearch extends React.Component<NavigationScreenProps, FetchExampleSate> {
  public static navigationOptions = {
    title: "Bing Visual Search sample"
  };
  /**
   *
   */
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  async requestStoragePermission(): Promise<boolean> {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
        title: "Storage access",
        message: "App needs access to your photos library "
      });
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      alert(err);
      console.warn(err);
      return false;
    }
  }

  async getPhotosAsync() {
    // will make a thumbnail image
    const options = {
      title: "Select an image",
      quality: 0.6,
      maxWidth: 100,
      maxHeight: 100,
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    const launchImagePromise = () =>
      new Promise<any>((rs, rj) => {
        ImagePicker.launchImageLibrary(options, response => {
          if (response.didCancel) rs(null);

          if (response.error) rj(response.error);

          rs(response);
        });
      });

    let r = await launchImagePromise();

    if (!options || (!options.maxWidth && !options.maxHeight)) {
      var max = 100;
      var aa = r.height > r.width ? r.height : r.width;
      var bb = r.height <= r.width ? r.height : r.width;
      var ratio = aa > max ? max / aa : bb > max ? max / bb : 1;

      r.width = r.width * ratio;
      r.height = r.height * ratio;
    }

    this.setState({
      imageLibraryUri: r.uri,
      imageWidth: r.width,
      imageHeight: r.height
    });

    const vs = new VisualSearchRequest();
    let items = await vs.postAsync(r.uri, r.fileName, 60);

    if (!items) return;

    this.setState({
      items: items
    });
  }

  async componentDidMount() {
    try {
      await this.requestStoragePermission();
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    let i = 0;
    return (
      <View style={styles.container}>
        <Button title="Load an image from galery" onPress={() => this.getPhotosAsync()} />
        <Image
          key={this.state.imageLibraryUri}
          style={{
            display: this.state.imageLibraryUri ? "flex" : "none",
            width: this.state.imageWidth,
            height: this.state.imageHeight,
            alignSelf: "center",
            backgroundColor: "transparent",
            marginBottom: 10
          }}
          source={{ uri: this.state.imageLibraryUri }}
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
    backgroundColor: "#f4f4f4",
    flex: 1
  },
  progressbar: {
    marginTop: 10,
    alignItems: "center"
  },
  card: {
    flexDirection: "row",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC"
  },
  avatar: {
    padding: 10,
    width: 50,
    height: 50
  },
  description: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "column"
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  username: {
    fontSize: 10
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    color: "#000",
    fontSize: 12
  },
  countContainer: {
    flexDirection: "row"
  },
  count: {
    fontSize: 10
  }
});
