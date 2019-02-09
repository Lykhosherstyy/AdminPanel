export default [
    {
        name: 'Home',
        path: '/home',
        icon: 'home',
        permisions: []
    },
    {
        name: 'Products',
        path: '/products',
        icon: 'list-ul',
        permisions: ['Owner', 'Admin', 'Manager'],
        children:[
            {
                name: 'productsAdd',
                path: '/products/add',
                permisions: []
            },
        ]
    },
    {
        name: "users",
        path: "/users",
        icon: 'users',
        permisions: ['Owner']
    },
]