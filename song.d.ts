declare interface SongListType {
    id: string;
    name: string;
    artist: string;
    poster: string;
    url: string;
    play_time: string;
    key: string;
    lrcArr: LrcListType[];
    isPlaying?: boolean;
}

declare ResLrcType = {
    lrc: string,
}
declare interface ResPonseType {
    status: number;
    data: ResLrcType;
    msg: string;
}

declare interface LrcListType {
    time: number;
    lrc: string;
}
