// WebMapView.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';

interface WebMapViewProps {
  location: { latitude: number | null; longitude: number | null };
}

const WebMapView: React.FC<WebMapViewProps> = ({ location }) => {
  const getMapUrl = () => {
    if (location.latitude && location.longitude) {
      return `https://maps.google.com/maps?q=${location.latitude},${location.longitude}&output=embed`;
    }
    return 'https://maps.google.com/maps?q=current+location&output=embed';
  };

  return (
    <WebView
      style={styles.container}
      source={{ uri: getMapUrl() }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebMapView;