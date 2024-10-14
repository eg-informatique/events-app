<template>
    <UDivider  >
        <Logo/>
    </UDivider>
    <div class="footer">
            <NuxtLink to="https://github.com/eg-informatique/events-app">
                <div class="flex flex-col items-center">
                    <p class="text-gray-900 dark:text-gray-100 mb-2">Repo</p>
                    <UIcon name="i-mdi-github" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
                </div>
            </NuxtLink>

            <div class="links mt-2">
                <NuxtLink to="/terms_service">
                    <p class="text-gray-900 dark:text-gray-100">{{ $t('terms_service') }}</p>
                </NuxtLink>
                <NuxtLink to="/about" class="about">
                    <p class="text-gray-900 dark:text-gray-100">{{ $t('about_us_nav') }}</p>
                </NuxtLink>
                <NuxtLink to="/privacy_policy">
                    <p class="text-gray-900 dark:text-gray-100">{{ $t('privacy_policy') }}</p>
                </NuxtLink>
            </div>
            <FooterLangSwitcher/>
            <div class="copyright mt-2 mb-4">
                &copy; 2024 Swiss Events. All rights reserved.
            </div>
    </div>
</template>
    
<style scoped>
.footer {
    display: flex;
    justify-content: center;  
    align-items: center;
    flex-direction: column;
}
.links{

    display: flex; 
    justify-content: center; 
    gap: 20px; 
    padding: 1rem; 
    color: rgb(0, 0, 0); 
}


.footer a:hover {
    text-decoration: underline; 
}

.copyright {
    font-size: 0.9rem;
    color: #bbb; 
    align-items: center;
    }

.about{
    font-size: 1.1rem;
    font-weight: bold; 
}
</style>