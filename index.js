let prevPage;
let currentlyFetched = "https://dummyjson.com/products?limit=10";

document.querySelector('form').addEventListener("submit", async (e) => {
    e.preventDefault();
    clearPage('pagination')
    clearPage("products");
    const search = document.querySelector('input').value.split(" ").join('%20');
    console.log(search);
    currentlyFetched = `https://dummyjson.com/products/search?q=${search}`
    displayData(currentlyFetched);
})

document.querySelector('select').addEventListener('change', () => {
    clearPage('pagination');
    clearPage("products");
    const optionValue = document.querySelector('select').value;
    console.log(optionValue);
    currentlyFetched = optionValue !== "default" ? `https://dummyjson.com/products/category/${optionValue}?limit=10` : `https://dummyjson.com/products?limit=10`
    displayData(currentlyFetched);
})

document.querySelector('.pagination').addEventListener('click', (e) => {
    if(e.target.classList.contains('page')) {
        clearPage("products");
        displayData(`${currentlyFetched}&skip=${10 * (e.target.id - 1)}`);
    }
})

function clearPage(className) {
    console.log(className);
    const products = document.querySelector(`.${className}`);
    while(products.firstChild) {
        products.removeChild(products.firstChild);
    }
}

async function getData(url) {
    let data;
    try {
        const response = await fetch(url);
        data = await response.json();
    } catch(err) {
        console.log("Error happened");
    }
    return data;
}

async function displayData(url) {
    const data = await getData(url)
    console.log(data);
    let productsContainer = document.querySelector('.products');

    data.products.slice(0, 10).forEach(product => {
        productsContainer.appendChild(createBox(product))
    })
    console.log('hello');

    addPagination(data.total, data.skip);
}

async function getCategories() {
    const categories = await getData('https://dummyjson.com/products/categories?limit=10');

    const selectTag = document.querySelector('select');
    
    categories.forEach(category => {
        const optionTag = document.createElement('option');
        optionTag.value = category;
        optionTag.innerText = category;
        selectTag.appendChild(optionTag)
    })
}

function createBox(productData) {
    const productContainer = document.createElement('div');
    const productImg = document.createElement('img');
    const productTitle = document.createElement('div');
    const productCategory = document.createElement('div');
    const productPrice = document.createElement('div');
    const productDiscount = document.createElement('div');
    const productStock = document.createElement('div');
    const productHeader = document.createElement('div');
    const productGeneral = document.createElement('div');
    const productView = document.createElement('a');

    productImg.src = productData.thumbnail
    productImg.alt = "product_image";

    productTitle.innerText = productData.title;

    productCategory.innerText = productData.category.charAt(0).toUpperCase() + productData.category.slice(1);

    productPrice.innerText = "$" + productData.price;
    productPrice.classList.add('product-price');

    productDiscount.innerText = "- " + productData.discountPercentage.toFixed() + "%";
    productDiscount.classList.add('product-discount');

    productStock.innerText = productData.stock + " items left";
    
    productGeneral.appendChild(productTitle);
    productGeneral.appendChild(productCategory);
    productGeneral.classList.add('product-general');

    productHeader.appendChild(productGeneral);
    productHeader.appendChild(productPrice);
    productHeader.classList.add('product-header');

    productView.innerText = "View Product";
    productView.classList.add('product-view');
    productView.href= `/product.html?id=${productData.id}`;
    productView.target = "_blank";

    productContainer.appendChild(productImg);
    productContainer.appendChild(productHeader);
    productContainer.appendChild(productDiscount);
    productContainer.appendChild(productView);
    productContainer.appendChild(productStock);
    productContainer.id = productData.id;
    productContainer.classList.add('product-container');

    return productContainer
}

function addPagination(total, skip) {
    const pagination = document.querySelector('.pagination');
    console.log(pagination.children.length);
    if(pagination.children.length == 0) {
        console.log(total + " " + skip);
        const totalPages = Math.ceil(total / 10.0);
    
        for(let i = 1; i <= totalPages; i++) {
            const page = document.createElement('div');
            if(i === 1)
                page.classList.add('current');
            page.innerText = i;
            page.classList.add('page');
            page.id = i;
            pagination.appendChild(page);
        }
        prevPage = 1;
    }
    else {
        const currentPage = Math.floor(skip / 10);
        console.log(currentPage);
        console.log(document.querySelectorAll('.page')[currentPage])
        document.querySelectorAll('.page')[prevPage - 1].classList.remove('current');
        document.querySelectorAll('.page')[currentPage].classList.add('current');
        prevPage = currentPage;
    }
}

displayData("https://dummyjson.com/products?limit=10");
getCategories();