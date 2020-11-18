<template>
    <div v-if="isLoginOpen">
        <section @click="close"
            class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50">
        </section>
        <div class="absolute inset-0">
            <div class="flex h-full">
                <div class="z-30 m-auto bg-white p-2 rounded shadow w-1/3">
                    <div class="p-2 border">
                        <h1 class="text-3xl text-center">Login</h1>
                        
                        <GoogleLogin @close-from-google="close"/>

                        <p class="my-3 text-center">Or</p>
                        
                        <form class="p-2 my-2" @submit.prevent="submit">
                            <div class="my-4">
                                <label>Email/Username</label>
                           <input v-model="email" ref="emailRef" class=" rounded shadow p-2 w-full" placeholder="Enter your email/username"/>
                            </div>
                            <div class="my-4">
                                <label>Password</label>
                                <input v-model="password" class=" rounded shadow p-2 w-full" type="password" placeholder="Enter your password"/>
                            </div>
                            <div class="my-4">
                                <button type="submit" class="w-full rounded shadow-md text-white bg-yellow-600 p-2">
                                    <span v-if="!isLoading">Login</span>
                                    <span v-if="isLoading">⌛</span>
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "../utilities/firebase"
import GoogleLogin from "./login/GoogleLogin"

export default {
    components: {
        GoogleLogin
    },
    data() {
        return {
            email: "",
            password: "",
            isLoading: false
        }
    },
    methods: {
        submit() {
            this.isLoading = true;
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).
                then(res => {
                    this.email = "";
                    this.password = "";
                    this.isLoading = false;
                    this.close();

                    console.log(res);
                }).catch( e => {
                    console.log(e)
                    this.isLoading = false;
                });
        },
        close() {
           this.$store.commit("setLoginModal", false);
        }
    },
    computed: {
        isLoginOpen() {
            return this.$store.state.isLoginOpen;
        }
    },
    mounted() {
        // this.$refs.emailRef.focus();
    }
}
</script>

<style>

</style>