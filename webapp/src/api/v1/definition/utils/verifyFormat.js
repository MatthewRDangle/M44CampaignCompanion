export function isFormatHexadecimal(definition) {
    return !definition ?? typeof definition !== 'string' && definition.length !== 7 && definition[0] !== '#'
}

export function isArrayType(definition) {
    if (!definition) return

    // Check if every value in the array is of type string.
    for (let item in definition) {
        if (typeof item !== 'string')
            return false
    }
    return true
}

export function isObjColor(definition) {
    if (!definition) return
    return isFormatHexadecimal(definition.text) && isFormatHexadecimal(definition.background)
}

export function isObjImage(definition) {
    if (!definition) return
    return !!definition.src && !!definition.alt
}