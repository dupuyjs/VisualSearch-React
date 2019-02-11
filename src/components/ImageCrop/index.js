import React from 'react';
import { View, ImageBackground, Image, PanResponder, ImageEditor } from 'react-native';
import { number, string } from 'prop-types';

import { DEFAULT_MARGIN, ANCHOR_VIRTUAL_SIZE, ANCHOR_DELTA } from './styles';
import styles from './styles';

export class ImageCrop extends React.Component {
  static propTypes = {
    imageUri: string,
    imageRotation: number,
  };

  constructor(props) {
    super(props);

    this.lastKnownTop = DEFAULT_MARGIN;
    this.lastKnownLeft = DEFAULT_MARGIN;
    this.lastKnownBottom = DEFAULT_MARGIN;
    this.lastKnownRight = DEFAULT_MARGIN;

    this.position = {
      position: 'absolute',
      top: DEFAULT_MARGIN,
      left: DEFAULT_MARGIN,
      bottom: DEFAULT_MARGIN,
      right: DEFAULT_MARGIN,
    };
  }

  setTop(top) {
    if (top <= this.verticalMargin - ANCHOR_DELTA) {
      this.position.top = this.verticalMargin - ANCHOR_DELTA;
    } else if (top >= this.heightLayoutBoundary - this.position.bottom - ANCHOR_VIRTUAL_SIZE * 2) {
      this.position.top = this.heightLayoutBoundary - this.position.bottom - ANCHOR_VIRTUAL_SIZE * 2;
    } else {
      this.position.top = top;
    }
  }

  setLeft(left) {
    if (left <= this.horizontalMargin - ANCHOR_DELTA) {
      this.position.left = this.horizontalMargin - ANCHOR_DELTA;
    } else if (left >= this.widthLayoutBoundary - this.position.right - ANCHOR_VIRTUAL_SIZE * 2) {
      this.position.left = this.widthLayoutBoundary - this.position.right - ANCHOR_VIRTUAL_SIZE * 2;
    } else {
      this.position.left = left;
    }
  }

  setBottom(bottom) {
    if (bottom <= this.verticalMargin - ANCHOR_DELTA) {
      this.position.bottom = this.verticalMargin - ANCHOR_DELTA;
    } else if (bottom >= this.heightLayoutBoundary - this.position.top - ANCHOR_VIRTUAL_SIZE * 2) {
      this.position.bottom = this.heightLayoutBoundary - this.position.top - ANCHOR_VIRTUAL_SIZE * 2;
    } else {
      this.position.bottom = bottom;
    }
  }

  setRight(right) {
    if (right <= this.horizontalMargin - ANCHOR_DELTA) {
      this.position.right = this.horizontalMargin - ANCHOR_DELTA;
    } else if (right >= this.widthLayoutBoundary - this.position.left - ANCHOR_VIRTUAL_SIZE * 2) {
      this.position.right = this.widthLayoutBoundary - this.position.left - ANCHOR_VIRTUAL_SIZE * 2;
    } else {
      this.position.right = right;
    }
  }

  setCenter(top, left, bottom, right) {
    if (top <= this.verticalMargin - ANCHOR_DELTA) {
      this.position.top = this.verticalMargin - ANCHOR_DELTA;
    } else if (bottom <= this.verticalMargin - ANCHOR_DELTA) {
      this.position.bottom = this.verticalMargin - ANCHOR_DELTA;
    } else {
      this.position.top = top;
      this.position.bottom = bottom;
    }

    if (left <= this.horizontalMargin - ANCHOR_DELTA) {
      this.position.left = this.horizontalMargin - ANCHOR_DELTA;
    } else if (right <= this.horizontalMargin - ANCHOR_DELTA) {
      this.position.right = this.horizontalMargin - ANCHOR_DELTA;
    } else {
      this.position.left = left;
      this.position.right = right;
    }
  }

