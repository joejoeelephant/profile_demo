<template>
    <div class="flex flex-1 flex-col justify-center gap-10 items-center">
        <div class="text-3xl font-bold">My Works</div>
        <div class="flex relative w-full h-60 justify-center mt-20">
            <div class="w-48 scene">
                <div class="relative h-80 plate" ref="container">
                    <div v-for="(item, index) in workItems" :key="index" class="absolute" :style="itemStyles[index]" ref="elements">
                        <nuxt-link :to="{path: '/'+item.description.toLowerCase()}">
                            <div class="rounded-full overflow-hidden w-48 h-48">
                                <img :src="item.imgSrc" alt="item">
                            </div>
                            <div class="text-center mt-5">
                                <p>{{item.description}}</p>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
            <div class="absolute top-10 left-2 bg-slate-900 rounded-full w-12 h-12 prev" @click="prev">
                
            </div>
            <div class="absolute top-10 right-2 bg-slate-900 rounded-full w-12 h-12 next" @click="next">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Ref } from 'vue';
    import gsap from 'gsap';
    type WorkItem = {
        imgSrc: string,
        description: string
    }
    
    const rotate = (pos:{x:number, z: number}, rad: number) => {
      const c = Math.cos(rad),
            s = Math.sin(rad);
      const {x, z} = pos;
  
      pos.x = x * c + z * -s;
      pos.z = x * s + z * c;
  
      return pos;
    }

    const workItems:Ref<WorkItem[]> = ref([
        {
            imgSrc: "/work2.PNG",
            description: "Earth"
        },
        {
            imgSrc: "/work1.PNG",
            description: "Game"
        },
        {
            imgSrc: "/work3.PNG",
            description: "Music"
        }
    ])
    const currentIndex = ref(0);
    const container:Ref<HTMLDivElement | null> = ref(null);
    const elements:Ref<HTMLDivElement[]> = ref([]);

    const itemStyles = workItems.value.map((el, index) => {
        const {x, z} = rotate({x: 0, z: 400},index * 2 * Math.PI / workItems.value.length);
        return {
            transform: `translateX(${x}px) translateZ(${z}px)`
        }
    })
    
    
    const next = () => {
        currentIndex.value++;
        animate()
    }
    const prev = () => {
        currentIndex.value--;
        animate()
    }
    const animate = () => {
        if(container.value) {
            gsap.to(container.value, {
                rotateY: -(currentIndex.value ) * 360 / workItems.value.length,
                duration: 2,
                ease: "back.inOut(1.7)"
            })
        }
        if(elements.value) {
            elements.value.forEach(el => {
                gsap.to(el, {
                    duration: 2,
                    rotationY: (currentIndex.value ) * 360 / workItems.value.length
                });
            })
        }
    }
</script>

<style scoped>
.scene{
    perspective: 1600px;
}
.plate{
    transform-style: preserve-3d;
    top: 50%;
    transform: translateY(-50%);
}
.prev,.next{
    cursor: pointer;
}
.prev::before{
    content:"";
    position: absolute;
    width: 1em;
    height: 2px;
    background-color: #fff;
    top: 35%;
    left: 50%;
    transform: translateX(-50%) rotateZ(-45deg);
}
.prev::after{
    content:"";
    position: absolute;
    width: 1em;
    height: 2px;
    background-color: #fff;
    top: 55%;
    left: 50%;
    transform: translateX(-50%) rotateZ(45deg);
}
.next::before{
    content:"";
    position: absolute;
    width: 1em;
    height: 2px;
    background-color: #fff;
    top: 35%;
    left: 50%;
    transform: translateX(-50%) rotateZ(45deg);
}
.next::after{
    content:"";
    position: absolute;
    width: 1em;
    height: 2px;
    background-color: #fff;
    top: 55%;
    left: 50%;
    transform: translateX(-50%) rotateZ(-45deg);
}
</style>