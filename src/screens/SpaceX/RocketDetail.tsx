import { RouteProp } from '@react-navigation/native';
import React from 'react';
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import { RootStackParamList } from '../../types/types';
import CustomHeader from '../../components/CustomHeader';

type RocketDetailRouteProp = RouteProp<RootStackParamList, 'RocketDetail'>;

const { width } = Dimensions.get('window');

const RocketDetail = ({ route }: { route: RocketDetailRouteProp }) => {
  const { rocket } = route.params;

  return (
    <View style={styles.mainContainer}>
      <CustomHeader />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.ImageContainer}>
          <Image
            source={{
              uri:
                rocket.flickr_images?.[0] ?? 'https://via.placeholder.com/300',
            }}
            style={styles.Image}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <Text style={styles.Title}>{rocket.name}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.description}>{rocket.description}</Text>

          {/* Details About  */}

          <Text style={styles.sectionTitle}>Details about {rocket.name}</Text>

          <View style={styles.minicontent}>
            <Text style={styles.detail}>
              <Text style={styles.label}>Boosters: </Text>
              <Text style={styles.value}>{rocket.boosters}</Text>
            </Text>

            <Text style={styles.detail}>
              <Text style={styles.label}>Cost per launch: </Text>
              <Text style={styles.value}>
                ${rocket.cost_per_launch?.toLocaleString()}
              </Text>
            </Text>

            <Text style={styles.detail}>
              <Text style={styles.label}>Success rate pct: </Text>
              <Text style={styles.value}>{rocket.success_rate_pct}%</Text>
            </Text>

            <Text style={styles.detail}>
              <Text style={styles.label}>First Flight: </Text>
              <Text style={styles.value}>{rocket.first_flight}</Text>
            </Text>

            <Text style={styles.detail}>
              <Text style={styles.label}>Country: </Text>
              <Text style={styles.value}>{rocket.country}</Text>
            </Text>
          </View>

          {/* Image of */}

          <Text style={styles.sectionTitle}>Images of {rocket.name}</Text>

          <FlatList
            data={rocket.flickr_images}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                resizeMode="cover"
                style={styles.rocketImage}
              />
            )}
            contentContainerStyle={styles.imageScroll}
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
          />

          {/* Specification of */}

          <Text style={styles.sectionTitle}>
            Specifications of {rocket.name}
          </Text>

          <View style={styles.minicontent}>
            <View style={styles.detail}>
              <Text style={styles.label}>Height in feet: </Text>
              <Text style={styles.value}>{rocket.height?.feet}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Height in meters: </Text>
              <Text style={styles.value}>{rocket.height?.meters}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Diameter in meters: </Text>
              <Text style={styles.value}>{rocket.diameter?.meters}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Diameter in feet: </Text>
              <Text style={styles.value}>{rocket.diameter?.feet}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Mass in Kg: </Text>
              <Text style={styles.value}>{rocket.mass?.kg}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Mass in lb: </Text>
              <Text style={styles.value}>{rocket.mass?.lb}</Text>
            </View>
          </View>

          {/* First Stage of */}

          <Text style={styles.sectionTitle}>First stage of {rocket.name}</Text>

          <View style={styles.minicontent}>
            <View style={styles.detail}>
              <Text style={styles.label}>Reusable: </Text>
              <Text style={styles.value}>
                {rocket.first_stage?.reusable ? 'Yes' : 'No'}
              </Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Engines: </Text>
              <Text style={styles.value}>{rocket.first_stage?.engines}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Fuel Amount in tons: </Text>
              <Text style={styles.value}>
                {rocket.first_stage?.fuel_amount_tons}
              </Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Burn Time in Sec: </Text>
              <Text style={styles.value}>
                {rocket.first_stage?.burn_time_sec}
              </Text>
            </View>
          </View>

          {/* Landing legs */}

          <Text style={styles.sectionTitle}>Landing Legs</Text>

          <View style={styles.minicontent}>
            <View style={styles.detail}>
              <Text style={styles.label}>Number: </Text>
              <Text style={styles.value}>{rocket.landing_legs?.number}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Material: </Text>
              <Text style={styles.value}>
                {rocket.landing_legs?.material ?? 'N/A'}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>
            Engine details about {rocket.name}
          </Text>

          <View style={styles.minicontent}>
            <View style={styles.detail}>
              <Text style={styles.label}>Isp Sea Level: </Text>
              <Text style={styles.value}>{rocket.engines?.isp?.sea_level}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Isp Vacuum: </Text>
              <Text style={styles.value}>{rocket.engines?.isp?.vacuum}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Thrust Sea Level (kN): </Text>
              <Text style={styles.value}>
                {rocket.engines?.thrust_sea_level?.kN}
              </Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Thrust Sea Level (lbf): </Text>
              <Text style={styles.value}>
                {rocket.engines?.thrust_sea_level?.lbf}
              </Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Thrust Vacuum (kN): </Text>
              <Text style={styles.value}>
                {rocket.engines?.thrust_vacuum?.kN}
              </Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Thrust Vacuum (lbf): </Text>
              <Text style={styles.value}>
                {rocket.engines?.thrust_vacuum?.lbf}
              </Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Number: </Text>
              <Text style={styles.value}>{rocket.engines?.number}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Type: </Text>
              <Text style={styles.value}>{rocket.engines?.type}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Version: </Text>
              <Text style={styles.value}>{rocket.engines?.version}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Layout: </Text>
              <Text style={styles.value}>{rocket.engines?.layout}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Engine Loss Max: </Text>
              <Text style={styles.value}>
                {rocket.engines?.engine_loss_max}
              </Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Propellant 1: </Text>
              <Text style={styles.value}>{rocket.engines?.propellant_1}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Propellant 2: </Text>
              <Text style={styles.value}>{rocket.engines?.propellant_2}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Thrust to Weight: </Text>
              <Text style={styles.value}>
                {rocket.engines?.thrust_to_weight}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: '#f5f6fa',
    flex: 1,
  },
  ImageContainer: {
    position: 'relative',
  },
  Image: {
    width: width,
    height: 300,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  Title: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  minicontent: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 22,
    marginBottom: 20,
  },
  detail: { marginBottom: 10, flexDirection: 'row' },
  label: { fontSize: 16, fontWeight: '500' },
  value: { fontSize: 16, marginTop: 2 },
  imageScroll: { marginBottom: 20, marginTop: 10 },
  rocketImage: {
    width: width * 0.7,
    height: 200,
    borderRadius: 10,
    marginRight: 15,
  },
});

export default RocketDetail;
