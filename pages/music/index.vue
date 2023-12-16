
<template>
    <div class="music-container h-screen bg-purple-200 overflow-auto">
        <div class="music-inner-wrap bg-purple-300 w-4/5 m-auto">
            <div class="top flex p-3">
                <UInput class=" flex-grow" variant="outline" name="input" placeholder="Search..." v-model="searchText"
                    @keyup.enter="toSearch" />
                <UButton color="violet" variant="solid" @click="toSearch">搜索</UButton>
            </div>
            <div class="center">
                <div class="song-count">
                    共 {{ songLists.length }} 首歌
                </div>
                <div class="song-list flex flex-col	">
                    <div class="song-item flex border border-solid border-purple-800 h-24"
                        v-for="(item, index) in songLists" :key="index">
                        <div class="song-item-left grow flex">
                            <div class="song-item-poster w-24 h-24 basis-24 grow-0 flex justify-center items-center"><img
                                    class="song-poster-img w-20 h-20" :src="item.poster" :title="item.name" /></div>
                            <div class="row-center grow flex flex-col p-1">
                                <div class="row-lrc ml-[-8px]" v-if="currentIndex === index">{{currentLrcText}}</div>
                                <div class="row-top grow flex flex-col justify-center">
                                    <div class="song-item-name">{{ item.name }}<span class="song-item-singer text-purple-700 text-xs ml-1">{{ item.artist }}</span></div>
                                </div>
                                <div class="row-bottom audio-container h-6 " v-if="currentIndex === index" >
                                    <MusicAudioPlay class="bTest"
                                        v-model="curTime" @update:model-value="timeChange" 
                                        v-bind="{ url: item.url, play_time: item.play_time }" :url="item.url">
                                    </MusicAudioPlay>
                                </div>
                            </div>
                        </div>
                        <div class="song-item-right basis-16 grow-0 flex justify-center items-center">
                            <div class="song-item-play" v-if="currentIndex === index" >
                                <UIcon class=" w-12 h-12" name="i-heroicons-pause-circle" v-if="item.isPlaying" @click="pauseCurrent(item, index)" />
                                <UIcon class=" w-12 h-12" name="i-heroicons-play-circle" v-else @click="playCurrent(item, index)"  />
                            </div>
                            <div class="song-item-play" v-else @click="currentIndex = index, playCurrent(item, index)">
                                <UIcon class=" w-12 h-12" name="i-heroicons-play-circle" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
// const result = await useFetch('https://www.github.com/')
// const result = await useFetch('https://zz123.com/search/?key=%E4%BC%8A%E8%83%BD%E9%9D%99')
import { ref, reactive, onMounted, computed, watchEffect, provide } from 'vue';

useHeadSafe({
    meta: [{
        name: 'referrer',
        content: 'no-referrer'
    }]
})


const currentIndex = ref<number>(-1);
const searchText = ref<string>('');
let curTime = ref<number>(0)
// const songLists = ref([] as SongListType[]);
const songLists = ref([
    // {
    //     id: '1',
    //     name: '歌曲',
    //     artist: '歌手',
    //     poster: '封面',
    //     url: 'https://www.runoob.com/try/demo_source/horse.mp3',
    // },
    // {
    //     id: '2',
    //     name: '萤火虫',
    //     artist: '伊能静',
    //     poster: 'cc',
    //     url: 'https://mp3app.haoge500.com/hot/2007/01-04/80350.mp3',
    // }
] as SongListType[]);
const toSearch = async () => {
    let sText = encodeURI(searchText.value)
    // let result = await $fetch(`https://zz123.com/search/?key=${sText}`)
    let sResult: string = await $fetch(`/api/music/list?key=${sText}`);
    let sArr = parseJSON(sResult);
    songLists.value = Array.isArray(sArr) ? sArr : [];
}
const parseJSON = (str: string) => {
    try {
        return JSON.parse(str)
    } catch (e) {
        return str
    }
}

let childMethodPause: FuncNoParamNoReturn = () => { };
const childPause: (e: FuncNoParamNoReturn) => void = (e: FuncNoParamNoReturn) => {
    console.log('childPause~~~', e);
    childMethodPause = e;
}
const pauseCurrent = (item: SongListType, index: number) => {
    console.log('pauseCurrent~~~');
    childMethodPause();
    songLists.value = songLists.value.map((e, i) => ({
        ...e,
        isPlaying: i != index
    }))
}

