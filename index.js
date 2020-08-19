Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true,
        }
    },
    template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        },
    },
    template: `
    <div>
        <div class="product">
            <div class="product-image">
                <img :src="image" :alt="imageAlt">
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
                <p :class="{ linethrough: !inventory }" v-else>Out of Stock</p>
                <p>Shipping {{ shipping }}</p>

                <product-details :details="details"></product-details>

                <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box"
                    :style="{ background: variant.variantColor }" @mouseover="updateProduct(index)">

                </div>

                <p v-show="sizes.display" v-for="size in sizes">{{ size }}</p>

                <button @click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to
                    Cart</button>
                <button @click="removeFromCart">Remove</button>

                <product-review @review-submitted="addReview"></product-review>

            </div>
        </div>
    </div>`,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            description: 'Socks are socks.',
            selectedVariant: 0,
            imageAlt: 'alt image text',
            url: 'www.danielnorris.co.uk',
            inventory: 100,
            onSale: true,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 5,
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 10,
                }
            ],
            sizes: {
                display: false,
                range: ["S", "M", "L", "XL", "XXL"]
            },
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId, "add")
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId, "remove")
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
})

Vue.component('product-review', {
    template:`
        <form class="review-form" @submit.prevent="onSubmit">

            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name">
            </p>

            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>

            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
        }
    },
    methods: {
        onSubmit() {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
            }
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        details: true,
        cart: [],
    },
    methods: {
        removeCartItem(id) {
            this.cart.map((item, index) => {
                this.cart[index] === id ? this.cart.splice(index, 1) : null
            })
        },
        updateCart(id, action) {
            action === "add" ? this.cart.push(id) : this.removeCartItem(id)
        },
    }
})