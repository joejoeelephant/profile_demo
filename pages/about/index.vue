<template>
    <div class="flex-1 h-screen overflow-y-auto pb-20 text-slate-300">
        <div class="h-60 overflow-hidden md:hidden bg-[url('/about_banner.PNG')] bg-no-repeat bg-cover"></div>
        <div class="h-[50vh] hidden overflow-hidden md:block bg-[url('/about_banner2.PNG')] bg-no-repeat bg-cover"></div>
        <div class="p-2 mt-5 md:mt-10 border-t-2 border-slate-300">
            <p v-for="(item, index) in content" :key="index" class="p-1">
                {{item}}
            </p>
        </div>
    </div>
</template>

<script setup>
    const content = ref([]);
    content.value = [
        "我是一名前端开发人员，热衷于创建外观美丽并且功能完善的网站。",

        "我进入网页开发领域的旅程始于我对实现设计图到实际代码实现这一过程的喜爱。我一直被技术用于创建复杂问题的创新解决方案所吸引，网页开发是一种创造力和逻辑的结合过程。",

        "我在 HTML、CSS、JavaScript 和各种前端框架，如 React 和 Vue.js 方面磨练了自己的技能。我也熟悉响应式设计、网页无障碍性和用户体验（UX）设计。",

        "我的目标始终是创建不仅外观出色而且功能完美，并为每个访问者提供积极用户体验的网站。",

        "作为前端开发人员，我认为沟通和协作是关键。我与客户紧密合作，确保他们对网站的愿景得到完全实现，并且我总是乐意提供帮助。",

        "无论您是一位想要建立在线存在的小型企业所有者，还是一家需要全面网络应用程序的大公司，我都有信心能够帮助您实现您的目标。",

        " 当我不编码时，我一直在寻找新的方式来挑战自己，拓宽自己的视野，无论是个人上还是职业上。",

        " 感谢您花时间了解我和我作为前端开发人员的工作。如果您有任何问题或想讨论潜在项目，请随时与我联系。我期待着您的来信！"
    ]
</script>

<style scoped>

</style>