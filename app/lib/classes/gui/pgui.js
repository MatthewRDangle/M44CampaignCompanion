import GUI from '../gui.js'

const body_element = document.getElementsByTagName('body')[0];
const body_style = window.getComputedStyle(body_element);

export default class PGUI extends GUI {
    constructor(scene) {
        super();

        this.state.scene = scene;
        this.state.container = this.state.scene.add.container(0, 0);
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
        this.state.textColor = body_style.color;
        this.state.textSize = body_style.fontSize;
        this.state.textFamily = body_style.fontFamily.split(',')[0];
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
            preventBubbling: false
        }
    }

    addChild(child_pgui) {
        GUI.prototype.addChild.call(this, child_pgui);
        this.state.container.add(child_pgui.state.container);
    }

    erase() {
        if (this.state.container)
            this.state.container.destroy();

        if (this.state.textPoly)
            this.state.textPoly.destroy();

        if (this.state.backgroundPoly)
            this.state.backgroundPoly.destroy();
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
        render_text();
        render_background();


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
                state.backgroundPoly.on('pointerup', state.event.onclick, state);
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

    update() {
        this.draw();
    }
}