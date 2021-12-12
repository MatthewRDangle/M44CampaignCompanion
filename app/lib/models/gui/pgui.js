import GUI from '../gui.js'

export default class PGUI extends GUI {
    constructor(scene) {
        super();

        this.state.scene = scene;
        this.state.container = this.scene.add.container(0, 0);
        this.state.geo = {
            x: 0,
            y: 0,
            z: 0
        }
        this.state.width = 0;
        this.state.height = 0;
        this.state.padding = { left: 0, top: 0, right: 0, bottom: 0 };
        this.state.scale = 1;

        this.state.textPoly = undefined; // Is created based on props below.
        this.state.textString = undefined;
        this.state.textColor = '#FFFFFF';
        this.state.textSize = '16px';
        this.state.textFamily = 'Roboto';
        this.state.textHAlign = 'left'; // left, center, right;
        this.state.textVAlign = 'top'; // top, middle, bottom.
        this.state.textAlpha = 1;

        this.state.backgroundPoly = undefined; // Is created based on props below.
        this.state.backgroundColor = undefined;
        this.state.backgroundImage = undefined;
        this.state.backgroundShape = 'rectangle';
        this.state.backgroundHAlign = 'left'; // left, center, right;
        this.state.backgroundVAlign = 'top'; // top, middle, bottom.
        this.state.backgroundBorderColor = undefined;
        this.state.backgroundBorderSize = undefined;
        this.state.backgroundAlpha = 1;

        this.state.event = {
            onclick: undefined,
            ondragstart: undefined,
            ondrag: undefined,
            onmousescroll: undefined,
            preventBubbling: false,
            update: []
        }
    }

    erase() {

    }

