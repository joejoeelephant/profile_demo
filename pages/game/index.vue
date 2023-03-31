<template>
    <div class="w-full flex justify-center items-center">
        <canvas width="800" height="500" ref="canvasRef"></canvas>
        <div class="absolute top-0 left-0 h-screen w-screen bg-black text-white flex flex-col justify-start items-center pt-52" v-if="loaded < 100 ">
            <div class="text-3xl text-rose-700">
                loading
            </div>
            <div class="text-5xl mt-5">
                {{loaded}}%
            </div>
            <div class="w-60 h-1 bg-slate-50 mt-10">
                <div class="w-1 h-1 bg-rose-700" :style="{width: loaded +'%'}"></div>
            </div>
            <div class="mt-10">
                控制键：上,下,左,右,r
                <br>
                手机端暂时不能运行
            </div>
        </div>
    </div>
</template>

<script setup>
    import ASSETS_JSON from './assets.config.js'
    import { loadAssets } from "./util.js";
    import Game from './Game.class.js';
    definePageMeta({
        layout: "work",
    });
    const canvasRef = ref(null);
    const loaded = ref(0);
    onMounted(() => {
        const canvas = canvasRef.value;
        const ctx = canvas.getContext('2d');
        const CANVAS_WIDTH = canvas.width = 800;
        const CANVAS_HEIGHT = canvas.height = 500;

        async function init() {
            const ASSETS = await loadAssets(ASSETS_JSON,(num, total) => {
                loaded.value = Math.floor(num / total * 100);
            });
            let game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT, ASSETS);
            let lastTime = 0;
            function animate(timestamp) {
                let deltaTime = timestamp - lastTime;
                game.update(deltaTime);
                game.draw(ctx);
                lastTime = timestamp;
                if(!game.gameOver) requestAnimationFrame(animate);
            }
            animate(0);
        }
        init();
    })
</script>

<style scoped>

</style>