<template>
  <footer class="section section--footer">
    <div class="container">
      <div class="site-info site-info--doc">
        <a>이용약관</a>
        <a>개인정보처리방침</a>
      </div>

      <ul class="site-info">
        <li>{{ siteInfo.title }}</li>
        <li>{{ siteInfo.telNo }}</li>
        <li>{{ siteInfo.email }}</li>
        <li>{{ siteInfo.bankAcct }} {{ siteInfo.bankAcctHldrNm }}</li>
        <li>{{ siteInfo.address }}</li>
      </ul>

      <ul class="site-info">
        <li>사업자등록번호 {{ siteInfo.coRegNo }}</li>
        <li>통신판매업신고번호 {{ siteInfo.mailOrderRptNo }}</li>
        <li>개인정보보호책임자 {{ siteInfo.rpsntNm }}</li>
      </ul>

      <a href="https://www.instagram.com/xxbadhabitclub" class="sns-link">
        <i class="fab fa-instagram"></i>
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      siteInfo: {
        title: "배드해빗클럽",
        telNo: "02-960-0000",
        email: "cs@badhabitclub.io",
        bankAcct: "우리은행 1005-000-000000",
        bankAcctHldrNm: "채영빈",
        address: "서울시 동대문구 휘경로2길 19 지하 1층",
        coRegNo: "000-00-00000",
        mailOrderRptNo: "제2020-서울동대문-0384호",
        rpsntNm: "채영빈",
      },
    };
  },
};
</script>

<style>
</style>