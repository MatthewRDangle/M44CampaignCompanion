"use strict"; // Execute JavaScript file in strict mode.

class WarSim extends Phaser.Scene {
	
    constructor() {
        super('WarSim');
    }
    preload() {}
    create() {
    	this.gridContainer = this.add.container(75,75);
    	this.drawHexGrid(14,8,75,5,5);
    }
    update() {}
    
    drawHexGrid(width, height, hexHeight, startX, startY) {
    	let hexCoords = this.getHexCoords(hexHeight);
    	for (let x = 0; x <= width - 1; x++) {
    		for (let y = 0; y <= height-1; y++) {
    			let hexX = x * hexHeight - (x*(hexHeight/9));
    			let hexY = y * hexHeight + (y*2);
    			if (x % 2 === 1) {
    				hexY+= hexHeight / 2;
    			}
    			let hex1 = this.add.polygon(hexX+startX, hexY+startY, hexCoords, 0xffffff);
    			hex1.setStrokeStyle(1, 0xefc53f);
    			hex1.setData('painted',false);
    			hex1.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
    				console.log('click x:'+x+' y:'+y);
    				hex1.setStrokeStyle(2, 0xef15ff);
    				hex1.data.values.painted = !hex1.data.values.painted;
    				if (hex1.data.values.painted) {
    					hex1.setFillStyle(0x3000ff)
    				}
    				else {
    					hex1.setFillStyle(0xffffff)
    				}
    			}).on('pointerup', () => {
    				console.log('mouse up');
    				hex1.setStrokeStyle(1, 0xefc53f);
    			});
    			this.gridContainer.add(hex1);
    		}
    	}
    }
    
    getHexCoords(height) {
    	
    	//http://csharphelper.com/blog/2015/10/draw-a-hexagonal-grid-in-c/
    	let width = 4 * (height / 2 / Math.sqrt(3));
    	let y = height / 2;
    	let hexCoords = [
    		0, y, width * 0.25, y - height / 2, width * 0.75, 
    		y - height / 2,  width, y,  width * 0.75, y + height / 2, 
    		width * 0.25, y + height / 2
    	];
    	return hexCoords;
    }
    /*
    drawHexGrid(width: number, height: number, hexHeight: number,startX:number = 0,startY:number = 0) {
    	let hexCoords: number[] = this.getHexCoords(hexHeight);
    	for (let x: number = 0; x <= width-1; x++) {
    		for (let y: number = 0; y <= height-1; y++) {
    			let hexX = x * hexHeight - (x*(hexHeight/9));
    			let hexY = y * hexHeight + (y*2);
    			if (x % 2 === 1) {
    				hexY+= hexHeight / 2;
    			}
    			let hex1 = this.add.polygon(hexX+startX, hexY+startY, hexCoords, 0xffffff);
    			hex1.setStrokeStyle(1, 0xefc53f);
    			hex1.setData('painted',false);
    			hex1.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
    				console.log('click x:'+x+' y:'+y);
    				hex1.setStrokeStyle(2, 0xef15ff);
    				hex1.data.values.painted = !hex1.data.values.painted;
    				if (hex1.data.values.painted) {
    					hex1.setFillStyle(0x3000ff)
    				}
    				else {
    					hex1.setFillStyle(0xffffff)
    				}
    			}).on('pointerup', () => {
    				console.log('mouse up');
    				hex1.setStrokeStyle(1, 0xefc53f);
    			});
    			this.gridContainer.add(hex1);
    		}
    	}
    }
    getHexCoords(height: number): number[] {
    		
    	//http://csharphelper.com/blog/2015/10/draw-a-hexagonal-grid-in-c/
    	let width: number = (4 * (height / 2 / Math.sqrt(3)));
    	let y: number = height / 2;
    		let hexCoords: number[] = [
    			0, y, width * 0.25, y - height / 2, width * 0.75, 
    			y - height / 2,  width, y,  width * 0.75, y + height / 2, 
    			width * 0.25, y + height / 2
    		];
    		return hexCoords;
    	}
    }
    */
}