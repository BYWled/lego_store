// 初始化流程：先清除所有监听，再重新触发一次流程
// 小计变动->选择变动->全选变动->总计变动
// 删除 & 添加 重新初始化

// 小计变动的部分
function updateSubtotal() {
    // 按钮操作
    let count_btns = document.querySelectorAll('.shopping-count-btn');
    count_btns.forEach(btn => {
        btn.addEventListener('click', function () {
            let countInput = this.parentNode.querySelector('input');
            if (this.innerText === '+') {
                countInput.value = parseInt(countInput.value) + 1;
            } else if (this.innerText === '-' && parseInt(countInput.value) > 1) {
                countInput.value = parseInt(countInput.value) - 1;
            }
            // 同步更新小计
            this.parentNode.parentNode.querySelector('.shopping-subtotal').innerText = (parseFloat(this.parentNode.parentNode.querySelector('.shopping-price').innerText) * parseInt(countInput.value)).toFixed(2);
            // 触发总计更新
            updateTotal();
        });
    });
    // 数量输入框操作
    let count_inputs = document.querySelectorAll('.shopping-count');
    count_inputs.forEach(input => {
        input.addEventListener('input', function () {
            let val = parseInt(this.value);
            if (isNaN(val) || val < 1) {
                val = 1;
            }
            this.value = val;
            // 同步更新小计
            this.parentNode.parentNode.querySelector('.shopping-subtotal').innerText = (parseFloat(this.parentNode.parentNode.querySelector('.shopping-price').innerText) * parseInt(this.value)).toFixed(2);
            // 触发总计更新
            updateTotal();
        });
    });
}
// 选择变动、总计更新
function updateSelection() {
    let itemCheckboxes = document.querySelectorAll('.shopping-select');
    itemCheckboxes.forEach(checkbox => {
        // 操作的是否是全选框
        if (checkbox.parentNode.className === 'shopping-item') {
            checkbox.addEventListener('change', function () {
                // 如果全部触发&没有全部触发，则同步全选
                updateSelectAll();
                // 触发总计更新
                updateTotal();
            });
        } else {
            checkbox.addEventListener('change', function () {
                // 重新遍历所有单项选择框并选中
                itemCheckboxes.forEach(box => {
                    box.checked = this.checked;
                });
                // 触发总计更新
                updateTotal();
            });
        }
    });
}
// 全选框更新
function updateSelectAll() {
    // 假设全部触发
    let allChecked = true;
    let itemCheckboxes = document.querySelectorAll('.shopping-item .shopping-select');
    if (itemCheckboxes.length) {
        itemCheckboxes.forEach(box => {
            if (!box.checked) {
                // 有未触发则否定全部触发
                allChecked = false;
            }
        });
    } else {
        allChecked = false;
    }
    document.querySelector('.shopping-total-area .shopping-select').checked = allChecked;
    document.querySelector('.shopping-title-area .shopping-select').checked = allChecked;
}
// 总计更新
function updateTotal() {
    let itemCheckboxes = document.querySelectorAll('.shopping-select');
    let totalCount = 0;
    let totalPrice = 0;
    itemCheckboxes.forEach(checkbox => {
        if (checkbox.checked && checkbox.parentNode.className === 'shopping-item') {
            totalPrice += parseFloat(checkbox.parentNode.querySelector('.shopping-subtotal').innerText);
            totalCount += parseInt(checkbox.parentNode.querySelector('.shopping-count').value);
        }
    });
    document.querySelector('.total-price').innerText = totalPrice.toFixed(2);
    document.querySelector('.total-num').innerText = totalCount;
}

// 清除所有监听
function cleaner() {
    // 选择所有选择框、增减按钮、输入框和删除按钮监听
    let allElements = document.querySelectorAll('.shopping-select, .shopping-count-btn, .shopping-count, #deleteItem');
    // 克隆节点替换以清除所有监听
    allElements.forEach(elem => {
        // 复制节点
        let newElem = elem.cloneNode(true);
        // 新节点替换旧节点
        elem.parentNode.replaceChild(newElem, elem);
    });
    // 重加载时，判断是否有商品
    let itemElements = document.querySelectorAll('.shopping-item');
    if (itemElements.length === 0)
        document.querySelector('.air-item').style.display = 'block';
    else
        document.querySelector('.air-item').style.display = 'none';
}

