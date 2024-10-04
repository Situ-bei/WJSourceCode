import { computed } from 'vue'
import { homeCategoryHead, 
    addMemberCart, 
    getMemberCart,
    getLogin, 
    deleteMemberCart} from '../api/index'
import router from '../router'


export const useLoginInfoStore = defineStore(
    'loginInfo', 
     () => {
        const loginInfo = ref({})
        const getlogin = async (val)=>{
            await getLogin(val).then((data)=>{
                console.log(data,'登录');
                if (data.code == 1) {
                    ElMessage.success('登录成功')
                    loginInfo.value = data.result
                    const shoppingCartStore = useShoppingCartStore()
                    shoppingCartStore.updataShoppingCartList()
                    router.replace('/')
                }
            })
        }
        return {
            //属性
            loginInfo,
            //方法
            getlogin
        }
    },
    {
        persist:true,  // 持久化
    }
)

export const useCategoryStore = defineStore(
    // id
    'category', 
    // state
    () => {
        const headerList = ref()
        onMounted(async ()=>{
            await homeCategoryHead().then(({result})=>{
                headerList.value = result
            })
        })
        return {
            headerList,
        }
        
    },
    {
        persist:true,  // 持久化
    }
)

export const useShoppingCartStore = defineStore(
    'shoppingCart', 
    () => {
        const shoppingCart = ref([])
        const loginInfoStore = useLoginInfoStore();
        const isLogin = computed(()=>loginInfoStore.loginInfo.token);
        const updataShoppingCartList = async ()=>{
            await getMemberCart().then((data)=>{
                shoppingCart.value = data.result
            })
        }
        
        const addCart = async (skuObj)=>{
            const params = {
                skuId: skuObj.id,
                count: skuObj.count
            }
            if(isLogin){
                await addMemberCart(params).then((data)=>{
                    console.log(data,'添加商品的接口')
                })
                updataShoppingCartList()
            }else{
                const tempData= shoppingCart.value.find(item=>item.id === skuObj.id)
                if (tempData) {
                    tempData.count += skuObj.count
                }else{
                    shoppingCart.value.push(skuObj)
                }
            }
        }
        const deleteCart = async  (id)=>{
            
            if (id) {
                if (isLogin) {
                    await deleteMemberCart([id])
                    updataShoppingCartList()
                }else{
                    const findIDIndex = shoppingCart.value.findIndex(item=>item.id === id)
                    console.log(findIDIndex,'找到对应删除的ID');
                    shoppingCart.value.splice(findIDIndex,1)
                }
            }
        }
        const clearCart = async (id)=>{
            if (isLogin) {
                await deleteMemberCart(id)
                updataShoppingCartList()
            }else{
                shoppingCart.value = []
            }

            
        }
        // const selectedCart = ()=>{
            
        // }
        // 计算总价
        const getTotalPrice = computed(()=> shoppingCart.value.reduce((accumulator,currentValue)=> accumulator + currentValue.price * currentValue.count, 0)
        )
        // 购物车商品数量
        const cartCount = computed(()=> shoppingCart.value.reduce((accumulator,currentValue)=> accumulator + currentValue.count, 0))
        // 选中商品
        const selectedProduct = computed(()=> {
            const selected = shoppingCart.value.filter(item=>item.selected == true)
            console.log(selected,'选中商品');
            
            return selected.map(item=>item.count).reduce((accumulator,currentValue)=> accumulator + currentValue, 0)
        })
        const selectedProductTotalPrice = computed(()=> {
            const selected = shoppingCart.value.filter(item=>item.selected == true)
            return selected.reduce((accumulator,currentValue)=> accumulator + currentValue.price * currentValue.count, 0)
        })
        return {    
            shoppingCart,
            getTotalPrice,
            cartCount,
            selectedProduct,
            selectedProductTotalPrice,
            addCart,
            deleteCart,
            clearCart,
            updataShoppingCartList

        }
    },
    {
        persist:true,  // 持久化
    }
)

