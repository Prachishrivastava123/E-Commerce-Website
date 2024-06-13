import { addToCart } from "./addToCart";

const productContainer = document.querySelector("#productContainer");
const productTemplate = document.querySelector("#productTemplate");

export const showProductContainer = (products) => {
    if (!products) {
        return false;
    }

    products.forEach((curProd) => {
        console.log(curProd);
        const { brand, category, description, id, image, name, price, stock } = curProd;

        const productClone = document.importNode(productTemplate.content, true);
        console.log(productClone);

        const cardElement = productClone.querySelector('#cardValue');
        if (cardElement) cardElement.setAttribute("id", `card${id}`);

        const nameElement = productClone.querySelector('.productName');
        if (nameElement) nameElement.textContent = name;

        const imageElement = productClone.querySelector(".productImage");
        if (imageElement) {
            imageElement.src = image;
            imageElement.alt = name;
        }

        const descriptionElement = productClone.querySelector(".productDescription");
        if (descriptionElement) descriptionElement.textContent = description;

        const priceElement = productClone.querySelector(".productPrice");
        if (priceElement) priceElement.textContent = `₹${price}`;

        const actualPriceElement = productClone.querySelector(".productActualPrice");
        if (actualPriceElement) actualPriceElement.textContent = `₹${price * 4}`;

        const stockElement = productClone.querySelector(".stockElement");
        if (stockElement) {
            stockElement.addEventListener('click', (event) => {
                homeQuantityToggle(event, id, stock);
            });
        }

        const addToCartButton = productClone.querySelector('.add-to-cart-button');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', (event) => {
                addToCart(event, id, stock);
            });
        }

        productContainer.append(productClone);
    });
};
