<template>
    <!-- 热榜容器 -->
    <div class="goods-hot">
        <!-- 热榜标题 -->
        <h3><i :class="`iconfont ${iconClass[props.id]}`" /> {{ tittle[props.id] }}</h3>
        <!-- 商品区块{{ 链接 }} -->
        <el-skeleton
            animated 
            :loading="loadingSkeleton">
          <template #template>
            <li v-for="item in 3" class="goods_skeleton" >
                <el-skeleton-item 
                    variant="image" 
                    style="height: 160px;width: 160px;border-radius: 10px;" />
                <el-skeleton-item 
                    variant="text" style="width: 160px;margin-top: 8px;"/>
                <el-skeleton-item 
                    variant="text" style="width: 160px;margin-top: 2px;"/>
                <el-skeleton-item 
                    variant="text" style="width: 160px;margin-top: 2px;"/>
                
                
            </li>
          </template>
          <template #default>
            <RouterLink 
                :to="{ name: 'detail', params: { id: item.id }}" 
                class="goods-item" 
                v-for="item in detailHotLis" 
                :key="item.id">
                <img v-useLazyImg="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="desc ellipsis">{{ item.desc }}</p>
                <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </template>
        </el-skeleton>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';  // 引入生命周期
import { getHotGoods } from '@/api'  // 引入获取热榜商品接口
import { useRoute } from 'vue-router'; // 引入路由对象
const route = useRoute() // 获取路由对象
const detailHotLis = ref([]) // 热榜商品列表
const loadingSkeleton = ref(true) // 显示加载骨架屏
const props = defineProps({  // 接收父组件传参
    // 获取热榜商品Api 的ID参数
    id:{
        type: Number,
        required: true
    }
})
// console.log(props.id,'detailHotProps');

const getHotGoodsParams = {  // 获取热榜商品参数
    id: route.params.id,
    type: props.id,

}
// console.log(route.params.id,'detailHotRoute');

const iconClass = {
    1: 'icon-rebang',
    2: 'icon-rebang1',
    3: 'icon-a-dianjizhuangtairebang'
}
console.log( iconClass[props.id], 'iconClass');

const tittle = {
    1: '小时热榜',
    2: '周日榜单',
    3: '月度榜单'
}

onMounted(()=>{
    getHotGoods(getHotGoodsParams).then(({result})=>{
    //    console.log(data);
       detailHotLis.value = result
       loadingSkeleton.value = false
    })
})
// console.log(detailHotLis,'detailHotLis');

</script>

<style lang="scss" scoped>
//热榜容器
.goods-hot {
    
    // margin-top: 10px;
    // 热榜标题
    h3 {
        height: 70px;
        background: $helpColor;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: normal;
        border-radius: 10px;
        // vertical-align: middle;
        
        i{
            font-size: 30px;
            vertical-align: bottom;

        }
    }
    .goods_skeleton{
        // display: inline-block;
        display: flex ;
        flex-direction: column;
        align-items: center;
        justify-items:normal;
        list-style: none;
        padding: 20px 30px;
        text-align: center;
        background: #fff;
        width: 100%;
        
        
    }
    // 商品区块{{ 链接 }} 
    .goods-item {
        display: block;
        padding: 20px 30px;
        text-align: center;
        background: #fff;
        border-radius: 10px;
        margin-bottom: 10px;
        img {
            width: 160px;
            height: 160px;
            border-radius: 10px;

        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
  }
}
</style>