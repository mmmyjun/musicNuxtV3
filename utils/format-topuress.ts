export default function (str: string | number) {
    // 把mm:ss转化成纯s数
    let arr = String(str).split(':');
    return arr.length === 2 ? Number(arr[0]) * 60 + Number(arr[1]) : 0;
}