import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventsScreen() {
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isEventDetailsVisible, setEventDetailsVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
  });

  const events = [
    {
      id: 1,
      title: 'Beach Cleanup',
      organizer: 'Green Earth Society',
      date: '2024-02-15',
      time: '09:00 AM',
      location: 'Sunny Beach',
      participants: 24,
      description: 'Join us for a community beach cleanup! Together we can make our beaches plastic-free.',
      emoji: '🏖️',
    },
    {
      id: 2,
      title: 'Park Restoration',
      organizer: 'City Volunteers',
      date: '2024-02-18',
      time: '10:00 AM',
      location: 'Central Park',
      participants: 15,
      description: 'Help us restore and clean our beloved city park.',
      emoji: '🌳',
    },
    {
      id: 3,
      title: 'River Cleanup',
      organizer: 'Water Warriors',
      date: '2024-02-20',
      time: '08:30 AM',
      location: 'River Valley',
      participants: 32,
      description: 'Cleaning our river system for a better tomorrow.',
      emoji: '🌊',
    },
  ];

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setEventDetailsVisible(true);
  };

  const handleCreateEvent = () => {
    // Here you would typically send the new event to your backend
    console.log('New event:', newEvent);
    setCreateModalVisible(false);
    setNewEvent({
      title: '',
      description: '',
      location: '',
      date: '',
      time: '',
    });
  };

  const EventDetailsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isEventDetailsVisible}
      onRequestClose={() => setEventDetailsVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{selectedEvent?.title}</Text>
            <TouchableOpacity
              onPress={() => setEventDetailsVisible(false)}
              style={styles.closeButton}
            >
              <MaterialCommunityIcons name="close" size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScroll}>
            <Text style={styles.eventEmoji}>{selectedEvent?.emoji}</Text>
            
            <View style={styles.eventInfoSection}>
              <View style={styles.eventInfoRow}>
                <MaterialCommunityIcons name="account-group" size={24} color="#34D399" />
                <Text style={styles.eventInfoText}>
                  Organized by {selectedEvent?.organizer}
                </Text>
              </View>
              
              <View style={styles.eventInfoRow}>
                <MaterialCommunityIcons name="calendar" size={24} color="#34D399" />
                <Text style={styles.eventInfoText}>
                  {selectedEvent?.date} at {selectedEvent?.time}
                </Text>
              </View>
              
              <View style={styles.eventInfoRow}>
                <MaterialCommunityIcons name="map-marker" size={24} color="#34D399" />
                <Text style={styles.eventInfoText}>
                  {selectedEvent?.location}
                </Text>
              </View>
            </View>

            <Text style={styles.descriptionTitle}>About Event</Text>
            <Text style={styles.descriptionText}>
              {selectedEvent?.description}
            </Text>

            <View style={styles.participantsSection}>
              <Text style={styles.participantsTitle}>
                Participants ({selectedEvent?.participants})
              </Text>
              <View style={styles.participantsAvatars}>
                {/* Placeholder avatars */}
                <View style={styles.avatar}>
                  <Text>👤</Text>
                </View>
                <View style={styles.avatar}>
                  <Text>👤</Text>
                </View>
                <View style={styles.avatar}>
                  <Text>👤</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join Event</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const CreateEventModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isCreateModalVisible}
      onRequestClose={() => setCreateModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create Event</Text>
            <TouchableOpacity
              onPress={() => setCreateModalVisible(false)}
              style={styles.closeButton}
            >
              <MaterialCommunityIcons name="close" size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScroll}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Event Title</Text>
              <TextInput
                style={styles.input}
                value={newEvent.title}
                onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
                placeholder="Enter event title"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newEvent.description}
                onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
                placeholder="Describe your event"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>
              <TouchableOpacity style={styles.locationPicker}>
                <MaterialCommunityIcons name="map-marker" size={24} color="#34D399" />
                <Text style={styles.locationPickerText}>Select location</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Date & Time</Text>
              <View style={styles.dateTimeContainer}>
                <TouchableOpacity style={styles.dateTimePicker}>
                  <MaterialCommunityIcons name="calendar" size={24} color="#34D399" />
                  <Text style={styles.dateTimePickerText}>Select date</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateTimePicker}>
                  <MaterialCommunityIcons name="clock" size={24} color="#34D399" />
                  <Text style={styles.dateTimePickerText}>Select time</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateEvent}
            >
              <Text style={styles.createButtonText}>Create Event</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Events</Text>
          <TouchableOpacity
            style={styles.createEventButton}
            onPress={() => setCreateModalVisible(true)}
          >
            <MaterialCommunityIcons name="plus" size={24} color="#34D399" />
          </TouchableOpacity>
        </View>

        <View style={styles.upcomingEvents}>
          {events.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventCard}
              onPress={() => handleEventPress(event)}
            >
              <View style={styles.eventHeader}>
                <Text style={styles.eventEmoji}>{event.emoji}</Text>
                <View style={styles.eventHeaderInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventOrganizer}>by {event.organizer}</Text>
                </View>
              </View>

              <View style={styles.eventDetails}>
                <View style={styles.eventDetailRow}>
                  <MaterialCommunityIcons name="calendar" size={20} color="#34D399" />
                  <Text style={styles.eventDetailText}>{event.date}</Text>
                </View>
                <View style={styles.eventDetailRow}>
                  <MaterialCommunityIcons name="clock" size={20} color="#34D399" />
                  <Text style={styles.eventDetailText}>{event.time}</Text>
                </View>
                <View style={styles.eventDetailRow}>
                  <MaterialCommunityIcons name="map-marker" size={20} color="#34D399" />
                  <Text style={styles.eventDetailText}>{event.location}</Text>
                </View>
              </View>

              <View style={styles.eventFooter}>
                <View style={styles.participantsPreview}>
                  <MaterialCommunityIcons name="account-group" size={20} color="#34D399" />
                  <Text style={styles.participantsText}>{event.participants} participants</Text>
                </View>
                <TouchableOpacity style={styles.joinEventButton}>
                  <Text style={styles.joinEventButtonText}>Join</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <EventDetailsModal />
      <CreateEventModal />
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
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  createEventButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#ECFDF5',
  },
  upcomingEvents: {
    padding: 20,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  eventHeaderInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  eventOrganizer: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  eventDetails: {
    marginBottom: 12,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventDetailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4B5563',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  participantsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  joinEventButton: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinEventButtonText: {
    color: '#34D399',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  modalScroll: {
    padding: 20,
  },
  eventInfoSection: {
    marginVertical: 16,
  },
  eventInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventInfoText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#4B5563',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  participantsSection: {
    marginTop: 24,
  },
  participantsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  participantsAvatars: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  joinButton: {
    backgroundColor: '#34D399',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  locationPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
  },
  locationPickerText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#6B7280',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimePicker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  dateTimePickerText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#6B7280',
  },
  createButton: {
    backgroundColor: '#34D399',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});