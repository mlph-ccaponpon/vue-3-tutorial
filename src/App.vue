<template>
  <AppHeader @openLoginModal="isLoginOpen = true" />
  <div class="w-full flex">
    <router-view></router-view>
  </div>
  <teleport to="body">
    <LoginModal v-if="isLoginOpen" @closeLoginModal="isLoginOpen = false"/>
  </teleport>
</template>

<script>
import AppHeader from "./components/AppHeader";
import LoginModal from "./components/LoginModal";
import firebase from "./utilities/firebase";

export default {
  components: {
    AppHeader,
    LoginModal
  },
  data() {
      return {
          isLoginOpen: false
      }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit("setIsLoggedIn", true);
        this.$store.commit("setAuthUser", user);

        // this.isLoggedIn = true;
        // this.authUser = user;        
      } else {
        this.$store.commit("setIsLoggedIn", false);
        this.$store.commit("setAuthUser", {});
        // this.isLoggedIn = false;
        // this.authUser = "";
      }
    });
  }
}
</script>

<style>

</style>