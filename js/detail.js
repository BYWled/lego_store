// 数据引入部分
fetch('./data/nav.json')
    .then(response => response.json())
    .then(navData => {
        // 导航栏数据
        navData.nav_items.forEach(item => {
            document.querySelector('.nav-area').innerHTML += `<span class="nav-item a">${item}</span>`;
        });
    })
    .catch(error => {
        console.error("Error loading nav data:", error);
    });

// 数量变动的部分
function updateTotal() {
    // 按钮操作
    let count_btns = document.querySelectorAll('.count-btn');
    let count_input = document.querySelector('.info-count');
    count_btns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (this.innerText === '+') {
                count_input.value = parseInt(count_input.value) + 1;
            } else if (this.innerText === '-' && parseInt(count_input.value) > 1) {
                count_input.value = parseInt(count_input.value) - 1;
            }
        });
    });
    // 数量输入框操作
    count_input.addEventListener('input', function () {
        let val = parseInt(this.value);
        if (isNaN(val) || val < 1) {
            val = 1;
        }
        this.value = val;
    });
}

// 图片切换部分
function switchImage() {
    // 图片选项卡
    let bigItemDoms = document.querySelectorAll('.info-img')
    let imgItemDoms = document.querySelectorAll('.info-mini-img')
    // 需要知道当前是第几张图  (配合上一张 下一张按钮的交互)
    let imgIndex = 0
    //默认显式和选中
    imgItemDoms[0].style.border = '2px solid #f60'
    bigItemDoms[0].style.display = 'block'
    for (let i = 0; i < imgItemDoms.length; i++) {
        imgItemDoms[i].addEventListener('mouseover', function () {
            //存一下当前是第几章 移入了
            imgIndex = i;
            //传入 当前选中的是第几张
            setImgActive(i)
        })
    }
    // 点击上一张 下一张交互 
    // 需要知道当前是第几张图  
    // 点击下一张，在 imgIndex++; 重置选中样式 给当前这张图添加选中效果
    // 点击上一张，在 imgIndex--； 重置选中样式 给当前这张图添加选中效果
    let preBtn = document.querySelector('#pre');
    let nextBtn = document.querySelector('#next');
    preBtn.addEventListener('click', function () {
        imgIndex--;
        //  如果imgIndex--之后<0 将赋值为imgItemDoms.length-1
        if (imgIndex < 0) {
            imgIndex = imgItemDoms.length - 1;
        }
        setImgActive(imgIndex)
    })
    nextBtn.addEventListener('click', function () {
        imgIndex++;
        //  如果imgIndex++之后>=imgItemDoms.length 将赋值为0
        if (imgIndex >= imgItemDoms.length) {
            imgIndex = 0
        }
        setImgActive(imgIndex)
    })
    // 优化代码 将重复代码封装起来
    function setImgActive(imgIndex) {
        // 重置默认样式
        for (let j = 0; j < imgItemDoms.length; j++) {
            imgItemDoms[j].style.border = 'none'
            bigItemDoms[j].style.display = 'none'
        }
        imgItemDoms[imgIndex].style.border = '2px solid #f60'
        bigItemDoms[imgIndex].style.display = 'block'
    }
}

// 按钮切换状态
let right_titles = document.querySelectorAll('.after-right-title');
// 激活区域函数
function activeArea(num) {
    right_titles[num].classList.add('active'); // 设置当前按钮为激活样式
}
// 切换区域函数
function changeArea(num) {
    right_titles[Number(!num)].classList.remove('active'); // 移除按钮激活样式
    activeArea(num);
}
right_titles[0].addEventListener('click', function () { changeArea(0); }); // 给每个按钮绑定点击事件
right_titles[1].addEventListener('click', function () { changeArea(1); }); // 给每个按钮绑定点击事件
activeArea(1); // 默认激活第二个选项卡

// 种类点击变换
function changeType() {
    let typeItems = document.querySelectorAll('.info-type-item');
    typeItems.forEach(item => {
        item.addEventListener('click', function () {
            // 先清除其他选中状态
            typeItems.forEach(i => {
                i.classList.remove('select');
                i.childNodes[1].classList.remove('select');
            });
            this.classList.add('select');
            this.childNodes[1].classList.add('select');
        })
    })
}

