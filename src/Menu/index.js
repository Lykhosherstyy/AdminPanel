export default [
    {
        name: 'Home',
        path: '/home',
        icon: 'icon-home',
        permisions: []
    },
    {
        name: 'Products',
        path: '/products',
        icon: 'icon-home',
        permisions: ['Admin', 'Manager'],
        children:[
            {
                name: 'ADDPRODUCTS',
                path: '/products/add',
                icon: 'icon-home',
                permisions: []
            },
        ]
    },
]