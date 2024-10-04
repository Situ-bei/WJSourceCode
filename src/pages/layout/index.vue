<template>
    <LayoutFixed></LayoutFixed>
    <LayoutNav></LayoutNav>

    <layout-header></layout-header>

    <router-view></router-view>
    <LayoutFooter></LayoutFooter>
</template>

<script setup>
import LayoutHeader from '@/pages/layout/components/LayoutHeader.vue'
import LayoutNav from '@/pages/layout/components/LayoutNav.vue'
import LayoutFooter from '@/pages/layout/components/LayoutFooter.vue'
import LayoutFixed from '@/pages/layout/components/LayoutFixed.vue'


</script>

<style lang="scss" scoped>

</style>