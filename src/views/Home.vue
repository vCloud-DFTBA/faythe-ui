<template>
  <v-app id="home">
    <nav-bar></nav-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  name: "App",
  components: {
    NavBar
  },
  data: () => ({
    //
  })
};
</script>
