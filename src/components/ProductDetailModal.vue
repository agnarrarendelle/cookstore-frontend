<script setup lang="ts">
import { FwbModal, FwbButton } from "flowbite-vue"
import { ref } from "vue";

const props = defineProps<{
    categoryName: string,
    productId: number,
    productName: string,
    productDescription: string,
    price: number,
    discount: number
    closeModal: () => void,
    addOrderItem: (id: number, name: string, price: number, number: number) => void
}>()

const maxItemNumber = 99
const minItemNumber = 1

const counter = ref(minItemNumber)
const isShowSuccessText = ref(false)

const incrementCounter = () => {
    if (counter.value > maxItemNumber) return
    counter.value += 1
}

const decrementCounter = () => {
    if (counter.value <= minItemNumber) return
    counter.value -= 1
}

const onAddToCart = () => {
    console.log("added to cart!!")
    props.addOrderItem(props.productId, props.productName, props.price, counter.value)

    isShowSuccessText.value = true

    setTimeout(() => {
        isShowSuccessText.value = false
        props.closeModal()
    }, 2000)
}
</script>
<template>
    <FwbModal @close="props.closeModal">
        <template #header>
            <div class="flex items-center text-lg">
                {{ props.productName }}
            </div>
            <div v-if="isShowSuccessText" class="flex items-left text-lg">
                Added to cart!
            </div>
        </template>
        <template #body>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {{ props.productDescription }}
            </p>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <fwb-button :disabled="isShowSuccessText" @click="onAddToCart" gradient="cyan-blue">
                    Add to cart
                </fwb-button>
                <form class="max-w-xs mx-auto">
                    <div class="relative flex items-center max-w-[8rem]">
                        <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input"
                            @click="decrementCounter"
                            class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M1 1h16" />
                            </svg>
                        </button>
                        <input :min="minItemNumber" :max="maxItemNumber"
                            onkeyup="if(!(1 <= this.value  && this.value <= 99)) this.value = null;" type="number"
                            id="quantity-input" data-input-counter aria-describedby="helper-text-explanation"
                            class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            :placeholder="`${counter}`" required>
                        <button type="button" id="increment-button" data-input-counter-increment="quantity-input"
                            @click="incrementCounter"
                            class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 1v16M1 9h16" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </template>

    </FwbModal>
</template>

<style scoped></style>
