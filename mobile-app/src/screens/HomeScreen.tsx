import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Components
import TyreCard from '../components/TyreCard';
import ServiceCard from '../components/ServiceCard';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';

// API
import { api } from '../services/api';

// Types
import { Tyre } from '../types';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredTyres, setFeaturedTyres] = useState<Tyre[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchFeaturedTyres();
  }, []);

  const fetchFeaturedTyres = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tyres?featured=true&limit=6');
      setFeaturedTyres(response.data.tyres || []);
    } catch (error) {
      console.error('Error fetching featured tyres:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFeaturedTyres();
    setRefreshing(false);
  };

  const categories = [
    { id: 'car', name: 'Car Tyres', icon: 'car', color: '#f59e0b' },
    { id: 'bike', name: 'Bike Tyres', icon: 'bicycle', color: '#3b82f6' },
    { id: 'truck', name: 'Truck Tyres', icon: 'truck', color: '#10b981' },
    { id: 'bus', name: 'Bus Tyres', icon: 'bus', color: '#8b5cf6' },
  ];

  const services = [
    { id: 'installation', name: 'Tyre Installation', icon: 'build', color: '#ef4444' },
    { id: 'alignment', name: 'Wheel Alignment', icon: 'sync', color: '#06b6d4' },
    { id: 'balancing', name: 'Wheel Balancing', icon: 'refresh', color: '#84cc16' },
    { id: 'nitrogen', name: 'Nitrogen Fill', icon: 'water', color: '#0ea5e9' },
  ];

  const renderTyreItem = ({ item }: { item: Tyre }) => (
    <TyreCard
      tyre={item}
      onPress={() => navigation.navigate('TyreDetail', { tyreId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <LinearGradient colors={['#f59e0b', '#f97316']} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.title}>JaganNath Tyre</Text>
              <Text style={styles.subtitle}>Premium Tyres for Every Journey</Text>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Ionicons name="person" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CategoryCard
                category={item}
                onPress={() => navigation.navigate('Tyres', { category: item.id })}
              />
            )}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <FlatList
            data={services}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ServiceCard
                service={item}
                onPress={() => navigation.navigate('ServiceBooking')}
              />
            )}
            contentContainerStyle={styles.servicesList}
          />
        </View>

        {/* Featured Tyres */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Tyres</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Tyres')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text>Loading...</Text>
            </View>
          ) : (
            <FlatList
              data={featuredTyres}
              renderItem={renderTyreItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.tyreGrid}
              scrollEnabled={false}
            />
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('TyreFinder')}
            >
              <Ionicons name="search" size={24} color="#f59e0b" />
              <Text style={styles.quickActionText}>Find Tyres</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('ServiceBooking')}
            >
              <Ionicons name="build" size={24} color="#3b82f6" />
              <Text style={styles.quickActionText}>Book Service</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Cart')}
            >
              <Ionicons name="cart" size={24} color="#10b981" />
              <Text style={styles.quickActionText}>View Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: -10,
    zIndex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  seeAll: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  categoriesList: {
    paddingRight: 10,
  },
  servicesList: {
    paddingRight: 10,
  },
  tyreGrid: {
    justifyContent: 'space-between',
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  quickActionButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 0.31,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HomeScreen;