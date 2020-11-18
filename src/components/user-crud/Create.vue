<template>
    <button class="p-2 rounded border mb-2" @click="isModalOpen = true">Add User</button>
    <teleport to="body">
      <Modal v-if="isModalOpen" @close="isModalOpen = false">
          <template #title>
              Add New User
          </template>
          <template #body>
              <form @submit.prevent="submit">
                  <div class="p-2">
                      <label>Name</label>
                      <input v-model="state.form.name" class="w-full p-2 rounded border" placeholder="User Name" type="text" />
                  </div>
                  <div class="p-2">
                      <label>Email</label>
                      <input v-model="state.form.email" class="w-full p-2 rounded border" placeholder="User Email" type="email" />
                  </div>
                  <div class="p-2">
                      <label>Avatar</label>
                      <input v-model="state.form.avatar" class="w-full p-2 rounded border" placeholder="Avatar Url" type="text" />
                  </div>
                  <div class="p-2">
                      <input class="w-full p-2 rounded border hover:bg-gray-300" placeholder="Avatar Url" type="submit" value="Create" />
                  </div>
              </form>
          </template>
      </Modal>
  </teleport>
</template>

<script>
import { reactive, ref } from 'vue'
import Modal from '../Modal.vue'
import axios from '../../plugins/axios'

export default {
  components: { Modal },
    setup(_, { emit }) {
        const isModalOpen = ref(false);

        const state = reactive({
            users: [],
            form: {
                name: "",
                email: "",
                avatar: ""
            }
        });


        async function submit() {
            const { data } = await axios.post("/users", state.form);
            emit('new-user-added', data);
            state.form.name = "";
            state.form.email = "";
            state.form.avatar = "";
            isModalOpen.value = false;
        }

        return { isModalOpen, state, axios, submit };
    }
}
</script>

<style>

</style>