<template>
  <UDropdown v-if="logedIn" :popper="{ placement: 'bottom-start' } ":ui="{ item: { disabled: 'cursor-text select-text' } }":items="items" class="w-10 h-10 mb-5 mr-2">
    <UAvatar icon="i-mdi-account" class="w-10 h-10"/>

    <template #account="{ item }">
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span>{{ item.label }}</span>

      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>
  </UDropdown>
  <UButton v-else 
    @click="handleSignIn"
    :label="$t('signin_nav_btn')"
    icon="i-mdi-sign-in"
    class="ml-2 mb-5"
  />
</template>

<script setup lang="ts">
import { icons } from '@iconify-json/majesticons/index.js';


const { t } = useI18n()
const { status, signIn, signOut, data } = useAuth()
const locaPath = useLocalePath()
const logedIn = computed(() => status.value === 'authenticated')

async function handleSignIn() {
    await signIn()
}
async function handleSignOut() {
    await signOut()
}


const items = [
  [{
    label:t('reservations_nav'),
    to:`${locaPath('/reservations')}`,
    icon:'i-mdi-music'
  },
  {
    label:t('myevents_venues_nav'),
    to:`${locaPath('/myevents')}`,
    icon:'i-mdi-plus'
  },
  ],
  [
    {
      label:t('signout_nav_btn'),
      icon:'i-mdi-sign-out',
      click: async () => {
        await signOut()
      }
    }
  ],
  
]
</script>