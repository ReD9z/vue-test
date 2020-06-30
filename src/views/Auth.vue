<template>
    <v-app id="inspire">
        <v-main>
            <v-container
                class="fill-height"
                fluid
            >
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col
                        cols="12"
                        sm="8"
                        md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                color="primary"
                                dark
                                flat
                            >
                                <v-toolbar-title>Авторизация</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                        label="Логин"
                                        name="login"
                                        prepend-icon="mdi-account"
                                        v-model="user.login"
                                        type="text"
                                    ></v-text-field>

                                    <v-text-field
                                        id="password"
                                        label="Пароль"
                                        v-model="user.password"
                                        name="password"
                                        prepend-icon="mdi-lock"
                                        type="password"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="auth" color="primary">Войти</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import { mapActions } from "vuex";
    export default {
        data: () => ({
            user: {
                login: "",
                password: ""
            }
        }),
        methods: {
            ...mapActions(["login"]),
           async auth() {
                await this.login(this.user).then(() => this.$router.go('/')).catch(err => console.log(err));
            }
        }

    }
</script>
