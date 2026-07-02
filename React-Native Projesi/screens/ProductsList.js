import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { getProducts } from "../services/ProductsService";
import { Product } from "../components/Product";

export function ProductsList({ navigation }) {
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setProducts(getProducts());
    }, []);

    function renderProduct({ item: product }) {
        return (
            <Product
                {...product}
                onPress={() => {
                    navigation.navigate('ProductDetails', { productId: product.id });
                }}
            />
        );
    }

    function handleSearch() {
    // searchText değerini kullanarak ürünleri filtreleme işlemi yapılabilir
    // Örneğin, ürün adı searchText içeriyorsa o ürünleri filtreleyebilirsiniz.
    const filteredProducts = getProducts().filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Arama sonuçlarına göre sıralama yapmak için, aratılan ürünün index'ini bulup, ürün listesinden çıkarıp, en başa ekleyebiliriz.
    const searchedProductIndex = filteredProducts.findIndex(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    if (searchedProductIndex !== -1) {
        const searchedProduct = filteredProducts.splice(searchedProductIndex, 1);
        setProducts([searchedProduct[0], ...filteredProducts]);
    } else {
        setProducts(filteredProducts);
    }
}

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ürün Ara..."
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Ara</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.productsList}
                contentContainerStyle={styles.productsListContainer}
                keyExtractor={(item) => item.id.toString()}
                data={products}
                renderItem={renderProduct}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#dddddd",
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginLeft: 10,
    },
    searchButtonText: {
        color: "#ffffff",
        fontSize: 18,
    },
    productsList: {
        backgroundColor: "#eeeeee",
    },
    productsListContainer: {
        backgroundColor: "#eeeeee",
        paddingVertical: 8,
        marginHorizontal: 8,
    },
});
