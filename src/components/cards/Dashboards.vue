<template>
  <v-container style="height:100%">
    <iframe
      :src="process.env.VUE_APP_FAYTHE_DASHBOARD_URL + `&theme=light&kiosk=tv`"
      width="100%"
      height="100%"
      frameborder="0"
    ></iframe>
  </v-container>
</template>
