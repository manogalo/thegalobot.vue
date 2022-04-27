<template>
  <div class="NotFound">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card height="400" color="transparent" flat>
            <div class="display-3 white--text mt-5">
                Acesso Não Autorizado
                <v-icon x-large dark>mdi-lock-alert</v-icon>
            </div>
            <div class="grey--text lighten-5">
                <router-link to="/login">Faça login</router-link> para ter acesso a esta página.
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style>
  .paragraph-text {
    font-size: 18px;
  }
</style>