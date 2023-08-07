import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';

type HomeProps = {
  navigation: any;
};

function Home({navigation}: HomeProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Image
        style={styles.image}
        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
      />

      <Button
        title="Go to Products"
        onPress={() => navigation.navigate('Products')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Home;
