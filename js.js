let products = JSON.parse(localStorage.getItem('products')) || [];
//all the geting elemnto el ID so we can use em
const productForm = document.getElementById('productForm');
const productTable = document.getElementById('productTable');
const addButton = document.getElementById('addbutton');
const editButton = document.getElementById('editButton');
const deleteButton = document.getElementById('deleteButton');
const findButton = document.getElementById('FindButton');
const findingItemsByCode = document.getElementById('findingitemsbycode');

// updatin so it loads everything that was saved lol
function updateProductTable() {
    const rows = productTable.getElementsByTagName('tr');
    while (rows.length > 1) { 
        productTable.deleteRow(1);
    }
    products.forEach(product => {
        const row = productTable.insertRow();
        row.id = `productRow-${product.productId}`;
        row.insertCell(0).textContent = product.productId;
        row.insertCell(1).textContent = product.productName;
        row.insertCell(2).textContent = product.quantity;
    });
}

function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}
//addin now
addButton.addEventListener("click", function(event) {
    event.preventDefault();

    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const quantity = document.getElementById('quantity').value;

    if (products.some(product => product.productId === productId)) {
        alert('Jau yra toks produktas su tokiu id');
        return;
    }

    const newProduct = {
        productId: productId,
        productName: productName,
        quantity: quantity
    };

    products.push(newProduct);

    const row = productTable.insertRow();
    row.id = `productRow-${productId}`;
    row.insertCell(0).textContent = productId;
    row.insertCell(1).textContent = productName;
    row.insertCell(2).textContent = quantity;

    saveToLocalStorage();
    productForm.reset();
});
//redid editing to use the rows produjct id so it can remove it
editButton.addEventListener("click", function(event) {
    event.preventDefault();

    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const quantity = document.getElementById('quantity').value;

    const product = products.find(product => product.productId === productId);
    if (product) {
        product.productName = productName;
        product.quantity = quantity;

        saveToLocalStorage();

        const oldRow = document.querySelector(`#productRow-${productId}`);
        if (oldRow) {
            oldRow.remove();
        }
        const newRow = productTable.insertRow();
        newRow.id = `productRow-${productId}`; 
        newRow.insertCell(0).textContent = productId;
        newRow.insertCell(1).textContent = productName;
        newRow.insertCell(2).textContent = quantity;
    }
});
//curse of rah (deleting the rows)
deleteButton.addEventListener("click", function(event) {
    event.preventDefault();

    const productId = document.getElementById('productId').value;

    const productIndex = products.findIndex(product => product.productId === productId);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);

        saveToLocalStorage();

        const row = document.querySelector(`#productRow-${productId}`);
        if (row) {
            row.remove();
        }
    } 
});
findButton.addEventListener("click", function(event) {
    event.preventDefault();

    const productId = document.getElementById('searchProductId').value.trim(); 
    const product = products.find(product => product.productId === productId);

    const findingItemsByCode = document.getElementById('findingitemsbycode'); 
    if (product) {
        const row = findingItemsByCode.insertRow();
        row.insertCell(0).textContent = product.productId;
        row.insertCell(1).textContent = product.productName;
        row.insertCell(2).textContent = product.quantity;
    } else {
        alert("nera tokios prekes");
    }
});

updateProductTable();
