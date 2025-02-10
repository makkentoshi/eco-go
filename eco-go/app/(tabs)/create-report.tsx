import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
}

interface AnalysisResult {
  estimated_weight_kg: number;
  co2_emission_kg: number;
  recyclability_percentage: number;
  dominant_waste_types: string[];
}

const initialAnalysisResult = {
    estimated_weight_kg: 0,
    co2_emission_kg: 0,
    recyclability_percentage: 0,
    dominant_waste_types: []
}

export default function CreateReportScreen() {
  const [selectedType, setSelectedType] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationState>({ latitude: null, longitude: null });
  const [co2, setCo2] = useState(0);
  const [recyclablePercentage, setRecyclablePercentage] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(initialAnalysisResult);
  const [isLoading, setIsLoading] = useState(false);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);



  const router = useRouter();

  const trashTypes = [
    { id: 'plastic', name: 'Plastic', icon: '🥤' },
    { id: 'paper', name: 'Paper', icon: '📄' },
    { id: 'glass', name: 'Glass', icon: '🍾' },
    { id: 'metal', name: 'Metal', icon: '🥫' },
    { id: 'organic', name: 'Organic', icon: '🍎' },
  ];

  useEffect(() => {
    if(analysisResult){
      setCo2(analysisResult.co2_emission_kg);
      setRecyclablePercentage(analysisResult.recyclability_percentage);
      if(analysisResult.estimated_weight_kg)
        setWeight(analysisResult.estimated_weight_kg.toString())
    }

},[analysisResult])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedImageFile(file);
        setImage(URL.createObjectURL(file)); // Отображаем выбранное изображение
      }
    };
  


  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
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
      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
            // Log the error response
            const errorText = await response.text();
            console.error(`Server responded with error ${response.status}: ${errorText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Backend response", result);
        setAnalysisResult(result);


      if (response.ok) {

      } else {
        alert('Error submitting report: ' + result.error);
      }
    } catch (error:any) {
      console.error('Error:', error);
      alert('An error occurred while submitting the report.' + error.message);
    } finally {
      setIsLoading(false); // Скрываем индикатор загрузки
    }
  };

  const getIconForType = (type: string) => {
        const trashType = trashTypes.find(item => item.id === type);
        return trashType ? trashType.icon : '❓'; // Default icon if not found
      };

    const isTypeDetected = (type: string) => {
        return analysisResult?.dominant_waste_types?.includes(type);
      };

      const getTypeStyle = (type: string) => {
        return [
          styles.typeItem,
          isTypeDetected(type) ? styles.typeItemDetected : styles.typeItemUndetected,
        ];
      };


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
               {/* Новая реализация выбора файла */}
              <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  onChange={handleImageChange}
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
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity style={styles.locationButton} activeOpacity={0.7} onPress={getLocation} disabled={isLoading}>
            <MaterialCommunityIcons name="map-marker" size={24} color="#34D399" />
            <Text style={styles.locationText}>
              {location.latitude ? `${location.latitude}, ${location.longitude}` : 'Select Location'}
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Trash Type</Text>
           <View style={styles.typeContainer}>
                {trashTypes.map(type => (
                  <View key={type.id} style={getTypeStyle(type.id)}>
                  <Text style={styles.typeText}>{type.icon} {type.name}</Text>
                  </View>
                ))}
          </View>


          <Text style={styles.sectionTitle}>Estimated Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            // onChangeText={setWeight}
            keyboardType="numeric"
            placeholder="Weight"
            editable={false}
          />

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

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="molecule-co2" size={24} color="#34D399" />
              <Text style={styles.statValue}>{co2} kg</Text>
              <Text style={styles.statLabel}>CO₂ Impact</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="recycle" size={24} color="#34D399" />
              <Text style={styles.statValue}>{recyclablePercentage}%</Text>
              <Text style={styles.statLabel}>Recyclable</Text>
            </View>
          </View>
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
      backgroundColor: '#F9FAFB',
      padding: 16,
      borderRadius: 12,
    },
    locationText: {
      flex: 1,
      marginLeft: 8,
      fontSize: 16,
      color: '#6B7280',
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
  });