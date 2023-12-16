export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log(body, 'lalala post~~')
    const { key, ...rest } = body;

    let baseUrl;
    if (key == 'z') {
        baseUrl = 'https://zz123.com/';
    }
    console.log('post lrc url', `${baseUrl}ajax/`, rest)
    console.log(JSON.stringify(rest))

    let searchParams = new URLSearchParams({
        id: rest.id,
        act: 'songinfo',
      });
    let result = await fetch(`${baseUrl}ajax/`, {
        method: 'POST',
        // body: JSON.stringify(rest),
        body: String(searchParams),
        headers: {
            // "Content-Type": "application/json",
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            // 'Referer': 'https://zz123.com/play/mzvkvx.htm'
          },
    }).then(e => e.text());
    console.log('后端拿到的歌词数据', result)
    // if (key == 'z') {
    //     https://zz123.com/ajax/
    // }
    return JSON.parse(result);
})