import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Video from 'react-native-video';
import {
  ArrowLeft,
  ArrowDownToLine,
  Trash2,
  RotateCcw,
  Play,
  Pause,
} from 'lucide-react-native';

const VideoView = ({uri}) => {
  const [videoProp, setVideoProp] = useState({});
  const [loading, setloading] = useState(true);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const videoRef = useRef(null);
  // React.useEffect(() => {
  //   console.log({currentIndex, focusedIndex, isVPaused});
  //   setIsVideoPaused(currentIndex != focusedIndex);
  // }, [focusedIndex]);

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
    setloading(false);
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

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setShowControls(!showControls);
        !showControls && hideControls();
      }}
      style={[styles.videoView, {backgroundColor: '#000'}]}>
      <Video
        ref={videoRef}
        source={{uri}}
        style={[styles.video, {backgroundColor: '#000'}]}
        repeat={isVideoEnded}
        paused={isVideoPaused}
        // fullscreen={true}
        poster={uri}
        resizeMode="contain"
        onProgress={onVideoPlaying}
        onEnd={() => onVideoEnd()}
        onReadyForDisplay={onReadyForDisplay}
        onError={videoError}
        ignoreSilentSwitch="ignore"
        mixWithOthers={'duck'}
      />
      {loading ? (
        <View style={[styles.customControlView, {justifyContent: 'center'}]}>
          <ActivityIndicator size={'large'} color={'#fff'} />
        </View>
      ) : (
        showControls && (
          <View style={styles.customControlView}>
            {/* play/pause/reload  button */}
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#00000060',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 60,
                  width: 60,
                  borderRadius: 60,
                  paddingLeft: 2,
                }}
                activeOpacity={0.6}
                onPress={() => {
                  setIsVideoPaused(!isVideoPaused);
                  // !showControls && hideControls();
                  setShowControls(true);
                  isVideoEnded && setIsVideoEnded(false);
                  //console.log('play/pause/reload  button');
                }}>
                {isVideoEnded ? (
                  <RotateCcw color="#fff" size={30} />
                ) : isVideoPaused ? (
                  <Play color="#fff" size={30} />
                ) : (
                  <Pause color="#fff" size={30} />
                )}
              </TouchableOpacity>
            </View>
            {/* time & progress bar */}
            <View style={styles.customControlViewFooter}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  paddingHorizontal: 10,
                }}>
                <Text style={{color: '#fff', fontWeight: '800'}}>
                  {videoProp.currentTime
                    ? '00.' + Math.round(videoProp.currentTime)
                    : '00.00'}
                </Text>
                <Text style={{color: '#fff', fontWeight: '800'}}>
                  {videoProp.seekableDuration
                    ? '00.' + Math.round(videoProp.seekableDuration)
                    : '00.00'}
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 5,
                  backgroundColor: 'grey',
                  marginTop: 5,
                }}>
                <View
                  style={{
                    height: '100%',
                    width:
                      (Math.round(videoProp.currentTime) /
                        Math.round(videoProp.seekableDuration)) *
                        100 +
                      '%',
                    backgroundColor: '#6200ea',
                  }}
                />
              </View>
            </View>
          </View>
        )
      )}
    </TouchableOpacity>
  );
};

export default VideoView;

const styles = StyleSheet.create({
  videoView: {
    // borderRadius: 10,
    height: '90%',
    overflow: 'hidden',
    width: Dimensions.get('window').width,
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
