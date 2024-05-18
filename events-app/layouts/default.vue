<template>
    <div class="grid items-start lg:flex">
        <Sidebar />
        <div class="container p-5 w-full h-screen overflow-auto lg:ml-[190px]">
            <slot />
        </div>
    </div>
</template>