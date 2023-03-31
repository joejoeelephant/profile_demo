<template>
    <div>
        <div class="w-full h-screen overflow-hidden flex flex-col justify-between items-center  pt-16">
            <div class="w-10/12 p-2 shadow-md shadow-slate-500 rounded-md text-center">
                <p class="text-7xl mt-7">
                    {{error.statusCode}}
                </p>
                <p class="text-6xl mt-7">
                    Ooops.
                </p>
                <p class="mt-7 mb-7">
                    {{error.message}}
                </p>
                <nuxt-link to="/" class="bg-indigo-500 text-white block w-60 mx-auto p-3 rounded-sm">back home</nuxt-link>
            </div>
            <canvas ref="canvasRef"></canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {Ref} from 'vue'
    defineProps(['error']);

    const canvasRef:Ref<HTMLCanvasElement | null> = ref(null);
    const animationRef:Ref<number| null> = ref(null);
    onMounted(() => {
        if(canvasRef.value) {
            const canvas = canvasRef.value;
            const ctx = canvas.getContext('2d');
            const width = window.innerWidth;
            const height = Math.floor(window.innerHeight * 0.1);
            const { devicePixelRatio: ratio = 1 } = window;
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            console.log(width , window.devicePixelRatio)
            let time = 0;
            const blockWidth = 1;
            const yOffset = canvas.height / 2;
            const layers = [
                { amplitude: 20, frequency: 0.02 / 12, color: ['#002147', '#00296B'] },
                { amplitude: 30, frequency: 0.03 / 12, color: ['#0B4F8C', '#1669AC'] },
                { amplitude: 50, frequency: 0.04 / 12, color: ['#1E90FF', '#87CEFA'] }
            ];
            const drawWave = () => {
                if(ctx) {
                    // Clear the canvas
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Draw each layer
                    layers.forEach((layer, index) => {
                        const { amplitude, frequency, color } = layer;
                        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                        gradient.addColorStop(0, color[0]);
                        gradient.addColorStop(1, color[1]);
                        ctx.fillStyle = gradient;
                        for (let i = 0; i < canvas.width / blockWidth; i++) {
                            const x = i * blockWidth;
                            const y = Math.sin(Math.cos(time) + (index + 1) * frequency * i) * amplitude + yOffset + index * 20;
                            const height = canvas.height - y;
                            ctx.fillRect(x, y, blockWidth, height);
                        }
                    });

                    // Update time for the next frame of the animation
                    time += 0.02;

                    // Request the next frame of the animation
                    animationRef.value =  requestAnimationFrame(drawWave);
                }
            }

            drawWave()
        }
    })

    onBeforeUnmount(() => {
        if(animationRef.value) {
            cancelAnimationFrame(animationRef.value);
        }
    })
</script>

<style scoped>

</style>