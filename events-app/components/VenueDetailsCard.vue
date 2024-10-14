<template>
    <UCard class="block lg:hidden z-50 mt-2">
        <template #header>
            <p class="text-xl font-bold mt-3">{{ venue.name }}</p>
        </template>

        <div class="flex items-center">
                <UIcon name="i-mdi-map-marker" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
                <p class="font-bold text-gray-600 dark:text-gray-400 ml-2">{{ venue.address }}</p>
            </div>
            
            <div class="flex items-center">
                <UIcon name="i-mdi-phone" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
                <p class="font-bold text-gray-600 dark:text-gray-400 ml-2">{{ venue.phone }}</p>
            </div>
            
            <div class="flex items-center">
                <UIcon name="i-mdi-email" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
                <a :href="'mailto:' + encodeURIComponent(venue.email)" class="text-primary hover:underline ml-2">{{ venue.email }}</a>
            </div>
            
            <div v-if="venue.url != ''" class="flex items-center">
                <NuxtLink :to="venue.url" class="flex items-center">
                    <UIcon name="i-mdi-web" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
                    <p class="text-primary hover:underline ml-2">{{ truncatedUrl }}</p>
                </NuxtLink>
            </div>

        <iframe
            class="rounded w-full max-w-[500px] h-[300px] max-h-[350px] mt-2"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            :src=uri>
        </iframe>
    </UCard>

    <UCard class="hidden lg:block z-50 mt-2">
        <template #header>
            <p class="text-2xl font-bold mt-3">{{ venue.name }}</p>
        </template>
       <div class="lg:flex lg:space-x-4">
    
            <!-- Colonne de gauche : Informations centrées -->
            <div class="flex flex-col justify-center items-center lg:w-1/2 space-y-4 p-4">
            <div class="flex items-center">
                <UIcon name="i-mdi-map-marker" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
                <p class="font-bold text-gray-600 dark:text-gray-400 ml-2">{{ venue.address }}</p>
            </div>
            
            <div class="flex items-center">
                <UIcon name="i-mdi-phone" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
                <p class="font-bold text-gray-600 dark:text-gray-400 ml-2">{{ venue.phone }}</p>
            </div>
            
            <div class="flex items-center">
                <UIcon name="i-mdi-email" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
                <a :href="'mailto:' + encodeURIComponent(venue.email)" class="text-primary hover:underline ml-2">{{ venue.email }}</a>
            </div>
            
            <div v-if="venue.url != ''" class="flex items-center">
                <NuxtLink :to="venue.url" class="flex items-center">
                    <UIcon name="i-mdi-web" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
                    <p class="text-primary hover:underline ml-2">{{ venue.url }}</p>
                </NuxtLink>
            </div>
            </div>

            <!-- Colonne de droite : Carte (iframe) -->
            <div class="lg:w-1/2 flex justify-center items-center">
                <iframe
                    class="w-[600px] h-[450px] rounded"
                    loading="lazy"
                    allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade"
                    :src="uri">
                </iframe>
            </div>
        </div> 
    </UCard>
   

</template>

<script setup>
const { venue } = defineProps(['venue'])
const config = useRuntimeConfig()
const apiKey = config.public.googleMapApiKey


const uri = `https://www.google.com/maps/embed/v1/place?key=${apiKey}
                &q=${venue.address}, ${venue.zipcode} ${venue.city}, ${venue.country}`

const truncatedUrl = computed(() => {
    const url = venue.url;
    if (url.length <= 30) {
        return url;
    }
    const start = url.slice(0, Math.floor(30 / 2));
    const end = url.slice(-Math.floor(30 / 2));
    return `${start}...${end}`;
});
</script>

<style lang="scss" scoped>

</style>