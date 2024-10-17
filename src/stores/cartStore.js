import { defineStore } from 'pinia';

// LocalStorage key
const CART_STORAGE_KEY = 'cart_data';

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [], // 加載 LocalStorage 中的購物車數據
        discountCode: null,
        discountCodes: [
            {
                code: "SAVE10",
                type: "percentage",
                value: 10,
            },
            {
                code: "SAVE20",
                type: "percentage",
                value: 20,
            },
            {
                code: "MINUS100",
                type: "fixed",
                value: 100,
            },
            {
                code: "MINUS500",
                type: "fixed",
                value: 500,
            }
        ],
        // 商品列表
        products: [
            {
                id: 1,
                name: "智能手機",
                price: 5999,
                image: "https://picsum.photos/id/1/200",
                maxQuantity: 5
            },
            {
                id: 2,
                name: "筆記型電腦",
                price: 15999,
                image: "https://picsum.photos/id/2/200",
                maxQuantity: 3
            },
            {
                id: 3,
                name: "無線耳機",
                price: 1299,
                image: "https://picsum.photos/id/3/200",
                maxQuantity: 10
            },
            {
                id: 4,
                name: "智能手錶",
                price: 2499,
                image: "https://picsum.photos/id/4/200",
                maxQuantity: 8
            },
            {
                id: 5,
                name: "平板電腦",
                price: 3999,
                image: "https://picsum.photos/id/5/200",
                maxQuantity: 5
            },
            {
                id: 6,
                name: "藍牙音箱",
                price: 899,
                image: "https://picsum.photos/id/6/200",
                maxQuantity: 15
            },
            {
                id: 7,
                name: "電競滑鼠",
                price: 599,
                image: "https://picsum.photos/id/7/200",
                maxQuantity: 20
            },
            {
                id: 8,
                name: "機械鍵盤",
                price: 1099,
                image: "https://picsum.photos/id/8/200",
                maxQuantity: 12
            },
            {
                id: 9,
                name: "顯示器",
                price: 2799,
                image: "https://picsum.photos/id/9/200",
                maxQuantity: 7
            },
            {
                id: 10,
                name: "外接硬碟",
                price: 1599,
                image: "https://picsum.photos/id/10/200",
                maxQuantity: 10
            }
        ],
    }),
    actions: {
        // 添加商品到購物車
        addToCart(product) {
            const existingItem = this.cart.find(item => item.id === product.id);
            if (existingItem) {
                if (existingItem.quantity < 2) {
                    existingItem.quantity++;
                } else {
                    alert(`已超過 ${product.name} 的最大購買數量 (2)`);
                }
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }
            this.saveCartToLocalStorage();
        },
        // 移除商品
        removeFromCart(item) {
            this.cart = this.cart.filter(i => i.id !== item.id);
            this.saveCartToLocalStorage();
        },
        // 增加商品數量
        increaseQuantity(item) {
            const product = this.products.find(p => p.id === item.id);
            if (item.quantity < 2) {
                item.quantity++;
            } else {
                alert(`已超過 ${item.name} 的最大購買數量 (2)`);
            }
            this.saveCartToLocalStorage();
        },
        // 減少商品數量
        decreaseQuantity(item) {
            if (item.quantity > 1) {
                item.quantity--;
            }
            this.saveCartToLocalStorage();
        },
        // 應用優惠碼
        applyDiscount(code) {
            const discount = this.discountCodes.find(c => c.code === code);
            this.discountCode = discount ? discount : null;
        },
        // 保存購物車數據到 LocalStorage
        saveCartToLocalStorage() {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
        }
    },
    getters: {
        // 計算總價並應用折扣
        totalPrice(state) {
            const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

            if (state.discountCode) {
                if (state.discountCode.type === 'percentage') {
                    // 百分比折扣
                    return Math.floor(total * (1 - state.discountCode.value / 100));
                } else if (state.discountCode.type === 'fixed') {
                    // 固定折扣
                    return Math.max(0, total - state.discountCode.value);
                }
            }
            return total;
        },
        allProducts(state) {
            return state.products;
        }
    }
});
