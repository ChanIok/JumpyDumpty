# JumpyDumpty

**蹦蹦炸弹——原神小工具箱**

Electron + Vue + AntDesign

新手尝试，还有很多不足的地方，如果觉得有用可以给个star，谢谢你

最初的开发愿景只是做个小工具，因此代码写得非常辣鸡，大佬们请见谅

## 最新问题：

待反馈


## 功能：

* 热键资源地图

  由于平时在探索地图找资源时（如神瞳，特产，宝箱），需要用浏览器打开资源地图对照着来找，但如果频繁切换窗口会过于麻烦，就算用 Alt+Tab 也有闪烁，于是弄了这个热键呼出地图的小工具（目前仅国服可用）。

  默认加载米游社观测枢的地图，游戏中的标点可同步
  支持独立地图的热键呼出和隐藏

  呼出地图窗口后，由于原神从游戏切换其他窗口默认会最小化，隐藏地图窗口时调用了 windows api 的函数重新激活原神窗口，从而实现近似于游戏地图的体验

* 用户查询
  
  调用米游社的APi进行用户查询

  刷新观测枢地图时，用 Electron 的 webRequest 功能拦截 headers，获取 cookie

  此处感谢[genshin-impact-helper](https://github.com/y1ndan/genshin-impact-helper)

* 圣遗物 OCR 导出

  依赖：百度 OCR 的 API，需要提供百度 OCR 的相关 Key。 

  抓取保存在data/artifacts.json文件 导出的 json 可配合 worm 大佬的项目使用：[莫娜占卜铺](https://github.com/wormtql/genshin_artifact)，[官网](http://www.genshin.art/)

**具体使用方法请参考程序的```帮助手册```**

## 使用：

v1.1.9 已打包，解压直接运行：  
https://wws.lanzous.com/b01zxfq8j
密码:boom

## 更新日志：

### v1.1.9

- 修复了启动程序会清空保存的圣遗物的大问题
- 重新计算ID（这意味着这个新版本需要清空一次圣遗物重新录入，不然新版本的数据会与之前的数据重复）

### v1.1.8

- 修复了高缩放率情况下，OCR的浮窗高度过高的问题
- 继续优化了OCR的数据处理逻辑
- 更新帮助手册说明
  
### v1.1.7

- 增加查询的历史记录
- 增加了OCR的等级和星数（单次点击的请求次数变为两次）
- 优化了OCR的数据处理逻辑
- 去除了以前打包重复的内容
  

### v1.1.6

- 优化了查询界面部分内容显示
- 初始化部分的代码重构
  
### v1.1.5

- 修复更新失败的问题
- 增加了帮助文档

### v1.1.4

- 还是修复了用户查询失败的问题，真不是我的问题，是米哈游有问题！

### v1.1.3

- 修复了用户查询的深渊和角色详情查询失败的问题
- 修复了手动检测更新下安装失败的问题
  
### v1.1.2

- 修复了用户查询失败的问题
- 部分代码重构
  
### v1.1.0/v1.1.1

- 增加了自动更新功能，实现方法有点辣鸡，详见：[嘟嘟可](https://github.com/ChanIok/Dodoco/)
  
### v1.0.9.1

- 增加了OCR全屏截图模式
- 修复了上个版本进阶设置无效的问题
- 修复了打开热键地图功能可能会报错的问题

### v1.0.9

- 增加了自定义窗口句柄和截图设置
- C++的代码重构
- IPC的部分代码重构
- 增加了界面左下角的弹出菜单


### v1.0.8.1

- 增加了 OCR的防重复抓取、自定义热键
- 部分代码重构
  
### v1.0.8

- 引入了worm大佬的网站[莫娜占卜铺](https://github.com/wormtql/genshin_artifact)
- 添加了啰嗦的文字说明
- 修复了OCR数据处理时的个别问题
  
### v1.0.7

- 将圣遗物 OCR 时的消息反馈改成固定浮窗
- 优化界面
- 优化对OCR返回的数据的处理
  

### v1.0.6

- 增加圣遗物 OCR 时的消息反馈
- 修复角色查询界面的显示问题
  
### v1.0.5

- 增加圣遗物 OCR 导出功能，仅支持导出为 json 格式

### v1.0.4

- 优化查询界面
- 增加读取 Cookie 时，查询数据时的通知提醒框

### v1.0.3

- 完善角色查询的深渊查询

### v1.0.2

- 增加角色查询
- 可指定设置 Cookie
- 增加自动读取 刷新米游社观测枢地图 时的 Cookie 的功能

### v1.0.1

- 增加自定义热键
- 优化切换回游戏窗口造成的闪烁
- 优化禁止多开

### v1.0.0

- 初始版本

- 地图预览功能
- 通过热键打开独立地图
