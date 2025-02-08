import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TrashMapScreen() {
  const reports = [
    {
      id: 1,
      location: 'Central Park',
      type: 'Plastic',
      severity: 'High',
      emoji: '🗑️',
    },
    {
      id: 2,
      location: 'Beach Area',
      type: 'Glass',
      severity: 'Medium',
      emoji: '🏖️',
    },
    {
      id: 3,
      location: 'Forest Trail',
      type: 'Paper',
      severity: 'Low',
      emoji: '🌲',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trash Map</Text>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons name="filter-variant" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map View 🗺️</Text>
      </View>

      <View style={styles.reportsList}>
        <Text style={styles.sectionTitle}>Nearby Reports</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {reports.map((report) => (
            <TouchableOpacity
              key={report.id}
              style={styles.reportCard}
              activeOpacity={0.7}
            >
              <Text style={styles.reportEmoji}>{report.emoji}</Text>
              <Text style={styles.reportLocation}>{report.location}</Text>
              <View style={styles.reportDetails}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={16}
                  color="#34D399"
                />
                <Text style={styles.reportType}>{report.type}</Text>
              </View>
              <View style={[
                styles.severityBadge,
                { backgroundColor: report.severity === 'High' ? '#FEE2E2' : 
                                 report.severity === 'Medium' ? '#FEF3C7' : 
                                 '#ECFDF5' }
              ]}>
                <Text style={[
                  styles.severityText,
                  { color: report.severity === 'High' ? '#DC2626' :
                           report.severity === 'Medium' ? '#D97706' :
                           '#059669' }
                ]}>{report.severity}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  mapPlaceholder: {
    height: 300,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 16,
  },
  mapText: {
    fontSize: 18,
    color: '#6B7280',
  },
  reportsList: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  reportCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 160,
  },
  reportEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  reportLocation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  reportDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportType: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6B7280',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  severityText: {
    fontSize: 12,
    fontWeight: '500',
  },
});