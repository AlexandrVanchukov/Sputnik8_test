<template>
    <header class="header">
        <div class="header__logo">
            <a href="#" class="logo">
                <img
                        src="/public/logo-sputnik.svg"
                        alt="Sputnik logo"
                        width="150"
                        height="24"
                />
            </a>
        </div>
    </header>
</template>

<style lang="scss" scoped>

.header {
  position: relative;

  display: flex;
  align-items: center;
  padding-top: 20px;

  &__logo {
    margin: auto;
  }
}
</style>