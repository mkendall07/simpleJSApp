var RewirePlugin = require('rewire-webpack');
module.exports = {
    output: {
        filename: 'simpleJsApp.js'
    },
    resolve: {
        modulesDirectories: ['', 'node_modules', 'src']
    },
    resolveLoader: {
        modulesDirectories: ['loaders', 'node_modules']
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    plugins: [
        new RewirePlugin()
    ]
};
