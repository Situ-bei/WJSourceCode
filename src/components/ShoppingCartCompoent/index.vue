<template>
    <div class="cart">
        <a class="curr" href="javascript:;">
            <i class="iconfont icon-gouwucheman"></i><em>{{ cartNum }}</em>
        </a>
        <div class="layer">
            <div class="list">
                <div 
                  class="item" 
                  v-for="i in shoppingCartStore.shoppingCart" 
                  :key="i">
                  
                    <div class="item_link">
                      <RouterLink to="" >
                      <img :src="i.picture" alt="" />
                      <div class="center">
                          <p class="name ellipsis-2">
                            {{ i.name }}
                          </p>
                          <p class="attr ellipsis">{{ i.attrsText }}</p>
                      </div>
                      <div class="right">
                          <p class="price">&yen;{{ i.price }}</p>
                          <p class="count">x{{ i.count }}</p>
                      </div>
                      </RouterLink>
                      
                      <i class="iconfont icon-a-icon_close_bottomcard1" @click="deleteCart(i.skuId)"></i>
                    </div>
                </div>
            </div>
            <div class="foot">
              <div class="total">
                  <p>共 {{ cartNum }} 件商品</p>
                  <p>&yen; {{ shoppingCartStore.getTotalPrice.toFixed(2) }} </p>
              </div>
              <span 
                class="clearCart" 
                @click="clearCart"
                v-if="cartNum > 4">
                  一键清空
              </span>
              
              <el-button 
                size="large" 
                @click="payMent" >
                去购物车结算
              </el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useShoppingCartStore } from '@/stores'
import { computed, onMounted, watch } from 'vue';
import {useRouter} from 'vue-router';
// import PayMent from '@/pages/layout/payment'
const router = useRouter()
const shoppingCartStore = useShoppingCartStore()
//  购物车数量
const cartNum = ref(0)
//  监听购物车数量变化
watch(()=>shoppingCartStore.shoppingCart?.map(i=>i.count),(val)=>{
    console.log(val,'购物车数量变化');
    cartNum.value = val.reduce((accumulator,currentValue)=> accumulator + currentValue, 0)
    // console.log(cartNum.value,'购物车数量变化');
},{ immediate: true })



console.log(shoppingCartStore.shoppingCart);
// 删除
const deleteCart = (val)=>{
  console.log(val,'删除函数的skuID');
  shoppingCartStore.deleteCart(val)
  console.log(shoppingCartStore.shoppingCart,"执行删除之后的");
  
}
// 清空
const clearCart = ()=>{
  const delCartAllID = shoppingCartStore.shoppingCart.map(item => item.id)
  console.log(delCartAllID,"要全部清空的id");
  
  shoppingCartStore.clearCart(delCartAllID)
  console.log(shoppingCartStore.shoppingCart,"执行清空")
  
}

// 总价
// shoppingCartStore.getTotalPrice()
const payMent = ()=>{
  console.log('去结算');
  //  跳转
  router.push('/payment')
}





</script>

<style lang="scss" scoped>
.cart {
  width: 50px;
  position: relative;
  z-index: 600;

  .curr {
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;
    display: block;

    .icon-gouwucheman {
      font-size: 22px;
      color: #fff;
    }

    em {
      font-style: normal;
      position: absolute;
      right: 0;
      top: 0;
      padding: 1px 6px;
      line-height: 1;
      background: $helpColor;
      color: #fff;
      font-size: 12px;
      border-radius: 10px;
      font-family: Arial;
    }
  }

  &:hover {
    .layer {
      opacity: 1;
      transform: none;
    }
  }

  .layer {
    opacity: 0;
    transition: all 0.4s 0.2s;
    transform: translateY(-200px) scale(1, 0);
    width: 400px;
    height: 400px;
    position: absolute;
    top: 50px;
    right: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background: #fff;
    border-radius: 10px;
    padding-top: 10px;

    &::before {
      content: "";
      position: absolute;
      right: 14px;
      top: -10px;
      width: 20px;
      height: 20px;
      background: #fff;
      transform: scale(0.6, 1) rotate(45deg);
      box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
    }

    .foot {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 70px;
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background: #f8f8f8;
      align-items: center;
      border-radius: 10px;
      
      .total {
        padding-left: 10px;
        color: #999;
        
        p {
          &:last-child {
            font-size: 18px;
            color: $priceColor;
          }
        }
      }
    }
  }
  .clearCart{
    margin-left: 70px;
    cursor: pointer;
    &:hover{
      color: $hoverColor;
    }
  }
  .list {
    height: 310px;
    overflow: auto;
    padding: 0 10px;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #f8f8f8;
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: #eee;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }

    .item {
      border-bottom: 1px solid #f5f5f5;
      padding: 10px 0;
      position: relative;

      i {
        position: absolute;
        bottom: 35px;
        right: 5px;
        opacity: 0;
        color: #666;
        transition: all 0.5s;
        font-size: 25px;
      }
      .item_link{
        transition: all .5s;
      }

      &:hover {
        i {
          opacity: 1;
          cursor: pointer;
        }
        .item_link{
          
          background-color: #e3e3e3bd;
          border-radius: 10px;
          transition: hover 0.5s;
          // opacity: 0;

        }
      }

      a {
        display: flex;
        align-items: center;

        img {
          height: 80px;
          width: 80px;
          border-radius: 10px;
        }

        .center {
          padding: 0 10px;
          width: 200px;

          .name {
            font-size: 16px;
          }

          .attr {
            color: #999;
            padding-top: 5px;
          }
        }

        .right {
          width: 100px;
          padding-right: 20px;
          text-align: center;

          .price {
            font-size: 16px;
            color: $priceColor;
          }

          .count {
            color: #999;
            margin-top: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>