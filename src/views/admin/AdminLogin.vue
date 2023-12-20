<script setup lang="ts">
import { login } from '../../service/api/auth';
import { useStore } from '../../state';
import { MutationTypes } from '../../state/mutation-types';
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import router from "../../router"
const store = useStore();


interface RuleForm {
    email: string
    password: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    email: '',
    password: '',
})

const rules = reactive<FormRules<RuleForm>>({
    email: [
        {
            type: 'email',
            required: true,
            message: 'Please input valid email',
            trigger: 'blur'
        },
    ],
    password: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
        },
        {
            min: 5,
            max: 20,
            message: 'Length should be 5 to 20',
            trigger: 'blur'
        },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    const isValid = await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })

    if (!isValid) return

    const res = await login(ruleForm.email, ruleForm.password);
    store.commit(MutationTypes.SET_JWT_AUTH_TOKEN, res.data.token)
    store.commit(MutationTypes.INIT_WEB_SOCKET, "")
    router.push({ name: 'admin index' })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>
<template>
    <h1>Admin Login</h1>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
        status-icon>
        <el-form-item label="email" prop="email">
            <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="password" prop="password">
            <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                Submit
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>
