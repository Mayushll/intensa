<template>
  <div class="cart">
    <div class="cart__container">
      <h1 class="cart__title">Корзина покупок</h1>

      <div v-if="cartStore.items.length === 0" class="cart__empty">
        <div class="cart__empty-icon">🛒</div>
        <h2 class="cart__empty-title">Ваша корзина пуста</h2>
        <p class="cart__empty-text">Добавьте товары, чтобы начать покупки!</p>
        <NuxtLink to="/" class="cart__continue-btn"> Продолжить покупки </NuxtLink>
      </div>

      <div v-else class="cart__content">
        <div class="cart__items">
          <CartItem v-for="item in cartStore.items" :key="item.product.id" :item="item" />
        </div>

        <div class="cart__summary">
          <div class="cart__summary-card">
            <h2 class="cart__summary-title">Итого к заказу</h2>

            <div class="cart__summary-row">
              <span>Товаров ({{ cartStore.totalItems }})</span>
              <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>

            <div class="cart__summary-row cart__summary-row--total">
              <span>Итого</span>
              <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>

            <button class="cart__checkout-btn">Оформить заказ</button>

            <NuxtLink to="/" class="cart__continue-link"> ← Продолжить покупки </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();

onMounted(() => {
  cartStore.initializeCart();
});

useHead({
  title: 'Корзина покупок - МагазинHub',
  meta: [{ name: 'description', content: 'Просмотрите и управляйте вашей корзиной покупок' }],
});
</script>

<style scoped lang="scss">
.cart {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;

  &__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin: 0 0 2rem 0;
    text-align: center;
    animation: fadeInDown 0.8s ease;
  }

  &__empty {
    background: white;
    border-radius: 12px;
    padding: 4rem 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease;
  }

  &__empty-icon {
    font-size: 5rem;
    margin-bottom: 1rem;
  }

  &__empty-title {
    font-size: 2rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 1rem 0;
  }

  &__empty-text {
    font-size: 1.125rem;
    color: #666;
    margin: 0 0 2rem 0;
  }

  &__continue-btn {
    display: inline-block;
    padding: 1rem 2rem;
    background: #2563eb;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background: #1d4ed8;
      transform: scale(1.05);
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 2rem;
    animation: fadeIn 0.8s ease;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__summary {
    position: sticky;
    top: 90px;
    height: fit-content;
  }

  &__summary-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &__summary-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 1.5rem 0;
    color: #1a1a1a;
  }

  &__summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #e5e7eb;
    color: #666;
    font-size: 1rem;

    &--total {
      border-bottom: none;
      padding-top: 1.5rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a1a1a;

      span:last-child {
        color: #2563eb;
      }
    }
  }

  &__checkout-btn {
    width: 100%;
    padding: 1rem;
    margin: 1.5rem 0 1rem;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }

  &__continue-link {
    display: block;
    text-align: center;
    color: #666;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.3s ease;

    &:hover {
      color: #2563eb;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .cart {
    &__content {
      grid-template-columns: 1fr;
    }

    &__summary {
      position: static;
    }
  }
}

@media (max-width: 768px) {
  .cart {
    padding: 1rem 0;

    &__container {
      padding: 0 1rem;
    }

    &__title {
      font-size: 2rem;
    }

    &__empty {
      padding: 3rem 1.5rem;
    }

    &__empty-icon {
      font-size: 4rem;
    }

    &__empty-title {
      font-size: 1.5rem;
    }

    &__summary-card {
      padding: 1.5rem;
    }
  }
}
</style>
