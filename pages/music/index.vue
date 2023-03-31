<template>
    <div class="relative">
        <canvas ref="canvasRef" class="absolute top-0 left-0"></canvas>
        <div class="absolute top-0 left-0 h-screen w-screen bg-black text-white flex flex-col justify-start items-center pt-52" v-if="!played ">
            <div class="text-3xl text-rose-700" v-if="!loaded">
                loading
            </div>
            <div class="text-3xl w-24 h-24 rounded-full border-2 flex justify-center items-center border-rose-700 text-rose-700 cursor-pointer" v-if="loaded" @click="play">
                play
            </div>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        layout: "work",
    });

    const canvasRef = ref(null);
    const audioRef = ref(null);
    const loaded = ref(false);
    const played = ref(false);

    const play = () => {
        if(audioRef.value) {
            played.value = true;
        }
    }
    
    onMounted(() => {
        const canvas = canvasRef.value;
        const ctx = canvas.getContext('2d');
        const canvas_width = canvas.width = window.innerWidth;
        const canvas_height = canvas.height = window.innerHeight - 10;

        const audioInit = () => {
            const audio = new Audio('/audio/Ben_E_King_Stand_By_Me.mp3');
            audio.addEventListener('canplay', (event) => {
                loaded.value = true;
                audioRef.value = audio;
            });
            const audioContext = new AudioContext();
            const audioSource = audioContext.createMediaElementSource(audio);
            const analyser = audioContext.createAnalyser();
            audioSource.connect(analyser);
            analyser.connect(audioContext.destination);
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            return {
                audio,
                audioContext,
                analyser,
                bufferLength,
                dataArray
            }
        
        }
        const {audio,audioContext,analyser,bufferLength,dataArray} = audioInit();

        watch(played, (newValue) => {
            if(newValue) {
                audioContext.resume().then(() => {
                    audio.play();
                    animate();
                })
            }else {
                audio.pause();
                audio.currentTime = 0;
            }

        })
        
        function animate() {
            ctx.clearRect(0,0,canvas_width, canvas_height);
            analyser.getByteFrequencyData(dataArray);
            drawCircle()
            requestAnimationFrame(animate);
        }

        function drawCircle() {
            let barHeight;
            for(let i = 0; i < bufferLength; ++i) {
                barHeight = dataArray[i] * 1.25;
                ctx.save();
                ctx.translate(canvas_width/2, canvas_height/2);
                ctx.rotate(i * bufferLength * 4); 
                ctx.fillStyle = "hsl(" + 250 + i * 2 + ',100%,50%)';
                
                ctx.beginPath();
                ctx.arc(0, barHeight, barHeight / 10, 0, Math.PI * 2);
                ctx.arc(0, barHeight / 1.25, barHeight / 20, 0, Math.PI * 2);
                ctx.arc(0, barHeight / 1.5, barHeight / 30, 0, Math.PI * 2);
                ctx.arc(0, barHeight / 1.75, barHeight / 40, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }
    })

    onBeforeUnmount(() => {
        if(audioRef.value) {
            played.value = false;
            audioRef.value.pause();
            audioRef.value.currentTime = 0;
        }
    })
</script>
<style scoped>

</style>