    draw() {
        const state = this.state;

        // ===========================================
        // ================ Container ================
        // ===========================================
        state.container.x = state.geo.x;
        state.container.y = state.geo.y;
        state.container.setDepth(state.geo.z);
        state.container.setScale(state.scale);


        // ===========================================
        // ================ Text Poly ================
        // ===========================================
        function render_text() {

            // If textpoly does not exist, create it. Otherwise update it.
            if (!state.textPoly) {
                state.textPoly = state.scene.add.text(0, 0,  state.textString, { font: state.textSize + ' ' + state.textFamily, fill: state.textColor } );
                state.textPoly.setPadding( state.padding.left, state.padding.top, state.padding.right, state.padding.bottom );
                state.textPoly.setWordWrapWidth(state.width, true);

                // If the background exists, insert at index 1. Otherwise use index 0.
                if (state.backgroundPoly)
                    state.container.addAt(state.textPoly, 1);
                else
                    state.container.addAt(state.textPoly, 0);
            }
            else {
                state.textPoly.setText(state.textString);
                state.textPoly.setFill(state.textColor);
                state.textPoly.setFontSize(state.textSize);
                state.textPoly.setFontFamily(state.textFamily);
                state.textPoly.setPadding( state.padding.left, state.padding.top, state.padding.right, state.padding.bottom );
                state.textPoly.setWordWrapWidth(state.width, true);
            }

            // Set the Alpha value.
            state.textPoly.setAlpha(state.textAlpha);

            // If the textAlign attributes are set, figure how the x and y cords.
            let x = 0; // Default x cord and origin for text. textHAlign = left.
            let xorg = 0;
            let y = 0; // Default y cord and origin for text. textVAlign = top.
            let yorg = 0;
            if (state.textHAlign === 'center') {
                x = state.width / 2;
                xorg = 0.5;
            }
            else if (state.textHAlign === 'right') {
                x = state.width;
                xorg = 1;
            }
            if (state.textVAlign === 'middle') {
                y = state.height / 2;
                yorg = 0.5;
            }
            else if (state.textVAlign === 'bottom') {
                y = state.height;
                yorg = 1;
            }

            // Update cords and origin.
            state.textPoly.setOrigin(xorg, yorg);
            state.textPoly.x = x;
            state.textPoly.y = y;
        }


        // ===========================================
        // ============= Background Poly =============
        // ===========================================
        function render_background() {

            // Set the shape to build the compare.
            let shape = state.backgroundShape;

            // If the shape changes, redraw the polygon.
            if (state.backgroundPoly && state.backgroundPoly.type) {
                if (state.backgroundPoly.type.toLowerCase() !== shape) {
                    state.backgroundPoly.destroy();
                    state.backgroundPoly = undefined;
                }
            }

            // If the BackgroundAlign attributes are set, figure how the x and y cords and origins.
            let x = 0; // Default x cord and origin for text. textHAlign = left.
            let xorg = 0;
            let y = 0; // Default y cord and origin for text. textVAlign = top.
            let yorg = 0;
            if (state.backgroundHAlign === 'center') {
                x = state.width / 2;
                xorg = 0.5;
            }
            else if (state.backgroundHAlign === 'right') {
                x = state.width;
                xorg = 1;
            }
            if (state.backgroundVAlign === 'middle') {
                y = state.height / 2;
                yorg = 0.5;
            }
            else if (state.backgroundVAlign === 'bottom') {
                y = state.height;
                yorg = 1;
            }

            // Render the polygon based on shape.
            if (!state.backgroundPoly) {
                if (shape === 'rectangle')
                    state.backgroundPoly = state.scene.add.rectangle(x, y, state.width, state.height, state.backgroundColor, state.backgroundAlpha);
                else if (shape === 'star')
                    state.backgroundPoly = state.scene.add.star(x, y,  5, state.width / 3.5, state.height / 1.5, state.backgroundColor, state.backgroundAlpha);
                else if (shape === 'image')
                    state.backgroundPoly = state.scene.add.image(x, y, state.backgroundImage, state.backgroundAlpha);
                else if (shape === 'hex') {
                    state.backgroundPoly = state.scene.add.polygon(x, y, [
                        state.width * 0.25, y,
                        state.width * 0.75, y,
                        state.width, y + state.height / 2,
                        state.width * 0.75, y + state.height,
                        state.width * 0.25, y + state.height,
                        0, y + state.height / 2
                    ], state.backgroundColor, state.backgroundAlpha);
                }

                // Attach it to the container.
                state.container.addAt(state.backgroundPoly, 0);
            }
            else {

                // Update Size.
                state.backgroundPoly.displayWidth = state.width; // TODO state will not change the width after it's been created.
                state.backgroundPoly.displayHeight = state.height;  // TODO state will not change the width after it's been created.

                // Set GEO.
                state.backgroundPoly.x = x;
                state.backgroundPoly.y = y;

                // If the setFillStyle is unable to be set, don't set it.
                if (state.backgroundPoly.setFillStyle)
                    state.backgroundPoly.setFillStyle(state.backgroundColor, state.backgroundAlpha);
            }

            // Update origin.
            state.backgroundPoly.setOrigin(xorg, yorg);

            // Set Stroke
            if (state.backgroundBorderSize > 0) {
                state.backgroundPoly.isStroked = true;
                state.backgroundPoly.lineWidth = state.backgroundBorderSize;
                state.backgroundPoly.strokeColor = state.backgroundBorderColor;
            }
            else
                state.backgroundPoly.isStroked = false;

            // Prevent Bubbling.
            if (state.event.preventBubbling) {
                state.backgroundPoly.setInteractive();
                state.backgroundPoly.on('pointerdown', function() {}, state);
            }

            // Attach onclick events.
            state.backgroundPoly.off('pointerdown');
            if (state.event.onclick) {
                state.backgroundPoly.setInteractive({ cursor: 'pointer' }); // Allow it to be interactive.

                // Enable Click Events.
                state.backgroundPoly.on('pointerdown', state.event.onclick, state);
            }

            // Attach ondrag events.
            state.backgroundPoly.off('dragstart');
            state.backgroundPoly.off('drag');
            if (state.event.ondrag) {
                state.backgroundPoly.setInteractive({ cursor: 'pointer' }); // Allow it to be interactive.
                state.scene.input.setDraggable(state.backgroundPoly); // Enable dragging.
                if (state.event.ondragstart) // If drag start exists, set it.
                    state.backgroundPoly.on('dragstart', state.event.ondragstart);
                state.backgroundPoly.on('drag', state.event.ondrag); // Set the on drag function.
            }

            // Attach on mouse scroll.
            state.backgroundPoly.off('wheel');
            if (state.event.onmousescroll) {
                state.backgroundPoly.setInteractive(); // Allow it to be interactive.
                state.backgroundPoly.on('wheel', state.event.onmousescroll); // Set the mouse wheel function.
            }
        }
    }

