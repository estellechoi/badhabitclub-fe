<template>
  <!--MAIN / role for IE 10 -->
  <main role="main">
    <!-- VISUAL-->
    <section class="section section--visual">
      <span class="blind-box">{{ bgAlt }}</span>
      <div class="container"></div>
    </section>

    <!-- SECTION SPOT-->
    <section class="section section--spot">
      <div class="container" itemscope itemtype="http://schema.org/Place">
        <meta itemprop="address" />
        <span itemprop="logo" itemtype="http://schema.org/ImageObject" itemscope></span>
        <meta itemprop="slogan" />
        <meta itemprop="telephone" />
        <meta itemprop="smokingAllowed" content="False" />
        <span itemprop="event" itemtype="http://schema.org/Event" itemscope></span>
        <span itemprop="photo" itemtype="http://schema.org/ImageObject" itemscope></span>
        <span itemprop="foodEstablishment" itemtype="http://schema.org/FoodEstablishment" itemscope>
          <meta itemprop="acceptsReservations" />
          <meta itemprop="hasMenu" />
          <meta itemprop="openingHours" />
          <meta itemprop="paymentAccepted" />
          <meta itemprop="priceRange" />
          <meta itemprop="areaServed" />
          <meta itemprop="brand" />
          <meta itemprop="contactPoint" />
          <meta itemprop="email" />
          <span itemprop="founder" itemtype="http://schema.org/Person" itemscope>
            <meta itemprop="name" content="채영빈" />
          </span>
        </span>

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
import GoogleMap from "./../../components/GoogleMap";

export default {
  name: "home",
  components: {
    GoogleMap,
  },
  data() {
    return {
      bgAlt:
        "come curious leave connected 라는 문구와 함께 낡은 전화기 사진이 한가운데에 위치한 어두운 흰색의 배경 이미지",
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
