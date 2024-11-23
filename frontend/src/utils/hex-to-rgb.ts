export const hexToRgb = (hex:string) => {

    hex = hex.replace("#", "");


    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
}

export const linearGradient = (param1:string, param2:string) => {

    const rgbLight = hexToRgb(param1);
    const rgbMain = hexToRgb(param2);

    return `linear-gradient(135deg, rgb(${rgbLight}) 0%, rgb(${rgbMain}) 100%)`
}

export const linearGradient2 = (param1:string, param2:string) => {

    const rgbLight = hexToRgb(param1);
    const rgbMain = hexToRgb(param2);

    return `linear-gradient(135deg, rgba(${rgbLight}, 0.2), rgba(${rgbMain}, 0.2)) rgb(255, 255, 249)`
}