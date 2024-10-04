<template>
  <div class="top-category">
    <div class="container m-top-20">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ categoryData.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            
        </div>
        <!-- 轮播图 -->
        <div class="home-banner">
            <el-skeleton 
              animated :loading="loadingSkeleton">
              <template #template>
                <el-skeleton-item
                variant="image" 
                style="height: 500px;width: 1240px;border-radius: 10px;">
                  
                </el-skeleton-item>
              </template> 
              <template #default>
                <el-carousel height="500px" class="img-container">
                    <el-carousel-item   
                        
                        v-for="item in CategoryBannerData" 
                        :key="item.id">
                        <img :src="item.imgUrl" alt="">
                    </el-carousel-item>
                </el-carousel>
              </template>
            </el-skeleton>
           
        </div>
        <!-- 分类产品图片 -->
        <div class="sub-list">
            <h3>全部分类</h3>
            <ul>
                <li v-for="i in categoryData.children" :key="i.id">
                <RouterLink :to="`/category/sub/${i.id}`">
                    <img :src="i.picture" />
                    <p>{{ i.name }}</p>
                </RouterLink>
                </li>
            </ul>
        </div>
        <!-- 分类产品列表 -->
        <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
            <div class="head">
                <h3>{{ item.name }}</h3>
            </div>
            <div class="goodsBody">
                <CardItem class="goods-list" :data="item.goods" />
                
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getCategory, getBanner } from '@/api'
import { ArrowRight } from '@element-plus/icons-vue'
import {useRoute, onBeforeRouteUpdate} from "vue-router";
import CardItem from '@/pages/layout/home/components/CardItem/index.vue'

const route = useRoute()

const categoryData = ref({})
const CategoryBannerData = ref({})
const loadingSkeleton = ref(true)
console.log(categoryData,'categoryData');

onMounted(async ()=>{
    await getCategory(route.params).then(({result})=>{
    //    console.log(result);
       categoryData.value = result
    })
    await getBanner({distributionSite:'2'}).then(({result})=>{
       console.log(result,'CategoryBannerData');
       CategoryBannerData.value = result
       loadingSkeleton.value = false
    })
})

onBeforeRouteUpdate(async (to,from)=>{
    // console.log(to,from,'to++ from');
    
    try {
        if (to.params.id !== from.params.id) {
        const {result}  = await getCategory(to.params)
        categoryData.value = result
        // console.log(categoryData,'category++ initData ++ onBeforeRouteUpdate');
        
    }
    } catch (error) {
}
})







</script>

<style lang="scss" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    border-radius: 10px;
    ul {
        display: flex;
        padding: 0 32px;
        flex-wrap: wrap;
        justify-content: space-around;
        
        li {
            width: 168px;
            height: 160px;
        a {
            text-align: center;
            display: block;
            font-size: 16px;

          img {
                width: 100px;
                height: 100px;
                border-radius: 10px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $hoverColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .goodsBody {
      display: flex;
      justify-content: space-between;
    //   padding: 0 40px 30px;
        
        .goods-list{
          width: 100%;
        }
    }
  }

  .bread-container {
    padding: 25px 0;
  }
  .home-banner {
    width: 1240px;
    height: 500px;
    margin: 0 auto;
    .img-container{
        border-radius: 10px;
    }
    img {
        width: 100%;
        height: 500px;
        
    }
    }
}
</style>