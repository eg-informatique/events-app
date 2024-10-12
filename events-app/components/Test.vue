<template>
    <p>
        {{ test }}



    </p>
    <p>
        {{ test2 }}
    </p>



</template>
<script setup>
const {test, test2} = defineProps(["test", "test2"])

console.log(test.id)
</script>