export default class GUI {
    constructor(scene) {
        this.scene = scene;
        this.parent = undefined;
        this.container = this.scene.add.container(this.x, this.y);
        this.children = [];
        this.id = undefined;
        this.geo = {
            x: 0,
            y: 0,
            z: 0
        }
        this.width = 0;
        this.height = 0;
        this.padding = { left: 0, top: 0, right: 0, bottom: 0 };
        this.scale = 1;

        this.textPoly = undefined; // Is created based on props below.
        this.textString = undefined;
        this.textColor = '#FFFFFF';
        this.textSize = '16px';
        this.textFamily = 'Roboto';
        this.textHAlign = 'left'; // left, center, right;
        this.textVAlign = 'top'; // top, middle, bottom.
        this.textAlpha = 1;

        this.backgroundPoly = undefined; // Is created based on props below.
        this.backgroundColor = undefined;
        this.backgroundImage = undefined;
        this.backgroundShape = 'rectangle';
        this.backgroundHAlign = 'left'; // left, center, right;
        this.backgroundVAlign = 'top'; // top, middle, bottom.
        this.backgroundBorderColor = undefined;
        this.backgroundBorderSize = undefined;
        this.backgroundAlpha = 1;

        this.event = {
            onclick: undefined,
            ondragstart: undefined,
            ondrag: undefined,
            onmousescroll: undefined,
            preventBubbling: false,
            update: []
        }
    }

    addChild(child_gui) {
        child_gui.parent = this;
        this.children.push(child_gui);
        this.container.add(child_gui.container);
    }

    removeChild(child_gui) {
        let index = this.children.indexOf(child_gui);
        this.children.splice(index, 1);
        child_gui.destroy();
    }

    destroy() {
        if (this.textPoly)
            this.textPoly.destroy();
        if (this.backgroundPoly)
            this.backgroundPoly.destroy();
        if (this.container)
            this.container.destroy();
    }

    batch(func) {
        if (func && typeof func === 'function') {
            func();
            this.render();
        }
    }

    render_text() {

        // If textpoly does not exist, create it. Otherwise update it.
        if (!this.textPoly) {
            this.textPoly = this.scene.add.text(0, 0,  this.textString, { font: this.textSize + ' ' + this.textFamily, fill: this.textColor } );
            this.textPoly.setPadding( this.padding.left, this.padding.top, this.padding.right, this.padding.bottom );
            this.textPoly.setWordWrapWidth(this.width, true);

            // If the background exists, insert at index 1. Otherwise use index 0.
            if (this.backgroundPoly)
                this.container.addAt(this.textPoly, 1);
            else
                this.container.addAt(this.textPoly, 0);
        }
        else {
            this.textPoly.setText(this.textString);
            this.textPoly.setFill(this.textColor);
            this.textPoly.setFontSize(this.textSize);
            this.textPoly.setFontFamily(this.textFamily);
            this.textPoly.setPadding( this.padding.left, this.padding.top, this.padding.right, this.padding.bottom );
            this.textPoly.setWordWrapWidth(this.width, true);
        }

        // Set the Alpha value.
        this.textPoly.setAlpha(this.textAlpha);

        // If the textAlign attributes are set, figure how the x and y cords.
        let x = 0; // Default x cord and origin for text. textHAlign = left.
        let xorg = 0;
        let y = 0; // Default y cord and origin for text. textVAlign = top.
        let yorg = 0;
        if (this.textHAlign === 'center') {
            x = this.width / 2;
            xorg = 0.5;
        }
        else if (this.textHAlign === 'right') {
            x = this.width;
            xorg = 1;
        }
        if (this.textVAlign === 'middle') {
            y = this.height / 2;
            yorg = 0.5;
        }
        else if (this.textVAlign === 'bottom') {
            y = this.height;
            yorg = 1;
        }

        // Update cords and origin.
        this.textPoly.setOrigin(xorg, yorg);
        this.textPoly.x = x;
        this.textPoly.y = y;
    }

