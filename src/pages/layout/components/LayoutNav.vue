<template>
<nav class="app-topnav">
    <div class="container">
    <ul>
        <template v-if="loginInfoStore.loginInfo.token">
        <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{ loginInfoStore.loginInfo.account }}</a></li>
        <li>
            <el-popconfirm 
                @confirm="logout"
                title="确认退出吗?" 
                confirm-button-text="确认" 
                cancel-button-text="取消">
            <template #reference>
                <a href="javascript:;">退出登录</a>
            </template>
            </el-popconfirm>
        </li>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        </template>
        <template v-else>
            <li><a href="javascript:;" @click="logout">请先登录</a></li>
            <li><a href="javascript:;">帮助中心</a></li>
            <li><a href="javascript:;">关于我们</a></li>
        </template>
        <!-- 购物车 -->
        <ShoppingCart />
        
    </ul>
    </div>
</nav>
</template>
<script setup>
import { useRouter } from 'vue-router';
import ShoppingCart from '@/components/ShoppingCartCompoent/index.vue'
import { useLoginInfoStore, useShoppingCartStore } from '@/stores'
const loginInfoStore = useLoginInfoStore()
const shoppingCartStore = useShoppingCartStore()
// 路由
const router = useRouter()



console.log(loginInfoStore.loginInfo,'首页需要的用户信息');
// 退出登录
const logout = ()=>{
    loginInfoStore.loginInfo = {}
    shoppingCartStore.shoppingCart = []
    
    router.replace('/login')
}
</script>

<style scoped lang="scss">
.app-topnav {
    background: #333;
ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
    a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
        font-size: 14px;
        margin-right: 2px;
        }

        &:hover {
        color: $hoverColor;
        }
    }

    ~li {
        a {
        border-left: 2px solid #666;
        }
    }
    }
}
}
</style>