<template>
  <section class="flex flex-wrap w-full">
      <div class="m-auto">
          <h1 class="my-5 text-2xl">Re-useable Modal</h1>
          <!-- Shortcut for v-slot: - # -->
          <Modal v-if="isModal1Open" @close="isModal1Open = false">
            <template #title>
              Modal 1
            </template>
            <template #body>
              <p>Hello 1!</p>
              <p>Hi 1!</p>
            </template>
          </Modal>
          <!-- Shouldn't put any element including comment for the default content of slot to reflect -->
          <Modal v-if="isModal2Open" @close="isModal2Open = false">
            <template v-slot:title>
              Modal 2
            </template>
            <template v-slot:body>
              <p>Hello 2!</p>
              <p>Hi 2!</p>
            </template>
            </Modal> 
          <button @click="isModal1Open = true" class="rounded border p-4">Modal 1</button>
          <button @click="isModal2Open = true" class="rounded border p-4">Modal 2</button>
      </div>
  </section>
</template>

<script>
import { ref } from 'vue';
import Modal from '../components/Modal.vue';

export default {
  components: { Modal },
  setup() {
    const isModal1Open = ref(false);
    const isModal2Open = ref(false);

    return { isModal1Open, isModal2Open };
  }
}
</script>

<style>

</style>