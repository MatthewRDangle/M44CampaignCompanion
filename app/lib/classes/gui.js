/** Handles rendering graphics on to the screen. */
export default class GUI {

    /**
     * @constructor
     * @description Object to render and update graphical user interface.
     */
    constructor(data) {
        this.index = {id: {}, tags: {}}; // Enables faster information retrieval.

        // State.
        this.isDrawn = false; // Indicates the GUI has been rendered.
        this.stateChange = false; // Used to trigger update method.
        this.state = {}; // Container for devs to safely add whatever information or references they want.

        // Attributes.
        this.id = undefined; // No ID by default.
        this.tags = []; // Shared identifiers that can be found by multiple names.
        this.data = data || undefined; // Data API object.

        // Set GUI Hierarchy.
        this.parent = undefined;
        this.children = [];

        // Render Information.
        this.interface = undefined; // Can be anything capable of rendering something. HTML, JS Element Node, or any object capable of rendering.
    }

    /**
     * @method addChild
     * @description Adds a GUI child to this GUI.
     *
     * @param {GUI} gui - The GUI to add as a child.
     */
    addChild(gui) {
        if (gui instanceof GUI) {
            gui.parent = this; // Set this GUI as a parent so it can be access later.
            this.children.push(gui); // Adds the gui to the array.

            // Check if Child has a id or tag(s). If they do, index them.
            let gui_id = gui.id;
            if (gui_id)
                this.__indexGUIID(gui, 'add', gui_id);

            let gui_tags = gui.tags;
            if (gui_tags.length > 0) {
                this.__indexGUITags(gui, 'add', gui_tags);
            }
        }
    }

    /**
     * @method addTag
     * @description Adds a tag to the tag attribute.
     *
     * @param {Array|String} value - The string value to add as a tag.
     */
    addTag(value) {
        if (typeof value === 'string')
            value = [value];
        else if (typeof value !== 'array')
            return;

        // Add the tags from the parent.
        let parent = this.parent;
        if (parent)
            this.parent.__indexGUITags(this, 'add', value);

        // Add the tag(s) to the tags attribute.
        let tag_index = this.tags;
        for (let idx = 0; idx < value.length; idx++) {
            let tag = value[idx];
            tag_index.push(tag); // Add Tag.
        }
    }

    /**
     * @method attachData
     * @description Attaches a data object to the data property.
     *
     * @param {Data} dataObj - The Data object to attach to the data property.
     */
    attachData(dataObj) {
        if (dataObj instanceof Data) {
            this.data = dataObj;
        }
    }

    /**
     * @method destroy
     * @description Instructions to delete a graphical UI.
     */
    destroy() {

        // If this GUI has a parent, remove it from the parents children.
        if (this.parent)
            this.parent.removeChild(this);
        this.erase(); // Erase the GUI from the renderer.
    }

    /**
     * @interface erase
     * @description Instructions to remove the graphical UI from the renderer but keep all reference data.
     */
    erase() {
        throw new Error('No erase instructions set.');
    }

    /**
     * @interface draw
     * @description Instructions to renders a graphical UI. Attach the renderable object to the interface property.
     */
    draw() {
        throw new Error('No draw instructions set.');
    }

    /**
     * @method getChildByID
     * @description Retrieve a child GUI from this GUI object.
     *
     * @param {String} id - The ID of the child GUI to retrieve.
     * @return {GUI}
     */
    getChildByID(id) {
        if (id && typeof id === 'string')
            return this.index.id[id] || undefined;
    }

    /**
     * @method getChildByTag
     * @description Retrieve all child GUIs' from this GUI object.
     *
     * @param {String} tag - The tag of the child GUI to retrieve.
     * @return {GUI}
     */
    getChildrenByTag(tag) {
        if (tag && typeof tag === 'string')
            return this.index.tags[tag] || undefined;
    }

    /**
     * @method __indexGUIID
     * @description Indexes a GUI by ID to this GUI. Capable of adding and removing. Does not check if GUI is a child.
     *
     * @param {GUI} gui - The GUI object index.
     * @param {String} method - Add (add) or remove (rm).
     * @param {String} id - The id string.
     */
    __indexGUIID(gui, method, id) {
        let index = this.index.id; // Index to use.

        // Add ID to index.
        if (method === 'add' && typeof id === 'string' && gui instanceof GUI) {
            index[id] = gui; // Attach index.
        }

        // Remove ID from index.
        else if (method === 'rm' && typeof id === 'string') {
            let is_indexed = index[id];
            if (is_indexed)
                delete index[id]; // Remove index.
        }
    }