// 删除单个商品
function setupDeleteButtons() {
    let deleteBtns = document.querySelectorAll('#deleteItem');
    for (let num = 0; num < deleteBtns.length; num++) {
        deleteBtns[num].addEventListener('click', function () {
            // 删除当前商品行
            this.parentNode.parentNode.remove();
            // 删除该按钮对应的商品的localStorage数据
            // 反转计数
            let cacheIndex = deleteBtns.length - num - 1;
            // 获取缓存数据
            let cacheItems = localStorage.getItem('lego-shoppingItems') || '[]';
            if (cacheItems) {
                let items = JSON.parse(cacheItems);
                // 删除对应数据
                items.splice(cacheIndex, 1);
                localStorage.setItem('lego-shoppingItems', JSON.stringify(items));
            }
            // 重新初始化所有更新
            init();
        });
    }
}

// 增加商品（直接将猜你喜欢作为新增商品的来源）
document.querySelectorAll('.like-item').forEach(item => {
    item.addEventListener('click', function () {
        let newItem = {
            img_src: this.querySelector('.like-img').src,
            name: this.querySelector('.like-text').innerText,
            // 数据格式化：去除前缀、转为浮点数、保留两位小数
            price: parseFloat(this.querySelector('.like-price').innerText.replace('¥：', '')).toFixed(2),
            count: 1
        };
        addItem(newItem.img_src, newItem.name, newItem.price);
        // 同步更新localStorage
        let items = localStorage.getItem('lego-shoppingItems') || '[]';
        if (items) {
            items = JSON.parse(items);
            items.push(newItem);
            localStorage.setItem('lego-shoppingItems', JSON.stringify(items));
        } else {
            localStorage.setItem('lego-shoppingItems', JSON.stringify([newItem]));
        }
        // 重新初始化所有更新

        init();
    });
});

// 增加商品的函数
function addItem(img_src, name, price, count) {
    document.querySelector('.shopping-line').insertAdjacentHTML('afterend', `
        <div class="shopping-item">
                <input type="checkbox" class="shopping-select" />
                <img class="shopping-img" src="${img_src}" />
                <span class="shopping-text">${name}</span>
                <span class="shopping-price">${price}</span>
                <div class="shopping-count-area">
                    <span class="shopping-count-btn a" id="countPlus">+</span>
                    <input type="text" class="shopping-count" value=${count || 1}>
                    <span class="shopping-count-btn a" id="countMinus">-</span>
                </div>
                <span class="shopping-subtotal">41.00</span>
                <div class="shopping-options">
                    <span class="shopping-option a" id="deleteItem">删除</span>
                    <span class="shopping-option a">移到我的关注</span>
                </div>
            </div>`);
}

// 从localStorage加载商品
function loadLocalStorageItems() {
    let cacheItems = localStorage.getItem('lego-shoppingItems') || '[]';
    if (cacheItems && cacheItems !== '[]') {
        let items = JSON.parse(cacheItems);
        items.forEach(item => {
            addItem(item.img_src, item.name, parseFloat(item.price).toFixed(2), item.count);
        });
    }
}

// 删除选中商品
function deleteSelectedItems() {
    // 获取所有商品
    let items = document.querySelectorAll('.shopping-item');
    // 筛选出受影响的商品
    let changeIndexes = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].querySelector('.shopping-select:checked')) {
            changeIndexes.push(i);
            // 从DOM中删除
            items[i].remove();
        }
    }
    // 从localStorage（反转顺序）
    let cacheItems = localStorage.getItem('lego-shoppingItems') || '[]';
    if (cacheItems) {
        let items = JSON.parse(cacheItems);
        // 删除该按钮对应的商品的localStorage数据
        for (let i = 0; i < changeIndexes.length; i++) {
            // 反转计数,删除对应数据
            items.splice(items.length - changeIndexes[i] - 1, 1);
        }
        localStorage.setItem('lego-shoppingItems', JSON.stringify(items));
    }
    // 重新初始化所有更新
    init();
}

// 初始化
function init() {
    cleaner();
    // 装载小计
    // 不封装为函数，不调用函数直接使用可以减少DOM访问次数（初始化小计）
    let subtotalElements = document.querySelectorAll('.shopping-subtotal');
    subtotalElements.forEach(elem => {
        elem.innerText = (parseFloat(elem.parentNode.querySelector('.shopping-price').innerText) * parseInt(elem.parentNode.querySelector('.shopping-count').value)).toFixed(2);
    });
    document.querySelector('#deleteSelect').addEventListener('click', deleteSelectedItems);
    updateSubtotal();
    updateSelection();
    updateSelectAll();
    setupDeleteButtons();
    updateTotal();
}

// 首次加载localStorage数据
loadLocalStorageItems();
init();