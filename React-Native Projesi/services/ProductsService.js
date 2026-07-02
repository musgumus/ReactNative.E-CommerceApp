const PRODUCTS = [
    {
        id: 1,
        name: "Apple iPhone 20 Pro Max",
        price: "2500",
        image: require("../assets/product_images/phone.jpeg"),
        description:
          "Release in 2030",
    },
    {
        id: 2,
        name: "Playstation 4",
        price: "1199",
        image: require("../assets/product_images/graphics.jpeg"),
        description:
            "Different type of Playstation, comes from parallel universe",
    },
    {
    id: 3,
    name: "Macbook Air",
    price: "1200",
    image: require("../assets/product_images/laptop.jpg"),
    description: "M2 chip Macbook Air, 15 inch",
    }
]

export function getProducts(){
    return PRODUCTS;
}

export function getProduct(id){
    return PRODUCTS.find((product) => product.id == id);
}