import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Platform } from 'react-native';

const API_URL =
  Platform.OS === 'web'
    ? 'http://localhost:5000/api/reports'
    : Platform.OS === 'ios'
    ? 'http://127.0.0.1:5000/api/reports' // iOS-симулятор
    : 'http://10.0.2.2:5000/api/reports'; // Android-эмулятор

export default function ReportDetails() {
  const { id } = useLocalSearchParams(); // Получаем ID из маршрута
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        console.log("Report Data:", data);
        setReport(data);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReportDetails();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#34D399" />;
  }

  if (!report) {
    return <Text style={styles.errorText}>Report not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Details</Text>
      <Text style={styles.detail}>📍 Location: {report.location}</Text>
      <Text style={styles.detail}>📅 Date: {report.date}</Text>
      <Text style={styles.detail}>♻️ Type: {report.type}</Text>
      <Text style={styles.detail}>⚖️ Weight: {report.weight} kg</Text>
      <Text style={styles.detail}>🌍 CO2 Reduction: {report.co2}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  detail: { fontSize: 18, marginBottom: 5 },
  errorText: { fontSize: 18, color: 'red' },
});
