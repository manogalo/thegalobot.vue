<template>
    <v-form 
        ref="frmConfirm"
        lazy-validation
    >
        <div>
            <v-img src="https://i.imgur.com/qpLxiIH.png" />
            <v-row justify="center" class="my-2">
                <v-btn dark @click="abrirDialog">Confirmar presença</v-btn>
            </v-row>
            <v-dialog
                v-model="dialog"
                persistent
                max-width="500"
            >
                <template>
                    <v-card dark>
                        <v-card-title>Confirme sua presença</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-text-field
                                    dark
                                    v-model="form.username"
                                    label="Nome"
                                    :rules="rules"
                                />
                            </v-row>
                            <v-row>
                                <v-autocomplete
                                    dark
                                    clearable
                                    v-model="form.giftId"
                                    :items="lista"
                                    item-value="id"
                                    item-text="desc"
                                    label="Sugestão de presente"
                                    :rules="rules"
                                />
                            </v-row>
                            <v-row>
                                <v-col align="end">
                                    <v-btn color="tertiary" class="ma-2" dark @click="confirmar">
                                        Confirmar
                                    </v-btn>
                                    <v-btn class="ma-2" @click="closeDialog">
                                        Fechar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </template>
            </v-dialog>
        </div>
        <v-snackbar
            v-model="openSnackbar"
            :color="snackbar.color"
            :timeout="snackbar.timeout"
            :top="'top'"
        > {{ snackbar.text }}
            <!--<template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="openSnackbar = false"
                >
                    Fechar
                </v-btn>
            </template>-->
        </v-snackbar>
    </v-form>
    
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Home',

    data: () => ({
        dialog: false,
        form: {
            username: null,
            giftId: null
        },
        rules: [v => !!v || "Campo obrigatório"],
        openSnackbar: false,
        snackbar: {
            text: null,
            color: null,
            timeout: 3000
        }
    }),

    methods: {
        ...mapActions(["Register"]),

        abrirDialog() {
            this.dialog = true
        },

        async confirmar() {
            if (this.$refs.frmConfirm.validate()) {
                try {
                    await this.Register(this.form)
                    this.form = {}
                    this.$refs.frmConfirm.resetValidation()
                    this.showMessage("info", "Presença confirmada!")
                } catch (error) {
                    this.showMessage("warning", "Problemas para confirmar a sua presença.")
                }
            }
        },

        closeDialog() {
            this.dialog = false
            this.$refs.frmConfirm.resetValidation()
        },

        showMessage(color, text) {
            this.snackbar = {
                color: color,
                text: text,
                timeout: 3000
            },
            this.openSnackbar = true
        }
    },

    mounted() {
        this.$store.dispatch('GetGiftList')
    },

    computed: {
        ...mapGetters({
            lista: 'GiftList'
        })
    }
}
</script>