// 切换选项卡功能实现
let title_btns = document.querySelectorAll('.title-btn');// 获取所有标题按钮
let contents = document.querySelectorAll('.content'); // 获取所有内容区域
// 激活区域函数
function activeArea(num) {
    contents[num].classList.add('active'); // 显示对应内容区域
    title_btns[num].classList.add('active'); // 设置当前按钮为激活样式
}
// 切换区域函数
function changeArea(num) {
    contents[Number(!num)].classList.remove('active'); // 隐藏对应内容区域
    title_btns[Number(!num)].classList.remove('active'); // 移除按钮激活样式
    activeArea(num);
}
title_btns[0].addEventListener('mouseover', function () { changeArea(0); }); // 给每个按钮绑定点击事件
title_btns[1].addEventListener('mouseover', function () { changeArea(1); }); // 给每个按钮绑定点击事件
activeArea(0); // 默认激活第一个选项卡

// 输入框清除按钮功能实现
// 显示或隐藏清除按钮
let inputBox = document.querySelectorAll('.input-box');
let deleteBtn = document.querySelector('.input-delete');
inputBox[0].addEventListener('input', function () {
    if (this.value.length > 0) {
        deleteBtn.style.display = 'block';
    } else {
        deleteBtn.style.display = 'none';
    }
});
// 清除输入框内容
deleteBtn.addEventListener('click', function () {
    inputBox[0].value = '';
    this.style.display = 'none';
});

// 显隐弹窗函数
function Alert(string) {
    document.querySelector('#alert-text').textContent = string;
    document.querySelector('.alert-window').style.display = 'flex';
    document.querySelector('#alert-btn').onclick = function () {
        document.querySelector('.alert-window').style.display = 'none';
    }
}

// 表单验证部分
document.querySelector('.login-btn').addEventListener('click', function () {
    // 为空判断
    if (inputBox[0].value.trim() === '' || inputBox[1].value.trim() === '') {
        Alert('请输入用户名和密码！');
        return 0;
    }

    // 获取localStorage中的用户数据并验证
    // 假设没跳转成功
    let notLogon = true;
    let users = localStorage.getItem('lego-users') || []; // 为空判断
    if (users !== '[]' && users.length > 0) {
        JSON.parse(users).forEach(function (item) {
            if (item.username === inputBox[0].value.trim() && item.password === inputBox[1].value.trim()) {
                // 向localStorage中写入已登录信息
                localStorage.removeItem('lego-current-user');
                localStorage.setItem('lego-current-user', JSON.stringify(item.username));
                Alert(`登录成功，欢迎您，${item.username}！`);
                document.querySelector('#alert-btn').addEventListener('click', function () {
                    window.location.href = 'index.html';
                });
                notLogon = false;
            }
        })
    }
    if (notLogon) {
        Alert('用户名或密码错误！');
    }
});

// 绑定注册按钮
document.querySelector('.res-btn-area').addEventListener('click', function () {
    window.location.href = 'register.html';
});