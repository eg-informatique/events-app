<template>
    <div class="grid grid-cols-1 md:grid-cols-5 md:grid-rows-5 gap-4">
      <div class="col-span-1 md:col-span-2 md:row-span-5 w-full">
        <DashboardCreateEvent :email="email"></DashboardCreateEvent>
      </div>
      <div class="col-span-1 md:col-span-2 md:row-span-5 md:col-start-4 w-full">
        <DashboardCreateVenue></DashboardCreateVenue>
      </div>
    </div>
  </template>
  
  <script setup>
  const email = 'example@example.com'
  </script>
  