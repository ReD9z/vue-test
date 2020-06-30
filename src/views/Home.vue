<template>
    <Table :headers="headers" :desserts="allItems" :url="url" />
</template>

<script>
import Table from '../components/Table';
import { mapGetters, mapActions } from "vuex";

export default {
    components: {
        Table
    },
    computed: mapGetters(['allItems']),
    data: () => ({
        url: 'http://localhost:3004/contacts',
        headers: [
            {
                text: 'Имя',
                value: 'name',
                edit: true,
                rules: [
                    v => !!v || 'Поле имя не запонено',
                ],
            },
            {
                text: 'Телефон',
                value: 'phone',
                edit: true,
                rules: [
                    v => !!v || 'Поле телефон не запонено',
                ],
            },
            {
                text: 'Действия',
                value: 'actions',
                sortable: false,
                edit: false
            },
        ],
    }),
    methods: mapActions(['fetchItems']),
    async created () {
        this.fetchItems(this.url);
    }
}
</script>
