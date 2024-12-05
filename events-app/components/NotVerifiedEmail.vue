<template>
    <div class="flex items-center justify-center">
        <p class="text-lg text-center text-red-500">{{ $t('email_not_verrified') }}</p>
        <NuxtLink class="font-medium ml-2 text-primary-600 hover:underline cursor-pointer dark:text-primary-500" @click="sendVerificationLink">{{ $t("verify_email_txt") }}</NuxtLink>
    </div>
    <div class="flex items-center justify-center">
        <Icon v-if="load" name="line-md:loading-loop" class="w-5 h-5"/>
    </div>
    <div v-if="ok" class="flex items-center justify-center">
        <Icon name="line-md:email-check" class="w-5 h-5 ml-4 text-green-500"/>
        <p class="ml-2 font-bold">{{ $t('verify_email_sent') }}</p>
    </div>
    <div v-if="notok" class="flex items-center justify-center">
        <Icon name="material-symbols:error-outline" class="w-5 h-5 text-red-500 ml-4"/>
        <p class="ml-2 font-bold">{{ $t('verify_email_notcomplet') }}</p>
    </div>
    
    
</template>
<script setup lang="ts">
const load = ref(false)
const ok = ref(false)
const notok = ref(false)
const { email } = defineProps(["email"])

const sendVerificationLink = async() => {
    load.value = true
    notok.value = false
    ok.value = false
    const verification = await fetch(`https://events-api.org/send-verification-email?email=${email}`, {
        method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
    })
    if (verification.ok){
        load.value = false
        ok.value = true
    }
    else{
        load.value = false
        notok.value = true
    }
}

</script>