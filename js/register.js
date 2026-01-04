// 注册合法性检测
function validateRegister(VCode) {
    // 获取输入值
    let username = document.querySelector('#username').value.trim();
    let password = document.querySelector('#password').value.trim();
    let confirmPassword = document.querySelector('#confirm-password').value.trim();
    let phone = document.querySelector('#phone').value.trim();
    let inputVCode = document.querySelector('#v-code').value.trim();
    let inputPCode = document.querySelector('#p-code').value.trim();
    
    // 清除错误信息
    let errorSpans = document.querySelectorAll('.err');
    errorSpans.forEach(span => span.textContent = '');

    // 获取localStorage中的用户数据并验证
    let users = localStorage.getItem('lego-users') || []; // 为空判断

    // 验证用户名
    // 首先检查是否为空
    if (username !== '') {
        // 检查长度是否在3到15个字符之间
        if (username.length >= 3 && username.length <= 15) {
            // 检查是否只包含字母、数字和下划线
            if (!/^\w+$/.test(username)) {
                errorSpans[0].textContent = '用户名只能包含字母、数字和下划线';
                return false;
            }
        } else {
            errorSpans[0].textContent = '用户名长度应为3-15个字符';
            return false;
        }
    } else {
        errorSpans[0].textContent = '用户名不能为空';
        return false;
    }

    // 验证密码
    if (password !== '') {
        if (password.length < 6 || password.length > 20) {
            errorSpans[1].textContent = '密码长度应为6-20个字符';
            return false;
        }
    } else {
        errorSpans[1].textContent = '密码不能为空';
        return false;
    }

    // 验证确认密码
    if (confirmPassword !== password) {
        errorSpans[2].textContent = '两次输入的密码不一致';
        return false;
    }

    // 验证手机号
    if (!/^1[3-9]\d{9}$/.test(phone)) {
        errorSpans[3].textContent = '请输入有效的手机号';
        return false;
    }

    // 验证图形验证码
    if (inputVCode !== VCode) {
        errorSpans[4].textContent = '图形验证码错误';
        return false;
    }

    // TODO:验证短信验证码
    if (inputPCode === '') {
        Alert('请输入手机验证码');
        return false;
    }

    // 验证用户名是否已存在
    if (users !== '[]' && users.length > 0) {
        JSON.parse(users).forEach(function (item) {
            if (item.username === username) {
                Alert('该用户名已被注册，请更换用户名');
                return false;
            }
        })
    }

    // 如果所有验证都通过，保存localStorage并返回true
    let newUser = { "username": username, "password": password }; // 组装新用户对象
    let usersArray = users === '[]' || users.length === 0 ? [] : JSON.parse(users); // 为空判断
    usersArray.push(newUser);
    localStorage.removeItem('lego-users');
    localStorage.setItem('lego-users', JSON.stringify(usersArray));
    return true;
}

// 载入验证码函数：返回生成的验证码字符串
function loadVCode() {
    let vCode = document.querySelector('.v-img');
    // 定义字符集，排除容易混淆的字符
    let numbers = '23456789'; // 排除 0,1
    let upperLetters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // 排除 I,O
    let lowerLetters = 'abcdefghijkmnpqrstuvwxyz'; // 排除 l,o
    // 确保验证码包含至少一个数字和一个字母
    let captcha = '';
    // 先生成一个随机数乘字符串长度，向下取整即可以保证索引在字符串范围内（0~n-1），通过charAt获取该随机位置的字符，下同理。
    captcha += numbers.charAt(Math.floor(Math.random() * numbers.length));
    captcha += upperLetters.charAt(Math.floor(Math.random() * upperLetters.length));
    // 随机填充剩余字符
    let allChars = numbers + upperLetters + lowerLetters;
    for (let i = captcha.length; i < 5; i++) {
        captcha += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    let charHTML = '';
    // 遍历字符串打印
    for (let char of captcha) {
        // 为每个字符添加随机样式
        let rotation = Math.random() * 30 - 15; // -15到15度之间的随机角度
        let marginLeft = Math.random() * 18 - 3; // -3到15px之间的随机间距
        let fontSize = 24 - Math.random() * 4; // 20-24px之间的随机字体大小
        let color = `#${Math.floor((Math.random() * 128))}00ff`; // 16进制实现深蓝色到紫红色之间的随机颜色
        let fontWeight = Math.random() > 0.8 ? 'bold' : 'normal'; // 随机字体粗细
        let textDecoration = Math.random() > 0.6 ? 'line-through' : 'none'; // 随机横线样式
        // 组合样式字符串
        let style = `transform: rotate(${rotation}deg); margin-left: ${marginLeft}px; font-size: ${fontSize}px; color: ${color}; font-weight: ${fontWeight}; text-decoration: ${textDecoration};`;
        // 构建带样式的字符HTML
        charHTML += `<span style="${style}">${char}</span>`;
    }
    let back_color = `#aaaa${Math.floor((Math.random() * 80) + 10)}`; // 16进制实现浅黄色到浅蓝色之间的随机背景色
    // 应用到验证码容器
    vCode.style.backgroundColor = back_color;
    vCode.innerHTML = charHTML;
    return captcha;
}

// 显隐弹窗函数
function Alert(string) {
    document.querySelector('#alert-text').textContent = string;
    document.querySelector('.alert-window').style.display = 'flex';
    document.querySelector('#alert-btn').onclick = function () {
        document.querySelector('.alert-window').style.display = 'none';
    }
}

// 点击注册按钮后的事件
function registerBtnClick(VCode) {
    
}

// 初始化函数
function init() {
    // 清除注册按钮（防止多次绑定）
    document.querySelector('#register-button').replaceWith(document.querySelector('#register-button').cloneNode(true));// 复制并替换按钮
    // 载入验证码
    let VCode = loadVCode();
    // 点击验证码图片时重新生成验证码
    document.querySelector('.v-img').addEventListener('click', function () {
        VCode = loadVCode();
    });
    document.querySelector('.v-btn').addEventListener('click', function () {
        isPCode = true;
    });
    // registerBtnClick(VCode);
    // 绑定注册按钮点击事件
    document.querySelector('#register-button').addEventListener('click', function () {
        // 是否同意协议
        if (document.querySelector('#agree-checkbox').checked) {
            // 未发验证码直接警告
            if (isPCode) {
                // 注册合法性检测
                if (validateRegister(VCode)) {
                    // 等待关闭弹窗后登录
                    Alert('注册成功！即将跳转到登录页面');
                    setTimeout(function () {
                        window.location.href = 'login.html';
                    }, 3000);
                }
            } else {
                Alert('请获取手机验证码');
            }
        } else {
            Alert('请同意用户注册协议和隐私政策');
        }
        // 只要没跳走就重新初始化
        init();
    });
}

// 初始化
// 先检查是否发送短信验证码
let isPCode = false;
init();

// 绑定登录按钮点击事件
document.querySelector('#nav-login').addEventListener('click', function () {
    window.location.href = 'login.html';
});