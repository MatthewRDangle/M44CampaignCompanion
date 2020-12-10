"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class GUI {
	
	constructor(scene, emitter) {
		// Add options parameter? How?
		
	   	// Scene Data
    	this.scene = scene;
    	this.emitter = emitter;
    	
    	// GEO Data
    	this.x = 0;
    	this.y = 0;
    	this.z = 0;
    	
    	// Interactive Data
    	this.interactive = false;
    	
    	// Render Data
    	this.parent = undefined;
    	this.container = this.scene.add.container(this.x, this.y);
    	this.innerGUI = [];
    	
    	// Size Data
    	this.width = 0;
    	this.height = 0;
    	this.padding = { left: 0, top: 0, right: 0, bottom: 0 };
    	
    	// Text Content Data
    	this.textPoly = undefined;
    	this.textString = undefined;
    	this.textColor = '#FFFFFF';
    	this.textSize = '16px';
    	this.textFamily = 'Arial';
    	this.textHAlign = 'left'; // left, center, right;
    	this.textVAlign = 'top'; // top, middle, bottom.
    	this.backgroundAlpha = 1;
    	
    	// Background Data
    	this.backgroundPoly = undefined;
    	this.backgroundColor = undefined;
    	this.backgroundImage = undefined;
    	this.backgroundShape = 'rectangle';
    	this.backgroundHAlign = 'left'; // left, center, right;
    	this.backgroundVAlign = 'top'; // top, middle, bottom.
    	this.backgroundAlpha = 1;
	}
	
	/*
	 ** Title: Add Child.
	 ** Description: Add a GUI child to this GUI. This will automatically add it to the container.
	 *
	 * @param gui - GUI - required - The GUI to attach as a child to this GUI.
	 */
	addChild(child_gui) {
		child_gui.parent = this;
		this.innerGUI.push(child_gui);
		this.container.add(child_gui.container);
	}
	
	
	
	/*
	 ** Title: Ren Background
	 ** Description: Render the background polygon or update it if it already exists. 
	 */
	renBackground() {
		
		// Render the background polygon.
		let shape = this.backgroundShape;
		
		// TODO Logic to detect shape change. If it's changes, redraw the polygon.
		
		if (shape === 'rectangle')
			this.backgroundPoly = this.scene.add.rectangle(0, 0, this.width, this.height, this.backgroundColor);
		else if (shape === 'star')
			this.backgroundPoly = this.scene.add.star(0, 0,  5, this.width, this.height, this.backgroundColor);
		else if (shape === 'image')
			this.backgroundPoly = this.scene.add.image(0, 0, this.backgroundImage);
		
		this.backgroundPoly.setOrigin(0, 0); // Set the origin to the top left of the polygon, instead of center.
		
		// Set the interactive ability if it's set to true for the GUI.
		if(this.interactive)
			this.backgroundPoly.setInteractive();
		
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
		
		// Update cords and origin.
		this.backgroundPoly.setOrigin(xorg, yorg);
		this.backgroundPoly.x = x;
		this.backgroundPoly.y = y;
		
		// Attach it to the container.
		this.container.addAt(this.backgroundPoly, 0);
	}
	
	/*
	 ** Title: Ren Container
	 ** Description: Updates the container properties. 
	 */
	renContainer() {
		this.container.width = this.width;
		this.container.height = this.height;
		this.container.x = this.x;
		this.container.y = this.y;
		this.container.depth = this.z;
	}
	
	/*
	 ** Title: Ren Text
	 ** Description: Render the text string or update the text string. 
	 */
	renText() {
		
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
	
	
	
	/*
	 ** Title: Set Background Color
	 ** Description: Sets the background color.
	 */
	setBackgroundColor(hexColor) {
		this.backgroundColor = hexColor;
		this.renBackground();
	}
	
	/*
	 ** Title: Set Background Color
	 ** Description: Sets the background image..
	 */
	setBackgroundImage(ref) {
		this.backgroundImage = ref;
		this.backgroundShape = 'image';
		this.renBackground();
	}
	
	/*
	 ** Title: Set Background Shape.
	 ** Description: Sets the background shape.
	 */
	setBackgroundShape(shape) {
		this.backgroundShape = shape;
		this.renBackground();
	}
	
	/*
	 ** Title: Set Background Align
	 ** Description: Aligns the background on in it's container.
	 */
	setBackgroundAlign(h, v) {
		this.backgroundHAlign = h;
		this.backgroundVAlign = v;
		this.renBackground();
	}
	
	/*
	 ** Title: Set Background H Align
	 ** Description: Aligns the background H on in it's container.
	 */
	setBackgroundHAlign(h) {
		this.backgroundHAlign = h;
		this.renBackground();
	}
	
	/*
	 ** Title: Set Background V Align
	 ** Description: Aligns the background V on in it's container.
	 */
	setBackgroundVAlign(v) {
		this.backgroundvAlign = v;
		this.renBackground();
	}
	
	/*
	 ** Title: Set Background Alpha
	 ** Description: Sets the background alpha transparency value. 0 <= value >= 1.
	 */
	setBackgroundAlpha(value) {
		this.backgroundAlpha = value;
	}
	
	
	
	/*
	 ** Title: Set Text String
	 ** Description: Sets the text string 
	 */
	setTextString(text) {
		this.textString = text; // Write text to GUI.
		this.renText();
	}
	
	/*
	 ** Title: Set Text Color
	 ** Description: Sets the text string.
	 */
	setTextColor(hexColor) {
		this.textColor = hexColor;
		if (this.textPoly)
			this.renText();
	}
	
	/*
	 ** Title: Set Text Size
	 ** Description: Sets the text string.
	 */
	setTextSize(size) {
		this.textSize = size;
		if (this.textPoly)
			this.renText();
	}
	
	/*
	 ** Title: Set Text Size
	 ** Description: Sets the text string.
	 */
	setTextFamily(fontFamily) {
		this.textFamily = fontFamily;
		if (this.textPoly)
			this.renText();
	}
	
	/*
	 ** Title: Set Text Align
	 ** Description: Aligns the text on in it's container.
	 */
	setTextAlign(h, v) {
		this.textHAlign = h;
		this.textVAlign = v;
		if (this.textPoly)
			this.renText();
	}
	
	/*
	 ** Title: Set Text H Align
	 ** Description: Aligns the text H on in it's container.
	 */
	setTextHAlign(h) {
		this.textHAlign = h;
		if (this.textPoly)
			this.renText();
	}
	
	/*
	 ** Title: Set Text V Align
	 ** Description: Aligns the text Y on in it's container.
	 */
	setTextVAlign(v) {
		this.textVAlign = v;
		if (this.textPoly)
			this.renText();
	}
	
	/*
	 ** Title: Set Text Alpha
	 ** Description: Sets the background alpha transparency value. 0 <= value >= 1.
	 */
	setTextAlpha(value) {
		this.textAlpha = value;
	}
	
	
	
	/*
	 ** Title: Set Coordinates
	 ** Description: Sets the geo coordinates of the GUI.
	 *
	 ** @param x - number - required - the x cord value.
	 ** @param y - number - required - the y cord value.
	 ** @param z - number - optional - the z cord value.
	 */
	setCords(x, y, z) {
		
		// Set the cords to the object.
		this.x = x;
		this.y = y;
		if (z)
			this.z = z;
		
		this.updateGUI(); // Update the GUI polygons.
	}
	
	/*
	 ** Title: Set Depth
	 ** Description: Sets the geo Z coordinate of the GUI.
	 *
	 ** @param z - number - required - the z cord value.
	 */
	setDepth(z) {
		
		// Set the cords to the object.
		this.z = z;
		this.container.depth = z;
		
		this.updateGUI(); // Update the GUI polygons.
	}
	
	/*
	 ** Title: Set Dimensions
	 ** Description: Sets the width and height draw dimensions for this GUI.
	 *
	 ** @param width - number - required - width of the GUI.
	 ** @param height - number - required - height of the GUI.
	 */
	setDimensions(width, height) {
		
		// Set the dimensions to the object.
		this.width = width;
		this.height = height;
		
		this.updateGUI(); // Update the GUI polygons.
	}
	
	/*
	 ** Title: Set Width
	 ** Description: Sets the width draw dimensions for this GUI.
	 *
	 ** @param width - number - required - width of the GUI.
	 */
	setWidth(width) {
		
		// Set the dimensions to the object.
		this.width = width;
		
		this.updateGUI(); // Update the GUI polygons.
	}
	
	/*
	 ** Title: Set Height
	 ** Description: Sets the height draw dimensions for this GUI.
	 *
	 ** @param height - number - required - height of the GUI.
	 */
	setHeight(height) {
		
		// Set the dimensions to the object.
		this.height = height;
		
		this.updateGUI(); // Update the GUI polygons.
	}
	
	/*
	 ** Title: Set Interactive
	 ** Description: Applies or removes the interactive setting on the GUI.
	 *
	 ** @param value - boolean - required - True value is apply interactive, false with remove it.
	 */
	setInteractive(value) {
		if (value === true) {
			this.interactive = true;
		}
		else if (value === false) {
			this.interactive = false;
		}
		
		this.renBackground(); // Update the GUI polygons.
	}
	
	/*
	 ** Title: Set Text Padding
	 ** Description: Sets all the padding values. at once.
	 */
	setPadding(left, top, right, bottom) {
		
		// If the right and bottom don't exist, assume they are equal to the left and top properties.
		if (!right && !bottom) {
			right = left;
			bottom = top;
		}

		// Apply padding and render.
		this.padding.left = left;
		this.padding.top = top;
		this.padding.right = right;
		this.padding.bottom = bottom;
		if (this.textPoly)
			this.renText();
	}
	
	/*
	 ** Title: Set Text Padding Left
	 ** Description: Sets just the padding left.
	 */
	setPaddingLeft(left) {
		this.padding.left = left;
		if (this.textPoly)
			this.renText();
	}
	
	/*
	 ** Title: Set Text Padding top
	 ** Description: Sets just the padding top.
	 */
	setPaddingTop(top) {
		this.padding.top = top;
		if (this.textPoly)
			this.renText();
	}
	
	
	/*
	 ** Title: Set Text Padding right
	 ** Description: Sets just the padding right.
	 */
	setPaddingRight(right) {
		this.padding.top = right;
		if (this.textPoly)
			this.renText();
	}
	
	
	/*
	 ** Title: Set Text Size
	 ** Description: Sets the text string.
	 */
	setPaddingBottom(bottom) {
		this.padding.top = bottom;
		if (this.textPoly)
			this.renText();
	}
	
	
	
	/*
	 ** Title: Update GUI
	 ** Description: Will render or update the entire GUI.
	 */
	updateGUI() {
		this.renContainer();
		this.renBackground();
		this.renText();
	}
}