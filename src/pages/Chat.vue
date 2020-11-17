<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="text-center text-3xl p-4">Real Time Chat</h1>
      <div class="border rounded-lg">
        <div class="h-64 p-2">
          <div v-for="(chat, index) in state.chats" :key="index" 
              :class="chat.userId === userId ? 'text-right':'text-left'">
              {{ chat.message }}
          </div>
        </div>

        <div class="h-8 p-2">
          <input class="w-full p-1 border rounded shadow" 
                v-model="state.message"
                placeholder="Start Typing..." 
                @keydown.enter="addMessage"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, onMounted, reactive } from 'vue';
import { chatsRef } from '../utilities/firebase';
import { useStore } from 'vuex';

export default {
  setup() {
    // You can use reactive or ref
    const state = reactive({
      chats: [],
      message: ""
    });

    // const chats = ref({});

    const store = useStore();
    const userId = computed(() => store.state.authUser.uid);

    onMounted(async() => {

      chatsRef.on('child_added', (snapshot)=>{
        state.chats.push({key:snapshot.key, ...snapshot.val()});
      });
    });

    function addMessage() {
      const newChat = chatsRef.push();
      newChat.set({ userId, message: state.message});
      state.message = "";
    }

    return { state, addMessage, userId };
  }
}
</script>

<style>

</style>