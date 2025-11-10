import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MenuModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const navigation = useNavigation<NavigationProp>();

  const SlideAnimation = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.timing(SlideAnimation, {
      toValue: visible ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handleNavigate = (
    screen: 'HomePage' | 'LaunchesList' | 'HistoryList' | 'RocketsList',
  ) => {
    navigation.navigate(screen);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleNavigate('HomePage')}
              >
                <Text style={styles.menuItemText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleNavigate('LaunchesList')}
              >
                <Text style={styles.menuItemText}>Launches</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleNavigate('HistoryList')}
              >
                <Text style={styles.menuItemText}>History</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleNavigate('RocketsList')}
              >
                <Text style={styles.menuItemText}>Rockets</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menu: {
    width: '70%',
    height: '100%',
    backgroundColor: '#000',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    elevation: 4,
  },
  menuItemText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  closeButton: {
    marginTop: 40,
  },
});

export default MenuModal;
