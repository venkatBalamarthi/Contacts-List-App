import React from 'react';
import {ActivityIndicator, Dimensions} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import getStyles from './styles';
const {width, height} = Dimensions.get('window');

const AppLoader = () => {
    //   const {showAppLoader} = useSelector(state => state?.commonReducer);
const showAppLoader = false;
  const styles = getStyles();
  return (
    <ReactNativeModal
      isVisible={Boolean(showAppLoader)}
      animationIn={'slideInDown'}
      animationOut={'slideOutUp'}
      animationInTiming={500}
      animationOutTiming={500}
      style={styles.main}
      deviceHeight={height}
      deviceWidth={width}
      coverScreen={true}>
      <ActivityIndicator size={'large'} color="pink" />
    </ReactNativeModal>
  );
};
export default AppLoader;

