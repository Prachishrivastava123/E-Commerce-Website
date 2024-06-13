import { getCartProductFromLS } from './getCartProducts';

document.addEventListener('DOMContentLoaded', () => {
  const productCartContainer = document.getElementById('productCartContainer');
  const productCartTemplate = document.getElementById('productCartTemplate').content;

  const cartProducts = getCartProductFromLS();

  if (cartProducts.length === 0) {
    productCartContainer.innerHTML = '<p>No products in the cart.</p>';
    return;
  }

  cartProducts.forEach(product => {
    const clone = document.importNode(productCartTemplate, true);
    clone.querySelector('.category').innerText = product.category || 'Category';
    clone.querySelector('.productImage').src = product.image || 'default.jpg';
    clone.querySelector('.productName').innerText = product.name || 'Product Name';
    clone.querySelector('.productPrice').innerText = `₹${product.price}`;
    clone.querySelector('.productQuantity').innerText = product.quantity;
    clone.querySelector('.productQuantity').dataset.quantity = product.quantity;

    clone.querySelector('.cartIncrement').addEventListener('click', () => updateQuantity(product.id, 1));
    clone.querySelector('.cartDecrement').addEventListener('click', () => updateQuantity(product.id, -1));
    clone.querySelector('.remove-to-cart-button').addEventListener('click', () => removeFromCart(product.id));

    productCartContainer.appendChild(clone);
  });
});

function updateQuantity(productId, change) {
  let cartProducts = getCartProductFromLS();
  cartProducts = cartProducts.map(product => {
    if (product.id === productId) {
      product.quantity += change;
      if (product.quantity < 1) {
        product.quantity = 1;
      }
      product.price = product.unitPrice * product.quantity;
    }
    return product;
  });
  localStorage.setItem('cartProductLS', JSON.stringify(cartProducts));
  location.reload(); // Refresh the page to update the DOM
}

function removeFromCart(productId) {
  let cartProducts = getCartProductFromLS();
  cartProducts = cartProducts.filter(product => product.id !== productId);
  localStorage.setItem('cartProductLS', JSON.stringify(cartProducts));
  location.reload(); // Refresh the page to update the DOM
}
