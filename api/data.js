const Path = require("./path");

class Data {

    /**
     * @constructor
     *
     * @param {string | path | Object} path - A string to parse through; separating data names with "/".
     * @param {*} [container] - Any value, even undefined.
     */
    constructor(path, container) {

        // Error if all arguments are undefined.
        if (!path && !container)
            throw Error("A single or multiple arguments are required in order to create a Data object.");

        // If the path type is an object and not an instance of Path, this should be the value of the data object.
        if (typeof path === 'object' && !(path instanceof Path))
            container = path;

        // If path does not exist, assume it's the root path '/'.
        // Also, set the root object as the value in this statement.
        let __root = undefined;
        if (typeof path !== 'string' || !(path instanceof Path)) {
            path = 'r:';
            __root = container;
        }


        // Evaluate the value argument. If the value is an object, the type is a container, otherwise it's a variable.
        // The type can only be a string with the value of 'parent' or 'value'.
        let __container;
        let __type;
        if (typeof container === 'object') {
            __container = container;
            __type = 'parent';
        } else if (container) {
            __container = container;
            __type = 'value';
        } else {
            __container = undefined;
            __type = 'parent'; // Assume parent by default.
        }


        // State and position properties.
        this.path = (path instanceof Path) ? path : new Path(path);
        this.name = this.path.last(); // Last index in the array is the name.
        this.type = __type;

        // Object reference properties.
        // This properties refer to the object the data container is referencing.
        this.root = __root;
        this.parent = undefined;
        this.container = __container;
    }

    /**
     * @method addChild
     * @description Creates a child property for this Data. Converts this data object to a parent if not already. If the child being added has the same name as an existing child, that child will be overwritten.
     *
     * @param {string} [name] - The name of the child data variable.
     * @param {*} [container] - Any value, even undefined.
     */
    addChild(name, container) {

        // Convert this Data object to a parent to hold other Data objects.
        if (this.type === 'value')
            this.convertToParent();

        // Create the child and attach a container if it exists.
        if (container)
            this.container[name] = container;
        else
            this.container[name] = undefined;
    }

    /**
     * @method convertToParent
     * @description Converts the data object to a parent type. Will erase the data associated with value type.
     */
    convertToParent() {

        // Only proceed if the this Data object is not a parent.
        if (this.type !== 'parent') {
            this.type = 'parent';
            this.container = {}; // Create an empty container.
        }
    }

    /**
     * @method convertToValue
     * @description Converts the data object to a value type. Will erase the data associated with the parent type.
     */
    convertToValue() {

        // Only proceed if the this Data object is not a value.
        if (this.type !== 'value') {
            this.type = 'variable';
            this.container = undefined; // Undefined by default. Can be changed later.
        }
    }

    /**
     * @method getJSON
     * @description Converts the container object into a JSON string, then returns the result.
     *
     * @return {string}
     */
    getJSON() {
        return JSON.stringify(this.container);
    }

    /**
     * @method getValue
     * @description Retrieves the value of the Data variable.
     *
     * @param {string} [subValue] - If the data object is a "parent", use this to retrieve a specific child.
     * @return {*} Returns whatever the value is. If nothing is there, it will be an empty object if it's a parent, or undefined if it's a value.
     */
    getValue(subValue) {

        if (typeof subValue === 'string') {
            if (this.container.hasOwnProperty(subValue))
                return this.container[subValue];
            else
                return null;
        }
        else
            return this.container;
    }

    /**
     * @method navigate
     * @description Paths through the data objects' container and retrieves a child container, but with a Data object wrapped around it.
     *
     * @param {String|Path} path - A string to parse through; seperating data names with "/".
     * @return {Data} The data object with a container from the specified path.
     */
    navigate(path) {
        if (path && typeof path === 'string')
            path = new Path(path);
        else if (!path instanceof Path)
            throw Error('Unable to navigate Data. Path must be a valid string path or a Path object.');

        let container = this.container;
        let parent = undefined;
        for (let idx = 0; idx < path.pathArray.length; idx++) {
            let name = path.pathArray[idx];

            // If nothing exists, return undefined.
            if (!container.hasOwnProperty(name))
                return undefined;
            container = container[name];

            // If at the second to the last of the path, set the parent.
            if (idx === path.pathArray.length - 2)
                parent = container;

            // If at the end of the path, wrap a new Data object around the container.
            if (idx === path.pathArray.length - 1) {
                let dataObj = new Data('r/' + path.pathString, container);
                dataObj.root = this.root;

                // If the parent does not exist, but the container does, this data container is the parent.
                if (parent)
                    dataObj.parent = parent;
                else
                    dataObj.parent = this.container;

                return dataObj; // Return the new Data Object.
            }
        }
    }

    /**
     * @method pathToArray
     * @description Converts a string path into an array by separating each data name with a '/'. Ex: fee/foo/fum = [fee, foo, fum].
     *
     * @param {string} [path=this.path] - A string to parse through; separating data names with "/".
     */
    pathToArray(path) {

        // Check if the path argument exist and is a string. If not, set path to equal the objects current path.
        if (!path || typeof path !== 'string')
            path = this.path;

        // Parse the Path into an array.
        return path.split('/');
    }

    /**
     * @method setValue
     * @description Sets the value of the data object.
     *
     * @param {*} value - The value to apply to this data object.
     */
    setValue(value) {

        // If the value is an object, convert to an parent if not already.
        if (typeof value === 'object' && value !== null && this.type !== 'parent')
            this.convertToParent();

        // If the value is not an object, convert to a value if not already.
        if (typeof value !== 'object' && this.type !== 'value')
            this.convertToValue();

        // Set the value for this data object.
        if (value)
            this.container = value;
    }
} module.exports = Data;