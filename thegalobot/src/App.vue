<template>
  <v-app v-bind:style="{ background: $vuetify.theme.themes.light.background}">
    <v-main>
      <router-view/>
    </v-main>

    <v-footer dark padless>
      <v-card
        class="flex"
        flat
        tile
      >
        <v-card-title class="primary">
          <strong>Get connected with the dev on social networks!</strong>
          <v-spacer/>
          <v-btn 
            icon
            v-for="item in icons"
            :key="item.icon"
            @click="openPage(item.href)"
          >
            <v-icon>{{item.icon}}</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="primary py-2 text-center">
          {{ new Date().getFullYear() }} - <strong>ManoGalo</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    icons: [
      { icon: 'mdi-twitch', href: 'https://twitch.tv/themanogalo' },
      { icon: 'mdi-twitter',  href: 'https://twitter.com/manogalo_' },
      { icon: 'mdi-github', href: 'https://github.com/manogalo' },
    ]
  }),
  methods: {
    openPage(url) {
      window.open(url)
    }
  }
};
</script>
