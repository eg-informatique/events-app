<script setup>
const { status, signIn, signOut } = useAuth()
const locaPath = useLocalePath()

const itemsSignedIn = ref([
    {
        label: "Home",
        to: `${locaPath('/')}`,
        icon: "i-majesticons-home"
    },
    {
        label : "About us",
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
        label: "Home",
        to: `${locaPath('/')}`,
        icon: "i-majesticons-home"
    },
    {
        label : "About us",
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
            label="Sign Out"
            icon="i-mdi-sign-out"
        />
    </div>
    <div v-else>
        <UVerticalNavigation :links="itemsSignedOut" @click="closeSidebar" class="top-0"></UVerticalNavigation>
        <UButton @click="handleSignIn"
            label="Sign In"
            icon="i-mdi-sign-in"
        />
    </div>
</template>