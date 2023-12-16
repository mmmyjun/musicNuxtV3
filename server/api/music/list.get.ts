interface ResTypeOfzz {
    id: string
    mname: string // 歌曲名
    sname: string // 歌手名
    // sid: string
    pic: string // 封面
    play_time: string // 总时长
    mp3: string
    // hot_num: number
    // tid: string
    url: string,
}


export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    // https://zz123.com/search/?key=伊能静
    // decodeURI('https://zz123.com/search/?key=%E4%BC%8A%E8%83%BD%E9%9D%99')
    const { key } = query;
    let result = await fetch(`https://zz123.com/search/?key=${encodeURI(key)}`, {
        headers: {
            // 'Referer': 'https://zz123.com/play/mzvkvx.htm',
            // 'Referer': 'https://zz123.com/',
        }
    }).then(e => e.text()).then(e => {
        let matched = e.match(/(?<=var pageSongArr=)\[.*(?=}];)/)[0] + '}]';
        // console.log('获取歌曲列表', JSON.parse(matched));

        let zzRes: ResTypeOfzz[] = (JSON.parse(matched) as ResTypeOfzz[]).map(mm => ({
            ...mm,
            pic: `https://zz123.com${mm.pic}`,
        }))

        // var pageSongArr=[{"id":"zzmaqx","mname":"谢谢你的爱","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/15\/144384.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"03:31","mp3":"https:\/\/mp3app.haoge500.com\/tuijian\/2015\/04-16\/662190.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/zzmaqx.htm"},{"id":"kxsus","mname":"我是猫","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/6\/57776.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"03:24","mp3":"https:\/\/mp3app.haoge500.com\/mp3\/81\/80353.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/kxsus.htm"},{"id":"mzvdqs","mname":"你是我的幸福吗？","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/4\/36821.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"04:14","mp3":"https:\/\/mp3app.haoge500.com\/mp3\/265\/264793.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/mzvdqs.htm"},{"id":"mzvkxk","mname":"你善变的心","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/4\/33240.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"04:23","mp3":"https:\/\/mp3app.haoge500.com\/mp3\/265\/264808.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/mzvkxk.htm"},{"id":"uaszvx","mname":"可爱的宝贝","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/gstx\/1\/703.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"03:28","mp3":"https:\/\/mp3app.haoge500.com\/hot\/2013\/05-30\/513640.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/uaszvx.htm"},{"id":"akumdsz","mname":"魂萦旧梦","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/4\/33237.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"04:11","mp3":"https:\/\/mp3app.haoge500.com\/upload\/128\/2023\/08\/26\/1852736.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/akumdsz.htm"},{"id":"kxsvu","mname":"月亮儿弯弯","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/4\/36821.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"04:38","mp3":"https:\/\/mp3app.haoge500.com\/mp3\/81\/80345.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/kxsvu.htm"},{"id":"kxsvz","mname":"十九岁的最后一天","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/gstx\/1\/703.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"03:17","mp3":"https:\/\/mp3app.haoge500.com\/mp3\/81\/80346.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/kxsvz.htm"},{"id":"kxsux","mname":"萤火虫","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/4\/36821.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"04:34","mp3":"https:\/\/mp3app.haoge500.com\/hot\/2007\/01-04\/80350.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/kxsux.htm"},{"id":"kxsza","mname":"天变地变情不变","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/4\/36821.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"04:00","mp3":"https:\/\/mp3app.haoge500.com\/mp3\/81\/80361.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/kxsza.htm"},{"id":"mzvkxz","mname":"别离歌","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/4\/33240.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"04:39","mp3":"https:\/\/mp3app.haoge500.com\/mp3\/265\/264806.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/mzvkxz.htm"},{"id":"smqa","mname":"如果没有你","sname":"周蕙","sid":"axvz","pic":"\/img\/pic\/zjpic\/5\/46537.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"02:59","mp3":"https:\/\/mp3app.haoge500.com\/mp3\/4\/3291.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/smqa.htm"},{"id":"kxsum","mname":"三月的秘密","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/4\/36821.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"03:35","mp3":"https:\/\/mp3app.haoge500.com\/mp3\/81\/80352.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/kxsum.htm"},{"id":"kxsuv","mname":"生日快乐","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/4\/36821.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"04:48","mp3":"https:\/\/mp3app.haoge500.com\/hot\/2007\/01-04\/80354.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/kxsuv.htm"},{"id":"kxsud","mname":"红颜美人多薄命","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/4\/33240.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"04:05","mp3":"https:\/\/mp3app.haoge500.com\/mp3\/81\/80357.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/kxsud.htm"},{"id":"kxszm","mname":"下大雨","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/4\/36821.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"03:43","mp3":"https:\/\/mp3app.haoge500.com\/mp3\/81\/80362.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/kxszm.htm"},{"id":"kxszs","mname":"你对我的好","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/4\/36821.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"04:45","mp3":"https:\/\/mp3app.haoge500.com\/mp3\/81\/80363.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/kxszs.htm"},{"id":"mzvdqz","mname":"月圆花好","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/4\/33248.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"04:37","mp3":"https:\/\/mp3app.haoge500.com\/mp3\/265\/264796.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/mzvdqz.htm"},{"id":"mzvdqd","mname":"简单喜欢你","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/6\/57779.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"03:21","mp3":"https:\/\/mp3app.haoge500.com\/mp3\/265\/264797.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/mzvdqd.htm"},{"id":"mzvdqk","mname":"我喜欢听你说我爱你","sname":"伊能静","sid":"dxs","pic":"\/img\/pic\/zjpic\/4\/33183.jpg?x-oss-process=image\/resize,m_fill,w_300,h_300,limit_0\/auto-orient,0","play_time":"05:02","mp3":"https:\/\/mp3app.haoge500.com\/mp3\/265\/264798.mp3","hot_num":0,"tid":"akvzu","url":"\/play\/mzvdqk.htm"}];
        let lasts : SongListType[] = zzRes.map((item) => {
            return {
                id: item.id,
                name: item.mname,
                artist: item.sname,
                poster: item.pic,
                url: item.mp3,
                play_time: item.play_time,
                // paly_time_ms: getTotalS(item.play_time),
                key: `z`,
            }
        })


        // 歌曲宝
        // let str = '<html><head></head><body></body></html>';
        // let parser = new DOMParser();
        // let doc = parser.parseFromString(str, "text/html");
        // console.log(doc)
        // console.dir(doc)

        return JSON.stringify(lasts);
    })
    return result;
})

