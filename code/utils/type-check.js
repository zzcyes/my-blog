const _toString = Object.prototype.toString;

export const toRawType = (value) => {
    return _toString.call(value).slice(8, -1);
}

export const isNumber = (value) => {
    return toRawType(value) === 'Number'
}

export const isBoolean = (value) => {
    return toRawType(value) === 'Boolean'
}

export const isNull = (value) => {
    return toRawType(value) === 'Null'
}

export const isUndefined = (value) => {
    return toRawType(value) === 'Undefined'
}

export const isFunction = (value) => {
    return toRawType(value) === 'Function'
}

export const isSymbol = (value) => {
    return toRawType(value) === 'Symbol'
}

export const isArray = (value) => {
    return toRawType(value) === 'Array'
}

export const isArray = (value) => {
    return toRawType(value) === 'Array'
};
export const isObject = (value) => {
    return toRawType(value) === 'Object'
};

export const isRegExp = (value) => {
    return toRawType(value) === 'RegExp'
};

export const isDate = (value) => {
    return toRawType(value) === 'Date'
};
