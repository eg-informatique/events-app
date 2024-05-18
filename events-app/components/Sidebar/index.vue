<script setup>
    const open = ref(false)

    // Méthode pour fermer la sidebar
    const closeSidebar = () => {
        open.value = false
    }
</script>

<template>
    <div>
        <div class="z-50 flex items-center justify-between w-full h-full p-4 lg:hidden">
            <NuxtLink to="/"><Logo /></NuxtLink>
            <Icon class="z-50 cursor-pointer left-2 top-10" size="30" name="iconamoon:menu-burger-horizontal-fill"
                @click="open = true" />
            <div v-if="open" class="fixed top-0 left-0 z-50 w-full h-screen bg-white">
                <Icon class="absolute z-50 cursor-pointer right-4 top-5" size="30" name="charm:cross"
                    @click="open = false" />
                <SidebarMenu @closeSidebar="closeSidebar"/>
            </div>
        </div>
            <div class="hidden lg:flex fixed top-0 left-0 w-[190px] h-screen flex-col justify-between border-r bg-white z-50">
                <SidebarMenu />
                <div class="absolute left-0 bottom-0 w-[80px]">
                    User Item
                </div>
            </div>
    </div>
</template>