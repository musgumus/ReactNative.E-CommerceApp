import React, { useEffect, useState, useContext } from "react";
import { View, Image, Text, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { CartContext } from "../CartContext";

export function Cart({ navigation }) {
    const { items, getItemsCount, getTotalPrice, removeFromCart } = useContext(CartContext);

    function Totals() {
        const [total, setTotal] = useState(0);

        useEffect(() => {
            let totalPrice = 0;
            items.forEach(item => {
                totalPrice += item.product.price * item.qty;
            });
            setTotal(totalPrice);
        }, [items]);

        return (
            <View style={styles.cartLineTotal}>
                <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
                <Text style={styles.mainTotal}>$ {total}</Text>
            </View>
        );
    }

    function renderItem({ item }) {
        const handleRemove = () => {
            removeFromCart(item.product.id);
        };

        return (
            <View style={styles.cartLine}>
                <Image style={styles.image} source={item.product.image} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.lineLeft}>
                        {item.product.name} x {item.qty} <Text style={styles.productTotal}>${item.totalPrice}</Text>
                    </Text>
                    <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
                        <Text style={styles.removeButtonText}>Sepetten Çıkar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                style={styles.itemsList}
                contentContainerStyle={styles.itemsListContainer}
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.product.id.toString()}
                ListFooterComponent={Totals}
            />
            <TouchableOpacity style={styles.paymentButton} onPress={() => {}}>
                <Text style={styles.paymentButtonText}>Ödeme Yap</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    cartLine: {
        flexDirection: 'row',
        width: '80%',
        paddingVertical: 10
    },
    image: {
        width: '25%',
        aspectRatio: 1,
        marginRight: 5
    },
    cartLineTotal: {
        flexDirection: 'row',
        borderTopColor: '#dddddd',
        borderTopWidth: 1
    },
    productTotal: {
        fontWeight: 'bold'
    },
    lineTotal: {
        fontWeight: 'bold'
    },
    lineLeft: {
        fontSize: 20,
        lineHeight: 40,
        color: '#333333'
    },
    lineRight: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'left',
    },
    mainTotal: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 40,
        color: '#333333',
        textAlign: 'right'
    },
    itemsList: {
        backgroundColor: '#eeeeee'
    },
    itemsListContainer: {
        backgroundColor: '#eeeeee',
        paddingVertical: 8,
        marginHorizontal: 8
    },
    removeButton: {
        backgroundColor: "#ff3333",
        padding: 8,
        borderRadius: 5,
        marginTop: 5,
        alignItems: "center",
    },
    removeButtonText: {
        color: "#ffffff",
        fontWeight: "bold",
    },
    paymentButton: {
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        margin: 10,
    },
    paymentButtonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    }
});
