<template>
  <div class="flex items-center justify-center h-full">
    <UCard class="lg:w-4/12 sm:mx-4">
      <h1 class="text-xl font-bold leading-tight tracking-tightmd:text-2px">
        {{$t('signin_welcome')}}
      </h1>
      <LoginGoogleLogin class="mt-3 mb-3"/>
      <UDivider :label="$t('or')"/>
      <p v-if="status" class="text-red-500"> {{ $t('signin_error') }}</p>
      <UForm :schema="LoginValidationSchemas" :state="state" class="space-y-4" @submit="handleFormSubmit">
        <UFormGroup :label="$t('email')" name="email">
          <UInput v-model="state.email" placeholder="exemple@gmail.com"/>
        </UFormGroup>
        <UFormGroup :label="$t('password')" name="password">
          <UInput v-model="state.password" type="password" placeholder="••••••••"/>
        </UFormGroup>
        <UButton type="submit">{{$t("signin_submit_btn")}}</UButton>
      </UForm>
      <template #footer>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          {{$t("signin_haveAcount")}}
          <NuxtLink to="signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">{{ $t("signin_haveAcount_btn") }}
          </NuxtLink>
        </p>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
  import { createLoginValidationSchemas } from '~/schemas/LoginValidation';
  import { z } from 'zod'
  import type { FormSubmitEvent } from '#ui/types'

  const { t } = useI18n()
  const { signIn } = useAuth()
  const status = ref(false)

  const LoginValidationSchemas = createLoginValidationSchemas(t)

  const state = ref({
    email: undefined,
    password: undefined
  })

  async function handleFormSubmit(event: FormSubmitEvent < z.output < typeof LoginValidationSchemas >> ) {
    const email = event.data.email
    const password = event.data.password
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email, password
      })
      if(result?.error){
        status.value=true
      }
      else if (result?.status==200){
        window.location.reload()
      }
    }catch(error){
      console.error("Authentification error:", error)
      status.value = true
    }
  }
</script>