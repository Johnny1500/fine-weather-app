<template>
  <div
    class="relative w-full h-72"
    @mouseover="showNavigation = true"
    @mouseout="showNavigation = false"
  >
    <slot :currentSlide="currentSlide"></slot>
    <transition name="slide-navigation">
      <div
        class="absolute w-full h-full flex items-center justify-center px-2"
        v-show="showNavigation"
      >
        <div class="flex flex-1">
          <i @click="prevSlide" class="fas fa-chevron-left"></i>
        </div>
        <div class="flex flex-1 justify-end">
          <i @click="nextSlide" class="fas fa-chevron-right"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    slideCount: number;
  }>(),
  {
    slideCount: 1,
  }
);

const currentSlide = ref(0);
const slideCount = ref(props.slideCount);
const showNavigation = ref(false);

const nextSlide = () => {
  if (currentSlide.value === slideCount.value - 1) {
    currentSlide.value = 0;
  } else {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value === 0) {
    currentSlide.value = slideCount.value - 1;
  } else {
    currentSlide.value--;
  }
};
</script>

<style scoped>
.slide-navigation-enter-active {
  transition: opacity 1s ease-in-out;
}
.slide-navigation-leave-active {
  transition: opacity 1s ease-in-out;
}
.slide-navigation-enter-from,
.slide-navigation-leave-to {
  opacity: 0 !important;
}
.slide-navigation-enter-to,
.slide-navigation-leave-from {
  opacity: 1 !important;
}

i {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: #08a089;
  color: #fff;
}
</style>
