<template>
   <section class="flex w-full">
      <div class="m-auto">
          <div class="mt-10">
              <h1 class="text-3xl my-4">Tensorflow Object Detection</h1>
              <div class="flex flex-wrap justify-center">
                <img ref="imgRef"
                    alt="image" 
                    src="https://images.unsplash.com/photo-1521939094609-93aba1af40d7"
                    width="200" 
                    crossorigin="anonymous"/>

                    <div class="w-full text-center my-4">
                        <button @click="detect" 
                                class="w-32 p-3 border rounded bg-yellow-700 text-white">
                            <span v-if="isLoading">Loading...</span>
                            <span v-else>Detect Object</span>
                        </button>

                        <div v-if="result.length > 0" class="w-full text-center my-4">
                        <p>{{ result[0].class }}</p>
                    </div>
                </div>
              </div>
          </div>
      </div>
   </section>
</template>

<script>
import { ref } from 'vue';
require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const cocoSsd = require('@tensorflow-models/coco-ssd');

export default {
    setup() {
        const imgRef = ref("");
        const result = ref("");
        const isLoading = ref(false);

        async function detect() {
            const img = imgRef.value;
            isLoading.value = true; 

            const model = await cocoSsd.load();
            const predictions = await model.detect(img);
            result.value = predictions;
            isLoading.value = false; 
            
        }

        return { imgRef, result, detect, isLoading };
    }
}
</script>

<style>

</style>