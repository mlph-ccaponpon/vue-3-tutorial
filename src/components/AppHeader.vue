<template>
  <nav class="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2">
      <router-link class="mx-6 text-2xl" v-for="item in list" :key="item.to" :to="item.to">
        {{ item.title }}
      </router-link>
      <button v-if="!isLoggedIn" class="mx-2 text-2xl" @click="$emit('open-login-modal')">Login</button>
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
        {title: "Slider Carousel", to: "/slider"},
        {title: "Calculator", to: "/calculator"},
      ]
    }
  },
  props: {
    isLoggedIn: {
      typed: Boolean,
      required: true
      // default: true
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      // .then((res) => {
      //   console.log(res);
      //   console.log("LOGOUT");
      // }).catch((e) => {
      //   console.log(e);
      // });
    }
  }
}
</script>

<style>

</style>