    // addChild(child_gui) {
    //     child_gui.parent = this;
    //     this.children.push(child_gui);
    //     this.container.add(child_gui.container);
    // }
    //
    // removeChild(child_gui) {
    //     let index = this.children.indexOf(child_gui);
    //     this.children.splice(index, 1);
    //     child_gui.destroy();
    // }
    //
    // destroy() {
    //     if (this.textPoly)
    //         this.textPoly.destroy();
    //     if (this.backgroundPoly)
    //         this.backgroundPoly.destroy();
    //     if (this.container)
    //         this.container.destroy();
    // }
    //
    // batch(func) {
    //     if (func && typeof func === 'function') {
    //         func();
    //         this.render();
    //     }
    // }
    //
    // render_text() {
    //
    //     // If textpoly does not exist, create it. Otherwise update it.
    //     if (!this.textPoly) {
    //         this.textPoly = this.scene.add.text(0, 0,  this.textString, { font: this.textSize + ' ' + this.textFamily, fill: this.textColor } );
    //         this.textPoly.setPadding( this.padding.left, this.padding.top, this.padding.right, this.padding.bottom );
    //         this.textPoly.setWordWrapWidth(this.width, true);
    //
    //         // If the background exists, insert at index 1. Otherwise use index 0.
    //         if (this.backgroundPoly)
    //             this.container.addAt(this.textPoly, 1);
    //         else
    //             this.container.addAt(this.textPoly, 0);
    //     }
    //     else {
    //         this.textPoly.setText(this.textString);
    //         this.textPoly.setFill(this.textColor);
    //         this.textPoly.setFontSize(this.textSize);
    //         this.textPoly.setFontFamily(this.textFamily);
    //         this.textPoly.setPadding( this.padding.left, this.padding.top, this.padding.right, this.padding.bottom );
    //         this.textPoly.setWordWrapWidth(this.width, true);
    //     }
    //
    //     // Set the Alpha value.
    //     this.textPoly.setAlpha(this.textAlpha);
    //
    //     // If the textAlign attributes are set, figure how the x and y cords.
    //     let x = 0; // Default x cord and origin for text. textHAlign = left.
    //     let xorg = 0;
    //     let y = 0; // Default y cord and origin for text. textVAlign = top.
    //     let yorg = 0;
    //     if (this.textHAlign === 'center') {
    //         x = this.width / 2;
    //         xorg = 0.5;
    //     }
    //     else if (this.textHAlign === 'right') {
    //         x = this.width;
    //         xorg = 1;
    //     }
    //     if (this.textVAlign === 'middle') {
    //         y = this.height / 2;
    //         yorg = 0.5;
    //     }
    //     else if (this.textVAlign === 'bottom') {
    //         y = this.height;
    //         yorg = 1;
    //     }
    //
    //     // Update cords and origin.
    //     this.textPoly.setOrigin(xorg, yorg);
    //     this.textPoly.x = x;
    //     this.textPoly.y = y;
    // }
    //
    // render_background() {
    //
    //     // Set the shape to build the compare.
    //     let shape = this.backgroundShape;
    //
    //     // If the shape changes, redraw the polygon.
    //     if (this.backgroundPoly && this.backgroundPoly.type) {
    //         if (this.backgroundPoly.type.toLowerCase() !== shape) {
    //             this.backgroundPoly.destroy();
    //             this.backgroundPoly = undefined;
    //         }
    //     }
    //
    //     // If the BackgroundAlign attributes are set, figure how the x and y cords and origins.
    //     let x = 0; // Default x cord and origin for text. textHAlign = left.
    //     let xorg = 0;
    //     let y = 0; // Default y cord and origin for text. textVAlign = top.
    //     let yorg = 0;
    //     if (this.backgroundHAlign === 'center') {
    //         x = this.width / 2;
    //         xorg = 0.5;
    //     }
    //     else if (this.backgroundHAlign === 'right') {
    //         x = this.width;
    //         xorg = 1;
    //     }
    //     if (this.backgroundVAlign === 'middle') {
    //         y = this.height / 2;
    //         yorg = 0.5;
    //     }
    //     else if (this.backgroundVAlign === 'bottom') {
    //         y = this.height;
    //         yorg = 1;
    //     }
    //
    //     // Render the polygon based on shape.
    //     if (!this.backgroundPoly) {
    //         if (shape === 'rectangle')
    //             this.backgroundPoly = this.scene.add.rectangle(x, y, this.width, this.height, this.backgroundColor, this.backgroundAlpha);
    //         else if (shape === 'star')
    //             this.backgroundPoly = this.scene.add.star(x, y,  5, this.width / 3.5, this.height / 1.5, this.backgroundColor, this.backgroundAlpha);
    //         else if (shape === 'image')
    //             this.backgroundPoly = this.scene.add.image(x, y, this.backgroundImage, this.backgroundAlpha);
    //         else if (shape === 'hex') {
    //             this.backgroundPoly = this.scene.add.polygon(x, y, [
    //                 this.width * 0.25, y,
    //                 this.width * 0.75, y,
    //                 this.width, y + this.height / 2,
    //                 this.width * 0.75, y + this.height,
    //                 this.width * 0.25, y + this.height,
    //                 0, y + this.height / 2
    //             ], this.backgroundColor, this.backgroundAlpha);
    //         }
    //
    //         // Attach it to the container.
    //         this.container.addAt(this.backgroundPoly, 0);
    //     }
    //     else {
    //
    //         // Update Size.
    //         this.backgroundPoly.displayWidth = this.width; // TODO This will not change the width after it's been created.
    //         this.backgroundPoly.displayHeight = this.height;  // TODO This will not change the width after it's been created.
    //
    //         // Set GEO.
    //         this.backgroundPoly.x = x;
    //         this.backgroundPoly.y = y;
    //
    //         // If the setFillStyle is unable to be set, don't set it.
    //         if (this.backgroundPoly.setFillStyle)
    //             this.backgroundPoly.setFillStyle(this.backgroundColor, this.backgroundAlpha);
    //     }
    //
    //     // Update origin.
    //     this.backgroundPoly.setOrigin(xorg, yorg);
    //
    //     // Set Stroke
    //     if (this.backgroundBorderSize > 0) {
    //         this.backgroundPoly.isStroked = true;
    //         this.backgroundPoly.lineWidth = this.backgroundBorderSize;
    //         this.backgroundPoly.strokeColor = this.backgroundBorderColor;
    //     }
    //     else
    //         this.backgroundPoly.isStroked = false;
    //
    //     // Prevent Bubbling.
    //     if (this.event.preventBubbling) {
    //         this.backgroundPoly.setInteractive();
    //         this.backgroundPoly.on('pointerdown', function() {}, this);
    //     }
    //
    //     // Attach onclick events.
    //     this.backgroundPoly.off('pointerdown');
    //     if (this.event.onclick) {
    //         this.backgroundPoly.setInteractive({ cursor: 'pointer' }); // Allow it to be interactive.
    //
    //         // Enable Click Events.
    //         this.backgroundPoly.on('pointerdown', this.event.onclick, this);
    //     }
    //
    //     // Attach ondrag events.
    //     this.backgroundPoly.off('dragstart');
    //     this.backgroundPoly.off('drag');
    //     if (this.event.ondrag) {
    //         this.backgroundPoly.setInteractive({ cursor: 'pointer' }); // Allow it to be interactive.
    //         this.scene.input.setDraggable(this.backgroundPoly); // Enable dragging.
    //         if (this.event.ondragstart) // If drag start exists, set it.
    //             this.backgroundPoly.on('dragstart', this.event.ondragstart);
    //         this.backgroundPoly.on('drag', this.event.ondrag); // Set the on drag function.
    //     }
    //
    //     // Attach on mouse scroll.
    //     this.backgroundPoly.off('wheel');
    //     if (this.event.onmousescroll) {
    //         this.backgroundPoly.setInteractive(); // Allow it to be interactive.
    //         this.backgroundPoly.on('wheel', this.event.onmousescroll); // Set the mouse wheel function.
    //     }
    // }
    //
    // render() {
    //     this.container.x = this.geo.x;
    //     this.container.y = this.geo.y;
    //     this.container.setDepth(this.geo.z);
    //     this.container.setScale(this.scale);
    //     this.render_text();
    //     this.render_background();
    // }
    //
    // addEventListener(name, func) {
    //     let listeners = this.event;
    //     if ( listeners.hasOwnProperty(name) && typeof func === 'function' )
    //         listeners.name = func;
    // }
}