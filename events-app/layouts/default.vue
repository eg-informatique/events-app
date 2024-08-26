<template>
    <div class="grid items-start lg:flex">
        <Sidebar />
        <div class="p-5 w-full h-screen overflow-auto lg:mt-20">
            <slot />
        </div>
    </div>
</template>