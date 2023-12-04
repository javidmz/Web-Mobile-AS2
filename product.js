
function getQueryParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function getData(url) {
    let data;
    try {
        const response = await fetch(url);
        data = await response.json();
    } catch(err) {
        console.log("Error happened");
    }
    displayProductDetailed(data);
}

function displayProductDetailed(productData) {
    console.log(productData);
    const productDetailedContainer = document.querySelector('.product-detailed');

    const productMainImg = document.createElement('img');
    const productTitle = document.createElement('div');
    const productCategory = document.createElement('div');
    const productPrice = document.createElement('div');
    const productDiscount = document.createElement('div');
    const productStock = document.createElement('div');
    const productDescription = document.createElement('div');
    const productBrand = document.createElement('div');
    const productBuy = document.createElement('button');
    const productInfoContainer = document.createElement('div');
    const productGeneralContainer = document.createElement('div');
    const productImgsContHeader = document.createElement('div');
    const productImgsContainer = document.createElement('div');

    productMainImg.src = productData.thumbnail
    productMainImg.alt = "product_detailed_image";

    productTitle.innerText = productData.title;
    productTitle.classList.add('product-detailed-title');

    productCategory.innerText = productData.category.charAt(0).toUpperCase() + productData.category.slice(1);
    productCategory.classList.add('product-detailed-category');

    productPrice.innerText = "$" + productData.price;
    productPrice.classList.add('product-detailed-price');

    productDiscount.innerText = "- " + productData.discountPercentage.toFixed() + "%";
    productDiscount.classList.add('product-detailed-discount');

    productStock.innerText = productData.stock + " items left";
    productStock.classList.add('product-detailed-stock');

    productDescription.innerText = productData.description;
    productDescription.classList.add('product-detailed-description');

    productBuy.innerText = 'Add to Cart';
    productBuy.classList.add('product-detailed-buy');

    productBrand.innerText = productData.brand;
    productBrand.classList.add('product-detailed-brand');

    productInfoContainer.appendChild(productBrand);
    productInfoContainer.appendChild(productTitle);
    productInfoContainer.appendChild(productCategory);
    productInfoContainer.appendChild(productDiscount);
    productInfoContainer.appendChild(productPrice);
    productInfoContainer.appendChild(productStock);
    productInfoContainer.appendChild(productBuy);

    productGeneralContainer.appendChild(productMainImg);
    productGeneralContainer.appendChild(productInfoContainer);
    productGeneralContainer.classList.add('product-detailed-general')

    productData.images.forEach(image => {
        const productImg = document.createElement('img');
        productImg.src = image;
        productImg.alt = "detailed_image";
        productImgsContainer.appendChild(productImg);
    });

    productImgsContainer.classList.add('product-detailed-images');

    productImgsContHeader.innerText = "Other Images of this Product";
    productImgsContHeader.classList.add('product-detailed-images-header');

    productDetailedContainer.appendChild(productGeneralContainer);
    productDetailedContainer.appendChild(productDescription);
    productDetailedContainer.appendChild(productImgsContHeader);
    productDetailedContainer.appendChild(productImgsContainer);
}

const productId = getQueryParam();
getData(`https://dummyjson.com/products/${productId}`);