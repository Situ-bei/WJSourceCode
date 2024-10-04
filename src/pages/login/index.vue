<template>
    <div>
        <!-- Login头部 -->
        <header class="login-header">
            <div class="container m-top-20">
                <h1 class="logo">
                    <RouterLink to="/">万家灯火</RouterLink>
                </h1>
                <RouterLink class="entry" to="/">
                进入网站首页
                <i class="iconfont icon-angle-right-b"></i>
                <!-- <i class="iconfont icon-angle-right"></i> -->
                </RouterLink>
            </div>
        </header>
        <!-- Login主体 -->
        <section class="login-section">
            <div class="wrapper">
                <nav>
                    <a href="javascript:;">账户登录</a>
                </nav>
                <div class="account-box">
                    <div class="form">
                        <el-form 
                            label-position="right" 
                            label-width="60px"
                            showIcon
                            status-icon
                            :rules="rules"
                            :model="formData"
                            ref="formRef" 
                            >
                            <el-form-item  label="账户" prop="account">
                                <el-input  
                                    v-model="formData.account" 
                                    placeholder="请输入用户名"
                                    clearable
                                    
                                    >

                                    </el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input 
                                    v-model="formData.password" 
                                    placeholder="请输入密码"
                                    clearable
                                    type="password"
                                    show-password/>
                            </el-form-item>
                            <el-form-item label-width="22px" prop="agree">
                                <el-checkbox  size="large" v-model="formData.agree" >
                                    我已同意隐私条款和服务条款
                                </el-checkbox>
                            </el-form-item>

                            <el-button  @click="onSubmit" size="large" class="subBtn">
                                点击登录
                            </el-button>
                        </el-form>
                    </div>
                </div>
            </div>
        </section>
        <!-- Login底部 -->
        <footer class="login-footer">
            <div class="container">
                <p>
                <a href="javascript:;">关于我们</a>
                <a href="javascript:;">帮助中心</a>
                <a href="javascript:;">售后服务</a>
                <a href="javascript:;">配送与验收</a>
                <a href="javascript:;">商务合作</a>
                <a href="javascript:;">搜索推荐</a>
                <a href="javascript:;">友情链接</a>
                </p>
                <p>CopyRight &copy; 天狗商城</p>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { reactive,ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginInfoStore } from '@/stores'
const loginInfoStore = useLoginInfoStore();
const router = useRouter();
const formData = reactive({
    account: 'heima282',
    password: 'hm#qd@23!',
    agree: true,
})
console.log(formData,'表单收集数据');

const rules = reactive({
    account: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 15, message: '长度在 6 到5个字符', trigger: 'blur' }
    ],
    agree: [
        { // 自定义校验规则
            validator (rule, value, callback){
                if (!value) {
                    return callback(new Error('请勾选同意隐私条款和服务条款'));
                } else {
                    callback();
                }
            }
        }
    ]
    
})

const formRef = ref(null);
const onSubmit = () => {
    formRef.value.validate(async (valid)=>{
        if (valid) {
            loginInfoStore.getlogin(formData)
            console.log( valid,'表单校验的结果 ');
        }else{
            console.log( valid,'表单校验的结果');

        }
        
    })
}
</script>

<style lang="scss" scoped>
.login-header {
    background: #fff;
    border-bottom: 1px solid #e4e4e4;
    line-height: normal;

    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
            width: 200px;

        a {
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px;
            background: url("@/assets/images/万家灯火.gif") no-repeat center 18px / contain;
            background-position: top;
        }
    }

    .sub {
            flex: 1;
            font-size: 24px;
            font-weight: normal;
            margin-bottom: 38px;
            margin-left: 20px;
            color: #666;
    }

    .entry {
        display: inline-block;
        // width: 120px;
        // margin-bottom: 38px;
        font-size: 16px;
        // height: 40px;

        i {
            font-size: 14px;
            color: $hoverColor;
            letter-spacing: -5px;
            line-height: 14px;
        }
    }
}

.login-section {
    background: url('@/assets/images/log_in.webp') no-repeat center / cover;
    height: 488px;
    position: relative;

    .wrapper {
        width: 380px;
        height: 350px;
        background: rgba(255, 255, 255,.8);
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        // transform: translate3d(290px, 100px, 0);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        nav {
            font-size: 14px;
            height: 55px;
            margin-bottom: 20px;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            padding: 0 40px;
            text-align: right;
            align-items: center;

        a {
            flex: 1;
            line-height: 1;
            display: inline-block;
            font-size: 18px;
            position: relative;
            text-align: center;
        }
        }
    }
}

.login-footer {
    padding: 30px 0 50px;
    background: #fff;
    // margin-top: 20px;
    p {
        text-align: center;
        color: #999;
        padding-top: 20px;

        a {
            line-height: 1;
            padding: 0 10px;
            color: #999;
            display: inline-block;

        ~a {
            border-left: 1px solid #ccc;
        }
        }
    }
}

.account-box {
    .toggle {
        padding: 15px 40px;
        text-align: right;

        a {
            color: $xtxColor;

        i {
            font-size: 14px;
        }
        }
    }

    .form {
        padding: 0 20px 20px 20px;

    &-item {
        margin-bottom: 28px;

    .input {
        position: relative;
        height: 36px;

        >i {
            width: 34px;
            height: 34px;
            background: #cfcdcd;
            color: #fff;
            position: absolute;
            left: 1px;
            top: 1px;
            text-align: center;
            line-height: 34px;
            font-size: 18px;
        }

        input {
            padding-left: 44px;
            border: 1px solid #cfcdcd;
            height: 36px;
            line-height: 36px;
            width: 100%;

        &.error {
            border-color: $priceColor;
        }

        &.active,
        &:focus {
            border-color: $xtxColor;
        }
        }

        .code {
            position: absolute;
            right: 1px;
            top: 1px;
            text-align: center;
            line-height: 34px;
            font-size: 14px;
            background: #f5f5f5;
            color: #666;
            width: 90px;
            height: 34px;
            cursor: pointer;
        }
    }

    >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
            font-size: 14px;
            margin-right: 2px;
        }
    }
    }

    .agree {
        a {
            color: #069;
        }
    }

    .btn {
        display: block;
        width: 100%;
        height: 40px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        background: $xtxColor;

        &.disabled {
            background: #cfcdcd;
        }
    }
}

    .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
        a {
            color: #999;
            margin-left: 10px;
        }
    }
}
}

.subBtn {
    background: $hoverColor;
    width: 100%;
    color: #fff;
}



</style>