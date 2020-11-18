<template>
    <div class="m-auto my-4">
    <h1 class="text-center text-3xl">Welcome!</h1>
    </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        onMounted(() => {
            const store = useStore();
            store.commit("setLoginModal", true);
        });
    }
}
</script>

<style>

</style>