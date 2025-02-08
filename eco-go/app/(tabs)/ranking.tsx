import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RankingScreen() {
  const [activeTab, setActiveTab] = useState('institutes');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const institutes = [
    { name: 'MIT Institute', points: 12500, reports: 450, badge: '🎓' },
    { name: 'Stanford Tech', points: 9800, reports: 320, badge: '🏛️' },
    { name: 'Harvard Eco', points: 7500, reports: 280, badge: '🌿' },
  ];

  const schools = [
    { name: 'Green High School', points: 8250, reports: 350, badge: '🏫' },
    { name: 'Eco Academy', points: 6980, reports: 220, badge: '🌱' },
    { name: 'Nature School', points: 5750, reports: 180, badge: '🌳' },
  ];

  const cities = [
    { name: 'San Francisco', points: 25000, reports: 1200, badge: '🌉' },
    { name: 'Amsterdam', points: 19800, reports: 890, badge: '🚲' },
    { name: 'Copenhagen', points: 17500, reports: 760, badge: '🏰' },
  ];


  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/ranking/${activeTab}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeTab]);

  const getActiveData = () => {
    switch (activeTab) {
      case 'institutes':
        return institutes;
      case 'schools':
        return schools;
      case 'cities':
        return cities;
      default:
        return institutes;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Leaderboard</Text>
          <MaterialCommunityIcons name="medal" size={24} color="#34D399" />
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'institutes' && styles.activeTab]}
            onPress={() => setActiveTab('institutes')}
          >
            <MaterialCommunityIcons
              name="school"
              size={24}
              color={activeTab === 'institutes' ? '#34D399' : '#9CA3AF'}
            />
            <Text style={[
              styles.tabText,
              activeTab === 'institutes' && styles.activeTabText
            ]}>Institutes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'schools' && styles.activeTab]}
            onPress={() => setActiveTab('schools')}
          >
            <MaterialCommunityIcons
              name="book-education"
              size={24}
              color={activeTab === 'schools' ? '#34D399' : '#9CA3AF'}
            />
            <Text style={[
              styles.tabText,
              activeTab === 'schools' && styles.activeTabText
            ]}>Schools</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'cities' && styles.activeTab]}
            onPress={() => setActiveTab('cities')}
          >
            <MaterialCommunityIcons
              name="city"
              size={24}
              color={activeTab === 'cities' ? '#34D399' : '#9CA3AF'}
            />
            <Text style={[
              styles.tabText,
              activeTab === 'cities' && styles.activeTabText
            ]}>Cities</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🌍</Text>
            <Text style={styles.statNumber}>127</Text>
            <Text style={styles.statLabel}>Global Rank</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⭐️</Text>
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>Local Rank</Text>
          </View>
        </View>

        <View style={styles.rankingList}>
          {getActiveData().map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.rankingItem}
              activeOpacity={0.7}
            >
              <View style={styles.rankPosition}>
                <Text style={styles.rankNumber}>#{index + 1}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userStats}>
                  {item.badge} {item.points} points • {item.reports} reports
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          ))}
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
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#ECFDF5',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#34D399',
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
    width: '40%',
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  rankingList: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  rankingItem: {
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
  rankPosition: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  userStats: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});