<template>
    <header class='app-header'>
        <div class="container">
        <h1 class="logo">
            <RouterLink to="/">万家灯火</RouterLink>
        </h1>
        <ul class="app-header-nav">
          <li class="home">
            <RouterLink 
              exact-active-class="active" 
              to="/">
                首页
            </RouterLink>
          </li>
          <li  
            v-for="(item,index) in categoryStore.headerList"
            :key="item.id"
              > 
            <RouterLink 
              active-class="active"
              :to="`/category/${item.id}`" 
              >
              {{item.name }}
            </RouterLink> 
          </li>
        </ul>
        <div class="search">
            <i class="iconfont icon-search"></i>
            <input type="text" placeholder="搜一搜">
        </div>
        <!-- 头部购物车 -->
        
        </div>
    </header>
</template>

<script setup>
import { useCategoryStore } from '@/stores/index'
const categoryStore = useCategoryStore()
  
console.log(categoryStore,'categoryStore');


</script>




<style scoped lang='scss'>
.app-header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 6.25rem;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/万家灯火.gif') no-repeat  100px / contain;
      transform: scale(1);
    }
  }

  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;
  
    li {
      display: flex;
      justify-content: space-between;

      // margin-right: 20px;
      // width: 38px;
      text-align: center;
  
      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
        margin-right: 20px;
        
        &:hover {
          color: $hoverColor;
          border-bottom: 1px solid $hoverColor;
        }
      }
  
      .active {
        color: $hoverColor;
        border-bottom: 1px solid $hoverColor;
      }
    }
  }

  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
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
  }
}
</style>