import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {
  ArrowLeft,
  ArrowDownToLine,
  Trash2,
  RotateCcw,
  Play,
  Pause,
} from 'lucide-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteMedia, uploadMedia} from '../redux/slices/mediaSlice';
import Video from 'react-native-video';
import VideoView from './VideoView';

const SelectedMediaScreen = ({
  navigation,
  isVisible,
  media,
  closeModal,
  // unSelectMedia,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const {success, dLoading} = useSelector((state: any) => state.media);
  const [videoProp, setVideoProp] = useState({});
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const {WIDTH} = Dimensions.get('window').width;

  const videoRef = useRef(null);

  useEffect(() => {
    //console.log({isVideoPaused});
    if (!isVideoPaused) {
      setShowControls(true);
    }
  }, [isVideoPaused]);

  const onVideoPlaying = props => {
    setVideoProp(props);
  };

  const onReadyForDisplay = () => {
    // setloading(false);
    //console.log('onReadyForDisplay');
    setIsVideoEnded(false);
    setShowControls(true);
    hideControls();
  };

  const hideControls = () => {
    const timerId = setTimeout(() => {
      if (!isVideoEnded) {
        if (isVideoPaused) {
          setShowControls(true);
        } else {
          setShowControls(false);
        }
      }
    }, 5000);
    isVideoEnded && clearTimeout(timerId);
  };

  const onVideoEnd = () => {
    setIsVideoEnded(true);
    setShowControls(true);
    setIsVideoPaused(true);
    videoRef.current.seek(-videoProp.seekableDuration);
  };

  const videoError = () => {
    ToastAndroid.show('Status can not be loaded,try again', ToastAndroid.SHORT);
  };

  useEffect(() => {
    if (!media || media == null) {
      navigation.goBack();
    }
  }, []);

  const deleteHandler = async () => {
    if (media) {
      dispatch(deleteMedia({key: media.key, userId: user.id}));
    }
  };

  const saveHandler = async () => {
    ToastAndroid.show('Media saved successfully', ToastAndroid.LONG);
  };

  return (
    <Modal visible={isVisible} transparent={false} animationType="slide">
      <ArrowLeft
        color="#000"
        size={24}
        style={{marginVertical: 12, marginLeft: 12}}
        onPress={() => closeModal()}
      />
      <View style={styles.modalContainer}>
        {media !== null && media.fileType.startsWith('video/') ? (
          <VideoView uri={media.url} />
        ) : (
          media !== null && (
            <Image
              resizeMethod="auto"
              resizeMode="cover"
              source={{uri: media.url}}
              style={styles.media}
            />
          )
        )}
        <View style={styles.modalActions}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              saveHandler();
            }}>
            {/* {loading ? (
              <ActivityIndicator size={24} color={'#fff'} />
            ) : ( */}
            <ArrowDownToLine color="#fff" size={24} />
            {/* )} */}
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>
                {/* {loading=false ? 'Uploading' : 'ArrowDownToLine'} */}
                Save
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={deleteHandler}>
            {dLoading ? (
              <ActivityIndicator size={24} color={'#fff'} />
            ) : (
              <Trash2 color="#fff" size={24} />
            )}
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>
                {dLoading ? 'Deleting' : 'Delete'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  media: {
    width: '100%',
    height: '80%',

    // aspectRatio: 1,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    columnGap: 12,
    paddingHorizontal: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    width: '50%',
    justifyContent: 'center',
  },
  buttonContent: {
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  videoView: {
    // borderRadius: 10,
    height: '90%',
    overflow: 'hidden',
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  video: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    // borderRadius: 10,
  },
  customControlView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    // backgroundColor: '#00000040',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingTop: 10,
    zIndex: 10,
  },
  customControlViewFooter: {
    alignSelf: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // marginBottom: 10,
  },
});

export default SelectedMediaScreen;
