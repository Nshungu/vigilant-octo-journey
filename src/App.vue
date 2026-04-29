<template>
  <div id="app" class="min-h-screen bg-kigali-light">
    <Header />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
    <ToastNotification />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import ToastNotification from '@/components/ui/ToastNotification.vue'
</script>