// 点击修改评价（TODO:实验）
let numDom = document.querySelector('.evaluation-hero-num')
let lineDom = document.querySelector('.evaluation-hero-bar')
lineDom.addEventListener('click', function (event) {
    //1.获取当前点击的位置（相对于自身盒子的 x轴的位置）
    let offsetX = event.offsetX;
    // 修改实心星星（评分条）的宽度为这个点击位置
    lineDom.childNodes[1].style.width = offsetX + 'px';
    let num = (offsetX / 1.5).toFixed(0);
    //计算出最终得分
    numDom.innerText = num < 10 ? `0${num}%` : `${num}%`;
})

// 购物车跳转
document.querySelector('.shopping-car-area').addEventListener('click', function () {
    location.href = './shoppingCar.html';
});

// 通过localStorage添加商品到购物车
document.querySelector('#add-cart').addEventListener('click', function () {
    // 获取商品信息
    let item = {
        img_src: document.querySelector('.info-img').src,
        name: document.querySelector('.info-title').innerText,
        price: parseFloat((document.querySelector('.info-price').innerText).slice(1)),
        count: parseInt(document.querySelector('.info-count').value)
    }
    let items = localStorage.getItem('lego-shoppingItems') || '[]';
    if (items) {
        items = JSON.parse(items);
        items.push(item);
        localStorage.setItem('lego-shoppingItems', JSON.stringify(items));
    } else {
        localStorage.setItem('lego-shoppingItems', JSON.stringify([item]));
    }
    // 跳转到购物车页面
    location.href = './shoppingCar.html';
});

