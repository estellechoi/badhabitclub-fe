<template>
	<div id="app">
		<div class="body__container">
			<app-header></app-header>
			<router-view></router-view>
			<app-footer></app-footer>
		</div>
	</div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
	name: "App",
	components: {
		AppHeader,
		AppFooter,
	},
};
</script>
