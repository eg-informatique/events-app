<template>
  <div class="flex min-h-screen">
    <!-- Sidebar that hides on scroll down and shows on scroll up -->
    <div :class="['transition-transform duration-300', isScrollingDown ? '-translate-y-full' : 'translate-y-0', 'w-64 h-screen bg-gray-800 p-5']">
      <Sidebar />
    </div>

    <!-- Main content -->
    <div class="flex-grow overflow-auto p-5">
      <slot />
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// State to track the scroll direction
const isScrollingDown = ref(false);
let lastScrollPosition = 0;

// Function to handle scroll
const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset;
  isScrollingDown.value = currentScrollPosition > lastScrollPosition;
  lastScrollPosition = currentScrollPosition;
};

// Hook to attach scroll listener
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// Cleanup listener when component is destroyed
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>