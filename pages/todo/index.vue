<template>
    <div class="todo-container h-screen bg-purple-200 overflow-auto">
        <div class="todo-inner-wrap bg-purple-300 w-4/5 m-auto">
            <div class="top flex p-3">
                <UInput class=" flex-grow" variant="outline" name="input" placeholder="Search..." v-model="searchText"
                    @keyup.enter="toSearch" />
                <UButton color="violet" variant="solid" @click="toSearch">搜索</UButton>
            </div>
            <div class="center">
                <div class="todo-count">
                    共 {{ todoLists.length }} 条数据
                </div>
                <div class="todo-list flex flex-col	">
                    <div class="todo-item flex border border-solid border-purple-800 h-24"
                        v-for="(item, index) in todoLists" :key="index">
                        <div class="todo-item-left grow flex">
                            <div class="todo-item-inner">
                                <div class="row-lrc ml-[-8px]" v-if="currentIndex === index">{{ currentLrcText }}</div>
                                <div class="row-top grow flex flex-col justify-center">
                                    <div class="todo-item-name" @click="toDetailPage(item.id)">{{ item.name }}</div>
                                </div>
                                <div class="row-bottom audio-container h-6 " v-if="currentIndex === index">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, computed, watchEffect, provide } from 'vue';

// useHeadSafe({
//     meta: [{
//         name: 'referrer',
//         content: 'no-referrer'
//     }]
// })

const detailId = ref('')


const { data: todoLists, status, error, refresh, execute } = await useFetch('/api/todo/list', {
    query: { param: detailId },
    watch: [detailId]
})

console.log('结果', todoLists.value)


const currentIndex = ref<number>(-1);
const searchText = ref<string>('');
console.log('todoLists', todoLists.value, typeof todoLists.value)

const toSearch = async () => {
    let sText = encodeURI(searchText.value)
    detailId.value = sText
    console.log(todoLists.value, '啊啊')
}

const toDetailPage = (id) => {
    console.log('跳转', id);
    navigateTo(`/todo/detail/${id}`);
}
// const parseJSON = (str: string) => {
//     try {
//         return JSON.parse(str)
//     } catch (e) {
//         return str
//     }
// }

let childMethodPause: FuncNoParamNoReturn = () => { };

</script>
<style></style>