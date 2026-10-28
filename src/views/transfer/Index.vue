<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'


const router = useRouter()
const route = useRoute()
console.log(route)
const tabList = reactive([
    {
        text: "menuMultitransfer",
        path: "/transfer/multi",
        selected: route.path == "/transfer/multi"
    },
    {
        text: "transferHistory",
        path: "/transfer/history",
        selected: route.path == "/transfer/history"
    },
])

// 监听,当路由发生变化的时候执行
watch(() => route.path,
    (path) => {
        for (let index in tabList) { 
            tabList[index].selected=false
            if (tabList[index].path==path) { 
                tabList[index].selected=true
            }
        }
    },
    { immediate: true }
)


function selectTabItem(tab) {
    console.log("selectTabItem")

    tabList.map(x => x.selected = (x == tab))
    console.log(tab)
    router.push(tab.path)
}
</script>
<template>
    <div class="create">
        <div class="create-header">
            <ul class="tab">
                <li :class="{ 'tab-item-selected': tab.selected }" v-for="tab in tabList" :key="tab" @click="() => selectTabItem(tab)">
                    {{
                        $t(tab.text) }}</li>
            </ul>
            <!-- <div class="help">
                <svg-icon name="help"></svg-icon>
                <span>查看教程</span>
            </div> -->
        </div>
        <div class="create-body">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.create {
    .create-header {
        display: flex;
        justify-content: space-between;

        .tab {
            display: flex;
            justify-content: space-between;

            font-size: 16px;
            color: #999999;
            font-weight: 500;

            li {
                margin-right: 40px;

                cursor: pointer;
            }

            .tab-item-selected {
                color: #333333;
            }
        }

        .help {
            display: flex;
            justify-content: space-between;
            align-items: center;

            font-size: 12px;
            color: #999999;
            letter-spacing: 0;
            text-align: center;
            line-height: 16px;
            font-weight: 400;

            .svg-icon {
                width: 16px;
                height: 16px;

                margin-right: 6px;
            }
        }
    }

    .create-body {
        margin-top: 24px;
    }
}
</style>