    render_background() {

        // Set the shape to build the compare.
        let shape = this.backgroundShape;

        // If the shape changes, redraw the polygon.
        if (this.backgroundPoly && this.backgroundPoly.type) {
            if (this.backgroundPoly.type.toLowerCase() !== shape) {
                this.backgroundPoly.destroy();
                this.backgroundPoly = undefined;
            }
        }

        // If the BackgroundAlign attributes are set, figure how the x and y cords and origins.
        let x = 0; // Default x cord and origin for text. textHAlign = left.
        let xorg = 0;
        let y = 0; // Default y cord and origin for text. textVAlign = top.
        let yorg = 0;
        if (this.backgroundHAlign === 'center') {
            x = this.width / 2;
            xorg = 0.5;
        }
        else if (this.backgroundHAlign === 'right') {
            x = this.width;
            xorg = 1;
        }
        if (this.backgroundVAlign === 'middle') {
            y = this.height / 2;
            yorg = 0.5;
        }
        else if (this.backgroundVAlign === 'bottom') {
            y = this.height;
            yorg = 1;
        }

        // Render the polygon based on shape.
        if (!this.backgroundPoly) {
            if (shape === 'rectangle')
                this.backgroundPoly = this.scene.add.rectangle(x, y, this.width, this.height, this.backgroundColor, this.backgroundAlpha);
            else if (shape === 'star')
                this.backgroundPoly = this.scene.add.star(x, y,  5, this.width / 3.5, this.height / 1.5, this.backgroundColor, this.backgroundAlpha);
            else if (shape === 'image')
                this.backgroundPoly = this.scene.add.image(x, y, this.backgroundImage, this.backgroundAlpha);
            else if (shape === 'polygon') {
                this.backgroundPoly = this.scene.add.polygon(x, y, [
                    this.width * 0.25, y,
                    this.width * 0.75, y,
                    this.width, y + this.height / 2,
                    this.width * 0.75, y + this.height,
                    this.width * 0.25, y + this.height,
                    0, y + this.height / 2
                ], this.backgroundColor, this.backgroundAlpha);
            }

            // Attach it to the container.
            this.container.addAt(this.backgroundPoly, 0);
        }
        else {

            // Update Size.
            this.backgroundPoly.displayWidth = this.width; // TODO This will not change the width after it's been created.
            this.backgroundPoly.displayHeight = this.height;  // TODO This will not change the width after it's been created.

            // Set GEO.
            this.backgroundPoly.x = x;
            this.backgroundPoly.y = y;

            // If the setFillStyle is unable to be set, don't set it.
            if (this.backgroundPoly.setFillStyle)
                this.backgroundPoly.setFillStyle(this.backgroundColor, this.backgroundAlpha);
        }

        // Update origin.
        this.backgroundPoly.setOrigin(xorg, yorg);

        // Set Stroke
        if (this.backgroundBorderSize > 0) {
            this.backgroundPoly.isStroked = true;
            this.backgroundPoly.lineWidth = this.backgroundBorderSize;
            this.backgroundPoly.strokeColor = this.backgroundBorderColor;
        }
        else
            this.backgroundPoly.isStroked = false;

        // Prevent Bubbling.
        if (this.event.preventBubbling) {
            this.backgroundPoly.setInteractive();
            this.backgroundPoly.on('pointerdown', function() {}, this);
        }

        // Attach onclick events.
        this.backgroundPoly.off('pointerdown');
        if (this.event.onclick) {
            this.backgroundPoly.setInteractive({ cursor: 'pointer' }); // Allow it to be interactive.

            // Enable Click Events.
            this.backgroundPoly.on('pointerdown', this.event.onclick, this);
        }

        // Attach ondrag events.
        this.backgroundPoly.off('dragstart');
        this.backgroundPoly.off('drag');
        if (this.event.ondrag) {
            this.backgroundPoly.setInteractive({ cursor: 'pointer' }); // Allow it to be interactive.
            this.scene.input.setDraggable(this.backgroundPoly); // Enable dragging.
            if (this.event.ondragstart) // If drag start exists, set it.
                this.backgroundPoly.on('dragstart', this.event.ondragstart);
            this.backgroundPoly.on('drag', this.event.ondrag); // Set the on drag function.
        }

        // Attach on mouse scroll.
        this.backgroundPoly.off('wheel');
        if (this.event.onmousescroll) {
            this.backgroundPoly.setInteractive(); // Allow it to be interactive.
            this.backgroundPoly.on('wheel', this.event.onmousescroll); // Set the mouse wheel function.
        }
    }

    render() {
        this.container.x = this.geo.x;
        this.container.y = this.geo.y;
        this.container.setDepth(this.geo.z);
        this.container.setScale(this.scale);
        this.render_text();
        this.render_background();
    }

    addEventListener(name, func) {
        let listeners = this.event;
        if ( listeners.hasOwnProperty(name) && typeof func === 'function' )
            listeners.name = func;
    }
}