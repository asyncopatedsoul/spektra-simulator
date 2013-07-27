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

    this.renderMasterCanvas = function(){

      if (this.nodes.length > 0) {



      }

    }

  },

	Node: function() {

		this.canvases = [];

    this.addCanvas = function(canvas){

      this.canvases.push(canvas);

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

        if ( textX == x && testY == y)
          return this.pixels[i];
        else 
          return null;
      }

    }

    this.renderGrid = function(){

      for (var x = 0; x < this.width; x++) {

        for (var y = 0; y < this.height; y++) {

          var position = new Spektra.Components.Position(x,y);
          var color = new Spektra.Components.Color(0,0,0);
          var pixel = new Spektra.Components.Pixel(position,color,this);

        }

      }

    }

    this.calculateVertices = function(){

      this.vertices.top = new Spektra.Components.Vertex('top',this);
      this.vertices.right = new Spektra.Components.Vertex('right',this);
      this.vertices.bottom = new Spektra.Components.Vertex('bottom',this);
      this.vertices.left = new Spektra.Components.Vertex('left',this);

    }

    this.renderGrid();
    this.calculateVertices();

  }, 

  Pixel: function(position, color, canvas){
  
    this.position = position;
    this.color = color;
    this.setParent(canvas);
    this.parent.pixels.push(this);

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

  Vertex: function(border, canvas){

    this.points = [];
    this.location = border;
    this.pair = {
      canvas: null,
      vertex: null
    }
    this.setParent(canvas);

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

    this.calculatePoints();

  }
}