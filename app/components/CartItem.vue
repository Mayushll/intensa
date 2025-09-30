<template>
  <div class="cart-item">
    <img :src="item.product.picture" :alt="item.product.name" class="cart-item__image" />

    <div class="cart-item__info">
      <h3 class="cart-item__name">{{ item.product.name }}</h3>
      <p class="cart-item__description">{{ item.product.description }}</p>
    </div>

    <div class="cart-item__controls">
      <div class="cart-item__quantity">
        <button
          class="cart-item__quantity-btn"
          aria-label="Уменьшить количество"
          @click="decrementQuantity"
        >
          -
        </button>
        <input
          type="number"
          class="cart-item__quantity-input"
          :value="item.quantity"
          min="1"
          max="99"
          @input="handleQuantityChange"
        />
        <button
          class="cart-item__quantity-btn"
          aria-label="Увеличить количество"
          @click="incrementQuantity"
        >
          +
        </button>
      </div>

      <div class="cart-item__price-section">
        <p class="cart-item__unit-price">${{ item.product.price.toFixed(2) }} за шт.</p>
        <p class="cart-item__total-price">${{ totalPrice.toFixed(2) }}</p>
      </div>

      <button class="cart-item__remove-btn" aria-label="Удалить товар" @click="removeItem">
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '~/types';
import { useCartStore } from '~/stores/cart';

interface Props {
  item: CartItem;
}

const props = defineProps<Props>();
const cartStore = useCartStore();

const totalPrice = computed(() => props.item.product.price * props.item.quantity);

const incrementQuantity = () => {
  cartStore.incrementQuantity(props.item.product.id);
};

const decrementQuantity = () => {
  cartStore.decrementQuantity(props.item.product.id);
};

const handleQuantityChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = parseInt(target.value);

  if (!isNaN(value) && value > 0) {
    cartStore.updateQuantity(props.item.product.id, value);
  }
};

const removeItem = () => {
  cartStore.removeFromCart(props.item.product.id);
};
</script>

<style scoped lang="scss">
.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &__image {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    background: #f5f5f5;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
  }

  &__name {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    color: #1a1a1a;
  }

  &__description {
    font-size: 0.875rem;
    color: #666;
    margin: 0;
    line-height: 1.5;
  }

  &__controls {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
    min-width: 200px;
  }

  &__quantity {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }

  &__quantity-btn {
    width: 36px;
    height: 36px;
    background: #f3f4f6;
    border: none;
    cursor: pointer;
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    transition: background 0.3s ease;

    &:hover {
      background: #e5e7eb;
    }

    &:active {
      background: #d1d5db;
    }
  }

  &__quantity-input {
    width: 50px;
    height: 36px;
    border: none;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    color: #1a1a1a;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:focus {
      outline: none;
    }
  }

  &__price-section {
    text-align: right;
  }

  &__unit-price {
    font-size: 0.875rem;
    color: #666;
    margin: 0 0 0.25rem 0;
  }

  &__total-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2563eb;
    margin: 0;
  }

  &__remove-btn {
    background: #fee2e2;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.25rem;
    transition: all 0.3s ease;

    &:hover {
      background: #fecaca;
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
    padding: 1rem;

    &__image {
      width: 80px;
      height: 80px;
    }

    &__info {
      grid-column: 2;
    }

    &__name {
      font-size: 1rem;
    }

    &__description {
      font-size: 0.75rem;
    }

    &__controls {
      grid-column: 1 / -1;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    &__price-section {
      order: -1;
    }

    &__total-price {
      font-size: 1.25rem;
    }
  }
}
</style>
