import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import MenuModal from './MenuModal';
import { useState } from 'react';

const CustomHeader: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.popTo('HomePage')}>
        <Image
          source={require('../assets/SpaceX-White-Logo.wine.png')}
          style={styles.logo}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setMenuVisible(true);
        }}
      >
        <Image
          source={require('../assets/icons8-hamburger-menu-50.png')}
          style={styles.menu}
        />
      </TouchableOpacity>
      <MenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  logo: {
    width: 180,
    height: 60,
  },
  menu: {
    marginTop: 10,
    width: 33,
    height: 30,
  },
});

export default CustomHeader;
