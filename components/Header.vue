<template>
    <div class="container flex justify-between items-center mx-auto text-center p-5">
        <div class="motion">
            <svg ref="logoRef" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#fff"
                viewBox="0 0 1101 400">
                <path d="M6 300.5v-174l85 115 87-115v174" vector-effect="non-scaling-stroke" />
                <path d="M314 113.5c52 0 93 42 93 94 0 51-41 93-93 93-51 0-93-42-93-93 0-52 42-94 93-94"
                    vector-effect="non-scaling-stroke" />
                <path d="M523 300V126.5m-73 0h146" vector-effect="non-scaling-stroke" />
                <path d="M642 300.6v-174" vector-effect="non-scaling-stroke" />
                <path d="M781 113.5c52 0 93 42 93 94 0 51-41 93-93 93-51 0-93-42-93-93 0-52 42-94 93-94"
                    vector-effect="non-scaling-stroke" />
                <path d="M917 300.5v-174l147 174v-174" vector-effect="non-scaling-stroke" />
            </svg>
        </div>
        <div class="menue cursor-pointer" @click=" menueAction" ></div>
    </div>
</template>

<script setup lang="ts">
    import { Ref } from 'vue';
    import gsap from "gsap";
    import {useNavStore} from '../store/navStore'
    const navStore = useNavStore();
    const logoRef:Ref<HTMLOrSVGElement| null> = ref(null);

    const menueAction = () => {
        if(navStore.navState) {
            navStore.hideNav()
        }else {
            navStore.showNav();
        }
    }

    onMounted(() => {
        const logoSVG = logoRef.value;
        const colors = ['#181818', '#5CB8E4', '#F2F2F2'];
        const tl = gsap.timeline({
            id: 'Timeline',
            repeat: -1,
            repeatDelay: 1
        });
        const tween = (node: SVGPathElement) => {
            let path = node as SVGPathElement;
            const delay = Math.random() * 1;
            const length = path.getTotalLength();
            colors.forEach((color, index) => {
                if (index !== 0) {
                    path = path.cloneNode(true) as SVGPathElement;
                    if(logoSVG) {
                        (logoSVG as HTMLElement).appendChild(path);
                    }
                }
                path.setAttribute('stroke', color);
                tl.set(path, {
                    strokeDasharray: length + 0.5,
                    strokeDashoffset: length + 0.6,
                    autoRound: false
                }, 0);
                tl.to(path, {
                    strokeDashoffset: 0,
                    autoRound: false,
                    duration: 30,
                    ease: 'power3.out'
                }, index * 0.25 + delay);
            });
        }
        Array.from((logoSVG as HTMLElement).children).forEach((el:Element) => {
            tween(el as SVGPathElement);
        })
    })
</script>

<style scoped>
    .menue{
        width: 1.6em;
        height: 1.6em;
        border-top: 2px solid #fff;
        position: relative;
    }
    .menue::before{
        content:'';
        position: absolute;
        width: 1.6em;
        height: 2px;
        background-color: #fff;
        top: 30%;
        left: 0;
    }
    .menue::after{
        content:'';
        position: absolute;
        width: 1.6em;
        height: 2px;
        background-color: #fff;
        top: 63%;
        left: 0;
    }
    .motion{
        width: 6rem;
    }
    .motion path {
        stroke-width: 2px;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
    }
</style>