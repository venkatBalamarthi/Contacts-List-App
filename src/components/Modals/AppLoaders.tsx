import React from 'react';
import {ActivityIndicator, Dimensions} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {useSelector} from 'react-redux';
import getStyles from '@components/modals/styles';
import {RootState} from '@store/index';
const {width, height} = Dimensions.get('window');

const AppLoader = () => {
const {isLoading = false} = useSelector<RootState>(state => state?.common);
  const styles = getStyles();
  return (
    <ReactNativeModal
      isVisible={Boolean(isLoading)}
      animationIn={'slideInDown'}
      animationOut={'slideOutDown'}
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

