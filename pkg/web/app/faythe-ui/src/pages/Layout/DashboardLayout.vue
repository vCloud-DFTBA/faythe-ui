<template>
  <div class="wrapper">
    <side-bar>
      <sidebar-link to="/table">
        <p>Cloud Providers</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <dashboard-content> </dashboard-content>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";

export default {
  components: {
    DashboardContent,
    ContentFooter
  }
};
</script>
