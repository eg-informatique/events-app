<script setup>
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
    }
])
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
                hover:bg-neutral-100 hover:scale-[101%]" @click="open=false">
                    <Icon size="20" :name="item.icon" color="black"/>
                    <span> {{ item.title }}</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>