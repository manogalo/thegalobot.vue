<template>
    <div>
        <v-expansion-panels dark> 
            <v-expansion-panel>
                <v-expansion-panel-header>
                    Lista de presenças confirmadas
                </v-expansion-panel-header>
                <v-expansion-panel-content>

                    <v-card>
                        <v-simple-table dark height="300">
                            <thead>
                                <tr>
                                    <th>
                                        Nome
                                    </th>
                                    <th>
                                        Presente
                                    </th>
                                    <th>
                                        Ação
                                    </th>
                                </tr>
                            </thead>
                           <tbody>
                                <tr
                                    v-for="item in lista"
                                    :key="item.id"
                                >
                                    <td>{{ item.username }}</td>
                                    <td>{{ item.desc }}</td>
                                    <td>
                                        <v-btn icon>
                                            <v-icon color="pink" @click="removerConvidado(item.id)">mdi-delete</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-header>
                    Lista de presentes
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-card>
                        <v-row>
                            <v-col class="d-flex align-left" cols="6" sm="6">
                                <v-text-field
                                    v-model="form.desc"
                                    label="Adicionar presente"
                                    size="20"
                                    class="pa-2"
                                />
                                <v-btn icon dark class="pa-2" @click="addGift">
                                    <v-icon large>mdi-content-save</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-simple-table dark height="300">
                            <thead>
                                <tr>
                                    <th>
                                        Presente
                                    </th>
                                    <th>
                                        Ação
                                    </th>
                                </tr>
                            </thead>
                           <tbody>
                                <tr
                                    v-for="item in presentes"
                                    :key="item.id"
                                >
                                    <td>{{ item.desc }}</td>
                                    <td>
                                        <v-btn icon>
                                            <v-icon color="pink" @click="removerPresente(item.id)">mdi-delete</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-btn class="my-5 ma-2" dark @click="logout" >Logout</v-btn>
        <v-snackbar
            v-model="openSnackbar"
            :color="snackbar.color"
            :timeout="snackbar.timeout"
            :top="'top'"
        > {{ snackbar.text }}
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="openSnackbar = false"
                >
                    Fechar
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'ControlPanel',

    data: () => ({
        form: {
            desc: null
        },
        snackbar: {
            color: null,
            text: null,
            timeout: 3000
        },
        openSnackbar: false
    }),

    computed: {
        ...mapGetters({
            isAuthenticated: 'isAuthenticated',
            lista: 'UserList',
            presentes: 'GiftList'
        })
    },

    async mounted() {
        if (!this.isAuthenticated) {
            this.$router.push('/not-allowed')
        }
        await this.$store.dispatch('GetUserList')
    },

    methods: {
        ...mapActions(["LogOut", "RemoveGuest", "AddGift", "RemoveGift"]),

        logout() {
            try {
                this.LogOut();
                this.$router.push('/login')
            } catch (error) {
                this.showMessage("blue", "Erro ao realizar o logout.")
            }
        },

        async removerConvidado(id) {
            try {
                await this.RemoveGuest(id)
                this.showMessage("blue", "Convidado removido.")
            } catch (error) {
                this.showMessage("blue", "Erro ao realizar a exclusão.")
            }
        },

        async removerPresente(id) {
            try {
                await this.RemoveGift(id)
                this.showMessage("blue", "Presente removido.")
            } catch (error) {
                this.showMessage("blue", "Erro ao realizar a exclusão.")
            }
        },

        async addGift() {
            try {
                await this.AddGift(this.form)
                this.showMessage("blue", "Presente adicionado.")
            } catch (error) {
                this.showMessage("blue", "Erro ao realizar a gravação.")
            }
        },

        showMessage(color, text) {
            this.snackbar = {
                color: color,
                text: text,
                timeout: 3000
            },
            this.openSnackbar = true
        }
    }
}

</script>