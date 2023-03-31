<template>
    <div class="z-10 top-0 left-0 flex-1 h-screen overflow-y-auto pb-20">
        <div class="relative">
            <div class="h-60 overflow-y-hidden md:hidden">
                <img src="banner2.png" alt="">
            </div>
            <div class="hidden md:block overflow-y-hidden h-[60vh] bg-[url('/banner.png')] bg-no-repeat bg-cover">
            </div>
            <div class="absolute top-10 md:top-1/3 left-5 text-3xl md:text-6xl font-bold text-white">
                Dedicated and<br/>
                detail-oriented <br/>
                front-end<br/> 
                web developer
            </div>
        </div>
        <div class="p-5 mt-5 border-t-2 border-slate-400 text-slate-200 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div class="">
                <h3 class="pb-5">
                    介绍：
                </h3>
                <p>
                    {{profileInfo1}}
                </p>
            </div>
            <div v-for="(item, index) in profileInfo2" :key="index">
                <h3 class="pb-5">
                    {{item.name}}
                </h3>
                <p v-for="(el, index) in item.content" :key="index">
                    {{el}}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const profileInfo1= `作为一名前端开发人员，我希望应用我的技能和知识，创建动态和用户友好的Web应用程序。我热衷于学习新技术和框架,提高个人技能，并为团队的成功做出贡献。`;
    const profileInfo2= [
        {
            name: "技术技能",
            content: [
                "-HTML5、CSS3和JavaScript（ES6+）",
                "-前端框架：React.js、Angular和Vue.js",
                "-使用Flexbox和CSS Grid进行响应式网页设计"
            ]
        },
        {
            name: "技术技能",
            content: [
                "-RESTful API和AJAX的经验",
                "-版本控制：Git和GitHub",
                "-熟悉Node.js、Express.js和npm"
            ]
        }
    ]

</script>

<style scoped>
.big-img-Box{
    height: 60vh;
}
</style>
  