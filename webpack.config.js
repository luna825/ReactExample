module.exports = {
    entry: './app/componments/TodoApp.jsx',
    output:{
        filename:'public/todoApp.js'
    },
    module:{
        loaders:[
        {
            test:/\.jsx$/,
            loader:'babel',
            query:{
                presets:['react','es2015']
            }
        }
        ]
    }
}