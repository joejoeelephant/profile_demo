<template>
    <div class="h-screen flex flex-col justify-between bg-zinc-800 text-white" @wheel="handleMouseScroll">
        <Header></Header>
        <div class="flex flex-1 flex-col relative main-container overflow-hidden">
            <NoiseSphere/>
            <NavList/>
            <div ref="containerRef" class="w-full mx-auto flex flex-col flex-1 absolute z-10 left-0 backdrop-blur-md overflow-hidden page-container bg-zinc-800" :class="navClass">
                <div class="container flex flex-1 mx-auto">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {useNavStore} from '../store/navStore'
    import { storeToRefs } from 'pinia'
    import { useRouter } from 'vue-router';
    import { watch } from 'vue';
    import gsap from 'gsap';
    const router = useRouter();
    
    const navStore = useNavStore();
    const { navState, navNames, pageIndex } = storeToRefs(navStore);
    const navClass = computed(() => {
        return navState.value ? 'showNav' : ''
    })
    const containerRef = ref(null);
    watch(
        () => router.currentRoute.value,
        (to, from) => {
            // Perform your actions here before the route changes
            navStore.hideNav();
            const navName = (to.name == "index" ? "home" : to.name );
            const pageIndex = navNames.value.findIndex(el => el.toLowerCase() == navName?.toString().toLowerCase());
            if(pageIndex !== -1) {
                navStore.setPageIndex(pageIndex);
                if(containerRef.value) {
                    gsap.fromTo(containerRef.value,
                    {
                        filter: "brightness(0)"
                    },
                    {
                        filter: "brightness(1)",
                        duration: 1

                    })
                }
            }
        },
        { immediate: false }
    );

    const handleMouseScroll = (event:WheelEvent) => {
        if(navState.value) {
            return;
        }
        if (event.deltaY > 0) {
            navStore.increaseIndex();
        } else {
            navStore.decreseIndex();
        }
        const pathName = navNames.value[pageIndex.value];
        const path = pathName == 'home' ? '/' : '/' + pathName;
        router.push(path);
    }
    
</script>

<style scoped>
.main-container{
    transform-style: preserve-3d;
    perspective: 1500px;
    filter: hue-rotate();
}
.page-container{
    min-height: 90vh;
    transition: 0.5s;
}
.showNav{
    transform-origin: left;
    transform: translateZ(-1800px) translateX(-50%) rotateY(45deg);
    outline: 30px solid #0f33ff;
}
</style>