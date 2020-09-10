<template>
  <span :class="boxClass">
    <a>
      <span class="rating-star">
        <i
          class="fas fa-star"
          v-for="(item, index) in [1,2,3,4,5]"
          :key="index"
          :class="{ 'rating-star-icon--gray' : item > starCnt }"
        ></i>
      </span>

      <span class="review-cnt">{{ ratersCnt ? ratersCnt : '' }} {{ label }}</span>
    </a>
  </span>
</template>

<script>
export default {
  props: {
    boxClass: {
      type: String,
      default: "",
    },
    starCnt: {
      type: Number,
      default: 0,
    },
    ratersCnt: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>