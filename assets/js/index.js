$(function () {
 // 调用getuserinfo方法获取用户基本信息
    getUserInfo();
    var layer = layui.layer
    // 点击退出按钮实现退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function (index) {
            // 1.清除本地token
            localStorage.removeItem('token')
            // 2.重新跳转到登录界面
            location.href = '/login.html';
            // 3.关闭confirm提示框
            layer.close(index);
          });
    })
})
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            console.log(res.data);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用渲染头像函数
            renderAvatar(res.data);
        },
        // 无论成功或者失败都会调用Ajax中的complete函数
        
    })
}
// 渲染用户头像函数
function renderAvatar(user) {
    console.log(user.username);

    // 获取用户名称
    var name = user.nickname || user.username;
    // 设置欢迎文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1渲染图像头像
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文本图像
        $('.layui-nav-img').hide();
        var first = name[1].toUpperCase();
        $('.text-avatar').html(first).show();

    }
    
} 