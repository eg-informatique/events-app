<script setup>
const { status, signIn, signOut } = useAuth()

const items = ref([
    {
        title: "Home",
        path: "/",
        icon: "majesticons:home"
    },
    {
        title : "About us",
        path: "/about",
        icon: "mdi:about-circle-outline"
    },
])

const loggedIn = computed(() => status.value === 'authenticated')

async function handleSignIn() {
    await signIn()
}

async function handleSignOut() {
    await signOut()
}
</script>
<template>
    <div>
        <header class="flex items-center gap-2 p-4 hover:scale-[102%] transition cursor-pointer">
          <Logo /> 
          <p class="font-bold">Events manager</p>
        </header>
        <div class="px-4 grow">
            <div class="grid gap-2">
                <NuxtLink :to="item.path" v-for='(item, index) in items' :key='index' 
                class="flex items-center gap-3 px-2 py-1 transition rounded cursor-pointer 
                hover:bg-neutral-100 hover:scale-[101%]">
                    <Icon size="20" :name="item.icon" color="black"/>
                    <span> {{ item.title }}</span>
                </NuxtLink>
                <NuxtLink v-if="loggedIn" to="account" class="flex items-center gap-3 px-2 py-1 transition rounded cursor-pointer 
                hover:bg-neutral-100 hover:scale-[101%]">
                        <Icon size="20" name="mdi:account-outline" color="black"/>
                        <span>Acount</span>
                </NuxtLink>
                <div v-if="loggedIn" class="flex items-center gap-3 px-2 py-1 transition rounded cursor-pointer 
                hover:bg-neutral-100 hover:scale-[101%]">
                    <Icon size="20" name="ph:sign-out-bold" color="black"/>
                    <button @click="handleSignOut">Sign Out</button> 
                </div>
                <NuxtLink v-else to="signin" class="flex items-center gap-3 px-2 py-1 transition rounded cursor-pointer 
                hover:bg-neutral-100 hover:scale-[101%]">
                    <Icon size="20" name="ph:sign-in-bold" color="black"/>
                    <span>Sign In</span>    
                </NuxtLink>
            </div>
        </div>
    </div>
</template>