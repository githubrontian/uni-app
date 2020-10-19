# uni-template-admin

> 基于 uni-app，uniCloud 的 admin 管理项目模板，前端工程师完成页面开发的同时，也可以用 JS 开发服务端 api，轻松搞定前后台整体业务。

### 使用

#### 创建

[HBuilderX](https://www.dcloud.io/hbuilderx.html) 新建 uni-app 项目，选择 uniCloud admin 项目模板，创建完成后，可以跟随``云服务空间初始化向导``初始化项目，创建并绑定云服务空间，也可稍后自行初始化。

#### 运行

1. 进入 admin 项目
2. 右键 cloudfuntions 运行云服务空间初始化向导（如已创建并绑定云服务空间，则跳过此步）
3. 点击工具栏的运行 -> 运行到浏览器
4. 登录页面底部进入创建管理员页面（仅允许注册一次管理员账号）

### 目录结构

```bash
├── cloudfunctions              # 云函数
├── common
│   └── uni.css                 # 公共样式
├── components                  # 自定义组件
├── js_sdk                      # js sdk
├── pages                       # 页面
│   │── index                   # 首页
│   └── login                   # 登录页
├── static
├── store                       # vuex
├── windows
│   └── leftWindow.vue          # 左侧窗口（菜单栏）
│   └── topWindow.vue           # 顶部窗口（导航栏）
├── admin.config.js             # 系统配置（配置导航，菜单等）
├── App.vue
├── main.js
├── mainfest.json
├── pages.json
├── postcss.config.js           # postcss 配置（浏览器兼容性）
└── uni.scss
```

### 顶部窗口（导航栏）

> 源码 [windows/topWindow.vue](https://github.com/dcloudio/uni-template-admin/blob/master/windows/topWindow.vue)

1. 通过 [admin.config.js](https://github.com/dcloudio/uni-template-admin/blob/master/admin.config.js) 配置导航栏内容

```js
export default {
    // 导航栏
    navBar: {
        // 左侧 Logo
        logo: "/static/logo.png",
        // 右侧链接
        links: [
            {
                text: "项目文档",
                url:
                    "https://github.com/dcloudio/uni-template-admin/blob/master/README.md",
            },
        ],
    },
};
```

2. 通过 [uni.scss](https://github.com/dcloudio/uni-template-admin/blob/master/uni.scss) 配置导航栏样式

```css
$top-window-bg-color: #fff; /* 背景色 */
$top-window-text-color: #999; /* 文字颜色 */
```

### 左侧窗口（菜单栏）

> 源码 [windows/leftWindow.vue](https://github.com/dcloudio/uni-template-admin/blob/master/windows/leftWindow.vue)

1. 通过 [admin.config.js](https://github.com/dcloudio/uni-template-admin/blob/master/admin.config.js) 配置侧边栏内容

```js
export default {
    // 侧边栏
    sideBar: {
        // 配置静态菜单列表（放置在用户被授权的菜单列表下边）
        secondaryMenus: [
            {
                name: "404页面",
                url: "/pages/error/404",
            },
        ],
    },
};
```

2. 通过 [uni.scss](https://github.com/dcloudio/uni-template-admin/blob/master/uni.scss) 配置侧边栏样式

> 调整菜单颜色时，只需设置菜单背景色 ``$menu-bg-color``，自行搭配文字前景色即可

```css
$left-window-bg-color: #fff; /* 左侧窗口背景色 */
$menu-bg-color: #fff; /* 一级菜单背景色 */
$sub-menu-bg-color: darken($menu-bg-color, 8%); /* 二级以下菜单背景色 */
$menu-bg-color-hover: darken($menu-bg-color, 15%); /* 菜单 hover 背景颜色 */
$menu-text-color: #333; /* 菜单前景色 */
$menu-text-color-actived: #409eff; /* 菜单激活前景色 */
```

### 用户系统

> 基于 [uni-id](https://uniapp.dcloud.io/uniCloud/uni-id) 用户登录

1. 用户登录

- 源码 [pages/login/login.vue](https://github.com/dcloudio/uni-template-admin/blob/master/pages/login/login.vue)

注意：首次使用，可以通过登录页面底部链接创建一个超级管理员（仅允许创建一次），注册完毕后，建议从登录页面移除该链接

### 权限系统

> 基于 [uni-id](https://uniapp.dcloud.io/uniCloud/uni-id?id=rbac-api) 角色权限

1. 角色表
    > [详情](https://uniapp.dcloud.io/uniCloud/uni-id?id=%e8%a7%92%e8%89%b2%e8%a1%a8)
2. 权限表
    > [详情](https://uniapp.dcloud.io/uniCloud/uni-id?id=%e6%9d%83%e9%99%90%e8%a1%a8)
3. 菜单表
   | 字段 | 类型 | 必填 | 描述 |
   | ---------- | --------- | ---- | -------------------------------------- |
   | \_id | Object ID | 是 | 系统自动生成的 Id |
   | name | String | 是 | 菜单文字 |
   | icon | String | 否 | 菜单图标 |
   | url | String | 否 | 菜单对应的页面链接（只有没有子菜单的菜单项可以配置） |
   | sort | Integer | 否 | 在同级菜单中的排序，数组越大越靠后 |
   | parent_id | String | 否 | 父级菜单 Id |
   | permission | Array | 否 | 菜单权限（只有没有子菜单的菜单项可以配置） |
   | status | Integer | 是 | 菜单状态：0 禁用 1 启用 |
   | created_date | Timestamp | 是 | 创建时间 |
4. 权限验证

    ```html
    <template>
        <view>
            <!-- 包含 user/add 权限的用户可以看到新增按钮 -->
            <button v-if="$hasPermission('user/add')">新增</button>
            <!-- 包含 admin 角色的用户可以看到删除按钮 -->
            <button v-if="$hasRole('admin')">删除</button>
        </view>
    </template>
    ```

### 新增页面

在框架搭建好后，接下来就需要增加页面，实现功能，建议页面统一放在 ``pages`` 目录，以便管理。由于是云端一体的开发模式，简单的理解为，在前端实现页面和 *api 接口*，这里需要转换一下观念，api 也是在前端实现的。

以登录功能为例，以下是代码片段，完整代码见项目源码：

1. 新增前端 vue 页面

```html
<template>
    <view class="login-box">
        <view class="flex-cc m-b-30 login-title">
            系统登录
        </view>
        <uni-forms ref="form" :form-rules="rules">
            <uni-field class="p-lr-0" left-icon="person" name="username" v-model="formData.username" labelWidth="35"
                placeholder="账户" :clearable="false" />
            <uni-field class="m-b-30 p-lr-0" left-icon="locked" v-model="formData.password" name="password" type="password"
                labelWidth="35" placeholder="密码" :clearable="false" />
            <button class="login-button flex-cc m-b-30" type="primary" :loading="loading" :disabled="loading" @click="submit">登录</button>
        </uni-forms>
    </view>
</template>
```

```javascript
<script>
submit(e) {
    // api 接口 'user/login' 在 uni-admin 目录中实现，参见步骤 2
    this.$request('user/login', this.formData).then(res => {
        this.setToken({
            token: res.token,
            tokenExpired: res.tokenExpired
        })
        this.init()
    }).catch(err => {

    }).finally(err => {

    })
}
<script />
```

2. 新增后端 api 接口

uniCloud admin 在前端实现 api 类似于后端的实现方式，在 ``uni-admin/service`` 中写 api 的执行代码，比如对数据表的增删改查、处理数据等，在 ``uni-admin/controller`` 中写控制 service 的执行。

```javascript
//uni-admin/controller/user.js

const {
    Controller
} = require('uni-cloud-router')
const uniID = require('uni-id')
module.exports = class UserController extends Controller {
    async login() {
        const {
            username,
            password
        } = this.ctx.data
        // 调用下面的 service
        return this.service.user.login({
            username,
            password
        })
    }

}
```

```javascript
//uni-admin/service/user.js

const {
    Service
} = require('uni-cloud-router')
const uniID = require('uni-id')
module.exports = class UserService extends Service {
    async login({
        username,
        password
    }) {
        return await uniID.login({
            username,
            password,
            needPermission: true
        })
    }
}

```

### 云函数

#### uni-clientDB

> [详情](https://uniapp.dcloud.io/uniCloud/uni-clientDB)

### 使用三方组件库

uniCloud admin 可以和其他 UI 框架一起使用，但不推荐这种用法，可以能会跨端不兼容的问题，尤其在移动端。

以使用 xxx-ui 框架为例：

1. 安装 UI 框架

> npm i xxx-ui -S

2. 在 main.js 中引用

```javascript

import xxxUI from 'xxx-ui';
import 'xxx-ui/lib/theme-chalk/index.css';

Vue.use(xxxUI);
```