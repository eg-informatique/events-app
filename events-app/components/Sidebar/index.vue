<script setup>
import ProfileDropDown from './ProfileDropDown.vue';

    const open = ref(false)

    const closeSidebar = () => {
        open.value = false
    }
</script>

<template>
    <div>
        
        <div class="flex fixed top-0 left-0 w-full h-[80px] flex-row justify-between border-b dark:border-gray-800 z-50 bg-white dark:bg-customBlack ">
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