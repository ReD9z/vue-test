<template>
    <v-app>
        <v-container>
            <v-flex xs12>
                <v-layout row wrap>
                    <v-app-bar
                        color="indigo darken-2"
                        dark
                    >
                        <v-toolbar-title>Мои контакты</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn @click="exit" class="mx-2" fab dark x-small color="pink">
                            <v-icon dark>mdi-forward</v-icon>
                        </v-btn>
                    </v-app-bar>
                </v-layout>
            </v-flex>
            <v-flex xs12>
                <router-view />
            </v-flex>
        </v-container>
    </v-app>
</template>
<script>
    import { mapActions } from "vuex";
    export default {
        methods: {
            ...mapActions(["logout"]),
            async exit() {
                await this.logout().then(() => this.$router.push('/auth'));
            }
        }

    }
</script>
