import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMedia} from '../redux/slices/mediaSlice';
import {Play} from 'lucide-react-native';
import SelectedMediaScreen from './SelectedMediaScreen';
import Video from 'react-native-video';

const GalleryScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isVisible, setVisible] = useState(false);

  const {height, width} = Dimensions.get('window');
  const {media, loading} = useSelector((state: any) => state.media);
  console.log({media});

  useEffect(() => {
    dispatch(fetchMedia(user.id));
  }, []);

  useEffect(() => {
    setSelectedMedia(null);
    setVisible(false);
  }, [media]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'#000'} />
        </View>
      ) : media.length == 0 ? (
        <View>
          <Text style={{color: '#000', fontSize: 24}}>Media Not Found </Text>
          <Text style={{color: '#000', fontSize: 12}}>
            upload photos and videos from home screen
          </Text>
        </View>
      ) : (
        <FlatList
          stickyHeaderHiddenOnScroll={true}
          columnWrapperStyle={{flex: 1, justifyContent: 'flex-start'}}
          refreshing={loading}
          bounces={true}
          // onScroll={handleScroll}
          onRefresh={() => dispatch(fetchMedia(user.id))}
          // ref={flatListRef}
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={16}
          scrollIndicatorInsets={{right: 2}}
          numColumns={2}
          data={media}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setSelectedMedia(item);
                setVisible(true);
              }}>
              <View style={[styles.outerView, {width: width / 2.3}]}>
                {item.fileType.startsWith('video/') ? (
                  <>
                    <Video
                      source={{uri: item.url}}
                      style={{
                        width: width / 2.3,
                        height: 250,
                        aspectRatio: 1,
                      }}
                      resizeMode="cover"
                      paused={true}
                      poster={item.url} // Provide a URL to the poster image
                    />
                    <View
                      style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        // backgroundColor: '#212121',
                        borderRadius: 55,
                        opacity: 0.8,
                      }}>
                      <Play color="#000" size={30} />
                    </View>
                  </>
                ) : (
                  <Image
                    style={{
                      width: width / 2.3,
                      height: 250,
                      resizeMode: 'cover',
                      aspectRatio: 1,
                    }}
                    source={{uri: item.url}}
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      {selectedMedia && (
        <SelectedMediaScreen
          navigation={navigation}
          media={selectedMedia}
          isVisible={isVisible}
          closeModal={() => setVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 12,
  },
  mediaItem: {
    // flex: 1,
    margin: 5,
    height: 100,
    width: 100,
  },
  media: {
    width: '100%',
    height: 100,
  },
  outerView: {
    // flex:0.5,
    alignSelf: 'flex-start',
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 10,
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: 6,
  },
});

export default GalleryScreen;