    /**
     * @method __indexGUITags
     * @description Indexes a GUI by Tags to this GUI. Capable of adding and removing. Does not check if GUI is a child.
     *
     * @param {GUI} gui - The GUI object index.
     * @param {String} method - Add (a) or remove (r).
     * @param {Array} tags - The tags to add or remove.
     */
    __indexGUITags(gui, method, tags) {
        let index = this.index.tags; // Index to use.

        // Add tags to index.
        if (method === 'add' && tags instanceof Array && gui instanceof GUI) {

            // Loop through all tags.
            for (let idx = 0; idx < tags.length; idx++) {
                let tag = tags[idx];

                // If Tag exists, add the gui to the tag.
                let tag_check = index[tag];
                if (tag_check) {
                    tag_check.push(gui);
                }

                // If the tag doesn't exist, create the tag. Then add it.
                else {
                    tag_check = index[tag] = [];
                    tag_check.push(gui);
                }
            }
        }

        // Remove tags from index.
        else if (method === 'rm' && tags instanceof Array && gui instanceof GUI) {

            // Loop through all tags.
            for (let idx = 0; idx < tags.length; idx++) {
                let tag = tags[idx];

                // If Tag exists, remove the gui from the tag.
                let tag_check = index[tag];
                if (tag_check) {
                    let indexOf = tag_check.indexOf(gui);
                    tag_check.splice(indexOf, 1);
                }
            }
        }
    }

    /**
     * @method removeChild
     * @description Removes a GUI child from this GUI.
     *
     * @param {GUI} gui - The GUI child to remove.
     */
    removeChild(gui) {
        if (gui instanceof GUI) {
            gui.parent = undefined; // Removes the gui parent.

            // Check if Child has a id or tag(s). If they do, remove their index.
            let gui_id = gui.id;
            let gui_tags = gui.tags;
            if (gui_id)
                this.__indexGUIID(gui, 'rm', gui_id);

            if (gui_tags.length > 0) {
                this.__indexGUITags(gui, 'rm', gui_tags);
            }

            // Remove the child gui from the array.
            let index = this.children.indexOf(gui);
            this.children.splice(index, 1); // Removes the gui from the array of children.
        }
    }

    /**
     * @method removeID
     * @description Removes the ID attribute.
     */
    removeID() {
        let id = this.id;
        if (id) {
            let parent = this.parent;
            if (parent)
                this.parent.__indexGUIID(this, 'rm', id);
            this.id = undefined; // Remove ID.
        }
    }

    /**
     * @method removeTag
     * @description Removes a tag from the tag attribute.
     *
     * @param {Array|String} tags - The tag string to remove.
     */
    removeTag(tags) {
        if (typeof tags === 'string')
            tags = [tags];
        else if (typeof tags !== 'array')
            return;

        // Remove the tags from the parent.
        let parent = this.parent;
        if (parent)
            this.parent.__indexGUITags(this, 'r', tags);

        // Remove the tag(s) from the tags attribute.
        let tag_index = this.tags;
        for (let idx = 0; idx < tags.length; idx++) {
            let tag = tag_index[idx];
            let indexOf = this.tags[tag];
            this.tags.splice(indexOf, 1); // Remove Tag.
        }
    }

    /**
     * @method setID
     * @description Sets the ID attribute.
     *
     * @param {String} value - The string value to set the ID to.
     */
    setID(value) {
        if (typeof value === 'string') {
            this.id = value; // Set ID.
            if (this.parent)
                this.parent.__indexGUIID(this, 'add', value);
        }
    }


    /**
     * @method setState
     * @description Changes the state object from the GUI.
     */
    setState(key, value) {
        const state = this.state;

        // If key is an object, then configure the changes in bulk. Each object key & value pair represents a state key & value pair.
        if (typeof key === 'object') {
            value = key;
            key = undefined;
            for (let key in value) {
                this.stateChange = true;
                state[key] = value[key];
            }
        }

        // If key is a string, set update the it's associated state value.
        else if (typeof key === 'string') {
            this.stateChange = true;
            state[key] = value;
        }

        if (this.stateChange)
            this.update();
        else if (this.isDrawn)
            this.draw();
    }


    /**
     * @interface update
     * @description Instructions to update the graphical UI.
     */
    update() {
        throw new Error('No Update Instructions Set');
    }
}