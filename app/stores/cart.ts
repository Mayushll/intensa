import { defineStore } from 'pinia';
import type { Product, CartItem } from '~/types';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  const isInitialized = ref(false);

  const initializeCart = () => {
    if (import.meta.client && !isInitialized.value) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          items.value = JSON.parse(savedCart);
        } catch {
          // Reset cart if localStorage data is corrupted
          items.value = [];
        }
      }
      isInitialized.value = true;
    }
  };

  const saveCart = () => {
    if (import.meta.client) {
      localStorage.setItem('cart', JSON.stringify(items.value));
    }
  };

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + item.product.price * item.quantity, 0);
  });

  const addToCart = (product: Product) => {
    const existingItem = items.value.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({
        product,
        quantity: 1,
      });
    }

    saveCart();
  };

  const removeFromCart = (productId: number) => {
    const index = items.value.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      items.value.splice(index, 1);
      saveCart();
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const item = items.value.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
        saveCart();
      }
    }
  };

  const incrementQuantity = (productId: number) => {
    const item = items.value.find(item => item.product.id === productId);
    if (item) {
      item.quantity++;
      saveCart();
    }
  };

  const decrementQuantity = (productId: number) => {
    const item = items.value.find(item => item.product.id === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
        saveCart();
      } else {
        removeFromCart(productId);
      }
    }
  };

  const clearCart = () => {
    items.value = [];
    saveCart();
  };

  const isInCart = (productId: number): boolean => {
    return items.value.some(item => item.product.id === productId);
  };

  return {
    items,
    totalItems,
    totalPrice,
    initializeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    isInCart,
  };
});
