import React, { useState } from 'react';
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

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('profile');

  const achievements = [
    {
      title: 'Eco Warrior',
      description: 'Report 100 locations',
      progress: 45,
      total: 100,
      icon: '🗺️',
    },
    {
      title: 'Plastic Hunter',
      description: 'Collect 50kg of plastic',
      progress: 30,
      total: 50,
      icon: '🥤',
    },
    {
      title: 'Community Leader',
      description: 'Reach top 10 in your group',
      progress: 8,
      total: 10,
      icon: '👑',
    },
  ];

  const stats = {
    points: 1250,
    photos: 45,
    impact: '125kg',
    group: {
      name: 'MIT Institute',
      rank: 3,
      totalMembers: 150,
    },
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'achievements':
        return (
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <View style={styles.achievementHeader}>
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementDescription}>
                      {achievement.description}
                    </Text>
                  </View>
                </View>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${(achievement.progress / achievement.total) * 100}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {achievement.progress}/{achievement.total}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        );
      case 'group':
        return (
          <View style={styles.groupContainer}>
            <View style={styles.groupCard}>
              <Text style={styles.groupEmoji}>🎓</Text>
              <Text style={styles.groupName}>{stats.group.name}</Text>
              <View style={styles.groupStats}>
                <View style={styles.groupStat}>
                  <Text style={styles.groupStatNumber}>#{stats.group.rank}</Text>
                  <Text style={styles.groupStatLabel}>Rank</Text>
                </View>
                <View style={styles.groupStat}>
                  <Text style={styles.groupStatNumber}>{stats.group.totalMembers}</Text>
                  <Text style={styles.groupStatLabel}>Members</Text>
                </View>
              </View>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.profileContainer}>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="star" size={24} color="#34D399" />
                <Text style={styles.statNumber}>{stats.points}</Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="camera" size={24} color="#34D399" />
                <Text style={styles.statNumber}>{stats.photos}</Text>
                <Text style={styles.statLabel}>Photos</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="earth" size={24} color="#34D399" />
                <Text style={styles.statNumber}>{stats.impact}</Text>
                <Text style={styles.statLabel}>Impact</Text>
              </View>
            </View>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <MaterialCommunityIcons name="cog" size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>🌱</Text>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userBio}>Eco Warrior | Nature Lover</Text>
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
            onPress={() => setActiveTab('profile')}
          >
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={activeTab === 'profile' ? '#34D399' : '#9CA3AF'}
            />
            <Text style={[
              styles.tabText,
              activeTab === 'profile' && styles.activeTabText
            ]}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'achievements' && styles.activeTab]}
            onPress={() => setActiveTab('achievements')}
          >
            <MaterialCommunityIcons
              name="trophy"
              size={24}
              color={activeTab === 'achievements' ? '#34D399' : '#9CA3AF'}
            />
            <Text style={[
              styles.tabText,
              activeTab === 'achievements' && styles.activeTabText
            ]}>Achievements</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'group' && styles.activeTab]}
            onPress={() => setActiveTab('group')}
          >
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color={activeTab === 'group' ? '#34D399' : '#9CA3AF'}
            />
            <Text style={[
              styles.tabText,
              activeTab === 'group' && styles.activeTabText
            ]}>Group</Text>
          </TouchableOpacity>
        </View>

        {renderContent()}
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
  settingsButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  userBio: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 20,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '30%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  achievementsContainer: {
    padding: 20,
  },
  achievementCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34D399',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    width: 45,
  },
  groupContainer: {
    padding: 20,
  },
  groupCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  groupEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  groupStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  groupStat: {
    alignItems: 'center',
  },
  groupStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  groupStatLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});