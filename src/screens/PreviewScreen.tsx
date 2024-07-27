import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Upload, XCircle} from 'lucide-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {uploadMedia} from '../redux/slices/mediaSlice';

const PreviewScreen = ({
  navigation,
  isPreviewVisible,
  media,
  closeModal,
  unSelectMedia,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const {loading, success} = useSelector((state: any) => state.media);
  // const {media, isPreviewVisible, unSelectMedia, closeModal} = route.params;
  console.log({media});

  useEffect(() => {
    if (!media || media == null) {
      navigation.goBack();
    }
    if (success) {
      clearSelection();
    }
  }, [success]);

  const handleUpload = async () => {
    if (media) {
      dispatch(uploadMedia({file: media, userId: user.id}));
    }
  };
  const clearSelection = () => {
    unSelectMedia();
    closeModal();
  };

  return (
    <Modal visible={isPreviewVisible} transparent={false} animationType="slide">
      <Text
        style={{
          color: '#000',
          fontSize: 24,
          marginVertical: 12,
          marginLeft: 12,
        }}>
        Preview
      </Text>
      <View style={styles.modalContainer}>
        {media !== null && media.type === 'video' ? (
          // <Video
          //   source={{ uri: media.uri }}
          //   style={styles.media}
          //   controls
          // />
          <Text style={{color: '#000'}}>video view</Text>
        ) : (
          media !== null && (
            <Image
              resizeMethod="auto"
              resizeMode="cover"
              source={{uri: media.uri}}
              style={styles.media}
            />
          )
        )}
        <View style={styles.modalActions}>
          <TouchableOpacity style={styles.button} onPress={handleUpload}>
            {loading ? (
              <ActivityIndicator size={24} color={'#fff'} />
            ) : (
              <Upload color="#fff" size={24} />
            )}
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>
                {loading ? 'Uploading' : 'Upload'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={clearSelection}>
            <XCircle color="#fff" size={24} />
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Cancel</Text>
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
});

export default PreviewScreen;
