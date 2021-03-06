module.exports = (api) => {
    const env = api.env();
    api.cache.never();

    const plugins = [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
    ];

    if(env === 'development') {
        /** not necessary. Most valuable for class components */
        plugins.push('react-hot-loader/babel')
    }

    return {
        presets: [
            '@babel/preset-react',
            [
                '@babel/preset-env',
                {
                    debug: true,
                    spec: true,
                    modules: false,
                }
            ],
        ],
        plugins,
    }
}
