<template>
  <!--MAIN / role for IE 10 -->
  <main role="main">
    <!-- VISUAL-->
    <section class="section section--visual">
      <div class="container"></div>
    </section>

    <!-- SECTION SPOT-->
    <section class="section section--spot">
      <div class="container">
        <div class="summary">
          <div class="summary__title">Where is</div>
          <div class="summary__description">
            <span>{{ spotInfo.hours }}</span>
            <span>{{ spotInfo.address }}</span>
            <span>{{ spotInfo.addressEng }}</span>
          </div>
        </div>

        <!--MAP-->
        <google-map :center="center" :addressList="addressList"></google-map>
      </div>
    </section>

    <section class="section section--brand">
      <div class="container"></div>
    </section>
  </main>
</template>

<script>
import GoogleMap from "./../components/GoogleMap";

export default {
  name: "home",
  components: {
    GoogleMap,
  },
  data() {
    return {
      spotInfo: {
        hours: "Mon - Sat 7PM - 3AM Sunday Off",
        address: "서울시 동대문구 휘경로2길 19 지하 1층",
        addressEng: "hwigyeongro2-gil, Dongdaemun-gu, Seoul, Republic of Korea",
      },
      center: {
        lat: 37.595152,
        lng: 127.0607246,
      },
      addressList: [
        {
          title: "Bad Habit Club",
          address: "서울특별시 동대문구 휘경로2길 19",
        },
      ],
    };
  },
};
</script>
