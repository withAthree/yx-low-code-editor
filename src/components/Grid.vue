<script setup lang="ts">

</script>

<template>
  <div class="w-full h-full">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="#fff"
            stroke-width="0.5"
          />
        </pattern>
        <pattern
          id="bigGrid"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <rect
            width="50"
            height="50"
            fill="url(#smallGrid)"
          />
          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="#fff"
            stroke-width="1"
          />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#bigGrid)" stroke="none" />
    </svg>
  </div>
</template>

<style scoped>
</style>
