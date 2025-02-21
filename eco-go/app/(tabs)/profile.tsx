import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('profile');

  const router = useRouter();

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

  const recentReports = {
    total: 45,
    pending: [
      { id: 1, location: 'Central Park', date: '2024-02-15', type: 'Plastic' },
      { id: 2, location: 'Beach Area', date: '2024-02-14', type: 'Glass' },
    ],
    done: [
      { id: 3, location: 'River Bank', date: '2024-02-13', type: 'Paper' },
      { id: 4, location: 'City Center', date: '2024-02-12', type: 'Metal' },
    ],
    canceled: [
      { id: 5, location: 'Forest Trail', date: '2024-02-11', type: 'Organic' },
    ],
  };

  const stats = {
    points: 1250,
    group: {
      name: 'MIT Institute',
      rank: 3,
      totalMembers: 150,
    },
  };

  const renderReportCard = (report, status) => {
    const statusColors = {
      pending: { bg: '#FEF3C7', text: '#D97706', icon: 'clock-outline' },
      done: { bg: '#ECFDF5', text: '#059669', icon: 'check-circle-outline' },
      canceled: { bg: '#FEE2E2', text: '#DC2626', icon: 'close-circle-outline' },
    };
    const color = statusColors[status];


    const  renderReportCard = (report, status) => {
      return (
        <TouchableOpacity 
          key={report.id} 
          style={styles.reportCard} 
          onPress={() => router.push(`../report/${report.id}`)} // Adjust the path based on your structure
        >
          <View style={styles.reportHeader}>
            <MaterialCommunityIcons name={color.icon} size={24} color={color.text} />
            <Text style={[styles.reportStatus, { color: color.text }]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </View>
          <Text style={styles.reportLocation}>{report.location}</Text>
          <View style={styles.reportDetails}>
            <View style={styles.reportDetail}>
              <MaterialCommunityIcons name="calendar" size={16} color="#6B7280" />
              <Text style={styles.reportDetailText}>{report.date}</Text>
            </View>
            <View style={styles.reportDetail}>
              <MaterialCommunityIcons name="recycle" size={16} color="#6B7280" />
              <Text style={styles.reportDetailText}>{report.type}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View key={report.id} style={styles.reportCard}>
        <View style={styles.reportHeader}>
          <MaterialCommunityIcons name={color.icon} size={24} color={color.text} />
          <Text style={[styles.reportStatus, { color: color.text }]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </View>
        <Text style={styles.reportLocation}>{report.location}</Text>
        <View style={styles.reportDetails}>
          <View style={styles.reportDetail}>
            <MaterialCommunityIcons name="calendar" size={16} color="#6B7280" />
            <Text style={styles.reportDetailText}>{report.date}</Text>
          </View>
          <View style={styles.reportDetail}>
            <MaterialCommunityIcons name="recycle" size={16} color="#6B7280" />
            <Text style={styles.reportDetailText}>{report.type}</Text>
          </View>
        </View>
      </View>
    );
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
          <View style={styles.reportsContainer}>
            <Text style={styles.totalReports}>
              Total Reports: {recentReports.total}
            </Text>
            
            <View style={styles.reportsSection}>
              <Text style={styles.reportsSectionTitle}>Pending Reports</Text>
              {recentReports.pending.map(report => renderReportCard(report, 'pending'))}
            </View>

            <View style={styles.reportsSection}>
              <Text style={styles.reportsSectionTitle}>Completed Reports</Text>
              {recentReports.done.map(report => renderReportCard(report, 'done'))}
            </View>

            <View style={styles.reportsSection}>
              <Text style={styles.reportsSectionTitle}>Canceled Reports</Text>
              {recentReports.canceled.map(report => renderReportCard(report, 'canceled'))}
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
          <View style={styles.pointsContainer}>
            <MaterialCommunityIcons name="star" size={24} color="#34D399" />
            <Text style={styles.pointsText}>{stats.points} points</Text>
          </View>
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
    marginBottom: 8,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pointsText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#34D399',
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
  reportsContainer: {
    padding: 20,
  },
  totalReports: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  reportsSection: {
    marginBottom: 24,
  },
  reportsSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 12,
  },
  reportCard: {
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
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportStatus: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  reportLocation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  reportDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reportDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportDetailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6B7280',
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
});