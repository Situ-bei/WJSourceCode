<template>
  <ul class="goods-list">
    <li v-for="item in data" :key="item.id">
        <RouterLink 
          :to="{ name: 'detail', params: { id: item.id }}"
          class="goods-item">
        <img v-useLazyImg="item.picture" alt="" />
        <p class="name ellipsis">{{ item.name }}</p>
        <p class="desc ellipsis">{{ item.desc }}</p>
        <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
    </li>
  </ul>
</template>

<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue';

const loading = ref(true)

const {data}  = defineProps({
    data:{
        type: [Object,Array],
        required: true
    }
})



</script>

<style lang="scss" scoped>
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

      img {
        width: 160px;
        height: 160px;
        border-radius: .625rem;
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
  
</style>