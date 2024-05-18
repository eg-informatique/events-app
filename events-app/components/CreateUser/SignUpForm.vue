<template>
  <form class="space-y-4 md:space-y-6" @submit.prevent="addUser">
    <div>
      <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">First Name</label>
      <input v-model="user.first_name" type="text" name="first_name" id="first_name"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        placeholder="First Name" required />
    </div>
    <div>
      <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
      <input v-model="user.last_name" type="text" name="last_name" id="last_name"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        placeholder="Last Name" required />
    </div>
    <div>
      <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
      <input v-model="user.username" type="text" name="username" id="username"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        placeholder="Username" required />
    </div>
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
      <input v-model="user.email" type="email" name="email" id="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        placeholder="name@company.com" required />
    </div>
    <div>
      <label for="mobile" class="block mb-2 text-sm font-medium text-gray-900">Mobile</label>
      <input v-model="user.mobile" type="tel" name="mobile" id="mobile"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        placeholder="Mobile Number" required />
    </div>
    <div>
      <label for="birth_date" class="block mb-2 text-sm font-medium text-gray-900">Birth Date</label>
      <input v-model="user.birth_date" type="date" name="birth_date" id="birth_date"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        required />
    </div>
    <div>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
      <input v-model="user.password" type="password" name="password" id="password" placeholder="••••••••"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required />
    </div>
    <button type="submit"
      class="w-full text-white bg-green-800 hover:bg-grey-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
      Sign up
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({
    birth_date: '',
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    mobile: '',
    password: ''
})

const addUser = async () => {
    try {
        const response = await fetch('https://events-api.org/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user.value)
        })
        
        const data = await response.json()
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to create account')
        }
        
        console.log('User created successfully:', data)
    } catch (error) {
        console.error('Error:', error)
    }
}
</script>