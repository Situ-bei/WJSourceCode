<template>
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
        <ul class="goods-list">
            <li v-for="item in initData" :key="item.id">
            <RouterLink :to="{ name: 'detail', params: { id: item.id }}">
                <img v-useLazyImg = "item.picture" alt="" />
                <p class="name">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
            </li>
        </ul>
    </HomePanel>
</template>

<script setup>
import HomePanel from '@/pages/layout/home/components/HomePanel/index.vue'
import { onMounted, ref } from 'vue';
import { useGetApi } from '@/hooks/GetApi'
const {initData} = useGetApi('getNews')



</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  margin: 0 10px;
    
  li {
    width: 306px;
    height: 406px;
    // margin: 0 10px;
    border-radius: 10px;
    // background: #f0f9f4;
    transition: all .5s;
    padding: 5px 10px;
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
      border-radius: 10px;
      object-fit: cover;
      margin-bottom: 10px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>