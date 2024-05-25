<template>
  <div class="flex flex-col items-center justify-center mx-auto h-full">
    <UCard class="max-w-md">
      <template #header>
        <h1 class="text-xl font-bold leading-tight tracking-tightmd:text-2px">
          {{$t('signin_welcome')}}
        </h1>
        <LoginGitHubLogin class="mt-3" />
      </template>
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

  const LoginValidationSchemas = createLoginValidationSchemas(t)

  const state = ref({
    email: undefined,
    password: undefined
  })

  function handleFormSubmit(event: FormSubmitEvent < z.output < typeof LoginValidationSchemas >> ) {
    const email = event.data.email
    const password = event.data.password
    signIn('credentials', {
      email,
      password
    })
  }
</script>