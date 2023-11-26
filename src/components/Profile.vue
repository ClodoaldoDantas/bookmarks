<template>
  <div class="profile">
    <img src="https://github.com/clodoaldodantas.png" alt="" />
    <span>Clodoaldo Dantas</span>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding: 1rem;

  img {
    height: 2rem;
    width: 2rem;
    object-fit: cover;
    border-radius: 50%;
  }

  span {
    font-size: 0.875rem;
  }
}
</style>
