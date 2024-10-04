import axios from '@/utils'

// 获取分类菜单
export const homeCategoryHead = () => {
    return axios.get('/home/category/head')
}
//banner图获取
export const getBanner = (params) => {
    return axios.get('/home/banner',params)
}

//获取人气推荐
export const getHot = () => {
    return axios.get('/home/hot')
}

//获取新鲜好物
export const getNews = () => {
    return axios.get('/home/new')
}

//热门品牌
export const getProduct = () => {
    return axios.get('/home/goods')
}

//获取分类列表
export const getCategory = (params) => {
    return axios.get('/category',{params})
}

//二级分类列表
export const getSubCategory = (params) => {
    return axios.get('/category/sub/filter',{params})
}

//二级分类列表 - 筛选数据
export const getFilterCategory= (data) => {
    return axios.post('/category/goods/temporary',{data})
}
/**
 * @description: 获取二级分类商品列表
 * @data {
    categoryId: 1005000 ,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
}
* @return {*}
*/

//获取详情页面
export const getDetail= (params) => {
    return axios.get('/goods',{params})
}

//获取热榜商品
/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */
export const getHotGoods = ({ id, type, limit = 3 }) => {
    return axios.get('/goods/hot',{params:{
        id,
        type,
        limit
    }});
}


//登录
export const getLogin = (data) => {
    return axios.post('/login',data)
}
// 示例
// {
//   "account": "xiaotuxian001",
//   "password": "123456"
// }

//加入购物车
export const addMemberCart = (data) => {
    return axios.post('/member/cart',data)
}

//获取购物车列表
export const getMemberCart = () => {
    return axios.get('/member/cart')
}

//删除购物车商品
export const deleteMemberCart = (id) => {
    console.log(id,'删除商品传入的参数 ');

    return axios.delete('/member/cart',{data:{id}})
}



