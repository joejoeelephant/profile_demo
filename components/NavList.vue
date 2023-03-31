<template>
    <div class="text-white absolute left-1/2 z-20 top-1/3 nav-list-container" :class="navListClass">
        <ul>
            <li v-for="(item, index) in navNames" :key="index" :class="getClassObject(item)" ref="listItems">
                <nuxt-link :to="{path: item.toLowerCase() == 'home' ? '/' : ('/'+item.toLowerCase())}">
                    {{item.toLocaleUpperCase()}}
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { watch } from 'vue'
    import {useNavStore} from '../store/navStore'
    import { storeToRefs } from 'pinia'
    import { useRoute } from 'vue-router';
    import gsap from 'gsap';
    const navStore = useNavStore();
    const route = useRoute();
    const { pageIndex, navState, navNames } = storeToRefs(navStore);

    const listItems = ref([])

    onMounted(() => {
       const showItems = () => {
            listItems.value.forEach((element, index) => {
                gsap.fromTo(
                    element,
                    {
                        x: '-120%',
                    },
                    {
                        x: 0,
                        duration: 1,
                        delay: index * 0.2,
                        ease: 'back.out(1.5)',
                    }
                )
            })
        }
        const hideItems = () => {
            listItems.value.forEach((element, index) => {
                gsap.fromTo(
                    element,
                    {
                        x: 0,
                    },
                    {
                        x: '-120%',
                        duration: 1,
                        delay: index * 0.2,
                        ease: 'back.out(1.5)',
                    }
                )
            })
        }

        watch(navState, (newValue, oldValue) => {
            if (newValue) {
                showItems()
            }else {
                hideItems()
            }
        })
    })
    

    const getClassObject = (pathName: string) => {
        const path = '/' + (pathName.toLowerCase() !== "home" ? pathName.toLowerCase() : '');
        return {
            'font-bold': true,
            'text-4xl': true,
            'p-3': true,
            'text-center': true,
            'navActive': path === route.path,
        }
    }

    const navListClass = computed(() => {
        return navState.value ? 'showNavList' : 'hideNavList'
    })
</script>

<style scoped>
.nav-list-container{
    transition: 0.5s;
}
.showNavList{
    transform: translateX(0) scale(1);
}
.hideNavList{
    transform: translateX(2000px) scale(0.1);
}
.navActive{
    position: relative;
}
.navActive::before{
    content:"";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 0.3em;
    background-color: #0f33ff;
}
</style>