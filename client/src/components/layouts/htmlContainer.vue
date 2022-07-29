
<template>
  <div id="htmlContainer">
    <slot />
  </div>
</template>


<style lang="scss">
  button {
    background-color: var(--color-btn);
    color: var(--color-btn-text);
    border: none;
    padding: 5px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 8px;
  }
</style>

<style scoped lang="scss">
  #htmlContainer {
    margin-top: 60px;
  }
</style>
