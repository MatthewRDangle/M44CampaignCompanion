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
    	this.width = 0;
    	this.height = 0;
    	
    	// Aesthetic Data
    	this.backgroundColor = undefined;
    	this.backgroundImage = undefined;
    	
    	// Render Data
    	this.parent = undefined;
    	this.container = undefined;
    	this.polygon = undefined;
    	this.innerPolygons = [];
	}
	
	/*
	 ** Title: Add Child.
	 ** Description: Add a GUI child to this GUI. This will automatically add it to the container.
	 *
	 * @param gui - GUI - required - The GUI to attach as a child to this GUI.
	 */
	addChild(gui) {
		makeContainer(); // Convert this into a container.
		this.innerPolygons.push(gui);
		if (this.container) {
			gui.parent = this;
			
			// If a polygon or container on the gui exist, add it to this guis'  container.
			if (this.polygon)
				this.container.add(gui.polygon);
			else (this.container)
				this.container.add(gui.container)
		}
	}
	
/*	
	createChild(scene, emitter, options) {

	}
*/
	
	/*
	 ** Title: Delete Container.
	 ** Description: Deletes the container object, it's children, and sets the container to equal undefined.
	 */
	deleteContainer() {
		this.container.destroy();
		this.container = undefined; // Reset value.
	}
	
	/*
	 ** Title: Delete Polygon.
	 ** Description: Deletes the Polygon object and sets the Polygon to equal undefined.
	 */
	deletePolygon() {
		this.polygon.destroy();
		this.polygon = undefined; // Reset value.
	}
	
	/*
	 ** Title: Make Container.
	 ** Description: Sets this GUI object to be a container.
	 */
	makeContainer() {
		
		// If container is set to undefined, a create a new container.
		if (!this.container) {
			this.container = this.scene.add.container(this.x, this.y);
			
			// If a polygon exists, attach it to this container.
			if (this.polygon) {
				this.container.add(this.polygon);
			}
			
			// If a parent exists, attach this container to the parent.
			if (this.parent)
				this.parent.container.add(this.container);
			
			// If a parent exists, and a polygon, deattach the polygon from the parent so it's only attached to this container.
			if (this.parent && this.polygon) {
				this.parent.container.remove(this.polygon);
			}
		}
	}
	
	/*
	 ** Title: Make Polygon.
	 ** Description: Sets this GUI object to be a polygon.
	 *
	 ** @param type - string - required - A string value for the type of polygon to create. (ie: rectangle, star, text, image).
	 ** @param content - anything - optional - Some polygon will require content in order to render. (ie: text, image).
	 */
	makePolygon(type, content) {
		
		// If polygon is set to undefined, create it.
		if (!this.polygon) {
			
			if (type === 'rectangle')
				 this.polygon = this.scene.add.rectangle(this.x, this.y, this.width, this.height, this.backgroundColor);
			else if (type === 'star')
				this.polygon = this.scene.add.star(this.x, this.y, 5, this.width, this.height, this.backgroundColor);
			else if (type === 'text')
				this.polygon = this.scene.add.text(this.x, this.y, content, { font: '16px Arial', fill: '#FFFFFF' } );
			else if (type === 'image')
				this.polygon = this.scene.add.image(this.x, this.y, content);
			
			this.polygon.setOrigin(0, 0); // Set the origin to the top left of the polygon, instead of center.
			
			// Attach the polygon to the relative container. This is either the parent, or this container. Container takes priority.
			if (this.container)
				this.container.add(this.polygon);
			else if (this.parent && this.parent.container)
				this.parent.container.add(this.polygon);
		}
	}
	
	/*
	 ** Title: Import Container
	 ** Description: Attaches a container object if it's passed through.
	 *
	 ** @param container - Container - required - The container object to attach to the GUI.
	 */
	importContainer(container) {
		
		// If container is set to undefined, a new container can be imported.
		if (!this.container)
			this.container = container;
	}
	
	/*
	 ** Title: Set Background Color.
	 ** Description: Sets the background hex color for this GUI.
	 *
	 ** @param hexCode - Container - required - The hex value to insert as a background color to the polygon.
	 */
	setBackgroundColor(hexCode) {
		this.backgroundColor = hexCode;
		// Insert code the set the background color of the polygon.
	}
	
	setBackgroundImage(path) {
		this.backgroundImage = path;
	}
	
	setCords(x, y, z) {
		this.x = x;
		this.y = y;
		if (z)
			this.z = z;
	}
}