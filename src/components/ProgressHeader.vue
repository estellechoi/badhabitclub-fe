<template>
  <div>
    <div class="progress-info-box">
      <div class="logo">
        <a @click="goHome">
          <span class="blind-box">브랜드 로고 이미지, 클릭하면 홈 화면으로 이동합니다.</span>
        </a>
      </div>

      <div class="progress-info">
        <nav>
          <ol @click="navigateSteps">
            <li v-for="(item, index) in list" :key="index">
              <span class="icon--next-step" v-if="index !== 0"></span>

              <span :class="{ 'progress-info__status--ok' : valNow >= index + 1 }">
                <a
                  v-if="valNow > index + 1 && !isComplete"
                  :data-path="item.path"
                >{{ index + 1 }}. {{ item.label }}</a>

                <span v-else>{{ index + 1 }}. {{ item.label }}</span>
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="progress-bar">
      <div
        role="progressbar"
        aria-valuemin="0"
        :aria-valuemax="max"
        :aria-valuenow="valNow"
        class="progress-bar__status-bar"
        :style="`transform: translateX(${this.barX}%)`"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "progress-header",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      valNow: 1,
    };
  },
  computed: {
    max() {
      return this.list.length;
    },
    isComplete() {
      return this.valNow === this.list.length;
    },
    barX() {
      return -((this.max - this.valNow) / this.max) * 100;
    },
  },
  watch: {
    $route(to) {
      const pathParts = to.path.split("/");
      this.list.some((item, index) => {
        if (item.path === pathParts[pathParts.length - 1]) {
          this.valNow = index + 1;
          return true;
        }
      });
    },
  },
  methods: {
    navigateSteps(evt) {
      const target = evt.target;
      if (target.tagName !== "A") return;
      this.$router.push({ path: target.dataset.path });
    },
    goHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
