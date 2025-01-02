<template>
  <div class="flex flex-col items-center justify-center h-full">
    <UCard class="lg:w-4/12 sm:mx-4">

        <h1 class="text-xl font-bold text-color(leading-tight tracking-tightmd:text-2px">
          {{$t('signup_welcome')}}
        </h1>
        
        <CreateUserGoogleSignUp class="mt-3 mb-3"/>
        
        <UDivider :label="$t('or')"/>
        <UForm :schema="SignUpValidationSchemas" :state="state" class="space-y-4" @submit="handleFormSubmit">
          <p v-if="status" class="text-red-500">{{ $t('signup_error') }}</p>
          <UAlert v-if="ok"
            icon="i-heroicons-check-circle"
            color="primary"
            variant="solid"
            :title="$t('email_verification_sent')",
            class="mt-3"
          />
          <p v-if="ok" class="text-primary-500">{{ $t('mail_verification_sent') }}</p>
          <UFormGroup :label="$t('first_name')" name="first_name">
            <UInput v-model="state.first_name" placeholder="Harry "></UInput>
          </UFormGroup>
          <UFormGroup :label="$t('last_name')" name="last_name">
            <UInput v-model="state.last_name" placeholder="Potter"></UInput>
          </UFormGroup>
          <UFormGroup :label="$t('email')" name="email">
            <UInput v-model="state.email" placeholder="exemple@gmail.com"></UInput>
          </UFormGroup>
          <UFormGroup :label="$t('password')" name="password">
            <UInput v-model="state.password" type="password" placeholder="••••••••"/>
          </UFormGroup>
          <UFormGroup :label="$t('verify_password')" name="verify_password">
            <UInput v-model="state.verify_password" type="password" placeholder="••••••••"/>
          </UFormGroup>
          <UButton type="submit">{{$t("signin_submit_btn")}}</UButton>
        </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { createSignUpValidationSchemas } from '~/schemas/SignupValidation'
import { z } from 'zod'
import { addUser } from '~/utils/addUserClient'
import type { FormSubmitEvent } from '#ui/types'

const status = ref(false)

const { signIn } = useAuth()
const {t} = useI18n()
const SignUpValidationSchemas = createSignUpValidationSchemas(t)

async function handleSignIn() {
    await signIn()
}

const ok = ref(false)

const state = ref({
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    password: undefined,
    verify_password: undefined
})

async function handleFormSubmit(event: FormSubmitEvent < z.output < typeof SignUpValidationSchemas >> ) {
  const user = {
    first_name: event.data.first_name,
    last_name: event.data.last_name,
    email: event.data.email,
    password: event.data.password
  }
  try {
    const response = await addUser(user)
    if (response !== 200 && response !==409) {
      status.value = true
    }
    else if (response == 409){
      status.value = true
    }
    else if(response==200) {
      console.log('OK. .L??')
      ok.value = true
      setTimeout(() => {
        ok.value = true
        handleSignIn()
      }, 10000)
    }
  } catch (error) {
    console.error('error adding user:', error);
  }
}
</script>