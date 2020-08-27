<template>
  <div class="chkout-fs-direc chkout-addr-sec">
    <div class="chkout-addr-box">
      <div class="chkout-addr-search-box">
        <div class="text-input">
          <input
            type="text"
            aria-label="도로명 주소검색"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            autocapitalize="none"
            class="text-input__input"
            v-model="addrSearchText"
            @input="searchAddr"
            @keyup.enter="searchAddr"
          />
        </div>

        <button type="button" aria-label="검색" class="btn btn--primary" @click="searchAddr">
          <i class="fas fa-search" aria-hidden="true"></i>
        </button>

        <button type="button" class="blind-box" @click="close">검색창 닫기</button>
      </div>

      <div class="chkout-addr-rslt-box">
        <ul class="chkout-addr-rslt-list" v-if="fetchedAddrList.length">
          <li class="chkout-addr-rslt" v-for="(item, index) in fetchedAddrList" :key="index">
            <div class="chkout-addr-rslt__zipcd">{{ item.zipNo }}</div>
            <dl @click="(evt) => selectAddr(evt, item.zipNo)">
              <div class="chkout-addr-rslt__addr">
                <dt class="chkout-addr-rslt__addr-dt">도로명</dt>
                <dd class="chkout-addr-rslt__addr-dd">
                  <button
                    type="button"
                    class="chkout-addr-rslt__addr-sel-btn"
                  >{{ item.roadAddr }} {{ item.bdNm || "" }}</button>
                </dd>
              </div>

              <div class="chkout-addr-rslt__addr">
                <dt class="chkout-addr-rslt__addr-dt">지번</dt>
                <dd class="chkout-addr-rslt__addr-dd">
                  <button type="button" class="chkout-addr-rslt__addr-sel-btn">{{ item.jibunAddr }}</button>
                </dd>
              </div>
            </dl>
          </li>
        </ul>

        <div v-else>
          <div
            class="chkout-addr-no-rslt"
            v-if="addrSearchText.length"
          >검색결과가 없습니다. 잘못된 철자가 없는지, 정확한 주소인지 다시 한번 확인해 주세요.</div>

          <div v-else>
            <div class="chkout-addr-no-rslt">아래와 같은 조합으로 검색을 하시면 더욱 정확한 결과가 검색됩니다.</div>
            <dl>
              <dt class="chkout-addr-ex-dt">도로명 + 건물주소</dt>
              <dd class="chkout-addr-ex-dd">예) 판교역로 235, 제주 첨단로 242</dd>

              <dt class="chkout-addr-ex-dt">지역명(동/리) + 번지</dt>
              <dd class="chkout-addr-ex-dd">예) 삼평동 681, 제주 영평동 2181</dd>

              <dt class="chkout-addr-ex-dt">지역명(동/리) + 건물명(아파트명)</dt>
              <dd class="chkout-addr-ex-dd">예) 분당 주공, 연수동 주공3차</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAddr } from "./../api/common.js";

export default {
  name: "addr-search-box",
  data() {
    return {
      addrSearchText: "",
      fetchedAddrList: [],
    };
  },
  methods: {
    refineText(text) {
      // 특수문자 제거
      const regExp = /[{}[\]<>/?.,;:|()~`₩!@#$%^&*\-_=+'"\\]/;
      if (regExp.test(text)) return text.replace(regExp, "");

      // 특정문자열(sql예약어의 앞뒤공백포함) 제거
      const arr = [
        "OR",
        "SELECT",
        "INSERT",
        "DELETE",
        "UPDATE",
        "CREATE",
        "DROP",
        "EXEC",
        "UNION",
        "FETCH",
        "DECLARE",
        "TRUNCATE",
      ];
      arr.forEach((item) => {
        item = new RegExp(item, "gi");
        if (item.test(text)) text = text.replace(item, "");
      });

      return text;
    },
    searchAddr() {
      this.addrSearchText = this.refineText(this.addrSearchText);

      if (
        this.addrSearchText.replace(/\s+/, "").length < 2 ||
        !this.addrSearchText.replace(/[0-9]+/, "").length
      )
        return (this.fetchedAddrList = []);

      getAddr({ keyword: this.addrSearchText }).then((res) => {
        console.log(res);
        const rslt = res.data.results;
        if (rslt.common.errorCode !== "0")
          return alert("도로명 주소검색 API 오류");
        this.fetchedAddrList = rslt.juso;
      });
    },
    selectAddr(evt, zipNo) {
      console.log(evt);

      this.$emit("close", {
        zipCd: zipNo,
        address: evt.target.innerText,
      });
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>