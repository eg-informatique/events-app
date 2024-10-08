<script setup>
import ProfileDropDown from './ProfileDropDown.vue';

    const open = ref(false)

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
            <div v-if="open" class="fixed top-0 left-0 z-50 w-full h-screen bg-white dark:bg-customBlack">
                <Icon class="absolute z-50 cursor-pointer right-4 top-5" size="30" name="charm:cross"
                    @click="open = false" />
                <SidebarMenu @closeSidebar="closeSidebar"/>
            </div>
            <div v-if="open" class=" z-50 absolute right-1 bottom-0 w-[80px]">
            </div>
        </div>
        <div class="hidden lg:flex fixed top-0 left-0 w-full h-[80px] flex-row justify-between border-b dark:border-gray-800 z-50 bg-white dark:bg-customBlack ">
            <NuxtLink to ="/" class="flex items-center gap-2 p-4 hover:scale-[102%] transition cursor-pointer">
                <Logo /> 
                <p class="font-bold">Swiss Events</p>
            </NuxtLink>
            <div class="absolute right-1 bottom-0 w-[190px] flex items-center justify-end">
                <ProfileDropDown/>
            </div>
        </div>

    </div>
</template>