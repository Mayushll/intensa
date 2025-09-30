<template>
  <div class="home">
    <div class="home__hero">
      <h1 class="home__title">Каталог товаров</h1>
      <p class="home__subtitle">Найдите отличные товары по выгодным ценам</p>

      <div class="home__search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск товаров..."
          class="home__search-input"
        />
      </div>
    </div>

    <div class="home__container">
      <div v-if="filteredProducts.length === 0" class="home__empty">
        <p>Товары не найдены</p>
      </div>

      <div v-else class="home__grid">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { products } from '~/data/products';
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const searchQuery = ref('');

onMounted(() => {
  cartStore.initializeCart();
});

const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return products;
  }

  const query = searchQuery.value.toLowerCase();
  return products.filter(
    product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  );
});

useHead({
  title: 'Каталог товаров - МагазинHub',
  meta: [{ name: 'description', content: 'Просмотрите нашу потрясающую коллекцию товаров' }],
});
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  &__hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 2rem 3rem;
    text-align: center;
  }

  &__title {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    animation: fadeInDown 0.8s ease;
  }

  &__subtitle {
    font-size: 1.25rem;
    margin: 0 0 2rem 0;
    opacity: 0.9;
    animation: fadeInUp 0.8s ease;
  }

  &__search {
    max-width: 600px;
    margin: 0 auto;
    animation: fadeIn 1s ease;
  }

  &__search-input {
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:focus {
      outline: none;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    }

    &::placeholder {
      color: #999;
    }
  }

  &__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    animation: fadeIn 0.8s ease;
  }

  &__empty {
    text-align: center;
    padding: 4rem 2rem;
    color: white;
    font-size: 1.25rem;
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .home {
    &__hero {
      padding: 3rem 1rem 2rem;
    }

    &__title {
      font-size: 2rem;
    }

    &__subtitle {
      font-size: 1rem;
    }

    &__container {
      padding: 1rem;
    }

    &__grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .home__grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}
</style>
