<template>
    <div>
        <Login/>
    </div>
</template>

<script setup>

const { status, signIn, signOut } = useAuth()

const loggedIn = computed(() => status.value === 'authenticated')

async function handleSignIn() {
    await signIn()
}

async function handleSignOut() {
    await signOut()
}
definePageMeta({ auth: {
    unauthenticatedOnly: true,
    navugateAuthenticatedTo: '/'
} })
</script>

<style lang="scss" scoped>

</style>