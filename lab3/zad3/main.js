let products = [];
let originalProducts = []

function displayData(productsToDisplay) {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    productsToDisplay.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.thumbnail}" width="50"></td>
            <td>${product.title}</td>
            <td>${product.description}</td>
        `;
        tableBody.appendChild(row);
    });
}

function filterData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(searchTerm);
    });
    displayData(filteredProducts);
}


function sortData() {
    const sortOption = document.getElementById('sortSelect').value;
    let sortedProducts;

    if (sortOption === 'asc') {
        sortedProducts = products.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'desc') {
        sortedProducts = products.sort((a, b) => b.title.localeCompare(a.title));
    } else {
        sortedProducts = originalProducts;
    }

    displayData(sortedProducts);
}


fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => {
        products = data.products.slice(0, 30);
        originalProducts = data.products.slice(0, 30);
        displayData(products); 
    })
    .catch(error => console.error('Błąd przy pobieraniu danych:', error));