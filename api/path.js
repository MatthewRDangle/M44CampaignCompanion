"use strict";

class Path {

    /**
     * @constructor
     *
     * @param {string} pathString - A string to parse through; divide the names with "/" or whatever the separator param is.
     * @param {string} [separator=/] - Divides each value in the path.
     */
    constructor(pathString, separator) {

        // If path does not exist, then error.
        if (typeof pathString !== 'string')
            throw Error('A path string must exist to create a path object.');

        this.separator = (typeof separator === 'string' && separator.length > 0) ? separator : '/';
        this.pathString = pathString;
        this.pathArray = this.stringToArray();
    }

    /**
     * @method changeSeparator
     * @description Changes the separator value in the string.
     *
     * @param {string} separator - Divides each value in the path.
     */
    changeSeparator(separator) {
        if (separator && typeof separator === 'string' && separator.length > 0) {
            this.pathString = this.pathString.replaceAll(this.separator, separator);
            this.separator = separator;
        }
    }

    /**
     * @method first
     * @description Retrieves the first value from the path.
     *
     * @return {String}
     */
    first() {
        return this.pathArray[0];
    }

    /**
     * @method index
     * @description Retrieves a child value from the path array.
     *
     * @param {Number} idx - The index of the path child value to retrieve from the array.
     * @return {String}
     */
    index(idx) {
        if (idx && typeof idx === 'number')
            return this.pathArray[idx];
        else
            throw Error("Unable to retrieve an index from path array. Index argument does not exist.");
    }

    /**
     * @method last
     * @description Retrieves the last value from the path.
     *
     * @return {String}
     */
    last() {
        return this.pathArray[this.pathArray.length - 1];
    }

    /**
     * @method stringToArray
     * @description Converts the path string to a path array.
     *
     * @return {Array[String]}
     */
    stringToArray(path) {

        // If the path does not exist, assume it's the path object pathString property.
        if (!path || typeof path !== 'string')
            path = this.pathString;

        // Parse the Path into an array & return it.
        return path.split(this.separator);
    }
} module.exports = Path;