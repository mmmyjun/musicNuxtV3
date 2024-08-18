<template>
    <div class="audio-wrap-container flex">
        <audio ref="audioRef" preload="auto" loop :src="audioSrc" @canplay="canplay" @loadeddata="loadeddata"
            @durationchange="durationchange" @error="audioError" @pause="pause" @play="play" @timeupdate="timeupdate"
            @volumechange="volumechange"></audio>

        <div class=" basis-28 text-sm">{{ formatTommss(currentTime) || '--' }} / {{ play_time || '--' }}</div>
        <URange class=" grow-1" v-model="currentTime" @update:modelValue="updateValue" @change="changeValue" color="violet"
            :min="0" :max="duration" />
    </div>
</template>
<script setup lang="ts">
import { ref, shallowRef, reactive, onMounted, computed, watchEffect, inject } from 'vue';


interface Props {
    url?: string,
    play_time: string,
    modelValue: number
}
const props = withDefaults(defineProps<Props>(), {
    url: '',
    play_time: '',
    modelValue: 0
})
const audioRef = shallowRef<HTMLAudioElement | null>(null);
console.log('audio ref', audioRef.value);

const emits = defineEmits({
    'update:modelValue': (val: number) => true,
})
let audioSrc = computed(() => props.url)
// ref('https://www.runoob.com/try/demo_source/horse.mp3');

let currentTime = computed({
    get() {
        return props.modelValue || 0;
    },
    set(newV: number) {
        emits('update:modelValue', newV);
    }
})


function getTotalS(ms: string): number {
    let totalS: string = ms;
    if (totalS.includes(':')) {
        let t1Arr = totalS.split(':');
        totalS = String(parseInt(t1Arr[0]) * 60 + parseInt(t1Arr[1]));
    }
    return Number(totalS);
}
const duration = computed(() => {
    // console.log('getTotalS(props.play_time)', getTotalS(props.play_time))
    return getTotalS(props.play_time);
});

const canplay = (e: Event) => {
    console.log(e, 'canplay~~');
}
const loadeddata = (e: Event) => {
    console.log(e, 'loadeddata~~');
    audioRef.value?.play();
}
const durationchange = (e: Event) => {
    console.log(e, 'durationchange~~');
}
const audioError = (e: Event) => {
    console.log(e, 'audioError~~');
}
const pause = (e: Event) => {
    console.log(e, 'pause~~');
    audioRef.value?.pause();
}
const play = (e: Event) => {
    console.log(e, 'play~~');
    audioRef.value?.play();
}
const timeupdate = (e: Event) => {
    currentTime.value = (e.target as HTMLAudioElement).currentTime;
}
const volumechange = (e: Event) => {
    console.log(e, 'volumechange~~');
}

const updateValue = (e: number) => {
    currentTime.value = e;
    audioRef.value!.currentTime = e;
}

const changeValue = (e: Event) => {
    let newV = (e.target as HTMLInputElement).valueAsNumber;
    console.log('changeValue', newV);
    currentTime.value = newV;
    audioRef.value!.currentTime = newV;
}

const { childPause, childPlay } = inject('parentFunc');
childPause(pause);
childPlay(play);
</script>