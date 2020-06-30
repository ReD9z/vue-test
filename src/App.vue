<template>
    <component :is="layout"></component>
</template>

<script>
import HomeLayout from '@/layouts/HomeLayout';
import AuthLayout from '@/layouts/AuthLayout';

export default {
    computed: {
        layout() {
            return (this.$route.meta.layout || 'home') + '-layout';
        }
    },
    components: {
        HomeLayout,
        AuthLayout
    }
}
</script>

