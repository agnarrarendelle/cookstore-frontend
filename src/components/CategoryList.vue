<script setup lang="ts">
import { ref } from 'vue';
import { addCategory } from '../service/api/category';
import { FwbListGroup, FwbListGroupItem, FwbInput, FwbButton } from 'flowbite-vue'

const props = defineProps<{
    categories: string[]
}>()

const newProductName = ref("")

const addNewCategory = async () => {
    if (props.categories.find(c => c === newProductName.value)) {
        alert(`${newProductName.value} is a duplicate name`)
        return
    }

    if (!(0 < newProductName.value.length && newProductName.value.length <= 100)) {
        alert("category name must be between 1 and 100")
        return
    }

    console.log("add new product")
    await addCategory({
        name: newProductName.value
    })

    props.categories.push(newProductName.value)


}

</script>
<template>
    <div>

        <fwb-list-group>
            <fwb-list-group-item v-for="c in props.categories" hover>{{ c }}</fwb-list-group-item>
        </fwb-list-group>
        <fwb-input v-model="newProductName" placeholder="add new product" />
        <fwb-button @click="addNewCategory" color="default">Add</fwb-button>
    </div>
</template>

<style scoped></style>
