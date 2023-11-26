<template>
  <aside class="sidebar">
    <div class="profile">
      <img src="https://github.com/clodoaldodantas.png" alt="" />
      <span>Clodoaldo Dantas</span>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  padding: 1rem;
  background-color: var(--sidebar);
  box-shadow: rgba(255, 255, 255, 0.05) -1px 0px 0px 0px inset;
}

.profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;

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
