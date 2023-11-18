<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

const productId = route.params.productId

</script>
<template>
    <h1>route id is {{ productId }}</h1>
</template>

<style scoped></style>
