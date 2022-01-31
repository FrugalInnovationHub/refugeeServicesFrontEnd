import WebFont from 'webfontloader';

const Typography = () => {
    WebFont.load({
        google: {
            families: ['Source+Sans+Pro', 'Source+Sans+Pro+Regular']
        }
    });
};

export default Typography;