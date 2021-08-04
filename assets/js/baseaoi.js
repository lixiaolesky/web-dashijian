$.ajaxPrefilter(function (options){
    
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);
    // 统一为有权限的接口设置header请求头
    if(options.url.indexOf('/my/') !==-1) {
        options.headers={
            Authorization:localStorage.getItem('token') || ''
        }  
    }
    // 全局统一挂载complete函数
    options.complete = function (res) {
        // 判断服务器响应结果成功或者失败
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.清除本地token
            localStorage.removeItem('token');
            // 2.重新跳转到登录界面
            location.href = '/login.html';
        }
    }
})