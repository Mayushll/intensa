<template>
  <header class="header">
    <div class="header__container">
      <NuxtLink to="/" class="header__logo">
        <span class="header__logo-icon">🛍️</span>
        <span class="header__logo-text">МагазинHub</span>
      </NuxtLink>

      <nav class="header__nav">
        <NuxtLink to="/" class="header__nav-link"> Каталог </NuxtLink>
        <NuxtLink to="/cart" class="header__cart-button">
          <span class="header__cart-icon">🛒</span>
          <span class="header__cart-text">Корзина</span>
          <span v-if="cartStore.totalItems > 0" class="header__cart-badge">
            {{ cartStore.totalItems }}
          </span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
</script>

<style scoped lang="scss">
.header {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;

  &__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: #1a1a1a;
    font-size: 1.5rem;
    font-weight: 700;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__logo-icon {
    font-size: 2rem;
  }

  &__logo-text {
    @media (max-width: 480px) {
      display: none;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  &__nav-link {
    text-decoration: none;
    color: #666;
    font-weight: 500;
    transition: color 0.3s ease;
    font-size: 1rem;

    &:hover,
    &.router-link-active {
      color: #2563eb;
    }
  }

  &__cart-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    background: #2563eb;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      background: #1d4ed8;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &__cart-icon {
    font-size: 1.25rem;
  }

  &__cart-text {
    @media (max-width: 480px) {
      display: none;
    }
  }

  &__cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ef4444;
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    min-width: 24px;
    text-align: center;
    animation: bounce 0.5s ease;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@media (max-width: 768px) {
  .header {
    &__container {
      padding: 1rem;
    }

    &__nav {
      gap: 1rem;
    }
  }
}
</style>
