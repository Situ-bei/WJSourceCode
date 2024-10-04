<template>
<div class="xtx-cart-page">
        <div class="container m-top-20">
            <div class="cart">
                <table>
                    <thead>
                        <tr>
                        <th width="120">
                            <el-checkbox v-model="selected" @change="allSelected" />
                        </th>
                        <th width="400">商品信息</th>
                        <th width="220">单价</th>
                        <th width="180">数量</th>
                        <th width="180">小计</th>
                        <th width="140">操作</th>
                        </tr>
                    </thead>
                    <!-- 商品列表 -->
                    <tbody>
                        <tr v-for="i in shoppingCartStore.shoppingCart" :key="i.id">
                            <td>
                                <el-checkbox v-model="i.selected" />
                            </td>
                            <td>
                                <div class="goods">
                                    <RouterLink to="/">
                                        <img :src="i.picture" alt="" />
                                    </RouterLink>
                                    <div>
                                        <p class="name ellipsis">
                                        {{ i.name }}
                                        </p>
                                        <p class="attr ellipsis">
                                        {{ i.attrsText}}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="tc">
                                <p>&yen;{{ i.price }}</p>
                            </td>
                            <td class="tc">
                                <el-input-number v-model="i.count" :min="1" />
                            </td>
                            <td class="tc">
                                <p class="f16 red">&yen;{{ (i.price * i.count).toFixed(2) }}</p>
                            </td>
                            <td class="tc">
                                <p>
                                <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消" @confirm="deleteCart(i.id)">
                                    <template #reference>
                                    <a href="javascript:;">删除</a>
                                    </template>
                                </el-popconfirm>
                                </p>
                            </td>
                        </tr>
                        <tr v-if="shoppingCartStore.shoppingCart.length === 0">
                        <td colspan="6">
                            <div class="cart-none">
                            <el-empty description="购物车列表为空">
                                <el-button type="primary">随便逛逛</el-button>
                            </el-empty>
                            </div>
                        </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <!-- 操作栏 -->
            <div class="action">
                <div class="batch">
                    共 {{shoppingCartStore.cartCount }} 件商品，已选择 {{ shoppingCartStore.selectedProduct }} 件，商品合计：
                    <span class="red">¥ {{ shoppingCartStore.selectedProductTotalPrice }} </span>
                </div>
                <div class="total">
                    <el-button size="large" type="primary" @click="oederPay">下单结算</el-button>
                </div>
            </div>  
        </div>
    </div>
</template>

<script setup>
import{useShoppingCartStore} from '@/stores'
import { watch } from 'vue';
const shoppingCartStore = useShoppingCartStore()

// 全选初始状态赋值 和 当选状态改变检查赋值
const selected = computed(()=> {
    // 判断 当前项目是否包含选中的项
    const selecterItem = shoppingCartStore.shoppingCart.map(item=> item.selected)
    if (selecterItem.includes(false)) {
        // 有 返回true
        return false
    }else{
        // 没有 返回false
        return true
    }
})
// 全选
const allSelected = (val)=>{
    // const selecterItem = shoppingCartStore.shoppingCart.map((item)=> item.selected === true)
    if (selected.value == true) {
        console.log('包含true');
        shoppingCartStore.shoppingCart.forEach((item)=> item.selected = false)
    }else{
        shoppingCartStore.shoppingCart.forEach((item)=> item.selected = true)
    }
}

watch(()=>shoppingCartStore.shoppingCart,(val)=>{
    console.log(val,'payMent中监听的val');
    
},{deep:true})

const deleteCart = (id)=>{
    shoppingCartStore.deleteCart(id)
}

const oederPay = ()=>{
    const token = JSON.parse(localStorage.getItem('WJUserInfo')).token
    console.log(token,'token的类型');
    
}

</script>

<style lang="scss" scoped>
.xtx-cart-page {
    margin-top: 20px;

    .cart {
        background: #fff;
        color: #666;

        table {
        border-spacing: 0;
        border-collapse: collapse;
        line-height: 24px;

        th,
        td {
            padding: 10px;
            border-bottom: 1px solid #f5f5f5;

            &:first-child {
            text-align: left;
            padding-left: 30px;
            color: #999;
            }
        }

        th {
            font-size: 16px;
            font-weight: normal;
            line-height: 50px;
        }
        }
    }

    .cart-none {
        text-align: center;
        padding: 120px 0;
        background: #fff;

        p {
        color: #999;
        padding: 20px 0;
        }
    }

    .tc {
        text-align: center;

        a {
        color: $xtxColor;
        }

        .xtx-numbox {
        margin: 0 auto;
        width: 120px;
        }
    }

    .red {
        color: $priceColor;
    }

    .green {
        color: $xtxColor;
    }

    .f16 {
        font-size: 16px;
    }

    .goods {
        display: flex;
        align-items: center;

        img {
        width: 100px;
        height: 100px;
        }

        >div {
        width: 280px;
        font-size: 16px;
        padding-left: 10px;

        .attr {
            font-size: 14px;
            color: #999;
        }
        }
    }

    .action {
        display: flex;
        background: #fff;
        margin-top: 20px;
        height: 80px;
        align-items: center;
        font-size: 16px;
        justify-content: space-between;
        padding: 0 30px;

        .xtx-checkbox {
        color: #999;
        }

        .batch {
        a {
            margin-left: 20px;
        }
        }

        .red {
        font-size: 18px;
        margin-right: 20px;
        font-weight: bold;
        }
    }

    .tit {
        color: #666;
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
    }

}
</style>