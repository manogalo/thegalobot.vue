<template>
  <v-app v-bind:style="{ background: $vuetify.theme.themes.light.background}">
    <v-main>
      <router-view/>
    </v-main>
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
    ],
  }),

  methods: {
    openPage(url) {
      window.open(url)
    }
  }
};
</script>
