Object.prototype.setParent = function(parent){

  this.parent = parent;

}

Function.prototype.setParent = function(parent){

  this.parent = parent;

}

var Spektra = {

  globals: {
    count: {
      node: 0,
      canvas: 0,
      pixel: 0,
      vertex: 0
    }
  }

};

Spektra.Composer = function(){
	

};

Spektra.Network = {
  
  Server: function() {

  },

  Client: function() {

  }

}

Spektra.Components = {

  Arena: function() {

    this.nodes = [];
    this.canvases = [];
    this.masterCanvas = null;

    this.addNode = function(node){

      this.nodes.push(node);

    }

    this.removeNode = function(node){



    }

    this.renderMasterCanvas = function(){

      if (this.nodes.length > 0) {

        this.nodes.forEach(function(node,index,nodes){

          node.canvases.forEach(function(canvas,index,canvases){

            this.canvases.push(canvas);

          },this);

        },this);

      }

      //proceed through canvases
      var c = 0;
      var v = 'top';

      var column = [];
      
      //c1.vertices.top.pairWithVertex(c2.vertices.bottom);
      //detect vertex pairs from top and process clockwise

      var c1 = this.canvases[c];
      var v1 = c1.vertices[v];
      var c2 = this.canvases[c].vertices[v].pair.canvas;
      var v2 = this.canvases[c].vertices[v].pair.vertex;

      var p = 0;

      console.log('canvas b '+ v2.location);
      //bottom-left corner
      console.log(v2.points[p]);

      // add points to column from top
      for (var y=0; y<c2.height; y++) {

        column.push(c2.getPixel(0,y));

      }
      console.log(column);

      console.log('canvas a '+v1.location);
      //top-left corner

      console.log(v1.points[p]);

      //x = width min, y = height min
      

      

      //if horizontal
      //proceed through vertex points

      //for each point in bottom vertex, gather all points in column above

      //for each point in top vertex, gather all points in column below

      //combine points into column and set height for combined canvas

      //return and always append to combined canvas

    }

  },

	Node: function() {

    var self = this;
		this.canvases = [];

    this.addCanvas = function(canvas){

      this.canvases.push(canvas);

    }

    this.addCanvases = function(canvasesArray){

      canvasesArray.forEach(function(element,index,array){
        this.addCanvas(element);
      },this);

    }

    this.removeCanvas = function(canvas){

      
    }

	},

  Canvas: function(w,h) {

    this.width = w;
    this.height = h;
    this.pixels = [];
    this.vertices = {
      top: null,
      right: null,
      bottom: null,
      left: null
    }

    this.getPixel = function(x,y){

      for (var i=0; i<this.pixels.length; i++) {

        var testX = this.pixels[i].position.x, testY = this.pixels[i].position.y;

        if ( testX == x && testY == y)
          return this.pixels[i];
        else 
          return null;
      }

    }

    this.addPixel = function(pixel){

      this.pixels.push(pixel);
      pixel.setParent(this);

    }

    this.renderGrid = function(){

      for (var x = 0; x < this.width; x++) {

        for (var y = 0; y < this.height; y++) {

          var position = new Spektra.Components.Position(x,y);
          var color = new Spektra.Components.Color(0,0,0);
          var pixel = new Spektra.Components.Pixel(position,color,this);

          this.addPixel(pixel);

        }

      }

    }

    this.renderVertices = function(){

      this.vertices.top = new Spektra.Components.Vertex('top',this);
      this.vertices.right = new Spektra.Components.Vertex('right',this);
      this.vertices.bottom = new Spektra.Components.Vertex('bottom',this);
      this.vertices.left = new Spektra.Components.Vertex('left',this);

      Object.getOwnPropertyNames(this.vertices).forEach(function(location){
        this.vertices[location].setParent(this);
        this.vertices[location].calculatePoints();
      },this);

    }

    this.renderGrid();
    this.renderVertices();

  }, 

  Pixel: function(position, color, canvas){
  
    this.position = position;
    this.color = color;

  },

  Position: function(x,y){

    this.x = x;
    this.y = y;

  },

  Color: function(r,g,b) {

    this.r = r;
    this.g = g;
    this.b = b;

  },

  Vertex: function(border){

    this.points = [];
    this.location = border;
    this.pair = {
      canvas: null,
      vertex: null
    }

    this.pairWithVertex = function(otherVertex){
      
      this.pair = {
        canvas: otherVertex.parent,
        vertex: otherVertex
      }

      otherVertex.pair = {
        canvas: this.parent,
        vertex: this
      }

    }

    this.calculatePoints = function(){

      var width = this.parent.width;
      var height = this.parent.height;

      switch(this.location){

        case "top":
        for (var x=0; x<width; x++){

          var point = new Spektra.Components.Position(x,0);
          this.points.push(point);
        }
        break;

        case "bottom":
        for (var x=0; x<width; x++){

          var point = new Spektra.Components.Position(x,height-1);
          this.points.push(point);
        }
        break;

        case "left":
        for (var y=0; y<height; y++){

          var point = new Spektra.Components.Position(0,y);
          this.points.push(point);
        }
        break;

        case "right":
        for (var y=0; y<height; y++){

          var point = new Spektra.Components.Position(width-1,y);
          this.points.push(point);
        }
        break;

      }

    }

    //this.calculatePoints();

  }
}