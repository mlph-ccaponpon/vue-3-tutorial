<template>
  <section class="flex w-full">
      <div class="m-auto">
          <h1 class="text-3xl text-center my-4">Calculator</h1>
          <p class="text-2xl w-40 h-8 text-right mb-2 overflow-x-scroll"
                style="direction:rtl">{{ currentNum }}</p>
          <div class="h-8">
            <small v-if="selectedOperation">{{ prevNum }} {{ selectedOperation }} {{ currentNum }}</small>
          </div>
        
          <div class="grid grid-cols-4 gap-1">
              <button @click="pressed('1')" class="p-2 w-10 h-10 border rounded">1</button>
              <button @click="pressed('2')" class="p-2 w-10 h-10 border rounded">2</button>
              <button @click="pressed('3')" class="p-2 w-10 h-10 border rounded">3</button>
              <button @click="pressed('+')" class="p-2 w-10 h-10 border rounded">+</button>
              <button @click="pressed('4')" class="p-2 w-10 h-10 border rounded">4</button>
              <button @click="pressed('5')" class="p-2 w-10 h-10 border rounded">5</button>
              <button @click="pressed('6')" class="p-2 w-10 h-10 border rounded">6</button>
              <button @click="pressed('-')" class="p-2 w-10 h-10 border rounded">-</button>
              <button @click="pressed('7')" class="p-2 w-10 h-10 border rounded">7</button>
              <button @click="pressed('8')" class="p-2 w-10 h-10 border rounded">8</button>
              <button @click="pressed('9')" class="p-2 w-10 h-10 border rounded">9</button>
              <button @click="pressed('*')" class="p-2 w-10 h-10 border rounded">*</button>
              <button @click="pressed('c')" class="p-2 w-10 h-10 border rounded">C</button>
              <button @click="pressed('0')" class="p-2 h-10 border rounded">0</button>
              <button @click="pressed('=')" class="p-2 w-10 h-10 border rounded">=</button>
              <button @click="pressed('/')" class="p-2 w-10 h-10 border rounded">/</button>
          </div>
      </div>
  </section>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';

export default {
    setup() {
        const operations = ["+", "-", "*", "/"];
        const numbers = ["1","2","3","4","5","6","7","8","9","0"];
        const currentNum = ref("");
        const prevNum = ref("");
        const selectedOperation = ref("");

        function pressed(value) {
            if(value === "=" || value === "Enter") calculate();
            else if(value === "c") clear();
            else if(operations.includes(value)) applyOperation(value);
            else if(numbers.includes(value)) appendNumber(value);
        }

        function calculate() {
            if(selectedOperation.value === "*") multiply();
            else if(selectedOperation.value === "/") divide();
            else if(selectedOperation.value === "-") subtract();
            else if(selectedOperation.value === "+") sum();

            prevNum.value = "";
            selectedOperation.value = "";
        }

        function multiply() {
            currentNum.value = prevNum.value * currentNum.value;
        }
        function divide() {
            currentNum.value = prevNum.value / currentNum.value;
        }
        function subtract() {
            currentNum.value = prevNum.value - currentNum.value;
        }
        function sum() {
            currentNum.value = +prevNum.value + +currentNum.value;
        }

        function clear() {
            currentNum.value = "";
        }

        function applyOperation(value) {
            calculate();
            prevNum.value = currentNum.value;
            currentNum.value = "";
            selectedOperation.value = value;

        }

        function appendNumber(value) {
            currentNum.value += value;
        }

        const handleKeydown = (e) => pressed(e.key); // for one line function

        onMounted(() => {
            window.addEventListener("keydown", handleKeydown);
        });

        onUnmounted(() => {
            window.removeEventListener("keydown",handleKeydown);
        });

        return {currentNum, prevNum, selectedOperation, pressed};
    }
}
</script>

<style>

</style>