let childMethodPlay: FuncNoParamNoReturn = () => { };
const childPlay: (e: FuncNoParamNoReturn) => void = (e: FuncNoParamNoReturn) => {
    console.log('childPlay~~~', e);
    childMethodPlay = e;
}

const currentLrcText = ref('')
const timeChange = (e:number) => {
    if (!songLists.value[currentIndex.value].lrcArr.length) {
        currentLrcText.value = '【暂无歌词】';
        return;
    }
    let idx = songLists.value[currentIndex.value].lrcArr?.findIndex(f => f.time > e);
    if (idx > -1) {
        currentLrcText.value = '【' + String(songLists.value[currentIndex.value].lrcArr[idx > 0 ? idx -1 : 0].lrc) + '】';
    }
    console.log('timeChange~~', e);
}
const playCurrent = async (item: SongListType, index: number) => {
    console.log('playCurrent~~~');
    childMethodPlay();

    songLists.value = songLists.value.map((e, i) => ({
        ...e,
        isPlaying: i == index
    }))

    let lResult: ResPonseType = await $fetch(`/api/music/lrc`, {
        method: 'POST',
        body: JSON.stringify({
            id: item.id,
            act: 'songinfo',
            key: item.key,
            lang: ''
        })
    });
    const { status, msg, data } = lResult;
    // console.log(data.lrc.filter((e: string) => e.match(/\[\d{2}:\d.+\]/) && !e.includes('zz123')))

    let firstArr = data.lrc.split('\n').filter((e: string) => e.trim()).map((e: string) => e.replaceAll('\r', ''));
    let secondArr = firstArr.filter((e: string) => {
        let k = e.match(/\[\d{2}:\d.+\]/);
        return k && e != k[0] && !e.includes('zz123')
    })
    let lastArr = secondArr.reduce((prev: LrcListType[], cur: string): LrcListType[] => {
        let hhmmssArr = cur.match(new RegExp('(?<=\\[).+?(?=\\])', 'g')) || [];
        let lrcLists: LrcListType[] = hhmmssArr.map(hs => {
            let timeSplitted: Array<string> = hs.split(':');
            let mmTossNum: number = Number(timeSplitted[0]) * 60 + Number(timeSplitted[1]);
            return {
                time: Number((mmTossNum).toFixed(2)),
                lrc: cur.replace(/\[\d{2}:\d.+\]/, '')
            }
        })
        return [...prev, ...lrcLists];
    }, []);
    let sortedArr = lastArr.sort((a: LrcListType, b: LrcListType): number => a.time - b.time);
    console.log(sortedArr, '排序后');

    songLists.value = songLists.value.map((e, i) => ({
        ...e,
        lrcArr: i == index ? sortedArr : (e.lrcArr || [])
    }))

    // "[00:00.00]zz123音乐 网址 zz123.com
    // [ti:萤火虫]
    // [ar:伊能静]
    // [al:游戏]
    // [02:14.69][00:25.78]萤火虫萤火虫慢慢飞
    // [02:20.29][00:31.65]夏夜里夏夜里风轻吹
    // [02:26.09][00:37.39]怕黑的孩子安心睡吧
    // [02:31.94][00:43.24]让萤火虫给你一点光
    // [03:04.31][02:37.62][00:49.02]燃烧小小的身影在夜晚
    // [03:09.92][02:43.45][00:54.67]为夜路的旅人照亮方向
    // [03:15.59][02:49.18][01:00.49]短暂的生命努力的发光
    // [03:21.61][02:54.99][01:06.34]让黑暗的世界充满希望
    // [03:30.83][01:15.68]萤火虫萤火虫慢慢飞
    // [03:36.66][01:21.27]我的心我的心还在追
    // [03:42.55][01:27.07]城市的灯光明灭闪耀
    // [03:48.41][01:32.98]还有谁会记得你燃烧光亮

}


provide("parentFunc", {
    childPause,
    childPlay
})
</script>
<style>
</style>