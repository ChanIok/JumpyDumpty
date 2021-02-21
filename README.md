# JumpyDumpty

**蹦蹦炸弹——原神小工具箱**

Electron + Vue + AntDesign

新手尝试，还有很多不足的地方

## 功能：

- 热键资源地图

  由于平时在探索地图找资源时（如神瞳，特产，宝箱），需要用浏览器打开资源地图对照着来找，但如果频繁切换窗口会过于麻烦，就算用 Alt+Tab 也有闪烁，于是弄了这个热键呼出地图的小工具。

  默认加载米游社观测枢的地图，游戏中的标点可同步
  支持独立地图的热键呼出和隐藏

  呼出地图窗口后，由于原神从游戏切换其他窗口默认会最小化，隐藏地图窗口时调用了 windows api 的函数重新激活原神窗口，从而实现近似于游戏地图的体验

* 角色查询

  刷新观测枢地图时，用 Electron 的 webRequest 功能拦截 headers，获取 cookie

  查询的 API 和方法源自于 GitHub 上的各位大佬

  使用方法：

  - 运行程序，在设置界面开启“自动抓取Cookie”
  - 切换快捷地图功能，打开地图预览，登录米游社
  - 通过切换来刷新该页面，消息提示成功即可直接在角色查询界面输入UID查询

* 圣遗物 OCR 导出（测试中）

  依赖：百度 OCR 的 API，需要提供百度 OCR 的相关 Key。获取方法：登录官网创建 OCR 应用即可,[点我打开官网](https://login.bce.baidu.com/)

  运行条件：

  - 管理员权限(无权限只能手动抓取)
  - 游戏必须保持前台，即使是独占全屏也可以（但全屏下不能看到其他窗口消息，不太建议）
  - 分辨率必须为 16：9，如 3840×2160，2560X1440，1920×1080，1600×900，1366×768，1280×720

  建议窗口模式下运行，分辨率越高越好（测试在 1280\*720 的情况下，百度 OCR 少数结果存在漏掉百分号或者逗号甚至数字的情况），Api 建议使用高精度版（每天 500 次，应该没人会用完吧）

  使用方法：

  - 运行程序，先输入你的 ApiKey 和 SecretKey，点击获取 AccessToken
  - 可手动点击按钮抓取
  - 默认注册热键为 Alt+R，按下该热键后，开启快速抓取模式，程序自动捕捉鼠标点击事件来抓取游戏屏幕并 OCR 识别（此时只需要逐个点击背包的圣遗物即可）

  注意事项：

  - 暂时没处理圣遗物的等级和星数，导出的 json 可配合 worm 大佬的项目使用：[莫娜占卜铺](https://github.com/wormtql/genshin_artifact)，[官网](http://www.genshin.art/#/)
  - 快速抓取模式下可以进行鼠标拖动（可以随便拖动背包界面），仅鼠标点击会被判定为有效。
  - 不要尝试在同一个圣遗物的详细界面多次点击鼠标，会重复录入
  - 快速抓取模式下的点击不要太快，百度 api 默认限制 1 秒两次请求
  - 相关功能还在完善......

## 使用：

v1.0.4,v1.0.5beta 已打包，解压直接运行：  
https://wws.lanzous.com/b01zxfq8j
密码:boom

## 更新日志：

### v1.0.5beta

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
