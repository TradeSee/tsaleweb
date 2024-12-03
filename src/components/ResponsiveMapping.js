export default function ResponsiveMapping() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    var sizeId;
    
    if(windowWidth >= 1879) {
        sizeId = 'lg'
    } else if (windowWidth >= 1495) {
        sizeId = 'md'
    } else {
        sizeId = 'sm'
    }
    
    return {width: windowWidth, height: windowHeight, size: sizeId}
}
