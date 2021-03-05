 //创建系统通知区菜单
 let tray
 function createTray(){
    tray = new Tray(path.resolve(__dirname, './assets/red.ico'));
    const contextMenu = Menu.buildFromTemplate([{
            label: '显示界面',
            click: () => {
                win.show()
            }
        }, {
            type: 'separator'
        }, {
            label: '退出',
            click: () => {
                win.destroy()
                // app.quit()
                // app.exit()
            }
        }, //退出
    ])
    tray.setToolTip('这是一个蹦蹦炸弹')
    tray.setContextMenu(contextMenu)
    tray.on('double-click', () => { //打开关闭应用
        win.isVisible() ? win.hide() : win.show()
        win.isVisible() ? win.setSkipTaskbar(false) : win.setSkipTaskbar(true);
    })
 }
module.exports={createTray}