<script setup lang="ts">
import { Ref, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile, UploadFile, UploadFiles } from 'element-plus'
import { getProductImageUploadUrl } from "../service/api/admin/product-image"
import { addProduct } from "../service/api/admin/product"

const props = defineProps<{
    categoryId: number
}>()

const isLoading: Ref<boolean> = ref(false)
const uploadedImage = ref<UploadInstance>()
let rawFile: File | null = null;
let fileBuffer: ArrayBuffer | string | null = null;
const handleExceed: UploadProps['onExceed'] = (files) => {
    console.log(uploadedImage.value)
    console.log(files)
    uploadedImage.value!.clearFiles()
    const file = files[0] as UploadRawFile
    uploadedImage.value!.handleStart(file)
    console.log(uploadedImage.value)
}

const handleSucess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    console.log(response)
    console.log(uploadFile)
    console.log(uploadFiles)
}
const handleChange = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    rawFile = response.raw
    console.log(response)
    console.log(response.raw)
    console.log(uploadFile)
    console.log(uploadFiles)
    console.log(uploadedImage.value)
    console.log(rawFile)
    createImage(response.raw)
}
interface RuleForm {
    name: string
    description: string
    price: number
    discount: number
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: '',
    description: '',
    price: 0,
    discount: 0,
})

const rules = reactive<FormRules<RuleForm>>({
    name: [
        {
            required: true,
            message: 'Please input a product name',
            trigger: 'blur'
        },
    ],

    price: [
        {
            type: 'number',
            required: true,
            message: 'Please input a product price',
            trigger: 'blur',
            transform: (val) => Number(val)
        },
        {
            pattern: /^([1-9][0-9]{0,2}|1000)$/,
            message: 'Price should be 1 to 1000',
            trigger: ['blur', 'change']
        },
    ],

    discount: [
        {
            type: 'number',
            message: 'Please input a product price',
            trigger: 'blur'
        },
        {
            pattern: /^(?:0(?:\.\d{1,2})?|1(?:\.0{1,2})?)$/,
            message: 'Price should be 0 to 1 with 2 decimal points',
            trigger: ['blur', 'change']
        }
    ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    if (!rawFile) return
    const isValid = await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })

    if (!isValid) return

    isLoading.value = true

    console.log("valid!!")

    try {
        console.log(fileBuffer)
        let binary = atob((fileBuffer as string).split(',')[1])
        const array = Array.from(binary, char => char.charCodeAt(0));
        let blobData = new Blob([new Uint8Array(array)], { type: rawFile.type })
        console.log(blobData)
        const res = await getProductImageUploadUrl()
        const { uploadUrl, imageId } = res.data

        await addProduct({
            name: ruleForm.name,
            description: ruleForm.description,
            price: ruleForm.price,
            discount: ruleForm.discount,
            categoryId: props.categoryId,
            productImageId:imageId
        })
        // await addProductImageDetail({
        //     id: imageId,
        //     name: ruleForm.name,
        //     product_id: props.productId
        // });

        const result = await fetch(uploadUrl, {
            method: 'PUT',
            body: blobData
        })

        console.log(result)
    } finally {
        isLoading.value = false
    }
    //TODO: call s3
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const createImage = (file: File) => {
    let reader = new FileReader()
    reader.onload = (e) => {
        const result = e.target!.result!

        fileBuffer = result
    }
    reader.readAsDataURL(file)
}

</script>
<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
        status-icon>
        <el-form-item label="name" prop="name">
            <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="price" prop="price">
            <el-input type="number" v-model.number="ruleForm.price" />
        </el-form-item>
        <el-form-item label="discount" prop="discount">
            <el-input type="number" v-model.number="ruleForm.discount" />
        </el-form-item>
        <el-form-item>
            <el-upload ref="uploadedImage" :limit="1" :auto-upload="false" :on-exceed="handleExceed"
                :on-success="handleSucess" :on-change="handleChange">
                <template #trigger>
                    <el-button type="primary">select image</el-button>
                </template>
                <template #tip>
                    <div class="el-upload__tip text-red">
                        limit 1 file, new file will cover the old file
                    </div>
                </template>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button :disabled="isLoading" type="primary" @click="submitForm(ruleFormRef)">
                Submit
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>
