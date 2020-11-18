<template>
  <nav class="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2">
      <router-link class="mx-6 text-2xl" v-for="item in list" :key="item.to" :to="item.to">
        {{ item.title }}
      </router-link>
      <button v-if="!isLoggedIn" class="mx-2 text-2xl" @click="openLogin">Login</button>
      <button v-else class="mx-2 text-2xl" @click="logout">Logout</button>
  </nav>
</template>

<script>
import firebase from "../utilities/firebase"

export default { 
  data() {
    return {
      list: [
        {title: "Korean Drama", to: "/korean-drama"},
        {title: "Calendar", to: "/calendar"},
        {title: "Markdown", to: "/markdown"},
        {title: "Slider", to: "/slider"},
        {title: "Calculator", to: "/calculator"},
        {title: "Modal", to: "/reuseable-modal"},
        {title: "Chat", to: "/chat"},
        {title: "User Crud", to: "/user-crud"},
        {title: "Tensor Flow", to: "/tensor-flow"},
      ]
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut();
    },
    openLogin() {
        this.$store.commit("setLoginModal", true);
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  }
}
</script>

<style>

</style>