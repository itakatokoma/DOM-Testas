let products = [];

const productForm = document.getElementById('productForm');
const productTable = document.getElementById('productTable');
const addButton = document.getElementById('addbutton');
const newProduct = {
    productId: productId,
    productName: productName,
    quantity: quantity
};
productForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const quantity = document.getElementById('quantity').value;

    if (products.some(product => product.productId === productId)) {
        alert('JAU YRA!!!!!!');
        return;
    }
 
    products.push(newProduct);
    const row = productTable.insertRow();
    row.insertCell(0).textContent = productId;
    row.insertCell(1).textContent = productName;
    row.insertCell(2).textContent = quantity;

});