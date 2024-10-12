<template>
    <p>
        {{ test }}



    </p>




</template>
<script setup>
const {test} = defineProps(["test"])
console.log(test.id)
</script>