export default function (timestamp: string | number) {
    // debugger
    let date = new Date(Number(timestamp) * 1000);  // 参数需要毫秒数，所以这里将秒数乘于 1000

    // 转换为 yyyy-MM-dd hh:mm:ss 格式
    // let Y = date.getFullYear() + '-';
    // let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    // let D = date.getDate() + ' ';
    // let h = date.getHours() + ':';
    let m = date.getMinutes();
    let s = date.getSeconds();


    // 转换为 mm:ss 格式
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}