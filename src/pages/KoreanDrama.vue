<template>
   <div class="m-auto">
      <h1 class="text-3xl text-center p-4">Korean Drama {{ koreanDramasCount }}</h1>
      <ul>
        <li class="flex justify-between" v-for="(drama, index) in koreanDramas" :key="drama.title">
          <div> {{ drama.title }}</div>
           <button @click="removeKoreanDrama(index)">x</button>
        </li>
      </ul>

      <form class="mt-10" @submit.prevent="addKoreanDrama">
        <input class="border rounded" 
            v-model.trim="newKoreanDrama" 
            placeholder="Type K-Drama Here"
            ref="newKoreanDramaRef"/>
        <button class="border rounded bg-yellow-600 text-white px-4" type="submit">Add K-Drama</button>
      </form>
    </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";

export default {
    setup() {
        let newKoreanDramaRef = ref("");
        let newKoreanDrama = ref("");
        let koreanDramas = ref([
            { title: "Gu Family Book"}, 
            { title: "Hospital Playlist"}, 
            { title: "Melting Me Softly"}
        ]);

        onMounted(() => {
            newKoreanDramaRef.value.focus();
        });

        const koreanDramasCount = computed({
            get: () => koreanDramas.value.length
        });

        function removeKoreanDrama(index) {
            koreanDramas.value = koreanDramas.value.filter((drama, i) => i != index);
        }

        function addKoreanDrama() {
            if(newKoreanDrama.value != "") {
                koreanDramas.value.push({ title: newKoreanDrama.value}); 
                newKoreanDrama.value = "";
            }
        }

        return {koreanDramas, newKoreanDrama, removeKoreanDrama, addKoreanDrama, newKoreanDramaRef, koreanDramasCount};
    }
}
</script>

<style>

</style>