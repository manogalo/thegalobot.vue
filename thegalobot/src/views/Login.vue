<template>
    <v-form
        ref="frmLogin"
        v-model="valid"
        lazy-validation
    >
        <v-card 
            class="mx-auto my-12"
            max-width="374"
            dark
        >
            <v-card-title>
                Painel de Administrador
            </v-card-title>
            <v-card-text>
                <v-row
                    align="center"
                    class="mx-0"
                >
                    <v-text-field
                        v-model="form.username"
                        label="Login"
                        :rules="rules"
                    />
                </v-row>
                <v-row
                    align="center"
                    class="mx-0"
                >
                    <v-text-field
                        v-model="form.password"
                        label="Senha"
                        type="password"
                        :rules="rules"
                    />
                </v-row>
                <v-row
                    class="mx-0"
                >
                    <p v-if="showError" style="color:red">Usuário ou senha inválidos</p>
                    <v-col align="end">
                        <v-btn
                            color="tertiary"
                            @click="submit"
                            dark
                        >Login</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-form>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    name: 'Login',

    data: () => ({
        form: {
            username: null,
            password: null
        },
        valid: false,
        rules: [ v => !!v || 'Campo obrigatório.'],
        showError: false
    }),

    created() {

    },

    mounted() {

    },

    methods: {
        ...mapActions([
            "LogIn",
            "LogOut",
            "GetUserList"
        ]),

        gravar() {
            if (this.$refs.frmLogin.validate()) {
                console.log('Válido')
            }
        },

        async submit() {
            if (this.$refs.frmLogin.validate()) {
                try {
                    await this.LogIn(this.form)
                    await this.GetUserList()
                    this.$router.push("/list");
                } catch (error) {
                    this.showError = true
                    console.log(error)
                }
            }
        },

        async logout() {
           try {
                await this.LogOut()
            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>

<style>
.font-card-title {
    color: white
}
</style>