<template>
    <div class="w-full flex justify-center items-center">
        <canvas width="800" height="500" ref="canvasRef" class="max-w-full max-h-full rotate-90 md:rotate-0"></canvas>
        <div class="absolute top-0 left-5 flex flex-col gap-3 md:hidden">
            <div class="flex justify-center">
                <div 
                    class="controlButton" 
                    data-keyName="ArrowLeft" 
                    @touchstart="touchPress($event.target.dataset.keyname)"
                    @touchend="touchRelease($event.target.dataset.keyname)"
                >
                </div>
            </div>
            <div class="flex justify-between w-36">
                <div 
                    class="controlButton -rotate-90"
                    data-keyName="ArrowDown" 
                    @touchstart="touchPress($event.target.dataset.keyname)"
                    @touchend="touchRelease($event.target.dataset.keyname)"
                >
                </div>
                <div 
                    class="controlButton rotate-90"
                    data-keyName="ArrowUp" 
                    @touchstart="touchPress($event.target.dataset.keyname)"
                    @touchend="touchRelease($event.target.dataset.keyname)"
                >
                </div>
            </div>
            <div class="flex justify-center rotate-180">
                <div 
                    class="controlButton"
                    data-keyName="ArrowRight" 
                    @touchstart="touchPress($event.target.dataset.keyname)"
                    @touchend="touchRelease($event.target.dataset.keyname)"
                >
                </div>
            </div>
        </div>
        <div 
        class="md:hidden w-16 h-16 rounded-full border-2 border-white flex justify-center items-center select-none overflow-hidden absolute bottom-10 left-5 rotate-90 bg-none"
        data-keyName="r" 
        @touchstart="touchPress($event.target.dataset.keyname)"
        @touchend="touchRelease($event.target.dataset.keyname)"
        >
            R
        </div>
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
    const gameRef = ref(null);

    const touchPress = (key) => {
        if(gameRef.value) {
            const control = gameRef.value.player.inputHandler;
            control.touchPress(key)
        }
        console.log(key)
    }

    const touchRelease = (key) => {
        if(gameRef.value) {
            const control = gameRef.value.player.inputHandler;
            control.touchRelease(key)
        }
        console.log(key)
    }


    onMounted(() => {
        const canvas = canvasRef.value;
        const ctx = canvas.getContext('2d');
        let CANVAS_WIDTH = canvas.width = 800 ;
        let CANVAS_HEIGHT = canvas.height = 500 ;

        async function init() {
            const ASSETS = await loadAssets(ASSETS_JSON,(num, total) => {
                loaded.value = Math.floor(num / total * 100);
            });
            let game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT, ASSETS);
            gameRef.value = game;
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
@tailwind base;
@tailwind utilities;
@tailwind components;

@layer components {
    .controlButton{
        @apply w-12 h-12 rounded-full border-2 border-white flex justify-center items-center select-none overflow-hidden bg-no-repeat bg-center bg-[url('/arrow-up-bold.svg')];
    }
}
</style>