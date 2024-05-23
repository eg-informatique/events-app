<script setup>
const { t } = useI18n()
const { status, signIn, signOut } = useAuth()
const locaPath = useLocalePath()

const itemsSignedIn = ref([
    {
        label: t('home_nav'),
        to: `${locaPath('/')}`,
        icon: "i-majesticons-home"
    },
    {
        label : t('about_us_nav'),
        to: `${locaPath('/about')}`,
        icon: "i-mdi-about-circle-outline"
    },
    {
        label:'Acount',
        to:`${locaPath('/account')}`,
        icon:'i-mdi-account'
    }
])

const itemsSignedOut = ref([
    {
        label: t('home_nav'),
        to: `${locaPath('/')}`,
        icon: "i-majesticons-home"
    },
    {
        label : t('about_us_nav'),
        to: `${locaPath('/about')}`,
        icon: "i-mdi-about-circle-outline"
    },
])

const loggedIn = computed(() => status.value === 'authenticated')

async function handleSignIn() {
    await signIn()
}

async function handleSignOut() {
    await signOut()
}

const emits = defineEmits('closeSidebar')

const closeSidebar = () => {
    emits('closeSidebar')
}
</script>
<template>
    <header class="flex items-center gap-2 p-4 hover:scale-[102%] transition cursor-pointer">
        <Logo /> 
        <p class="font-bold">Events manager</p>
    </header>
    <div v-if="loggedIn">
        <UVerticalNavigation :links="itemsSignedIn" @click="closeSidebar"/>
        <UButton @click="handleSignOut"
            :label="$t('signout_nav_btn')"
            icon="i-mdi-sign-out"
        />
    </div>
    <div v-else>
        <UVerticalNavigation :links="itemsSignedOut" @click="closeSidebar" class="top-0"></UVerticalNavigation>
        <UButton @click="handleSignIn"
            :label="$t('signin_nav_btn')"
            icon="i-mdi-sign-in"
        />
    </div>
</template>