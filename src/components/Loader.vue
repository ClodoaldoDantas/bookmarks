<template>
  <div class="loader" role="status">
    <span class="sr-only">Carregando...</span>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  width: 48px;
  height: 24px;
  display: inline-block;
  position: relative;
  color: #fff;
  border: 1px solid;
  animation: fillX 2s linear infinite;

  &::after {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    background: #fff;
    width: 5px;
    height: 12px;
  }
}

@keyframes fillX {
  0% {
    box-shadow: 0 0 inset;
  }
  100% {
    box-shadow: 48px 0 inset;
  }
}
</style>
