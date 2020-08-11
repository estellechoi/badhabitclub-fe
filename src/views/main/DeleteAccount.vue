<template>
  <div>
    <!-- PROGRESS BAR HEADER -->
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
              <li v-for="(item, index) in progressList" :key="index">
                <span class="icon--next-step" v-if="index !== 0"></span>

                <span :class="{ 'progress-info__status--ok' : progressStatus >= index + 1 }">
                  <a
                    v-if="progressStatus > index + 1 && !isComplete"
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
          :aria-valuenow="progressStatus"
          aria-valuemin="0"
          aria-valuemax="3"
          class="progress-bar__status-bar"
          :class="{ 'progress-bar__status-bar--2third' : progressStatus === 2,
                    'progress-bar__status-bar--cmplt' : progressStatus === 3 }"
        ></div>
      </div>
    </div>

    <!-- MAIN SECTION BY STEP -->
    <main role="main">
      <section class="section section--delete">
        <div class="container">
          <router-view @select-reason="storeReason" :storedReason="storedReason"></router-view>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progressList: [
        { label: "이유 선택", path: "reasons" },
        { label: "확인", path: "confirm" },
        { label: "완료", path: "complete" },
      ],
      progressStatus: 1,
      storedReason: null,
    };
  },
  computed: {
    isComplete() {
      return this.progressStatus === this.progressList.length;
    },
  },
  watch: {
    $route(to) {
      const pathParts = to.path.split("/");
      this.getStatus(pathParts[pathParts.length - 1]);
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
    getStatus(step) {
      switch (step) {
        case "reasons":
          this.progressStatus = 1;
          break;
        case "confirm":
          this.progressStatus = 2;
          break;
        case "complete":
          this.progressStatus = 3;
          break;
      }
    },
    storeReason(val) {
      this.storedReason = val;
    },
  },
};
</script>

<style>
</style>