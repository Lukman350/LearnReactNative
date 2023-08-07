import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Button,
  Alert,
  Modal,
  Pressable,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import type {ProductsTypes} from '../api/getProducts';
import {getProducts} from '../api/getProducts';
import Product from '../components/Product';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type ProductsProps = {
  navigation: any;
};

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function Products({navigation}: ProductsProps): JSX.Element {
  const [products, setProducts] = useState<ProductsTypes[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductsTypes>();

  useEffect(() => {
    getProducts()
      .then(prod => {
        setProducts(prod);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <ScrollView>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
          color="#4b4b4b"
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: Colors.black,
              fontWeight: '700',
              fontSize: 30,
              marginBottom: 20,
              marginTop: 100,
            }}>
            All Products
          </Text>

          <Section title="Products">
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#000000"
                style={{margin: 20}}
              />
            ) : (
              <ScrollView>
                {products?.map(product => (
                  <Product key={product.id} product={product} onPress={() => {
                    setVisible(true);
                    setSelectedProduct(product);
                  }} />
                ))}
              </ScrollView>
            )}
          </Section>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
              width: '80%',
              height: '80%',
            }}>
            <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 20}}>
              {selectedProduct?.title}
            </Text>
            <Image
              source={{uri: selectedProduct?.image}}
              style={{width: '100%', height: 250, borderRadius: 10}}
            />
            <Text style={{fontSize: 18, fontWeight: '700', marginTop: 20}}>
              Price: ${selectedProduct?.price}
            </Text>
            <Text style={{fontSize: 18, fontWeight: '700', marginTop: 20}}>
              Category: {selectedProduct?.category}
            </Text>

            <ScrollView style={{height: 100, marginTop: 20}}>
              <Text style={{fontSize: 18, fontWeight: '700', marginTop: 20}}>
                Description: {selectedProduct?.description}
              </Text>
            </ScrollView>
            <Pressable
              style={[styles.btn, styles.btnPrimary, {marginTop: 20}]}
              onPress={() => {
                setVisible(!visible);
              }}>
              <Text style={{color: '#fff'}}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '800',
  },
  btn: {
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnPrimary: {
    backgroundColor: '#4b4b4b',
    color: '#fff',
  },
  btnSecondary: {
    backgroundColor: '#f4f4f4',
    color: '#000',
  },
});

export default Products;
