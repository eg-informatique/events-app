<template>
    <section>
      <div class="flex flex-col items-center justify-center  p-y-7 mx-auto h-full lg:py-0">
        <Logo class="mb-6" />
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-100 dark:border-gray-50">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2px">
              Welcome back
            </h1>
  
            <LoginGitHubLogin />
  
            <div class="flex items-center">
              <div class="bg-gray-900 h-[.125rem] w-full"></div>
              <p class="mx-8 text-medium text-gray-800">or</p>
              <div class="bg-gray-800 h-[.125rem] w-full"></div>
            </div>
  
            <SignupForm />
          </div>
        </div>
      </div>
    </section>
  </template>