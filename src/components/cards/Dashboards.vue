<template>
  <v-container style="height:100%">
    <iframe
      :src="dashboard_url"
      width="100%"
      height="100%"
      frameborder="0"
    ></iframe>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dashboard_url:
        process.env.VUE_APP_FAYTHE_DASHBOARD_URL + "&theme=light&kiosk=tv"
    };
  }
};
</script>
