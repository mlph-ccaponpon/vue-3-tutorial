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
export default {
    data() {
        return {
        koreanDramas: [
            { title: "Gu Family Book"}, 
            { title: "Hospital Playlist"}, 
            { title: "Melting Me Softly"}
            ],

        newKoreanDrama: ""
        }
    },
    computed: {
        koreanDramasCount() {
        return this.koreanDramas.length ;
        }
    },
    methods: {
        addKoreanDrama() {
        if(this.newKoreanDrama != "") {
            this.koreanDramas.push({ title: this.newKoreanDrama}); 
            this.newKoreanDrama = "";
        }
        },

        removeKoreanDrama(index) {
        this.koreanDramas = this.koreanDramas.filter((drama, i) => i != index);
        }
    },
    mounted() {
        this.$refs.newKoreanDramaRef.focus();
    }
}
</script>

<style>

</style>