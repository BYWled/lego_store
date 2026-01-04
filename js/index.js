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
fetch('./data/index.json')
    .then(response => response.json())
    .then(data => {
        // 焦点左侧数据
        data.hero_left_items.forEach(item => {
            document.querySelector('.hero-left').innerHTML += `<div class="hero-left-item">${item}</div>`;
        });
        // 焦点左侧详情数据
        let hero_right = document.querySelector('.hero-right')
        // 倒序遍历，保证顺序正确
        data.hero_left_infos.reverse().forEach(item => {
            // 循环生成每个分类的详情栏
            // 头部分
            let hero_left_info = `<div class="hero-left-info">
                    <div class="hero-info-header-area">`;
            // header部分
            item.headers.forEach(header => {
                hero_left_info += `<span class="hero-info-header a">${header}</span>`;
            });
            // header尾部
            hero_left_info += `</div>`;
            // 内容部分
            Object.keys(item.contents).forEach(title => {
                // 小标题、分割线和内容前的html
                hero_left_info += `<p class="hero-info-title">${title}</p>
                        <hr class="hero-info-line" />
                        <div class="hero-info-text">`;
                // 遍历增加内容，在其中填充空格
                item.contents[title].forEach(item => {
                    hero_left_info += `${item}&nbsp;&nbsp;`;
                });
                // 内容尾部
                hero_left_info += `</div>`;
            })
            // 增加尾部，反向填充进html
            hero_right.innerHTML = hero_left_info + `</div>` + hero_right.innerHTML;
        });

        // 轮播图路径写入
        data.swiper_imgs.forEach(img => {
            document.querySelector('.swiper-wrapper').innerHTML += `<div class="swiper-slide">
                <img src="${img}" alt="轮播图" />
            </div>`;
        });

        // 每日商品数据写入
        data.daily_items.forEach(item => {
            document.querySelector('.daily-items').innerHTML += `<div class="daily-item a">
                    <img src="${item.img}" class="promotion-item-img">
                    <img src="./imgs/index/limitTime.jpg" class="promotion-note">
                    <span class="daily-description">${item.name}</span>
                    <span class="daily-description-higher">${item.desc}</span>
                    <span class="daily-price">¥:${item.price}</span>
                </div>`;
        });

        // 图书部分数据写入
        // 图书顶部标签写入
        data.books_nav_items.forEach(header => {
            if (header == data.books_nav_items[0]) {
                document.querySelector('.books-area .general-nav-area').innerHTML += `<span class="general-nav-item active a ">${header}</span>`;
            }
            else {
                document.querySelector('.books-area .general-nav-area').innerHTML += `<span class="general-nav-item a">${header}</span>`;
            }
        });
        // 图书左侧写入
        // 图片写入与组装头部
        document.querySelector('.books-area .leftest-area').innerHTML += `<img src="${data.books_left_img}"  class="leftest-img">
            <div class="leftest-info-area">`;
        // 信息写入
        // 二维数组遍历组装
        var leftest_num = 0;
        var isLast = false;
        var leftest_area = ``;
        data.books_left_infos.forEach(section => {
            // 检测是否为最后一组
            if (++leftest_num == data.books_left_infos.length) {
                isLast = true;
            }
            // 增加每组头部
            leftest_area += `<div class="leftest-info">`;
            // 增加每组内容
            section.forEach(item => {
                leftest_area += `<span>${item}</span>`;
                // 为最后一组的最后一个增加特殊类名与尾部
                if (isLast && item == section[section.length - 1]) {
                    leftest_area += `<span class="a">全部分类></span>`;
                }
                if (item == section[section.length - 1]) {
                    leftest_area += `</div>`;
                }
            });
        });
        // 增加左侧尾部
        document.querySelector('.books-area .leftest-info-area').innerHTML += (leftest_area + `</div>`);
        // 图书内容写入
        document.querySelector('.books-items').innerHTML += `<img src="${data.books_big_img}">`;
        data.books_items.forEach(item => {
            document.querySelector('.books-items').innerHTML += `<div class="books-item">
                    <img src="${item.img}" class="book-img">
                    <div class="book-price-area">
                        <span class="book-price">¥${item.price}</span>
                        <span class="book-price-old">¥${item.price_old}</span>
                    </div>
                </div>
            `;
        });
        // 图书排行写入
        let top_num = 1;
        data.books_top_items.forEach(item => {
            document.querySelector('.books-top-list').innerHTML += `<div class="books-top-item a">  
                <div class="books-top-num">${top_num++}</div>
                <div class="books-top-content">
                <div class="books-top-name">${item.name}</div>
                <div class="books-top-info">
                    <img src="${item.img}" alt="">
                    <div class="books-top-text">
                        ${item.name}<br />
                        ${item.desc}    
                    </div>
                </div>
            </div>`;
        });

        // 服装部分数据写入
        // 服装顶部标签写入
        data.clothes_nav_items.forEach(header => {
            if (header == data.clothes_nav_items[0]) {
                document.querySelector('.clothes-area .general-nav-area').innerHTML += `<span class="general-nav-item active a ">${header}</span>`;
            }
            else {
                document.querySelector('.clothes-area .general-nav-area').innerHTML += `<span class="general-nav-item a">${header}</span>`;
            }
        });
        // 服装左侧写入
        // 服装写入与组装头部
        document.querySelector('.clothes-area .leftest-area').innerHTML += `<img src="${data.clothes_left_img}"  class="leftest-img">
            <div class="leftest-info-area">`;
        // 信息写入
        // 二维数组遍历组装
        leftest_num = 0;
        isLast = false;
        leftest_area = ``;
        data.clothes_left_infos.forEach(section => {
            // 检测是否为最后一组
            if (++leftest_num == data.clothes_left_infos.length) {
                isLast = true;
            }
            // 增加每组头部
            leftest_area += `<div class="leftest-info">`;
            // 增加每组内容
            section.forEach(item => {
                leftest_area += `<span>${item}</span>`;
                // 为最后一组的最后一个增加特殊类名与尾部
                if (isLast && item == section[section.length - 1]) {
                    leftest_area += `<span class="a">全部分类></span>`;
                }
                if (item == section[section.length - 1]) {
                    leftest_area += `</div>`;
                }
            });
        });
        // 增加左侧尾部
        document.querySelector('.clothes-area .leftest-info-area').innerHTML += (leftest_area + `</div>`);
        // 服装高图片写入
        data.clothes_imgs.high_imgs.forEach(img => {
            document.querySelector('.clothes-area .other-right-area').innerHTML += `<img src="${img}" alt="" class="other-high-img">`;
        });
        // 服装正常图片写入
        data.clothes_imgs.imgs.forEach(img => {
            document.querySelector('.clothes-area .other-right-area').innerHTML += `<img src="${img}" alt="" class="other-img">`;
        });
        // 服装logo写入
        data.clothes_logos.forEach(logo => {
            document.querySelector('.three-parts-logos').innerHTML += `<img src="${logo}" alt="">`;
        });

        // 运动部分数据写入
        // 运动顶部标签写入
        data.sports_nav_items.forEach(header => {
            if (header == data.sports_nav_items[0]) {
                document.querySelector('.sports-area .general-nav-area').innerHTML += `<span class="general-nav-item active a ">${header}</span>`;
            }
            else {
                document.querySelector('.sports-area .general-nav-area').innerHTML += `<span class="general-nav-item a">${header}</span>`;
            }
        });
        // 左侧写入
        // 写入与组装头部
        document.querySelector('.sports-area .leftest-area').innerHTML += `<img src="${data.sports_left_img}"  class="leftest-img">
            <div class="leftest-info-area">`;
        // 信息写入
        // 二维数组遍历组装
        leftest_num = 0;
        isLast = false;
        leftest_area = ``;
        data.sports_left_infos.forEach(section => {
            // 检测是否为最后一组
            if (++leftest_num == data.sports_left_infos.length) {
                isLast = true;
            }
            // 增加每组头部
            leftest_area += `<div class="leftest-info">`;
            // 增加每组内容
            section.forEach(item => {
                leftest_area += `<span>${item}</span>`;
                // 为最后一组的最后一个增加特殊类名与尾部
                if (isLast && item == section[section.length - 1]) {
                    leftest_area += `<span class="a">全部分类></span>`;
                }
                if (item == section[section.length - 1]) {
                    leftest_area += `</div>`;
                }
            });
        });
        // 增加左侧尾部
        document.querySelector('.sports-area .leftest-info-area').innerHTML += (leftest_area + `</div>`);
        // 运动高图片写入
        data.sports_imgs.high_imgs.forEach(img => {
            document.querySelector('.sports-area .other-right-area').innerHTML += `<img src="${img}" alt="" class="other-high-img">`;
        });
        // 运动正常图片写入
        data.sports_imgs.imgs.forEach(img => {
            document.querySelector('.sports-area .other-right-area').innerHTML += `<img src="${img}" alt="" class="other-img">`;
        });
        // 运动logo写入（没有运动logo，现直接调用衣服的json）
        data.clothes_logos.forEach(logo => {
            document.querySelectorAll('.three-parts-logos')[1].innerHTML += `<img src="${logo}" alt="">`;
        });

        // 童装部分数据写入
        // 童装顶部标签写入
        data.kids_nav_items.forEach(header => {
            if (header == data.kids_nav_items[0]) {
                document.querySelector('.kids-area .general-nav-area').innerHTML += `<span class="general-nav-item active a ">${header}</span>`;
            }
            else {
                document.querySelector('.kids-area .general-nav-area').innerHTML += `<span class="general-nav-item a">${header}</span>`;
            }
        });
        // 左侧写入
        // 写入与组装头部
        document.querySelector('.kids-area .leftest-area').innerHTML += `<img src="${data.kids_left_img}"  class="leftest-img">
            <div class="leftest-info-area">`;
        // 信息写入
        // 二维数组遍历组装
        leftest_num = 0;
        isLast = false;
        leftest_area = ``;
        data.kids_left_infos.forEach(section => {
            // 检测是否为最后一组
            if (++leftest_num == data.kids_left_infos.length) {
                isLast = true;
            }
            // 增加每组头部
            leftest_area += `<div class="leftest-info">`;
            // 增加每组内容
            section.forEach(item => {
                leftest_area += `<span>${item}</span>`;
                // 为最后一组的最后一个增加特殊类名与尾部
                if (isLast && item == section[section.length - 1]) {
                    leftest_area += `<span class="a">全部分类></span>`;
                }
                if (item == section[section.length - 1]) {
                    leftest_area += `</div>`;
                }
            });
        });
        // 增加左侧尾部
        document.querySelector('.kids-area .leftest-info-area').innerHTML += (leftest_area + `</div>`);
        // 童装高图片写入
        data.kids_imgs.high_imgs.forEach(img => {
            document.querySelector('.kids-area .other-right-area').innerHTML += `<img src="${img}" alt="" class="other-high-img">`;
        });
        // 童装正常图片写入
        data.kids_imgs.imgs.forEach(img => {
            document.querySelector('.kids-area .other-right-area').innerHTML += `<img src="${img}" alt="" class="other-img">`;
        });
        // 童装logo写入（没有童装logo，现直接调用衣服的json）
        data.clothes_logos.forEach(logo => {
            document.querySelectorAll('.three-parts-logos')[2].innerHTML += `<img src="${logo}" alt="">`;
        });

        // 家居部分数据写入
        // 家居大图写入
        document.querySelector('.furniture-contents').innerHTML = `<img src="${data.furniture_big_img}" alt="" class="furniture-big-img">` + document.querySelector('.furniture-contents').innerHTML;
        // 家居右侧高图写入
        data.furniture_imgs.high_imgs.forEach(img => {
            document.querySelector('.furniture-right-area').innerHTML += `<img src="${img}" alt="" class="other-high-img">`;
        });
        // 家居右侧正常图写入
        data.furniture_imgs.imgs.forEach(img => {
            document.querySelector('.furniture-right-area').innerHTML += `<img src="${img}" alt="" class="other-img">`;
        });

        // 推广内容写入
        data.promotion_items.forEach(item => {
            document.querySelector('.promotion-list').innerHTML += `<div class="promotion-item">
                    <img class="promotion-item-img" src="${item.img}"/>
                    <p class="promotion-description">${item.name}</p>
                    <span class="price">¥${item.price}</span>
                    <div class="evaluation-area">
                        <img class="evaluation-img" src="./imgs/index/index27_14.jpg" alt="" />
                        <span class="evaluation">已有</span>
                        <span class="evaluation-higher">${item.evaluation_num}</span>
                        <span class="evaluation">人评价</span>
                    </div>
                </div>`;
        });
        // 数据写入后的监听模块调用
        index_listener();
    })
    .catch(error => {
        console.error("Error loading data:", error);
    });

