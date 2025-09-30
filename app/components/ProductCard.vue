<template>
  <div class="product-card">
    <div class="product-card__image-wrapper">
      <img :src="product.picture" :alt="product.name" class="product-card__image" loading="lazy" />
    </div>
    <div class="product-card__content">
      <h3 class="product-card__title">{{ product.name }}</h3>
      <p class="product-card__description">{{ product.description }}</p>
      <div class="product-card__footer">
        <span class="product-card__price">${{ product.price.toFixed(2) }}</span>
        <button
          class="product-card__button"
          :class="{ 'product-card__button--added': isAdded }"
          @click="handleAddToCart"
        >
          <span v-if="!isAdded">В корзину</span>
          <span v-else>✓ Добавлено</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types';
import { useCartStore } from '~/stores/cart';

interface Props {
  product: Product;
}

const props = defineProps<Props>();
const cartStore = useCartStore();

const isAdded = ref(false);

const handleAddToCart = () => {
  cartStore.addToCart(props.product);
  isAdded.value = true;

  setTimeout(() => {
    isAdded.value = false;
  }, 1500);
};
</script>

<style scoped lang="scss">
.product-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  &__image-wrapper {
    width: 100%;
    height: 240px;
    overflow: hidden;
    background: #f5f5f5;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__content {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #1a1a1a;
  }

  &__description {
    font-size: 0.875rem;
    color: #666;
    line-height: 1.5;
    margin: 0 0 1rem 0;
    flex-grow: 1;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-top: auto;
  }

  &__price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2563eb;
  }

  &__button {
    padding: 0.625rem 1.25rem;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
      background: #1d4ed8;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }

    &--added {
      background: #10b981;

      &:hover {
        background: #059669;
      }
    }
  }
}

@media (max-width: 768px) {
  .product-card {
    &__image-wrapper {
      height: 200px;
    }

    &__title {
      font-size: 1.125rem;
    }

    &__price {
      font-size: 1.25rem;
    }
  }
}
</style>