  componentWillMount() {
    this.topLeftResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const { dx, dy } = gestureState;
        const left = this.lastKnownLeft + dx;
        const top = this.lastKnownTop + dy;

        this.setLeft(left);
        this.setTop(top);
        this.crop.setNativeProps({ style: this.position });
      },
      onPanResponderRelease: (e, gestureState) => {
        this.lastKnownTop = this.position.top;
        this.lastKnownLeft = this.position.left;
      },
      onPanResponderTerminate: (e, gestureState) => {
        this.lastKnownTop = this.position.top;
        this.lastKnownLeft = this.position.left;
      },
    });

    this.topRightResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const { dx, dy } = gestureState;
        const top = this.lastKnownTop + dy;
        const right = this.lastKnownRight - dx;

        this.setTop(top);
        this.setRight(right);
        this.crop.setNativeProps({ style: this.position });
      },
      onPanResponderRelease: (e, gestureState) => {
        this.lastKnownTop = this.position.top;
        this.lastKnownRight = this.position.right;
      },
      onPanResponderTerminate: (e, gestureState) => {
        this.lastKnownTop = this.position.top;
        this.lastKnownRight = this.position.right;
      },
    });

    this.bottomLeftResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const { dx, dy } = gestureState;
        const left = this.lastKnownLeft + dx;
        const bottom = this.lastKnownBottom - dy;

        this.setLeft(left);
        this.setBottom(bottom);
        this.crop.setNativeProps({ style: this.position });
      },
      onPanResponderRelease: (e, gestureState) => {
        this.lastKnownLeft = this.position.left;
        this.lastKnownBottom = this.position.bottom;
      },
      onPanResponderTerminate: (e, gestureState) => {
        this.lastKnownLeft = this.position.left;
        this.lastKnownBottom = this.position.bottom;
      },
    });

    this.bottomRightResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const { dx, dy } = gestureState;
        const right = this.lastKnownRight - dx;
        const bottom = this.lastKnownBottom - dy;

        this.setRight(right);
        this.setBottom(bottom);
        this.crop.setNativeProps({ style: this.position });
      },
      onPanResponderRelease: (e, gestureState) => {
        this.lastKnownRight = this.position.right;
        this.lastKnownBottom = this.position.bottom;
      },
      onPanResponderTerminate: (e, gestureState) => {
        this.lastKnownRight = this.position.right;
        this.lastKnownBottom = this.position.bottom;
      },
    });

    this.centerResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const { dx, dy } = gestureState;
        const top = this.lastKnownTop + dy;
        const left = this.lastKnownLeft + dx;
        const bottom = this.lastKnownBottom - dy;
        const right = this.lastKnownRight - dx;

        this.setCenter(top, left, bottom, right);

        this.crop.setNativeProps({ style: this.position });
      },
      onPanResponderRelease: (e, gestureState) => {
        this.lastKnownTop = this.position.top;
        this.lastKnownLeft = this.position.left;
        this.lastKnownRight = this.position.right;
        this.lastKnownBottom = this.position.bottom;
      },
      onPanResponderTerminate: (e, gestureState) => {
        this.lastKnownTop = this.position.top;
        this.lastKnownLeft = this.position.left;
        this.lastKnownRight = this.position.right;
        this.lastKnownBottom = this.position.bottom;
      },
    });
  }

  updateBoundaries() {
    if (this.widthLayoutBoundary && this.heightLayoutBoundary && this.widthImage && this.heightImage) {
      let layoutRatio = this.heightLayoutBoundary / this.widthLayoutBoundary;
      let imageRatio = this.heightImage / this.widthImage;

      if (layoutRatio <= imageRatio) {
        // horizontal margins
        this.scaleRatio = this.heightLayoutBoundary / this.heightImage;
        this.widthImageBoundary = this.widthImage * this.scaleRatio;
        let margin = (this.widthLayoutBoundary - this.widthImageBoundary) / 2;
        this.horizontalMargin = margin;
        this.verticalMargin = 0;
      } else {
        // vertical margins
        this.scaleRatio = this.widthLayoutBoundary / this.widthImage;
        this.heightImageBoundary = this.heightImage * this.scaleRatio;
        let margin = (this.heightLayoutBoundary - this.heightImageBoundary) / 2;
        this.horizontalMargin = 0;
        this.verticalMargin = margin;
      }
    }
  }

  onUpdateLayout = (event) => {
    const { height, width } = event.nativeEvent.layout;

    this.widthLayoutBoundary = width;
    this.heightLayoutBoundary = height;

    this.updateBoundaries();
  };

  onGetImageSize = (height, width) => {
    this.widthImage = width;
    this.heightImage = height;

    this.updateBoundaries();
  };

  setRef = (ref) => {
    this.crop = ref;
  };

  cropImage = (success) => {
    if (this.props.imageUri) {
      let left = this.position.left + ANCHOR_DELTA - this.horizontalMargin;
      let top = this.position.top + ANCHOR_DELTA - this.verticalMargin;
      let right = this.widthLayoutBoundary - (this.position.right + ANCHOR_DELTA) - this.horizontalMargin;
      let bottom = this.heightLayoutBoundary - (this.position.bottom + ANCHOR_DELTA) - this.verticalMargin;

      let tx = left / this.scaleRatio;
      let ty = top / this.scaleRatio;
      let twidth = (right - left) / this.scaleRatio;
      let theight = (bottom - top) / this.scaleRatio;

      let x = tx;
      let y = ty;
      let width = twidth;
      let height = theight;

      /* Fix in case image has been rotated of 90° */
      if (this.props.imageRotation) {
        switch (this.props.imageRotation) {
          case 90:
            x = ty;
            y = this.widthImage - tx - twidth;
            width = theight;
            height = twidth;
            break;
          default:
            break;
        }
      }

      cropData = {
        offset: { x: x, y: y },
        size: { width: width, height: height },
      };

      ImageEditor.cropImage(
        this.props.imageUri,
        cropData,
        (uri) => {
          success(uri);
        },
        (err) => {
          console.err(err);
        },
      );
    }
  };

  render() {
    if (this.props.imageUri) {
      Image.getSize(
        this.props.imageUri,
        (width, height) => {
          this.onGetImageSize(height, width);
        },
        (err) => {
          console.err(err);
        },
      );
    }

    return (
      <ImageBackground
        resizeMode="contain"
        style={{ flex: 1, backgroundColor: 'gray' }}
        source={{ uri: this.props.imageUri }}
        onLayout={this.onUpdateLayout}
      >
        <View style={{ flex: 1 }}>
          <View ref={this.setRef} style={styles.container}>
            <View style={styles.crop}>
              <View style={styles.center} {...this.centerResponder.panHandlers}>
                <View style={styles.pivotCenter}>
                  <View style={styles.anchorCenter} />
                </View>
              </View>
            </View>
            <View style={styles.topLeft} {...this.topLeftResponder.panHandlers}>
              <View style={styles.anchor} />
            </View>
            <View style={styles.topRight} {...this.topRightResponder.panHandlers}>
              <View style={styles.anchor} />
            </View>
            <View style={styles.bottomLeft} {...this.bottomLeftResponder.panHandlers}>
              <View style={styles.anchor} />
            </View>
            <View style={styles.bottomRight} {...this.bottomRightResponder.panHandlers}>
              <View style={styles.anchor} />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
