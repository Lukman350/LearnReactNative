import { View, Text, Image, Pressable, StyleSheet } from "react-native";

type ProductProps = {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
  };
  onPress: () => void;
};

const styles = StyleSheet.create({
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

function Product({ product, onPress }: ProductProps): JSX.Element {
  return (
    <View
      key={product.id}
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 10,
        margin: 10,
        width: '100%',
      }}>
      <Text
        style={{
          color: '#4b4b4b',
          fontWeight: '700',
          fontSize: 18,
        }}>
        {product.title}
      </Text>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          gap: 10,
          width: '100%',
        }}>
        <Image
          source={{uri: product.image}}
          style={{width: 150, height: 150, borderRadius: 10}}
        />
        <View
          style={{
            width: '100%',
            height: '100%',
          }}>
          <Text
            style={{
              color: '#4b4b4b',
              fontWeight: '700',
              fontSize: 15,
            }}>
            Price: ${product.price}
          </Text>
          <Text
            style={{
              color: '#4b4b4b',
              fontSize: 15,
            }}>
            Category: {product.category}
          </Text>
          <Text
            style={{
              color: '#4b4b4b',
              fontSize: 15,
              width: '100%',
            }}>
            Description: {product.description.substring(0, 30)}{' '}
            ...
          </Text>

          <View>
            <Pressable
              style={[
                styles.btn,
                styles.btnPrimary,
                {width: '100%'},
              ]}
              onPress={onPress}>
              <Text style={{color: '#fff'}}>View Details</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Product;