import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const { user } = useUser();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
     
        <ScrollView style={styles.scrollView}>
          {/* Header with User Email */}
          <View style={styles.header}>
            <View>
              <Text style={styles.welcomeText}>Welcome back!</Text>
              <Text style={styles.userEmail}>
                {user?.emailAddresses[0].emailAddress}
              </Text>
            </View>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#1F2937" />
          </View>

          {/* Rest of your existing content */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="leaf" size={32} color="#34D399" />
              <Text style={styles.statNumber}>127</Text>
              <Text style={styles.statLabel}>Eco Points</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="recycle" size={32} color="#34D399" />
              <Text style={styles.statNumber}>23</Text>
              <Text style={styles.statLabel}>Reports</Text>
            </View>
          </View>

          <TouchableOpacity
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            activeOpacity={0.9}
          >
            <Animated.View
              style={[
                styles.createReportButton,
                { transform: [{ scale: scaleAnim }] },
              ]}
            >
              <MaterialCommunityIcons name="plus" size={24} color="white" />
              <Text style={styles.createReportText}>Create Report</Text>
            </Animated.View>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <View style={styles.activitiesList}>
            <View style={styles.activityItem}>
              <MaterialCommunityIcons name="trash-can-outline" size={24} color="#34D399" />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Reported trash location</Text>
                <Text style={styles.activitySubtitle}>Central Park • 2h ago</Text>
              </View>
            </View>
          </View>
        </ScrollView>
    
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  createReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34D399',
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#34D399',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  createReportText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  activitiesList: {
    paddingHorizontal: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityContent: {
    marginLeft: 12,
  },
  activityTitle: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  signedOutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  signedOutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginVertical: 16,
  },
  signedOutText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  authButton: {
    backgroundColor: '#34D399',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  authButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  authPrompt: {
    color: '#6B7280',
    fontSize: 14,
  },
  authLink: {
    color: '#34D399',
    fontWeight: '600',
  },

  // Стили для информации пользователя
  welcomeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  userEmail: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});