<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        sort-by="calories"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
               <v-text-field
                    append-icon="mdi-magnify"
                    label="Поиск"
                    v-model="search"
                    single-line
                    hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            Добавить
                        </v-btn>
                    </template>
                    <v-card>
                        <v-form ref="form" v-model="valid">
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4" v-for="(param, key) in headers" :key="key">
                                            <v-text-field :rules="param.rules" v-if="param.edit" v-model="editedItem[param.value]" :label="param.text"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Закрыть</v-btn>
                                <v-btn :disabled="!valid" color="blue darken-1" text @click="save">Сохранить</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
import { mapActions } from "vuex";

export default {
    props: {
        headers: Array,
        desserts: Array,
        url: String
    },
    data: () => ({
        valid: true,
        dialog: false,
        search: '',
        editedItem: {},
        defaultItem: {}
    }),
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Новый контакт' : 'Редактировать контакт'
        },
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
    },
    methods: {
        ...mapActions(["addItems", "deleteItems", "updateItems"]),
        editItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem (item) {
            const data = {
                url: this.url,
                id: item.id,
            };
            confirm('Удалить контакт?') && this.deleteItems(data);
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save () {
            if(this.$refs.form.validate()) {
                const data = {
                    url: this.url,
                    item: this.editedItem,
                };

                if (this.editedIndex > -1) {
                    this.updateItems(data);
                } else {
                    this.addItems(data);
                }
                this.close()
            }
        },
    }
}
</script>
