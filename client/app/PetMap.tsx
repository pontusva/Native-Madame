import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import * as Location from 'expo-location';
import MapView, { LatLng, Marker } from 'react-native-maps';

const windowWidth = Dimensions.get('window').width;

interface InitialRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const PetMap = () => {
  const [initialRegion, setInitialRegion] = useState<InitialRegion | null>(
    null
  );
  const [searchQuery, setSearchQuery] = React.useState('');
  const [markerLocation, setMarkerLocation] = useState<LatLng | null>(null);
  const [searchText, setSearchText] = useState('');
  const mapRef = useRef(null);

  const onChangeSearch = (query: string) => setSearchText(query);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);

  useEffect(() => {
    const getAngelesLocation = async () => {
      let location = await Location.geocodeAsync(searchQuery);
      if (location.length > 0) {
        (mapRef.current as unknown as MapView)?.animateToRegion({
          latitude: location[0].latitude,
          longitude: location[0].longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    };
    if (searchQuery) {
      getAngelesLocation();
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 10,
          width: windowWidth,
          zIndex: 1,
        }}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          onSubmitEditing={event => setSearchQuery(event.nativeEvent.text)}
          value={searchText}
        />
      </View>
      {initialRegion && (
        <MapView
          ref={mapRef}
          onPress={event => {
            setMarkerLocation(event.nativeEvent.coordinate);
          }}
          style={styles.map}
          initialRegion={initialRegion}>
          {markerLocation && (
            <Marker coordinate={markerLocation} title="Your Location" />
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default PetMap;
