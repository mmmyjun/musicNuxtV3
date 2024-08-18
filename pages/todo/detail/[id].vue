<template>
    <div class="detail-container h-screen bg-purple-200 overflow-auto">
       当前id: {{ route.params.id }}
      <hr>
      {{ data?.length ? data[0] : '未获取到数据' }}
    </div>
</template>
<script setup lang="ts">
const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
console.log(route.params, '详情页参数');

const { data, status, error, refresh, execute } = await useFetch('/api/todo/list', {
    query: { param: route.params.id }
})
console.log('详情页数据', data.value)
</script>