// 按钮操控部分
function btnsControl() {
    // 获取元素
    let nowPages = document.querySelectorAll('.page-btn');
    let prePageBtn = document.querySelector('.page-btns>.next-page:first-child');
    let nextPageBtn = document.querySelector('.page-btns>.next-page:last-child');
    let prePages = document.querySelector('.pre-pages');
    let centerPages = document.querySelector('.center-pages');
    let nextPages = document.querySelector('.next-pages');

    // 更新界面状态
    function updateStatus() {
        let activeBtn = document.querySelector('.page-btn.active');
        let nowNum = parseInt(activeBtn.innerText);
        let isCenter = centerPages.classList.contains('active');

        // 上一页箭头
        if (nowNum > 1) {
            prePageBtn.classList.add('active');
        } else {
            prePageBtn.classList.remove('active');
        }

        // 左侧省略号
        // 如果是1，说明到头了，即隐藏左省略号
        if (nowPages[0].innerText === '1') {
            prePages.classList.remove('active');
        } else {
            prePages.classList.add('active');
        }
        // if (isCenter) {
        //     // 如果处于分裂模式，检查左侧第一个按钮是否已经是1
        //     // 如果是1，说明到头了，即隐藏左省略号
        //     if (nowPages[0].innerText === '1') {
        //         prePages.classList.remove('active');
        //     } else {
        //         prePages.classList.add('active');
        //     }
        // } else {
        //     // 正常只要屏幕上有小于7的数字，就隐藏左省略号
        //     let has7 = false;
        //     nowPages.forEach(btn => {
        //         if (parseInt(btn.innerText) < 7) has7 = true;
        //     });
        //     if (!has7) {
        //         prePages.classList.add('active');
        //     } else {
        //         prePages.classList.remove('active');
        //     }
        // }
    }

    // 清除激活状态
    function clearActive() {
        nowPages.forEach(btn => btn.classList.remove('active'));
    }

    // 手撕查找激活索引
    function getActiveIndex() {
        for (let i = 0; i < nowPages.length; i++) {
            if (nowPages[i].classList.contains('active')) return i;
        }
        // 未找到返回-1
        return -1;
    }

    // 数字点击
    nowPages.forEach(btn => {
        btn.addEventListener('click', function () {
            let num = parseInt(this.innerText);
            clearActive();
            centerPages.classList.remove('active');
            // 恢复连续序列
            for (let i = 0; i < nowPages.length; i++) {
                nowPages[i].innerText = num + i;
            }
            nowPages[0].classList.add('active');
            updateStatus();
        });
    });

    // 上一页箭头
    prePageBtn.addEventListener('click', function () {
        let activeBtn = document.querySelector('.page-btn.active');
        let targetNum = parseInt(activeBtn.innerText) - 1;
        // 防止翻页到0以下
        if (targetNum >= 1) {
            let foundIndex = -1;
            // 查找目标页码是否在当前显示范围内
            for (let i = 0; i < nowPages.length; i++) {
                if (parseInt(nowPages[i].innerText) === targetNum) {
                    foundIndex = i;
                    break;
                }
            }
            // 如果目标页码在当前显示范围内，激活对应按钮，否则整体页码减1
            if (foundIndex !== -1) {
                clearActive();
                nowPages[foundIndex].classList.add('active');
            } else {
                nowPages.forEach(btn => {
                    btn.innerText = parseInt(btn.innerText) - 1;
                });
            }
            updateStatus();
        }
    });
    // 下一页箭头同理
    nextPageBtn.addEventListener('click', function () {
        let activeBtn = document.querySelector('.page-btn.active');
        let targetNum = parseInt(activeBtn.innerText) + 1;
        let foundIndex = -1;
        for (let i = 0; i < nowPages.length; i++) {
            if (parseInt(nowPages[i].innerText) === targetNum) {
                foundIndex = i;
                break;
            }
        }
        if (foundIndex !== -1) {
            clearActive();
            nowPages[foundIndex].classList.add('active');
        } else {
            nowPages.forEach(btn => {
                btn.innerText = parseInt(btn.innerText) + 1;
            });
        }
        updateStatus();
    });

    // 右侧省略号
    nextPages.addEventListener('click', function () {
        let activeBtn = document.querySelector('.page-btn.active');
        let isCenter = centerPages.classList.contains('active');
        // 是否处于分裂状态
        if (isCenter) {
            // 激活是右侧先切换到左侧
            if (getActiveIndex() > 2) {
                nowPages[2].innerText = parseInt(activeBtn.innerText);
                clearActive();
                // 激活右侧第一个(不激活在最后一个，保证逻辑的视觉连贯性)
                nowPages[2].classList.add('active');
                let changeNum = parseInt(nowPages[2].innerText);
                nowPages[0].innerText = changeNum - 2;
                nowPages[1].innerText = changeNum - 1;
                nowPages[3].innerText = changeNum + 4;
                nowPages[4].innerText = changeNum + 5;
                nowPages[5].innerText = changeNum + 6;
                // 这个奇怪的第2页，所有bug都是你造成的
                if (changeNum - 2 < 1) {
                    nowPages[0].innerText = 1;
                    nowPages[1].innerText = 2;
                    nowPages[2].innerText = 3;
                    clearActive();
                    nowPages[1].classList.add('active');
                }
            } else {
                // 如果已经在左侧，则递增右侧页码
                for (let i = 3; i < 6; i++) {
                    nowPages[i].innerText = parseInt(nowPages[i].innerText) + 3;
                }
            }
        } else {
            // 进入分裂
            let activeBtn = document.querySelector('.page-btn.active');
            let startNum = parseInt(activeBtn.innerText);
            clearActive();
            centerPages.classList.add('active');
            nowPages[0].classList.add('active');
            nowPages[0].innerText = startNum;
            nowPages[1].innerText = startNum + 1;
            nowPages[2].innerText = startNum + 2;
            nowPages[3].innerText = startNum + 6;
            nowPages[4].innerText = startNum + 7;
            nowPages[5].innerText = startNum + 8;
        }
        updateStatus();
    });
    // 左侧省略号
    prePages.addEventListener('click', function () {
        let activeBtn = document.querySelector('.page-btn.active');
        let isCenter = centerPages.classList.contains('active');
        let isFu = false;
        if (isCenter) {
            // 如果当前激活的是左侧先切换到右侧
            if (getActiveIndex() <= 2) {
                nowPages[3].innerText = parseInt(activeBtn.innerText);
                clearActive();
                // 激活右侧第一个
                nowPages[3].classList.add('active');
                let changeNum = parseInt(nowPages[3].innerText);
                nowPages[0].innerText = changeNum - 6;
                nowPages[1].innerText = changeNum - 5;
                nowPages[2].innerText = changeNum - 4;
                nowPages[4].innerText = changeNum + 1;
                nowPages[5].innerText = changeNum + 2;
                if (changeNum - 6 < 1) {
                    isFu = true;
                }
            } else {
                // 如果已经在右侧，则递减左侧页码
                for (let i = 0; i < 3; i++) {
                    let num = parseInt(nowPages[i].innerText) - 3;
                    // 负数判断
                    if (num < 1) {
                        isFu = true;
                        break;
                    }
                    nowPages[i].innerText = num;
                }
            }
            // 如果小于1,重置为1,2,3
            if (isFu) {
                for (let i = 0; i < 3; i++) {
                    nowPages[i].innerText = i + 1;
                }
            }
        } else {
            // 进入分裂
            let activeBtn = document.querySelector('.page-btn.active');
            let endNum = parseInt(activeBtn.innerText);
            clearActive();
            centerPages.classList.add('active');
            nowPages[5].classList.add('active');
            nowPages[3].innerText = endNum - 2;
            nowPages[4].innerText = endNum - 1;
            nowPages[5].innerText = endNum;
            let baseNum = parseInt(nowPages[3].innerText);
            nowPages[0].innerText = baseNum - 6;
            nowPages[1].innerText = baseNum - 5;
            nowPages[2].innerText = baseNum - 4;
            // 负数判断
            if (parseInt(nowPages[0].innerText) <= 0) {
                for (let i = 0; i < 3; i++) {
                    nowPages[i].innerText = i + 1;
                }
            }
            // 右侧负数判断（专防第二页点左侧省略号）
            if (endNum == 2) {
                nowPages[3].innerText = 1;
                nowPages[4].innerText = 2;
                nowPages[5].innerText = 3;
                clearActive();
                nowPages[4].classList.add('active');
            }
        }
        updateStatus();
    });

    // 中间省略号
    centerPages.addEventListener('click', function () {
        centerPages.classList.remove('active');
        let activeNum = parseInt(document.querySelector('.page-btn.active').innerText);
        // 判断当前激活按钮位置
        if (getActiveIndex() <= 2) {
            // 在左侧，变第一位
            for (let i = 0; i < nowPages.length; i++) {
                nowPages[i].innerText = activeNum + i;
            }
            clearActive();
            nowPages[0].classList.add('active');
        } else {
            // 在右侧，变最后一位
            for (let i = 5; i >= 0; i--) {
                nowPages[i].innerText = activeNum - 5 + i;
            }
            clearActive();
            nowPages[nowPages.length - 1].classList.add('active');
            // 负数判断
            if (parseInt(nowPages[0].innerText) <= 0) {
                for (let i = 0; i < 3; i++) {
                    nowPages[i].innerText = i + 1;
                }
            }
        }
        // 如果按钮有重复值，则一定是前六个的情况，重置为1-6
        activeNum = parseInt(document.querySelector('.page-btn.active').innerText) - 1;
        let nums = [];
        nowPages.forEach(btn => {
            nums.push(parseInt(btn.innerText));
        })
        let newNums = [];
        nums.map(item => {
            if (newNums.indexOf(item) === -1) {
                newNums.push(item);
            }
        });
        if (newNums.length < nums.length) {
            for (let i = 0; i < nowPages.length; i++) {
                nowPages[i].innerText = i + 1;
            }
        }
        clearActive();
        nowPages[activeNum].classList.add('active');
        updateStatus();
    });

    // 初始化运行一次
    updateStatus();
}

// 初始化调用
updateTotal();
switchImage();
changeType();
btnsControl(); 