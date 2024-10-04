<template>
    <div class="home-product">
        <HomePanel v-for="cate in productList" :title="cate.name"  :key="cate.id">
        <div class="box">
            <RouterLink class="cover" :to="{ name: 'detail', params: { id: cate.id }}">
            <img :src="cate.picture" />
            <strong class="label">
                <span>{{ cate.name }}馆</span>
                <span>{{ cate.saleInfo }}</span>
            </strong>
            </RouterLink>
            <!-- 二级商品列表 -->
            <CardItem :data="cate.goods" class="goods-list" />
        </div>
        </HomePanel>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { getProduct } from '@/api'
import HomePanel from '@/pages/layout/home/components/HomePanel/index.vue'
import CardItem from '@/pages/layout/home/components/CardItem/index.vue'



const productList = ref()
onMounted(async() => {
    await getProduct().then(({result})=>{
        productList.value = result
        // console.log(result,'productList');
    })
  
})

</script>

<style lang="scss" scoped>
.home-product {
  background: #fff;
  margin-top: 20px;
//   border-radius: 10px;
  .sub {
    // margin-bottom: 10px;
    
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;
    // margin-bottom: 10px;
    padding-bottom: 10px;
    .cover {
      width: 240px;
      height: 610px;
      margin: 0 20px;
      position: relative;
      flex: 1;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }

      .label {
        width: 100%;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
            
          }
        }
      }
    }
    .goods-list{
      flex: 4;
    }
  }
}
</style>