# 介绍

> Bitverse 工具包

[NPM地址](https://npm.ffe390afd658c19dcbf707e0597b846d.de/-/web/detail/@bitverse/utils)

## 📦 安装

```bash

yarn add @bitverse/utils

npm install @bitverse/utils
```

### 🔨 使用

```ts
import { httpClient, inBitverse } from '@bitverse/utils'

interface requestOptionType {
    /**
     * 完整的接口url，包含baseUrl + path
     * 如：https://api2.bitverse-dev-1.bybit.com/bitverse/bitdapp/v1/public/worldcup/activity/guess
     */
    url: string;
    method: 'post' | 'get';
    body?: Record<string, any>;
    timeout?: number;
    contentType?: string;
    responseType?: string;
    /**
     * 是否展示log代码，便于调试
     */
    debug?: boolean;
}

httpClient.request(option: requestOptionType)
```

## 常用命令

```js
// 编译
yarn build

// 发包
npm publish
```

## demo url
