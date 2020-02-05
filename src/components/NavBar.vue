<template>
  <v-navigation-drawer
    v-model="drawer"
    color="primary"
    app
  >
    <v-list
      nav
      class="py-0"
    >
      <v-list-item>
        <v-list-item-avatar tile size="100" class="mx-auto">
          <img :src="require('@/assets/logo.png')">
        </v-list-item-avatar>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'nav-bar',
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Cloud Providers', icon: 'mdi-cloud', link: '/clouds' },
          { title: 'Create Providers', icon: 'mdi-cloud-upload', link: '/clouds/create' },
          { title: 'Healers', icon: 'mdi-ambulance', link: '/healers' },
          { title: 'Scalers', icon: 'mdi-arrow-expand-all', link: '/scalers' },
          { title: 'Silencers', icon: 'mdi-volume-mute', link: '/silencers' },
        ],
      }
    },
  }
</script>