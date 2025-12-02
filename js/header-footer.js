// 跳转首页
document.querySelectorAll('#index').forEach(btn => {
    btn.addEventListener('click', function () {
        window.location.href = 'index.html';
    });
});

// 跳转登录
document.querySelectorAll('#login').forEach(btn => {
    btn.addEventListener('click', function () {
        window.location.href = 'login.html';
    });
});

// 跳转注册
document.querySelectorAll('#register').forEach(btn => {
    btn.addEventListener('click', function () {
        window.location.href = 'register.html';
    });
});

// 退出登录
document.querySelector('#logout').addEventListener('click', function () {
    // 清除当前登录用户信息
    localStorage.removeItem('lego-current-user');
    // 刷新页面
    window.location.reload();
});

// 检查是否有用户登录
let currentUser = localStorage.getItem('lego-current-user');
if (currentUser) {
    currentUser = JSON.parse(currentUser);
    document.querySelectorAll('.after-login').forEach(text => text.style.display = 'inline');
    document.querySelectorAll('.before-login').forEach(text => text.style.display = 'none');
    document.querySelector('#header-username').textContent = currentUser;
} else {
    document.querySelectorAll('.after-login').forEach(text => text.style.display = 'none');
    document.querySelectorAll('.before-login').forEach(text => text.style.display = 'inline');
}