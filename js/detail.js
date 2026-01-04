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
let lineDom  = document.querySelector('.evaluation-hero-bar')
lineDom.addEventListener('click',function(event){
    //1.获取当前点击的位置（相对于自身盒子的 x轴的位置）
    let offsetX = event.offsetX;
    // 修改实心星星（评分条）的宽度为这个点击位置
    lineDom.childNodes[1].style.width = offsetX+'px';
    //计算出最终得分
    numDom.innerText = (offsetX/150*100).toFixed(0) + '%';
})

// 初始化调用
updateTotal();
switchImage();
changeType();