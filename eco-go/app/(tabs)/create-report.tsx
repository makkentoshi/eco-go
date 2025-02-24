import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Platform,
  Linking,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';


interface LocationState {
  latitude: number | null;
  longitude: number | null;
}

interface AnalysisResult {
  estimated_weight_kg: number;
  co2_emission_kg: number;
  recyclable_percentage: number;
  dominant_waste_types: string[];
}

const initialAnalysisResult = {
  estimated_weight_kg: 0,
  co2_emission_kg: 0,
  recyclable_percentage: 0,
  dominant_waste_types: []
}

export default function CreateReportScreen() {
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const [co2, setCo2] = useState(0);
  const [recyclablePercentage, setRecyclablePercentage] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(initialAnalysisResult);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);


  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(location);


  const router = useRouter();


    // const trashTypes = [
  //   { id: 'plastic', name: 'Plastic', icon: '🥤' },
  //   { id: 'paper', name: 'Paper', icon: '📄' },
  //   { id: 'glass', name: 'Glass', icon: '🍾' },
  //   { id: 'metal', name: 'Metal', icon: '🥫' },
  //   { id: 'organic', name: 'Organic', icon: '🍎' },
  // ];


  const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';


  useEffect(() => {
    if (analysisResult) {
      setCo2(analysisResult.co2_emission_kg || 0);
      setRecyclablePercentage(analysisResult.recyclable_percentage || 0); // Fix the typo here
      setWeight(analysisResult.estimated_weight_kg ? analysisResult.estimated_weight_kg.toString() : '0');
    }
  }, [analysisResult]);



  const handleImageChange = async () => {
    if (Platform.OS === 'web') {
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      fileInput.click();
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType.Images, // ✅ исправлено
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };


  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const confirmLocation = () => {
    setLocation(selectedLocation);
    setModalVisible(false);
  };

  const createFormData = (imageFile: File | null, location: LocationState, description: string): FormData => {
      const formData = new FormData();

      if (imageFile) {
        formData.append('photo', imageFile);
      }


        formData.append('latitude', location.latitude?.toString() ?? '');
        formData.append('longitude', location.longitude?.toString() ?? '');
        formData.append('description', description);

    return formData;
  };


  const submitReport = async () => {
    if (!image) {
      alert('Please select an image.');
      return;
    }
    if (!location.latitude) {
      alert('Please provide your location.');
      return;
    }

    setIsLoading(true); // Показываем индикатор загрузки

    try {
      const formData = createFormData(selectedImageFile, location, description);
      const response = await fetch(`${BASE_URL}/api/reports`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Server responded with error ${response.status}: ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Backend response', result);
      router.push('../profile/reports');
      setAnalysisResult(result);
    } catch (error: any) {
      console.error('Error:', error);
      alert('An error occurred while submitting the report: ' + error.message);
    } finally {
      setIsLoading(false); // Скрываем индикатор загрузки
    }
  };

      const formatNumber = (num: number): string => {
        return num.toLocaleString('en-US');
      };
      

 // Conditional import of MapView
 let MapViewComponent: React.ComponentType<any> | null = null;
 let MarkerComponent: React.ComponentType<any> | null = null;



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Report</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <MaterialCommunityIcons name="close" size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageSection}>
          {Platform.OS === 'web' ? (
            <>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    setImage(URL.createObjectURL(file));
                  }
                }}
              />
              <label htmlFor="image-upload">
                <View style={styles.uploadButton}>
                  {image ? (
                    <Image source={{ uri: image }} style={styles.uploadedImage} />
                  ) : (
                    <>
                      <MaterialCommunityIcons name="camera" size={32} color="#34D399" />
                      <Text style={styles.uploadText}>Add Photo</Text>
                    </>
                  )}
                </View>
              </label>
            </>
          ) : (
            <TouchableOpacity onPress={handleImageChange}>
              <View style={styles.uploadButton}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.uploadedImage} />
                ) : (
                  <>
                    <MaterialCommunityIcons name="camera" size={32} color="#34D399" />
                    <Text style={styles.uploadText}>Add Photo</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Location</Text>
  <TouchableOpacity 
        style={styles.locationButton} 
        activeOpacity={0.7} 
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons name="map-marker" size={24} color="#34D399" />
        <Text style={styles.locationText}>
          {location.latitude ? `${location.latitude}, ${location.longitude}` : 'Select Location'}
        </Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE} // Используем Google Maps
            initialRegion={{
              latitude: location.latitude || 48.8566, // Париж по умолчанию
              longitude: location.longitude || 2.3522,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            onPress={handleMapPress} // Выбор точки на карте
          >
          {selectedLocation.latitude !== null && selectedLocation.longitude !== null && (
  <Marker coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }} />
)}

          </MapView>

          {/* Кнопки "Подтвердить" и "Отмена" */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmLocation} style={styles.confirmButton}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  

          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the waste and location..."
            multiline
            numberOfLines={4}
            editable={!isLoading}
          />

    
        </View>
      </ScrollView>

      <View style={styles.footer}>
      <TouchableOpacity style={styles.submitButton} activeOpacity={0.7} onPress={submitReport} disabled={isLoading || !image || !location.latitude}>
              {isLoading ? (
                  <Text style={styles.submitButtonText}>Analyzing...</Text>
              ) : (
                  <Text style={styles.submitButtonText}>Submit Report</Text>
              )}
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    scrollView: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1F2937',
    },
    closeButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: '#F3F4F6',
    },
    imageSection: {
      padding: 20,
    },
    uploadButton: {
      height: 200,
      backgroundColor: '#F9FAFB',
      borderRadius: 16,
      borderWidth: 2,
      borderColor: '#E5E7EB',
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
    },
    uploadText: {
      marginTop: 8,
      fontSize: 16,
      color: '#6B7280',
    },
    uploadedImage: {
      width: '100%',
      height: '100%',
      borderRadius: 16,
    },
    formSection: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: 8,
      marginTop: 16,
    },
    locationButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderRadius: 8,
      backgroundColor: '#F9FAFB',
    },
    locationText: {
      flex: 1,
      marginLeft: 8,
      fontSize: 16,
      color: '#6B7280',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
    },
    map: {
      width: '100%',
      height: '80%',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: 20,
    },
    cancelButton: {
      padding: 10,
      backgroundColor: '#EF4444',
      borderRadius: 8,
      flex: 1,
      alignItems: 'center',
      marginRight: 10,
    },
    confirmButton: {
      padding: 10,
      backgroundColor: '#34D399',
      borderRadius: 8,
      flex: 1,
      alignItems: 'center',
      marginLeft: 10,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    typeScroll: {
      marginHorizontal: -20,
      paddingHorizontal: 20,
    },
    typeButton: {
      alignItems: 'center',
      backgroundColor: '#F9FAFB',
      padding: 16,
      borderRadius: 12,
      marginRight: 12,
      width: 100,
    },
    typeButtonSelected: {
      backgroundColor: '#ECFDF5',
    },
    typeEmoji: {
      fontSize: 24,
      marginBottom: 4,
    },
    typeName: {
      fontSize: 14,
      color: '#6B7280',
    },
    typeNameSelected: {
      color: '#34D399',
      fontWeight: '600',
    },
    input: {
      backgroundColor: '#F9FAFB',
      padding: 16,
      borderRadius: 12,
      fontSize: 16,
      color: '#1F2937',
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
    },
    statCard: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F9FAFB',
      padding: 16,
      borderRadius: 12,
      marginHorizontal: 6,
    },
    statValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1F2937',
      marginTop: 4,
    },
    statLabel: {
      fontSize: 14,
      color: '#6B7280',
      marginTop: 2,
    },
    footer: {
      padding: 24, 
      paddingBottom: 90,
      bottom:  0,
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
    },
    submitButton: {
      backgroundColor: '#34D399',
      padding: 14,
      borderRadius: 12,
      alignItems: 'center',
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
      typeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        padding: 8,
      },
      typeItem: {
        backgroundColor: '#ECFDF5',
        padding: 8,
        borderRadius: 8,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,

      },
      typeText: {
        fontWeight: '600',
      },

      typeItemDetected: {
          backgroundColor: '#ECFDF5',
          borderColor: '#34D399',
          color: '#34D399',
      },
      typeItemUndetected: {
        backgroundColor: '#F9FAFB',
        borderColor: '#E5E7EB',
        color: '#6B7280',

      },
      dominantTypeItem: {
        backgroundColor: '#ECFDF5',
        padding: 8,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8,
      },
      dominantTypeText: {
        color: '#34D399',
        fontWeight: '600',
      },

      mapHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: '#F9FAFB',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
      },
      backButton: {
        padding: 8,
      },
      mapTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginLeft: 16,
      },
      mapFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: '#F9FAFB',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
      },
      mapButton: {
        backgroundColor: '#34D399',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
      },
      mapButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
      },
      mapModal: { flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
      closeMapButton: { backgroundColor: '#34D399', padding: 15, borderRadius: 10, marginTop: 20 },
      closeMapButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  });