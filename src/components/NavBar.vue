<template>
  <v-card>
    <v-app-bar
      v-model="appbar"
      app
      clipped-left
      flat
      collapse
      short
      color="ml-3"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img
        class="mx-2"
        :src="require('@/assets/logo.png')"
        max-height="40"
        max-width="40"
        contain
      ></v-img>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" hide-overlay app clipped width="220">
      <v-list nav class="py-0">
        <v-list-item>
          <v-list-item-avatar tile size="100" class="mx-auto">
            <img :src="require('@/assets/logo.png')" />
          </v-list-item-avatar>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-group
          v-for="group in groupItems"
          :key="group.id"
          :prepend-icon="group.icon"
          color="black"
          dark
        >
          <template v-slot:activator>
            <v-list-item-title>{{ group.title }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="item in items[`${group.id}`]"
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
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-footer padless fixed tile app inset>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>CloudTeam</strong>
        <v-icon class="ml-2 mt-n2">mdi-account-group</v-icon>
      </v-col>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  name: "nav-bar",
  data() {
    return {
      drawer: true,
      groupItems: [
        { id: "clouds", title: "Clouds", icon: "mdi-cloud" },
        { id: "healers", title: "Healers", icon: "mdi-ambulance" },
        { id: "scalers", title: "Scalers", icon: "mdi-arrow-expand-all" },
        { id: "silencers", title: "Silencers", icon: "mdi-volume-mute" },
        { id: "users", title: "Users", icon: "mdi-account" }
      ],
      items: {
        clouds: [
          { title: "Clouds", link: "/clouds" },
          {
            title: "Create Cloud",
            link: "/createcloud"
          }
        ],
        healers: [
          { title: "Healers", link: "/healers" },
          { title: "Create Healer", link: "/createhealer" }
        ],
        scalers: [
          { title: "Scalers", link: "/scalers" },
          { title: "Create Scaler", link: "/createscaler" }
        ],
        silencers: [
          { title: "Silencers", link: "/silencers" },
          { title: "Create Silencer", link: "/createsilencer" }
        ],
        users: [
          { title: "Users", link: "/users" },
          { title: "Create User", link: "/createuser" }
        ]
      }
    };
  },
  computed: {
    appbar: function() {
      return !this.drawer;
    }
  }
};
</script>
