import { StyleSheet } from 'react-native';

export const DEFAULT_MARGIN = 40;
export const ANCHOR_REAL_SIZE = 10;
export const ANCHOR_VIRTUAL_SIZE = 36;
export const ANCHOR_DELTA = ANCHOR_VIRTUAL_SIZE / 2 + 1;

const ANCHOR_COLOR = 'blue';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: DEFAULT_MARGIN,
    left: DEFAULT_MARGIN,
    bottom: DEFAULT_MARGIN,
    right: DEFAULT_MARGIN,
  },
  crop: {
    position: 'absolute',
    top: ANCHOR_VIRTUAL_SIZE / 2,
    left: ANCHOR_VIRTUAL_SIZE / 2,
    bottom: ANCHOR_VIRTUAL_SIZE / 2,
    right: ANCHOR_VIRTUAL_SIZE / 2,
    borderColor: ANCHOR_COLOR,
    borderWidth: 1,
  },
  topLeft: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: ANCHOR_VIRTUAL_SIZE,
    height: ANCHOR_VIRTUAL_SIZE,
    top: 0,
    left: 0,
  },
  topRight: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: ANCHOR_VIRTUAL_SIZE,
    height: ANCHOR_VIRTUAL_SIZE,
    top: 0,
    right: 0,
  },
  bottomLeft: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: ANCHOR_VIRTUAL_SIZE,
    height: ANCHOR_VIRTUAL_SIZE,
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: ANCHOR_VIRTUAL_SIZE,
    height: ANCHOR_VIRTUAL_SIZE,
    bottom: 0,
    right: 0,
  },
  center: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: ANCHOR_VIRTUAL_SIZE / 2,
    left: ANCHOR_VIRTUAL_SIZE / 2,
    right: ANCHOR_VIRTUAL_SIZE / 2,
    bottom: ANCHOR_VIRTUAL_SIZE / 2,
  },
  anchor: {
    backgroundColor: ANCHOR_COLOR,
    width: ANCHOR_REAL_SIZE,
    height: ANCHOR_REAL_SIZE,
    borderRadius: ANCHOR_REAL_SIZE / 2,
    margin: (ANCHOR_VIRTUAL_SIZE - ANCHOR_REAL_SIZE) / 2,
  },
  pivotCenter: {
    position: "absolute",
    top: '50%',
    left: '50%'
  },
  anchorCenter: {
    position: 'relative',
    width: ANCHOR_REAL_SIZE / 2,
    height: ANCHOR_REAL_SIZE / 2,
    borderRadius: ANCHOR_REAL_SIZE / 4,
    borderWidth: 1,
    borderColor: ANCHOR_COLOR,
    top: '-50%',
    left: '-50%',
  },
});
