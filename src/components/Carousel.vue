<template>
  <div class="relative w-full h-48">
    <slot :currentSlide="currentSlide"></slot>
    <div class="absolute w-full h-full flex items-center justify-center px-2">
      <div class="flex flex-1">
        <i @click="prevSlide" class="fas fa-chevron-left"></i>
      </div>
      <div class="flex flex-1 justify-end">
        <i @click="nextSlide" class="fas fa-chevron-right"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";

const props = defineProps({
  slideCount: Number,
});

const currentSlide = ref(0);
const slideCount = ref(props.slideCount === undefined ? 1 : props.slideCount);
console.log('slideCount', slideCount);

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
