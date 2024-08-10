<script setup>

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#"><RouterLink to="/first-week">Week 1</RouterLink></a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"><RouterLink to="/second-week">Week 2</RouterLink></a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Week 3</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container mt-4">
   <router-view></router-view>
  </div>
</template>

<style>

</style>
