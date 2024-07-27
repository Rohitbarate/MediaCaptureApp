import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LogOut, Images, Camera, Video} from 'lucide-react-native';
import {signOut} from '../redux/slices/authSlice';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import PreviewScreen from './PreviewScreen';
import {resetState} from '../redux/slices/mediaSlice';

const HomeScreen = ({navigation}) => {
  const [media, setMedia] = useState(null);
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  console.log({user});

  const handleCapture = async (type: 'photo' | 'video') => {
    dispatch(resetState());
    const options = {
      mediaType: type,
      saveToPhotos: true,
      quality: 0.5,
    };

    const result = await launchCamera(options);
    if (result.assets && result.assets.length > 0) {
      // console.log({result1: result.assets[0]});
      setMedia(result.assets[0]);
      setPreviewVisible(true);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => dispatch(signOut()),
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          columnGap: 10,
          alignSelf: 'flex-end',
        }}>
        <Text style={{color: '#111', fontWeight: '600'}}>{user.email}</Text>
        <LogOut color="red" size={22} onPress={() => handleLogout()} />
      </View>
      <View
        style={{
          alignSelf: 'center',
          rowGap: 10,
          flex: 0.9,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Gallery')}>
          <Images color="#fff" size={30} />
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>View Gallery</Text>
            <Text style={styles.buttonDesc}>Click to view your all media</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleCapture('photo')}>
          <Camera color="#fff" size={30} />
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Upload Image</Text>
            <Text style={styles.buttonDesc}>Click to upload photo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleCapture('video')}>
          <Video color="#fff" size={30} />
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Upload Video</Text>
            <Text style={styles.buttonDesc}>Click to upload video</Text>
          </View>
        </TouchableOpacity>
      </View>
      {isPreviewVisible && media !== null && (
        <PreviewScreen
          navigation={navigation}
          media={media}
          isPreviewVisible={isPreviewVisible}
          closeModal={() => setPreviewVisible(false)}
          unSelectMedia={() => setMedia(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 12,
    // paddingVertical: 8,
    // rowGap: 6,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ea', // Example color, customize as needed
    padding: 12,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    minWidth: 280,
    columnGap: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonDesc: {
    color: '#ffffff99',
    fontSize: 12,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

export default HomeScreen;
