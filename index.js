var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        description: 'Socks are socks.',
        image: './assets/vmSocks-green-onWhite.jpg',
        imageAlt: 'alt image text',
        url: 'www.danielnorris.co.uk',
        inventory: 100,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green"
            },
            {
                variantId: 2235,
                variantColor: "blue"
            }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        cart: 0,
    }
})