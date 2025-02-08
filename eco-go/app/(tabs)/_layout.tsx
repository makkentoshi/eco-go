import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Animated, { withSpring } from 'react-native-reanimated';
import { Tabs } from 'expo-router';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabButton = ({ accessibilityState, onPress, children }: any) => {
  const focused = accessibilityState?.selected;
  const scale = withSpring(focused ? 1.2 : 1);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <View style={[styles.tabButton, focused && styles.tabButtonFocused]}>
        <TouchableOpacity onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default function TabNavigator() {
  const colorScheme = useColorScheme();
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: styles.tabBar,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: ' ',
          tabBarButton: (props) => <TabButton {...props} />,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-month" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="ranking"
        
        options={{
          title: ' ',
          tabBarButton: (props) => <TabButton {...props} />,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="trophy" size={size} color={color} />
          ),
        }}
      />

<Tabs.Screen
        name="media"
        
        options={{
          title: ' ',
          tabBarButton: (props) => <TabButton {...props} />,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="video-box" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create-report"
        options={{
          tabBarButton: (props) => (
            <View style={styles.createReportContainer}>
              <TouchableOpacity onPress={props.onPress}>
                <Animated.View
                  style={[
                    styles.createReportButton,
                    { transform: [{ scale: withSpring(props.accessibilityState?.selected ? 1.1 : 1) }] },
                  ]}
                >
                  <MaterialCommunityIcons name="plus" size={32} color="white" />
                </Animated.View>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="trash-map"
        options={{
          title: ' ',
          tabBarButton: (props) => <TabButton {...props} />,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map-marker" size={size} color={color} />
          ),
        }}
      />
        <Tabs.Screen
        name="profile"
        options={{
          title: ' ',
          tabBarButton: (props) => <TabButton {...props} />,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />

  


      
      <Tabs.Screen
        name="settings"
        options={{
          title: ' ',
          tabBarButton: (props) => <TabButton {...props} />,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
    
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 16 : 16,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 24,
    height: 52,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderTopWidth: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    minWidth: 64,
  },
  tabButtonFocused: {
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    borderRadius: 16,
  },
  createReportContainer: {
    position: 'absolute',
    top: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    left: '50%',
    transform: [{ translateX: -36 }],
  },
  createReportButton: {
    backgroundColor: '#34D399',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#34D399',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
