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
    	this.textVAlign = 'middle'; // top, middle, bottom.
    	this.textHAlign = 'left'; // left, center, right;
    	
    	// Background Data
    	this.backgroundPoly = undefined;
    	this.backgroundColor = undefined;
    	this.backgroundImage = undefined;
    	this.backgroundShape = 'rectangle';
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
		this.container.add(chid_gui.container);
	}
	
	
	
	/*
	 ** Title: Ren Background
	 ** Description: Render the background polygon or update it if it already exists. 
	 */
	renBackground() {
		
		// Render the background polygon.
		let shape = this.backgroundShape;
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
			this.textPoly.setOrigin(0, 0);
			
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
		}
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
		renBackground();
	}
	
	/*
	 ** Title: Set Background Shape.
	 ** Description: Sets the background shape.
	 */
	setBackgroundShape(shape) {
		this.backgroundShape = shape;
		renBackground();
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
			renText();
	}
	
	/*
	 ** Title: Set Text Size
	 ** Description: Sets the text string.
	 */
	setTextSize(size) {
		this.textSize = size;
		if (this.textPoly)
			renText();
	}
	
	/*
	 ** Title: Set Text Size
	 ** Description: Sets the text string.
	 */
	setTextFamily(fontFamily) {
		this.textFamily = fontFamily;
		if (this.textPoly)
			renText();
	}
	
	/*
	 ** Title: Set Text Align
	 ** Description: Aligns the text on in it's container.
	 */
	setTextAlign(h, v) {
		this.textHAlign = h;
		this.textVAlign = v;
		if (this.textPoly)
			renText();
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
			this.	renText();
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
	
	
	
	
	
	
	
//	
//	/*
//	 ** Title: Add Text Content
//	 ** Description: Appends text gui as a child of this gui.
//	 *
//	 * @param gui - GUI - required - The GUI to attach as a child to this GUI.
//	 */
//	addTextContent(x, y, text) {
//		
//		// Build the text GUI.
//		let text_gui = new GUI(this.scene, this.emitter); // Create a new GUI.
//		text_gui.setCords(x, y, this.y);
//		text_gui.makePolygon('text', text);
//		
//		// Add to Container.
//		this.makeContainer(); // This method will only add a container if it's available.
//		this.addChild(text_gui);
//	}
//	
///*	
//	createChild(options) {
//		let child_gui = new GUI(this.scene, this.emitter);
//	}
//*/
//	
//	/*
//	 ** Title: Delete Container.
//	 ** Description: Deletes the container object, it's children, and sets the container to equal undefined.
//	 */
//	deleteContainer() {
//		this.container.destroy();
//		this.container = undefined; // Reset value.
//	}
//	
//	/*
//	 ** Title: Delete Polygon.
//	 ** Description: Deletes the Polygon object and sets the Polygon to equal undefined.
//	 */
//	deletePolygon() {
//		this.polygon.destroy();
//		this.polygon = undefined; // Reset value.
//	}
//	
//	/*
//	 ** Title: Make Container.
//	 ** Description: Sets this GUI object to be a container.
//	 */
//	makeContainer() {
//		
//		// If container is set to undefined, a create a new container.
//		if (!this.container) {
//			this.container = this.scene.add.container(this.x, this.y);
//			this.container.depth = this.z;
//			
//			// If a polygon exists, attach it to this container.
//			if (this.polygon) {
//				this.container.add(this.polygon);
//			}
//			
//			// If a parent exists, attach this container to the parent.
//			if (this.parent)
//				this.parent.container.add(this.container);
//			
//			// If a parent exists, and a polygon, deattach the polygon from the parent so it's only attached to this container.
//			if (this.parent && this.polygon) {
//				this.parent.container.remove(this.polygon);
//			}
//		}
//	}
//	
//	/*
//	 ** Title: Make Polygon.
//	 ** Description: Sets this GUI object to be a polygon.
//	 *
//	 ** @param type - string - required - A string value for the type of polygon to create. (ie: rectangle, star, text, image).
//	 ** @param content - anything - optional - Some polygon will require content in order to render. (ie: text, image).
//	 */
//	makePolygon(type, content) {
//		
//		// If a container exists, set the x and y cords to the 0.
//		let x = this.x;
//		let y = this.y;
//		if (this.container) {
//			x = 0;
//			y = 0;
//		}
//
//		// If polygon is set to undefined, create it.
//		if (!this.polygon) {
//			if (type === 'rectangle')
//				 this.polygon = this.scene.add.rectangle(x, y, this.width, this.height, this.backgroundColor);
//			else if (type === 'star')
//				this.polygon = this.scene.add.star(x, y,  5, this.width, this.height, this.backgroundColor);
//			else if (type === 'text')
//				this.polygon = this.scene.add.text(x, y,  content, { font: '16px Arial', fill: '#FFFFFF' } );
//			else if (type === 'image')
//				this.polygon = this.scene.add.image(x, y, content);
//			
//			this.polygon.setOrigin(0, 0); // Set the origin to the top left of the polygon, instead of center.
//			this.polygon.depth = this.z;
//			
//			// Set the interactive ability if it's set to true for the GUI.
//			if(this.interactive)
//				this.polygon.setInteractive();
//			
//			// Attach the polygon to the relative container. This is either the parent, or this container. Container takes priority.
//			if (this.container)
//				this.container.add(this.polygon);
//			else if (this.parent && this.parent.container)
//				this.parent.container.add(this.polygon);
//		}
//	}
//	
//	/*
//	 ** Title: Import Container
//	 ** Description: Attaches a container object if it's passed through.
//	 *
//	 ** @param container - Container - required - The container object to attach to the GUI.
//	 */
//	importContainer(container) {
//		
//		// If container is set to undefined, a new container can be imported.
//		if (!this.container)
//			this.container = container;
//	}
//	
//	/*
//	 ** Title: Set Background Shape.
//	 ** Description: Sets the background shape. Default is rectangle.
//	 *
//	 *
//	 */
//	setBackgroundShape(shape) {
//		this.backgroundShape = shape;
//		
//		// If polygon has already been created, delete and redraw it.
//		if (this.polygon && this.backgroundColor) {
//			this.polygon.destroy();
//			this.makePolygon(this.backgroundShape);
//		}
//	}
//	
//	/*
//	 ** Title: Set Background Color.
//	 ** Description: Sets the background hex color for this GUI.
//	 *
//	 ** @param hexCode - Hex - required - The hex value to insert as a background color to the polygon.
//	 */
//	setBackgroundColor(hexCode) {
//		this.backgroundColor = hexCode;
//		this.makePolygon(this.backgroundShape);
//	}
//	
//	/*
//	 ** Title: Set Background Image.
//	 ** Description: Apply a background image to this GUI.
//	 *
//	 ** @param reference - string - required - The Phaser import name reference of the image for the scene..
//	 */
//	setBackgroundImage(reference) {
//		this.backgroundImage = reference;
//		this.setBackgroundShape('image');
//		this.makePolygon(this.backgroundShape, this.backgroundImage);
//	}
//	
//	/*
//	 ** Title: Set Coordinates
//	 ** Description: Sets the geo coordinates of the GUI.
//	 *
//	 ** @param x - number - required - the x cord value.
//	 ** @param y - number - required - the y cord value.
//	 ** @param z - number - optional - the z cord value.
//	 */
//	setCords(x, y, z) {
//		
//		// Set the cords to the object.
//		this.x = x;
//		this.y = y;
//		if (z)
//			this.z = z;
//		
//		// Update the cords of the container and polygon.
//		if (this.container)
//			this.container.depth = this.z;
//		else if (this.polygon)
//			this.polygon.depth = this.z;
//	}
//	
//	/*
//	 ** Title: Set Dimensions
//	 ** Description: Sets the width and height draw dimensions for this GUI.
//	 *
//	 ** @param width - number - required - width of the GUI.
//	 ** @param height - number - required - height of the GUI.
//	 */
//	// @TODO - Find a way to fix setDimensions, for some reason it must be set after the polygon is created.
//	setDimensions(width, height) {
//		
//		// Set the dimensions to the object.
//		this.width = width;
//		this.height = height;
//		
//		// Update the polygon dimensions.
//		if (this.polygon) {
//			this.polygon.width = this.width;
//			this.polygon.height = this.height;
//		}
//	}
//	
//	/*
//	 ** Title: Set Interactive
//	 ** Description: Applies or removes the interactive setting on the GUI.
//	 *
//	 ** @param value - boolean - required - True value is apply interactive, false with remove it.
//	 */
//	// @TODO - Find a way to fix setInteractive, for some reason it must be set after the dimensions are set.
//	setInteractive(value) {
//		if (value === true) {
//			this.interactive = true;
//			if (this.polygon)
//				this.polygon.setInteractive();
//		}
//		else if (value === false) {
//			this.interactive = false;
//			if (this.polygon)
//				this.polygon.removeInteractive();
//		}
//	}
}