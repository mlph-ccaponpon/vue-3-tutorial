<template>
   <section class="flex w-full">
      <div class="m-auto">
          <div class="mt-10">
                <h1 class="text-3xl my-4 text-center">Tensorflow Object Detection</h1>
                <div class="flex flex-wrap justify-center my-2">
                    <div class="w-full flex justify-center mb-2">
                        <button v-if="!isStreaming"
                            @click="openCamera"
                            class="w-35 p-2 border rounded bg-orange-600 text-white">
                            Open Camera
                        </button>
                        <div v-else>
                            <button v-if="isStreaming"
                                @click="snapshot"
                                class="w-35 p-2 border rounded bg-orange-600 text-white">
                                Snapshot
                            </button>
                            <button 
                                @click="stopStreaming"
                                class="w-35 p-2 border rounded bg-red-600 text-white">
                                Stop Streaming
                            </button>
                        </div>
                    </div>
                    <video v-show="isStreaming" ref="videoRef" autoplay="true" width="400" />
                </div>
                <div class="flex flex-wrap justify-center mt-5">
                    <img ref="imgRef"
                        alt="image" 
                        src="https://images.unsplash.com/photo-1521939094609-93aba1af40d7"
                        width="400" 
                        crossorigin="anonymous"/>

                        <div class="w-full text-center my-4">
                            <button @click="detect" 
                                    class="w-32 p-2 border rounded bg-yellow-600 text-white">
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
        const videoRef = ref("");
        const result = ref("");
        const isLoading = ref(false);
        const isStreaming = ref(false);

        async function detect() {
            const img = imgRef.value;
            isLoading.value = true; 

            const model = await cocoSsd.load();
            const predictions = await model.detect(img);
            result.value = predictions;
            isLoading.value = false; 
        }

        async function openCamera() {
            if(navigator.mediaDevices.getUserMedia) {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const cams =devices.filter((device) => device.kind === "videoinput");
                const camId = cams[0].deviceId;

                navigator.mediaDevices.getUserMedia({video: {deviceId: {exact: camId}}})
                    .then((stream) =>{
                        isStreaming.value = true;
                        videoRef.value.srcObject = stream;
                    });
            }
        }

        function stopStreaming() {
            const stream = videoRef.value.srcObject;
            const tracks = stream.getTracks();
            tracks.map((track) => track.stop());
            isStreaming.value = false;
        }

        function snapshot() {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            ctx.drawImage(videoRef.value, 0, 0, 200, 200);
            const data = canvas.toDataURL("image/png");
            imgRef.value.setAttribute("src", data);
        }

        return { imgRef, videoRef, result, detect, isLoading, openCamera, isStreaming, stopStreaming, snapshot };
    }
}
</script>

<style>

</style>