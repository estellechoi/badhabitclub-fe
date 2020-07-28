<template>
  <div :class="customClass ? customClass : 'map'" ref="map"></div>
</template>

<script>
import initGooglemap from "./../utils/googlemap";

export default {
  name: "google-map",
  data() {
    return {
      google: null,
    };
  },
  props: {
    customClass: {
      type: String,
    },
    center: {
      type: Object,
    },
    scrollwheel: {
      type: Boolean,
      default() {
        return false;
      },
    },
    zoom: {
      type: Number,
      default() {
        return 17;
      },
    },
    addressList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    getMap() {
      const google = this.google;

      const map = new google.maps.Map(this.$refs.map, {
        center: this.center,
        scrollwheel: this.scrollwheel,
        zoom: this.zoom,
      });

      this.getMarkers(map);
    },
    getMarkers(map) {
      const google = this.google;
      const geocoder = new google.maps.Geocoder();

      this.addressList.forEach((item) => {
        geocoder.geocode({ address: item.address }, (res, status) => {
          if (status !== "OK") return;

          new google.maps.Marker({
            map,
            title: item.title,
            position: res[0].geometry.location,
          });
        });
      });
    },
  },
  async mounted() {
    this.google = await initGooglemap();
    this.getMap();
  },
};
</script>

<style>
</style>