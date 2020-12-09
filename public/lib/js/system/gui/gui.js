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
	
	deleteContainer() {
		delete this.container;
		this.container = undefined; // Reset value.
	}
	
	deletePolygon() {
		delete this.polygon;
		this.polygon = undefined; // Reset value.
	}
	
	makeContainer() {
		
		// If container is set to undefined, a create a new container.
		if (!this.container) {
			this.container = this.scene.add.container(this.x, this.y);
			
			// Remove polygon if it exists.
			if (this.polygon) {
				this.deletePolygon();
			}
		}
	}
	
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
			
			// If this GUI has a parent, attach it to the parent container.
			if (this.parent)
				this.parent.container.add(this.polygon);
		}
	}
	
	importContainer(container) {
		
		// If container is set to undefined, a new container can be imported.
		if (!this.container)
			this.container = container;
	}
	
	setBackgroundColor(hexCode) {
		this.backgroundColor = hexCode;
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