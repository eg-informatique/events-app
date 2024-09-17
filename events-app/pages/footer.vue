<template>
<div class="mb-4"></div>
    <UDivider  >
        <NuxtLink to="https:/github.com">
            <div icon="i-mdi-github">ajoute icon ici</div>
        </NuxtLink>
    </UDivider>
    <div class="footer">
        <div class="links">
        <NuxtLink to="/terms_service">
            Terms of Service
        </NuxtLink>
        <NuxtLink to="/about" class="about">
            About Us
        </NuxtLink>
        <NuxtLink to="/privacy_policy">
            Privacy Policy
        </NuxtLink>
    </div>
    <div class="copyright">
        &copy; 2024 Your Company. All rights reserved.
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




 