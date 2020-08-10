<template>
  <div>
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

                <span :class="{ 'progress-info__status--ok' : progressStatus >= item.value }">
                  <a
                    :data-routeParam="item.routeParam"
                    v-if="progressStatus > item.value && !isComplete"
                  >{{ item.value }}. {{ item.label }}</a>
                  <span v-else>{{ item.value }}. {{ item.label }}</span>
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

    <main role="main">
      <section class="section section--delete">
        <div class="container">
          <!-- 계정 비활성화 이유 선택 -->
          <section v-show="progressStatus === 1">
            <div class="title-box">계정을 비활성화하려는 이유가 무엇인가요?</div>

            <fieldset>
              <legend>
                <span class="blind-box">계정 비활성화 이유 선택지 그룹</span>
              </legend>

              <radio-group :list="reasonList" :id-prefix="'delete-reason'" @change="changeReason"></radio-group>

              <!-- additional textbox -->
              <div class="text-area" v-if="hasOtherReason">
                <label for="delete-reason-text">이유</label>
                <input
                  type="text"
                  id="delete-reason-text"
                  placeholder="계정을 해지하려는 이유가 무엇인가요?"
                  v-model="otherReason"
                />
              </div>
            </fieldset>

            <div class="centering-box">
              <button
                type="button"
                class="btn"
                :class="{ 'btn--disabled' : !reason }"
                :disabled="!reason"
                @click="goConfirm"
              >계속하기</button>
            </div>
          </section>

          <!-- 계정 비활성화 진행 -->
          <section v-show="progressStatus >= 2">
            <div class="title-box">{{ isComplete ? '계정이 비활성화되었습니다' : '계정을 비활성화하시겠어요?'}}</div>

            <div class="text-box-group">
              <div v-for="(item, index) in checkList" :key="index">
                <div class="icon--chk">
                  <span class="checkbox"></span>
                </div>
                <div class="text-box">{{ item }}</div>
              </div>
            </div>

            <div class="centering-box" v-if="isComplete">
              <button type="button" class="btn" @click="goHome">닫기</button>
            </div>

            <div class="space-bw-box" v-else>
              <button type="button" class="btn btn--link" @click="goBack">뒤로</button>
              <button type="button" class="btn" @click="deleteAccount">계정 비활성화</button>
            </div>
          </section>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import RadioGroup from "./../../components/RadioGroup.vue";

export default {
  components: {
    RadioGroup,
  },
  data() {
    return {
      progressList: [
        { label: "이유 선택", value: 1, routeParam: "reasons" },
        { label: "확인", value: 2, routeParam: "confirm" },
        { label: "완료", value: 3, routeParam: "complete" },
      ],
      progressStatus: 1,
      reasonList: [
        {
          label: "사생활 보호에 관한 우려가 있어요.",
          value: "1",
        },
        {
          label: "배드해빗클럽의 서비스 약관을 준수할 수 없습니다.",
          value: "2",
        },
        {
          label: "기타",
          value: "0",
        },
      ],
      reason: null,
      checkList: [],
      confirmList: [
        "이 계정과 관련한 프로필 정보가 삭제됩니다.",
        "향후 계정 정보나 이전 주문내역을 확인할 수 없습니다.",
      ],
      cmpltList: [
        "이제 프로필과 클럽 머니 정보를 확인하실 수 없습니다.",
        "향후 이 계정 또는 계정과 연결된 주문 내역을 확인하실 수 없습니다.",
      ],
      otherReason: "",
    };
  },
  computed: {
    isComplete() {
      return this.progressStatus === 3;
    },
    hasOtherReason() {
      return this.reason === "0";
    },
  },
  watch: {
    $route(to) {
      this.getStatus(to.params.step);
    },
    isComplete(newVal) {
      if (newVal) this.checkList = this.cmpltList;
      // else this.checkList = this.confirmList;
    },
    reason(newVal) {
      if (newVal === "0") {
        this.otherReason = "";
      }
    },
  },
  methods: {
    navigateSteps(evt) {
      const target = evt.target;
      if (target.tagName !== "A") return;

      this.$router.push({ params: { step: target.dataset.routeparam } });
    },
    changeReason(val) {
      this.reason = val;
    },
    goConfirm() {
      if (!this.reason) return;

      this.$router.push({
        params: { step: "confirm" },
      });
    },
    goBack() {
      this.$router.push({
        params: { step: "reasons" },
      });
    },
    deleteAccount() {
      this.$router.push({
        params: { step: "complete" },
      });
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
  },
  mounted() {
    this.getStatus(this.$route.params.step);
    this.checkList = this.confirmList;
  },
};
</script>

<style>
</style>