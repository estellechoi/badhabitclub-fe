<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      <article
        class="prdt-review-artc"
        itemprop="review"
        itemtype="http://schema.org/Review"
        itemscope
      >
        <span
          class="blind-box"
          itemprop="reviewRating"
          itemtype="http://schema.org/Rating"
          itemscope
        >
          <meta itemprop="ratingValue" :content="item.star" />
          <meta itemprop="bestRating" content="5" />
        </span>

        <div class="prdt-review-artc__container">
          <div>
            <header class="prdt-review-artc__header">
              <div class="prdt-review-artc__profile-img">
                <a :aria-label="item.userName">
                  <img :src="item.userProfImgPath" :alt="`${item.userName} 프로필 사진`" />
                </a>
              </div>

              <div
                class="prdt-review-artc__user-info"
                itemprop="author"
                itemtype="http://schema.org/Person"
                itemscope
              >
                <span itemprop="name">{{ item.userName }}</span>

                <div class="prdt-review-artc__reg-dt">
                  <span>{{ item.regDt }}</span>
                </div>
              </div>

              <div class="prdt-review-artc__star">
                <rating-star :star-cnt="item.star"></rating-star>
              </div>
            </header>

            <div class="prdt-review-artc__main-con">
              <p>{{ item.content }}</p>
            </div>
          </div>

          <a class="img-box" @click="goPrdtDetails(item)">
            <div class="img-box__display" v-if="item.prdtImgPath">
              <img :src="item.prdtImgPath" :alt="`${item.prdtName} 상품 사진`" />
            </div>
          </a>
        </div>
      </article>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    goPrdtDetails(item) {
      this.$router.push({ path: `/goods/${item.prdtId}/details` });
    },
  },
};
</script>

<style>
</style>