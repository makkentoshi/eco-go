import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
}

export default function CreateReportScreen() {
  const [selectedType, setSelectedType] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationState>({ latitude: null, longitude: null });
  const [co2, setCo2] = useState(0);
  const [recyclablePercentage, setRecyclablePercentage] = useState(0);

  const trashTypes = [
    { id: 'plastic', name: 'Plastic', icon: '🥤' },
    { id: 'paper', name: 'Paper', icon: '📄' },
    { id: 'glass', name: 'Glass', icon: '🍾' },
    { id: 'metal', name: 'Metal', icon: '🥫' },
    { id: 'organic', name: 'Organic', icon: '🍎' },
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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

  const submitReport = async () => {
    if (!image || !location.latitude || !selectedType || !weight) {
      alert('Please fill all required fields: photo, location, trash type, and weight.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', {
      uri: image, // URI изображения
      name: 'photo.jpg', // Имя файла
      type: 'image/jpeg', // Тип файла
    } as unknown as Blob);
    formData.append('latitude', location.latitude?.toString() ?? '');
    formData.append('longitude', location.longitude?.toString() ?? '');
    formData.append('trashType', selectedType);
    formData.append('kg', weight);
    formData.append('description', description);

    try {
      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data', // Указываем тип содержимого
        },
      });

      const result = await response.json();
      if (response.ok) {
        alert('Report submitted successfully!');
        setImage(null);
        setLocation({ latitude: null, longitude: null });
        setSelectedType('');
        setWeight('');
        setDescription('');
        setCo2(result.CO2Emissions);
        setRecyclablePercentage(result.recyclablePercentage);
      } else {
        alert('Error submitting report: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the report.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Report</Text>
          <TouchableOpacity style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageSection}>
          <TouchableOpacity style={styles.uploadButton} activeOpacity={0.7} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.uploadedImage} />
            ) : (
              <>
                <MaterialCommunityIcons name="camera" size={32} color="#34D399" />
                <Text style={styles.uploadText}>Add Photo</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity style={styles.locationButton} activeOpacity={0.7} onPress={getLocation}>
            <MaterialCommunityIcons name="map-marker" size={24} color="#34D399" />
            <Text style={styles.locationText}>
              {location.latitude ? `${location.latitude}, ${location.longitude}` : 'Select Location'}
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Trash Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
            {trashTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeButton,
                  selectedType === type.id && styles.typeButtonSelected,
                ]}
                onPress={() => setSelectedType(type.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.typeEmoji}>{type.icon}</Text>
                <Text style={[
                  styles.typeName,
                  selectedType === type.id && styles.typeNameSelected,
                ]}>{type.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Estimated Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            placeholder="Enter weight"
          />

          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the waste and location..."
            multiline
            numberOfLines={4}
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
        <TouchableOpacity style={styles.submitButton} activeOpacity={0.7} onPress={submitReport}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
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
});