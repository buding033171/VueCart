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
                    <li v-for="item in cartStore.cart" :key="item.id">
                        <div>
                            <span>{{ item.name }}</span>
                            <span>單價: {{ item.price }} TWD</span>
                            <span>數量: {{ item.quantity }}</span>
                            <span>小計: {{ item.price * item.quantity }} TWD</span>
                        </div>
                        <div>
                            <button @click="increaseQuantity(item)">+</button>
                            <button @click="decreaseQuantity(item)">-</button>
                            <button @click="removeFromCart(item)">移除</button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="discount">
                <div>
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
    .productsbox{
        max-width: 1200px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .product-item {
        width: 20%;
        border: 1px solid #ccc;
        padding: 10px;
        text-align: center;
    }

    .product-item img{
        max-width: 200px;
        width: 100%;
    }

    .cart{
        max-width: 1200px;
        width: 100%;
        margin: 50px 0;
    }

    .cart h2{
        font-size: 32px;
    }

    .cartcontent {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }

    .cartcontent ul {
        list-style: none;
        padding: 0;
    }

    .cartcontent li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #ddd;
        list-style: none;
    }

    .cartcontent li button {
        margin-left: 10px;
    }

    .cartcontent li div {
        flex: 1;
        display: flex;
        justify-content: space-between;
    }

    .cartcontent span{
        font-size: 20px;
    }
    
    .discount{
        max-width: 1200px;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .cartcheckout{
        display: flex;
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        width: 400px;
        text-align: center;
    }
    /* For screens smaller than 768px (Tablets and large phones) */
    @media (max-width: 768px) {
        .product-item {
            width: 80%; /* 在平板和大手機上，產品項目寬度占據更多空間 */
        }

        .cartcontent li div {
            width: 100%;
            flex-direction: column; /* 調整為上下排列 */
            align-items: flex-start;
        }

        .discount {
            flex-direction: column;
            align-items: center;
        }

        .cartcheckout h3 {
            font-size: 20px; /* 調整文字大小 */
        }
    }

</style>