// 数据写入后的监听模块
let index_listener = function () {
    // 监听hero左侧，鼠标悬浮时显示详情
    let hero_left_items = document.querySelectorAll('.hero-left-item');
    let hero_left_infos = document.querySelectorAll('.hero-left-info');
    for (let i = 0; i < hero_left_items.length; i++) {
        hero_left_items[i].addEventListener('mouseenter', function () {
            // 显示详情
            hero_left_infos[i].classList.add('active');
        });
        hero_left_items[i].addEventListener('mouseleave', function () {
            // 隐藏详情的代码
            // 移出时设置极低延迟，监测鼠标是否进入详情区域
            setTimeout(function () {
                if (!hero_left_infos[i].matches(':hover')) {
                    hero_left_infos[i].classList.remove('active');
                    // 移出详情后隐藏
                    hero_left_infos[i].addEventListener('mouseleave', function () {
                        hero_left_infos[i].classList.remove('active');
                    });
                }
            }, 10);
        });
    }

    // 电子书 手风琴效果
    let books_top_item = document.querySelectorAll('.books-top-item');
    let books_top_name = document.querySelectorAll('.books-top-name');
    let books_top_info = document.querySelectorAll('.books-top-info');
    for (let i = 0; i < books_top_item.length; i++) {
        books_top_item[i].addEventListener('mouseover', function () {
            //回到默认状态： 所有的desc 隐藏 所有的name盒子显示
            for (let j = 0; j < books_top_info.length; j++) {
                books_top_info[j].style.display = 'none';
                books_top_name[j].style.display = 'block';
            }
            //将对应的desc显示  对应的name盒子隐藏
            books_top_info[i].style.display = 'flex';
            books_top_name[i].style.display = 'none';
        })
    }

    // swiper 插件
    let swiper = new Swiper('.swiper', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: {
            delay: 2000,
        },
        // 分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return "<span class=\"" + className + "\">" + (index + 1) + " </span>";
            },
        },
        // 前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })

    // TODO:模拟跳转其它页：
    document.querySelectorAll('.daily-item').forEach(item => {
        item.addEventListener('click', function () {
            location.href = './detail.html';
        });
    });
    document.querySelector('.shopping-car-area').addEventListener('click', function () {
        location.href = './shoppingCar.html';
    });
    document.querySelector('.ticket-car').addEventListener('click', function () {
        location.href = './shoppingCar.html';
    });

    // nav点击切换样式效果（仅切换效果，实例可切换显隐内容）
    document.querySelectorAll('.general-nav-item').forEach(item => {
        item.addEventListener('click', function () {
            // 先移除同父盒子下的所有的active
            item.parentElement.querySelectorAll('.general-nav-item').forEach(i => {
                i.classList.remove('active');
            });
            // 给当前添加active
            item.classList.add('active');
        });
    });
}

