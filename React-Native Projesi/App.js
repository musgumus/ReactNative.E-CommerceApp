// React ve React Native'den gerekli modülleri içe aktar
import React from "react";
import { StyleSheet, View, Text } from "react-native";

// Navigasyon ile ilgili bileşenleri içe aktar
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Ekranlar ve bağlamı içe aktar
import { ProductsList } from "./screens/ProductsList.js";
import { ProductDetails } from "./screens/ProductDetails.js";
import { Cart } from "./screens/Cart.js";
import { CartProvider } from "./CartContext.js";
import { CartIcon } from "./components/CartIcon.js";

// Bir stack navigator oluştur
const Stack = createNativeStackNavigator();

// Ana App bileşenini tanımla
function App() {
  return (
    // Uygulamanın tamamını sepet bağlamı sağlamak için CartProvider ile sar
    <CartProvider>
      {/* Navigasyon için bir konteyner */}
      <NavigationContainer>
        {/* Ekranlar arasında gezinmeyi yönetmek için bir stack navigator */}
        <Stack.Navigator>
          {/* Ürün listesini gösteren ekran */}
          <Stack.Screen
            name="Products"
            component={ProductsList}
            // ProductsList ekranı için seçenekler, başlık ve CartIcon dahil
            options={({ navigation }) => ({
              title: 'Ürünler',  // Ekran başlığını ayarla
              headerRight: () => <CartIcon navigation={navigation} /> // Başlığa CartIcon bileşenini ekle
            })}
          />
          {/* Ürün detaylarını gösteren ekran */}
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            // ProductDetails ekranı için seçenekler, başlık ve CartIcon dahil
            options={({ navigation }) => ({
              title: 'Ürün Detayları',  // Ekran başlığını ayarla
              headerRight: () => <CartIcon navigation={navigation} /> // Başlığa CartIcon bileşenini ekle
            })}
          />
          {/* Sepeti gösteren ekran */}
          <Stack.Screen
            name="Cart"
            component={Cart}
            // Cart ekranı için seçenekler, başlık ve CartIcon dahil
            options={({ navigation }) => ({
              title: 'Sepet',  // Ekran başlığını ayarla
              headerRight: () => <CartIcon navigation={navigation} /> // Başlığa CartIcon bileşenini ekle
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

// Bileşenler için stiller
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

// App bileşenini varsayılan olarak dışa aktar
export default App;