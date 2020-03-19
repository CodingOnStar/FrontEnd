let products = ['Underpants:6.99',
    'Socks:5.99',
    'T-shirt:14.99',
    'Trousers:31.99',
    'Shoes:23.99'
];
total = 0;
for (var i = 0; i < products.length; i++) { // number 2

    let product = products[i].split(':');
    let item = product[0];

    let price = Number(product[1]);

    total += price;

    let itemText = product + ' - ' + '$ ' + price;
    console.log(itemText);

}