// 顶部搜索栏交互
// 显示&隐藏侧边栏
// 移动到某一位置显示
window.addEventListener('scroll', function () {
    // 获取滚动条距离顶部的位置
    // 通过body和html获取滚动条距离顶部的位置
    let top = document.body.scrollTop || document.documentElement.scrollTop;
    if (top > 1085) {
        document.querySelector('.sidebar-area').style.display = 'block';
    } else {
        document.querySelector('.sidebar-area').style.display = 'none';
    }
    // 操作顶部搜索框的显示隐藏 >500
    if (top > 500) {
        document.querySelector('.top-search-area').style.height = '50px'
    } else {
        document.querySelector('.top-search-area').style.height = '0'
    }
})
// 通过js设置默认图片的展示根据循环设置位置y轴偏移
let sidebar_icon = document.querySelectorAll('.sidebar-icon');
for (let i = 0; i < sidebar_icon.length; i++) {
    sidebar_icon[i].style.background = `url('imgs/index/logos.png') 0 ${i * -40}px`;
}
// 鼠标移入显示对应的图标且显示文字
let sidebar_item = document.querySelectorAll('.sidebar-item');
let sidebar_text = document.querySelectorAll('.sidebar-text');
for (let i = 0; i < sidebar_item.length; i++) {
    // 鼠标移入显示文字
    sidebar_item[i].addEventListener('mouseover', function () {
        sidebar_icon[i].style.background = `url("imgs/index/logos.png") #93d46f 40px ${i * -40}px`;
        sidebar_text[i].style.display = 'block';

    })
    // 鼠标移出恢复默认
    sidebar_item[i].addEventListener('mouseleave', function () {
        sidebar_icon[i].style.background = `url('imgs/index/logos.png') 0 ${i * -40}px`;
        sidebar_text[i].style.display = 'none';
    })
    // 页面跳转
    sidebar_item[i].addEventListener('click', function () {
        location.href = '#' + sidebar_item[i].dataset.id;
        // 去除顶部搜索栏遮挡部分
        document.body.scrollTop -= 50;
        document.documentElement.scrollTop -= 50;
    })
}

// 顶部搜索栏与搜索框 双向数据绑定
let search_in = document.querySelector('#search');
let top_search_in = document.querySelector('#top-search');
search_in.addEventListener('input', function () {
    top_search_in.value = search_in.value;
})
top_search_in.addEventListener('input', function () {
    search_in.value = top_search_in.value;
})

// 返回顶部功能
document.querySelector('.goto-top').addEventListener('click', function () {
    // 设置滚动次数为0
    let to_top = 0;
    // 设置渐进式回到顶部
    let goto_top = setTimeout(function () {
        // 使用反比例函数实现由快到慢的动画效果
        if (to_top++ < 50) {
            // 反比例函数自减50次
            document.body.scrollTop *= 0.9;
            document.documentElement.scrollTop *= 0.9;
            goto_top = setTimeout(arguments.callee, 10);
        } else if (to_top++ > 50 && (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0)) {
            // 反比例无法到0，使用固定步长补足
            document.body.scrollTop -= 2;
            document.documentElement.scrollTop -= 2;
            goto_top = setTimeout(arguments.callee, 10);
        }
    }, 10);
});