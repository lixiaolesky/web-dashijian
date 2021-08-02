$(function () {
    // 点击去注册链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击登录链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    // 从layui获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify()自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('#pwd').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    // 监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',
            data,
            function (res) {
                if (res.status !== 0) { 
                    console.log(res.message);
                    return layer.msg(res.message)
                } 
                    layer.msg('注册成功,请登录');
                    $('#link_login').click();   
            }
        )
    })
    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        $.ajax(
            {
                url: '/api/login',
                method: 'POST',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) { 
                        return layer.msg(res.message)
                    }
                    layer.msg('登录成功');
                    console.log(res.token);
                    // 将登入成功的的token存入localstorage
                    localStorage.setItem('token',res.token)
                    // 跳转到后台主页
                    location.href='/index.html'
                }
            }
        )
    })
})