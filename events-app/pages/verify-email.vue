<template>
    <div class="mt-7 max-w-sm mx-auto text-center">
        <p class="mt-5 text-7xl font-bold">{{ $t('verify_email_txt') }}</p>
        <UButton class="mt-4 my-7" :label="$t('verify_email_btn')" @click="verifyEmail"/><br>
        <Icon name="line-md:loading-loop" class="w-10 h-10" v-if="load"/>
        <div v-if="ok">
            <Icon name="line-md:email-check" class="w-10 h-10 text-green-500"/><br>
            <p class="mt-2 font-bold">{{ $t('verify_email_complet') }}</p>
        </div>
        <div v-if="notok">
            <Icon name="material-symbols:error-outline" class="w-10 h-10 text-red-500"/><br>
            <p class="mt-2 font-bold">{{ $t('verify_email_notcomplet') }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
definePageMeta({auth: false})
const load = ref(false)
const ok = ref(false)
const notok = ref(false)
const route = useRoute();

const usrId = route.query.id
const emailToken = route.query.token

const data = {
    id: usrId,
    token: emailToken
}

const verifyEmail = async () => {
    load.value = true
    const verification = await fetch('https://events-api.org/verify-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    if (verification.status == 202){
        load.value = false
        ok.value = true
    }
    else{
        load.value = false
        notok.value = true
    }
}
</script>

<style scoped>

</style>
