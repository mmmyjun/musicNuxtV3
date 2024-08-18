export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    let allData = [
        {
            id: '1',
            name: '待办事项111',
        },
        {
            id: '2',
            name: '待办事项222',
        },
        {
            id: '3',
            name: '待办事项3333333333333',
        }
    ];
    const { param } = query;
   
    let result = allData;
    if (param) {
        result = result.filter(e => e.id == param);
    }
    console.log('后台query', query);
    console.log('后台param', query.param);
    console.log('后台result', result);

    return result || [];
})

