window.onload = function () {
    let gxl_blog = document.querySelector('.gxl-blog')
    let gxl_github = document.querySelector('.gxl-github')
    let gxl = new Gxl();
    gxl.requestPermission();
    let startTimer = setTimeout(()=>{
        gxl.showNotification();
        clearTimeout(startTimer);
    },3000)
    gxl_blog.addEventListener(gxl.eventReset('click'), ()=>{
        location.href = 'https://gxlself.com/blog'
    })
    gxl_github.addEventListener(gxl.eventReset('click'), ()=>{
        location.href = 'https://github.com/gxlself'
    })
    gxl.personalConslog();
}

class Gxl{
    constructor(){
        this.isPhone = this.checkPhone()
        this.isNotificationSupported = 'Notification' in window
    }
    eventReset(type){
        this.isPhone ? this.clickVal = 'touchstart' : this.clickVal ='click'
        this.isPhone ? this.moveVal = 'touchmove' : this.moveVal ='mousedown'
        let val = ''
        switch (type){
            case 'click':
                val =  this.clickVal;
                break;
            case 'move':
                val = this.moveVal;
                break;
        }
        return val
    }
    checkPhone(){
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
            return true
        }else {
            return false
        }
    }
    personalConslog(){
        console.log([
            "                   _ooOoo_",
            "                  o8888888o",
            "                  88\" . \"88",
            "                  (| -_- |)",
            "                  O\\  =  /O",
            "               ____/`---'\\____",
            "             .'  \\\\|     |//  `.",
            "            /  \\\\|||  :  |||//  \\",
            "           /  _||||| -:- |||||-  \\",
            "           |   | \\\\\\  -  /// |   |",
            "           | \\_|  ''\\---/''  |   |",
            "           \\  .-\\__  `-`  ___/-. /",
            "         ___`. .'  /--.--\\  `. . __",
            "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
            "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
            "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
            "======`-.____`-.___\\_____/___.-`____.-'======",
            "                   `=---='",
            "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
            "         佛祖保佑       永无BUG"
        ].join('\n'));
    }
    isPermissionGranted(){
        return Notification.permission === 'granted';
    }
    requestPermission(){
        if(!this.isNotificationSupported){
            return;
        }
        Notification.requestPermission(status=>{
            let permission = Notification.permission;
        })
    }
    showNotification(){
        if (!this.isNotificationSupported) {
            return;
        }
        if (!this.isPermissionGranted()) {
            return;
        }
        let gxl_custom = this.getStorage('gxl_custom');
        let currentTimes = new Date().getTime();

        if (gxl_custom && (currentTimes - gxl_custom) / 1000 / 3600 / 24 < 7) {
            return
        }
        this.setStorage('gxl_custom', currentTimes, () => {
            var n = new Notification("gxlself对您发来问候", {
                icon : 'gxl.png',
                body : '欢迎来访,鄙人万分感激! 点击即可跳转至我的博客页面~'
            });
            n.onshow = function () {
                let noticeTimer = setTimeout(function() {
                    n.close();
                    clearTimeout(noticeTimer)
                }, 5000);
            }
            n.onclick = function () {
                location.href = 'https://gxlself.com/blog'
                n.close()
            }
            n.onerror = function (err) {
                console.log(err)
            }
            n.onclose = function () {
                console.log('gxlself消息窗口关闭')
            }
        })
    }
    setStorage(key, value, success) {
        localStorage.setItem(key, value)
        typeof success == 'function' && success()
    }
    getStorage(key) {
        return localStorage.getItem(key);
    }
}