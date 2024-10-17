<template>
    <main class="productsbox">
            <!-- 商品列表 -->
        <div v-for="product in cartStore.allProducts" :key="product.id" class="product-item">
            <img :src="product.image" :alt="product.name" />
            <h2>{{ product.name }}</h2>
            <p>價格: {{ product.price }} TWD</p>
            <p>剩餘數量: {{ product.maxQuantity }}</p>
            <p>(每項商品最多購買兩項)</p>
            <button @click="addToCart(product)">加入購物車</button>
        </div>

    <section class="cart">
        <!-- 購物車區域 -->
        <h2>購物車</h2>
        <div class="cartcontent">
            <div v-if="cartStore.cart.length === 0">
                購物車是空的
            </div>
            <ul v-else>
                <li v-for="item in cartStore.cart" :key="item.id" class="cart-item">
                    <div class="item-details">
                        <span class="item-name">{{ item.name }}</span>
                        <span class="item-price">單價: {{ item.price }} TWD</span>
                        <span class="item-quantity">數量: {{ item.quantity }}</span>
                        <span class="item-total">小計: {{ item.price * item.quantity }} TWD</span>
                    </div>
                    <div class="item-actions">
                        <button @click="increaseQuantity(item)">+</button>
                        <button class="decrease-btn" @click="decreaseQuantity(item)">-</button>
                        <button class="remove-btn" @click="removeFromCart(item)">移除</button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="discount">
            <div class="discount-code">
                <input v-model="discountCodeInput" type="text" placeholder="輸入優惠折扣碼" @keyup.enter="applyDiscountCode">
                <button @click="applyDiscountCode">優惠折扣送出</button>
                <p v-if="invalidCode">折扣碼無效</p>
            </div>
            <!-- 顯示購物車總價 -->
            <div v-if="cartStore.cart.length > 0" class="cartcheckout">
                <h3>總金額: {{ cartStore.totalPrice }} TWD</h3>
                <button @click="checkout">結帳</button>
            </div>
        </div>
    </section>


            <!-- 結帳訂單摘要彈出視窗 -->
        <div v-if="isCheckoutModalOpen" class="modal">
            <div class="modal-content">
                <h2>訂單摘要</h2>
                <ul>
                    <li v-for="item in cartStore.cart" :key="item.id">
                        {{ item.name }} - 數量: {{ item.quantity }} - 小計: {{ item.price * item.quantity }} TWD
                    </li>
                </ul>
                <p v-if="cartStore.discountCode">使用的優惠碼: {{ cartStore.discountCode.code }}</p>
                <h3>最終總價: {{ cartStore.totalPrice }} TWD</h3>
                <button @click="closeCheckoutModal">關閉</button>
            </div>
        </div>
    </main>
</template>

<script setup>
    import { useCartStore } from '@/stores/cartStore';
    import { ref } from 'vue';
    
    const cartStore = useCartStore();

    const addToCart = (product) => {
        cartStore.addToCart(product);
    };

    const increaseQuantity = (item) => {
        cartStore.increaseQuantity(item);
    };

    const decreaseQuantity = (item) => {
        cartStore.decreaseQuantity(item);
    };

    const removeFromCart = (item) => {
        cartStore.removeFromCart(item);
    };

    const discountCodeInput = ref('');
    const invalidCode = ref(false);
    const isCheckoutModalOpen = ref(false);

    const applyDiscountCode = () => {
        cartStore.applyDiscount(discountCodeInput.value);
        invalidCode.value = !cartStore.discountCode;  // 如果折扣碼無效，顯示提示
    };

    // 結帳邏輯，打開彈窗
    const checkout = () => {
        isCheckoutModalOpen.value = true;
    };

    // 關閉結帳彈窗
    const closeCheckoutModal = () => {
        isCheckoutModalOpen.value = false;
    };

</script>


<style scoped>
    @import url('@/assets/products.css');
</style>
