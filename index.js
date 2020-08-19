var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        description: 'Socks are socks.',
        image: './assets/vmSocks-green-onWhite.jpg',
        imageAlt: 'alt image text',
        url: 'www.danielnorris.co.uk',
        inventory: 100,
        onSale: false,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./assets/vmSocks-green-onWhite.jpg"
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/vmSocks-blue-onWhite.jpg"
            }
        ],
        sizes: {
            display: false,
            range: ["S", "M", "L", "XL", "XXL"]
        },
        cart: 0,
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeFromCart() {
            this.cart > 0 ? this.cart -= 1 : null
        },
        updateProduct(variantImage) {
            this.image = variantImage
        }
    }
})