<template>
  <form class="space-y-4 md:space-y-6" @submit.prevent="_$event => signIn('credentials', { email, password })">
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
      <input v-model="email" type="email" name="email" id="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        placeholder="name@company.com" required />
    </div>
    <div>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
      <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input id="remember" aria-describedby="remember" type="checkbox"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " />
        </div>
        <div class="ml-3 text-sm">
          <label for="remember" class="text-gray-500">Remember me</label>
        </div>
      </div>
      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
        password?</a>
    </div>
    <button type="submit"
      class="w-full text-black bg-grey-800 hover:bg-grey-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
      Sign in
    </button>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Do not have an account yet?
      <NuxtLink to="signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NuxtLink>
    </p>
  </form>
</template>

<script setup>
  const { signIn } = useAuth()

  const email = ref('')
  const password = ref('')
</script>