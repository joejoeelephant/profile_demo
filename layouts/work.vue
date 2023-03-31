<template>
    <div class="h-screen flex flex-col justify-between bg-zinc-800 text-white" @wheel="handleMouseScroll">
        <Header></Header>
        <div class="flex flex-1 flex-col relative main-container overflow-hidden">
            <NavList/>
            <div class="w-full mx-auto flex flex-col flex-1 absolute z-10 left-0 backdrop-blur-md overflow-hidden page-container bg-zinc-800" :class="navClass">
                <div class="w-full flex flex-1 mx-auto">
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
    const router = useRouter();

    const navStore = useNavStore();
    const { navState, navNames } = storeToRefs(navStore);
    const navClass = computed(() => {
        return navState.value ? 'showNav' : ''
    })

    watch(
        () => router.currentRoute.value,
        (to, from) => {
            // Perform your actions here before the route changes
            navStore.hideNav();
            const navName = (to.name == "index" ? "home" : to.name );
            const pageIndex = navNames.value.findIndex(el => el.toLowerCase() == navName?.toString().toLowerCase());
            if(pageIndex !== -1) {
                navStore.setPageIndex(pageIndex);
                
            }
        },
        { immediate: false }
    );

    const handleMouseScroll = (event:WheelEvent) => {
        if (event.deltaY > 0) {
            navStore.increaseIndex();
        } else {
            navStore.decreseIndex();
        }
    }
    
</script>

<style scoped>
.main-container{
    transform-style: preserve-3d;
    perspective: 1500px;
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