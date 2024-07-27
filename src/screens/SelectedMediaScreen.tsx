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
import {ArrowLeft, ArrowDownToLine, Trash2} from 'lucide-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteMedia, uploadMedia} from '../redux/slices/mediaSlice';

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
  console.log({media});

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
    const res = await fetch(
      `http://192.168.0.107:5000/api/media/save/${media.key}`,
      {
        method: 'POST',
        body: JSON.stringify({userId: user.id}),
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(await res.json());
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

export default SelectedMediaScreen;
