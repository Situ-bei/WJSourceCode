<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="`/category/${subCategoryData.parentId}`">{{ subCategoryData.parentName }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ subCategoryData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <el-tabs v-model="subFilterData.sortField" @tab-change="onTabChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            <template #undefined></template>
            </el-tabs>
           
            <div class="body" 
                v-infinite-scroll="load"
                :infinite-scroll-disabled="infiniteScrollFlag">
                <!-- 商品列表-->
                    <div class="subCategory_list">
                        <!-- 骨架图 -->
                    <el-skeleton  
                    :rows="1"   
                    animated 
                    :loading="loadingSkeleton" >
                    <template #template>
                        <ul class="goods-list">
                            <li v-for="item in 8" :key="item">
                                <div class="goods-item">
                                    <el-skeleton-item 
                                        variant="image" 
                                        style="height: 160px;width: 160px;border-radius: 10px;" />
                                    <el-skeleton-item variant="text" style="margin-top: 16px" />
                                    <el-skeleton-item variant="text" style="width: 30%" />
                                </div>
                            </li>
                        </ul>
                    </template>
                    <template #default>
                        <!-- 原始DOM -->
                        <CardItem :data="subCategoryList"/> 
                    </template>
                </el-skeleton>
                
                </div>
                <!-- 加载提示 -->
                <div
                    v-loading="loading"
                    element-loading-text="加载中..."
                    class="loading"
                    >
                    
                </div>
                <div
                    v-if="noMore"
                    class="noMore"
                    >
                    没有更多了...
                </div>
                
            </div>
        </div>
        <el-backtop 
            :right="50" :bottom="100"
            >
            <i class="backtop iconfont icon-huidaodingbu1">
                
            </i>
        </el-backtop>
    </div>
</template>

<script setup>
import { getSubCategory,getFilterCategory } from '@/api'
import { onMounted, reactive, ref } from 'vue';
import {useRoute} from "vue-router";
import CardItem from '@/pages/layout/home/components/CardItem/index.vue'

const route = useRoute()
const subCategoryData = ref({})
console.log(route.params,'getSubCategory + route params');
// console.log(subCategoryData,'subCategoryData');
const subCategoryList = ref([])
const subFilterData = reactive({
    ategoryId: route.params.id ,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
})
const infiniteScrollFlag = ref(false)
// console.log(subFilterData);
const loadingSkeleton = ref(true)
const loading = ref(false)
const noMore = ref(false)


onMounted(async ()=>{
   await getSubCategory(route.params).then(({result})=>{
    //   console.log(result,'getSubCategory + result');
      subCategoryData.value = result
   })
   await getFilterCategory(subFilterData).then(({result})=>{
    subCategoryList.value = result.items
    loadingSkeleton.value = false
    // console.log(result.items,'subCategoryList,onMounted');

   })
})

const onTabChange =async (val)=>{
//    console.log(subFilterData.sortField);
    noMore.value = false
   subFilterData.page = 1
   await getFilterCategory(subFilterData).then(({result})=>{
    subCategoryList.value = result.items
    
      console.log(subCategoryList,'subCategoryList,onTabChange');
   })
}

const load = async ()=>{
    loading.value = true
    subFilterData.page ++
    await getFilterCategory(subFilterData).then(({result})=>{
    subCategoryList.value = [...subCategoryList.value, ...result.items]
    //   console.log(result,'subCategoryList,load');
      if (subCategoryList.value.length >= 160) {
        infiniteScrollFlag.value = true
        console.log(subCategoryList.value.length,'load');
        
        loading.value = false
        noMore.value = true

      }
   })
   loading.value = false
}

</script>

<style lang="scss" scoped>
.example-showcase .el-loading-mask {
  z-index: 9;
}
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 0 10px 0 10px;
    justify-content: space-between;
    .subCategory_list{
        width: 100%;
        
    }
    .loading{
        margin-bottom: 40px;
        // font-size: 20px;

    }
    .noMore{
        font-size: 20px;
        text-align: center;
        color: #666666be;
    }
  }





}
.backtop{
    
    font-size: 30px;
    text-align: center;
    // line-height: 40px;
}
.goods-list {
                // width: 990px;
                display: flex;
                flex-wrap: wrap;
                // justify-content: space-between;
                li {
                width: 240px;
                height: 300px;
                // margin-right: 10px;
                margin-bottom: 10px;

                &:nth-last-child(-n + 4) {
                    margin-bottom: 0;
                }

                &:nth-child(4n) {
                    margin-right: 0;
                }
                }
                .goods-item {
                display: block;
                width: 220px;
                padding: 20px 30px;
                text-align: center;
                transition: all .5s;
                border-radius: .625rem;

                &:hover {
                transform: translate3d(0, -3px, 0);
                box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
                color: $hoverColor;
                }
            }
            }

</style>