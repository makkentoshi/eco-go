// NativeMapView.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface NativeMapViewProps {
  location: { latitude: number | null; longitude: number | null };
  handleMapLocationSelect: (location: { latitude: number; longitude: number }) => void;
}

const NativeMapView: React.FC<NativeMapViewProps> = ({ location, handleMapLocationSelect }) => {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location.latitude || 37.78825,
        longitude: location.longitude || -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={(event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        handleMapLocationSelect({ latitude, longitude });
      }}
    >
      {location.latitude && location.longitude && (
        <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NativeMapView;