

// window.addEventListener('click', (e) => {
//     console.log('clciked')
//     if(e.target.classList.contains('product-container')) {
//         console.log('yes')
//     }
// });

async function getData() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    displayData(data)
}

function displayData(data) {
    console.log(data);
    let productsContainer = document.querySelector('.products');

    data.products.forEach(product => {
        productsContainer.appendChild(createBox(product))
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
    const productView = document.createElement('button');

    productImg.src = productData.thumbnail
    productImg.alt = "product_image";

    productTitle.innerText = productData.title;

    productCategory.innerText = productData.category.charAt(0).toUpperCase() + productData.category.slice(1);

    productPrice.innerText = "$" + productData.price;
    productPrice.classList.add('product-price');

    productDiscount.innerText = "- " + productData.discountPercentage.toFixed() + "%";
    productDiscount.classList.add('product-discount');

    productStock.innerText = productData.stock;
    
    productGeneral.appendChild(productTitle);
    productGeneral.appendChild(productCategory);
    productGeneral.classList.add('product-general');

    productHeader.appendChild(productGeneral);
    productHeader.appendChild(productPrice);
    productHeader.classList.add('product-header');

    productView.innerText = "View Product";

    productContainer.appendChild(productImg);
    productContainer.appendChild(productHeader);
    productContainer.appendChild(productDiscount);
    productContainer.appendChild(productView);
    productContainer.id = productData.id;
    productContainer.classList.add('product-container');

    return productContainer
}

getData();
