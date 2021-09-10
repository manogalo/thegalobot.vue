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
          <v-row>
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
          </v-row>
          <v-row>
            <div>
              The bot list used by TheGaloBot is kindly provided by <a href="https://markeliasen.com/" style="color:white">Mark Eliasen</a>. Please consider <a href="https://github.com/MrEliasen/twitch-bot-list/blob/master/.github/CONTRIBUTING.md" style="color:white">contributing</a> to the list.
            </div>
          </v-row>
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
