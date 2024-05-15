<template>
    <form class="space-y-4 md:space-y-6" @submit.prevent="_$event => signUp">
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">First Name</label>
            <input v-model="firstName" type="text" name="first_name" id="first_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="John" required />
        </div>
        <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
            <input v-model="lastName" type="text" name="last_name" id="last_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Doe" required />
        </div>
        <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
            <input v-model="username" type="text" name="username" id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="johndoe123" required />
        </div>
        <div>
            <label for="birth_date" class="block mb-2 text-sm font-medium text-gray-900">Birth Date</label>
            <input v-model="birthDate" type="date" name="birth_date" id="birth_date"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required />
        </div>
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input v-model="email" type="email" name="email" id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="name@company.com" required />
        </div>
        <div>
            <label for="mobile" class="block mb-2 text-sm font-medium text-gray-900">Mobile</label>
            <input v-model="mobile" type="tel" name="mobile" id="mobile"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="1234567890" required />
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
        </div>
        <button type="submit"
            class="w-full text-black bg-grey-800 hover:bg-grey-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Sign up
        </button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?
            <NuxtLink to="signin" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in
            </NuxtLink>
        </p>
    </form>
</template>

<script setup>
    import {
        ref
    } from 'vue';

    const firstName = ref('')
    const lastName = ref('')
    const username = ref('')
    const birthDate = ref('')
    const email = ref('')
    const mobile = ref('')
    const password = ref('')

    const signUp = async () => {
        const userData = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            birth_date: birthDate,
            email: email,
            mobile: mobile,
            password: password
        }

        try {
            const response = await fetch('/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            if (!response.ok) {
                const errorMessage = await response.json()
                console.error(errorMessage)
                // Handle error message display or redirect
            } else {
                // Redirect to success page or handle successful signup
            }
        } catch (error) {
            console.error(error)
            // Handle error
        }
    }
</script>