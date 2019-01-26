type functionType = (arg1: object, arg2: number, arg3: object[]) => void;

const asyncForEach = async function(array: object[], callback: functionType) {
    for (let index: number = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};
module.exports = asyncForEach;