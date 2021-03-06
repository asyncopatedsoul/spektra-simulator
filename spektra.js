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

Spektra.Sampler = function(){



}

Spektra.Complier = function(){



}

Spektra.Workbench = {

  ColorWheel: function(){



  },

  Scrubber: function(){



  },

  Camera: function(){



  },

  TextEditor: function(){



  },

  Selector: function(){



  },

  Player: function(){



  },



}

Spektra.Instrument = {


  
}

Spektra.Visual = {

  Frame: function(){

    this.data = null;
    this.pixels = [];


  },

  Palette: function(){



  },

  Cuepoint: function(){



  },

  Transition: function(){



  },

  Layer: function(){



  },

  Gesture: function(){



  }, 

}

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
    this.canvasMaster = null;

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

      this.canvasMaster = new Spektra.Components.CanvasMaster(this.canvases);

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

  CanvasMaster: function(canvases){

    this.prototype = new Spektra.Components.Canvas();
    this.canvases = canvases;
    this.height = 0;
    this.width = 0;
    this.pixels = [];
    this.columns = [];


    function mergeAdjacentCanvases(canvas,loation){

      var merge = canvas.vertices[location].calculateCompositeProxyPixels();

    }

    this.calculateMaximumSurface = function(){

      var maxWidth, maxHeight;

      this.canvases.forEach(sumCanvasDimensions,this);

      function sumCanvasDimensions(canvas,index,canvases){

        maxWidth+=canvas.width;
        maxHeight+=canvas.height;

      }

      this.height = maxHeight;
      this.width = maxWidth;

    }

    this.renderGrid = function(){

      for (var x = 0; x < this.width; x++) {

        for (var y = 0; y < this.height; y++) {

          var position = new Spektra.Components.Position(x,y);
          var color = new Spektra.Components.Color(0,0,0);
          var pixel = new Spektra.Components.PixelProxy(position,color);

          this.addPixel(pixel);

        }

      }

    }

    this.placeChildCanvas = function(canvas,index,canvases){

      var masterPointer = canvas.anchor;
       
      var masterXoffset = canvas.anchor.x;
      var masterYoffset = canvas.anchor.y;

      canvas.pixels.forEach(linkProxyPixel,this);

      function linkProxyPixel(pixel,index,pixels){

        var childX = pixel.position.x;
        var childY = pixel.position.y;

        var masterProxy = this.getPixel(childX-masterXoffset,childY-masterYoffset);

        masterProxy.setProxy(pixel);

      }

    }

    this.calculateMaximumSurface();
    this.renderGrid();
    this.canvases.forEach(placeChildCanvas,this);

  },

  Canvas: function(w,h) {

    this.width = w;
    this.height = h;
    this.pixels = [];
    this.anchor = null;
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
        
      }

      return null;

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
          var pixel = new Spektra.Components.Pixel(position,color);

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

    this.setAnchor = function(position){

      this.anchor = position;

    }

    this.renderGrid();
    this.renderVertices();

  }, 

  Pixel: function(position, color){
  
    this.position = position;
    this.color = color;

  },

  PixelProxy: function(position, color){

    this.prototype = new Spektra.Components.Pixel();
    this.position = position;
    this.color = color;
  
    this.setProxy = function(pixel){
      this.proxy = pixel;
    }

    this.passColorToProxy = function(){
      this.proxy.color = this.color;
    }

    this.setColor = function(color){
      this.color = color;
      this.passColorToProxy(color);
    }

    
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

    this.pairWithVertex = function(otherVertex, offset){
      
      this.pair = {
        canvas: otherVertex.parent,
        vertex: otherVertex,
        offset: offset
      }

      otherVertex.pair = {
        canvas: this.parent,
        vertex: this,
        offset: 0-offset
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

    this.calculateCompositeProxyPixels = function(){

      var composite = {};

      if (this.location == 'top' || this.location == 'bottom')
        composite = this.calculateCompositeFromColumns();

      if (this.location == 'left' || this.location == 'right')
        composite = this.calculateCompositeFromRows();

      return composite;

    }

    this.calculateCompositeFromRows = function(position){

    }

    this.calculateCompositeFromColumns = function(){


      var compositeColumns = [];

      //loop through all points in vertex

      //assuming paired canvases are same size and left corners aligned
      //if offset, apply to point index
      //positive offset shifts otherCanvas to right
      var pointIndex = 0;

      for (var p = pointIndex; p<this.points.length; p++) {

        var mergedColumn = [];
        var otherCanvas = this.pair.canvas;
        var otherVertex = this.pair.vertex;
        var thisColumn = this.getPointsInColumn(this.points[pointIndex]);
        var otherColumn = otherVertex.getPointsInColumn(this.points[pointIndex]);
        
        function mergeToColumn(position){
          mergedColumn.push(position);
        }

        thisColumn.forEach(mergeToColumn,this);
        otherColumn.forEach(mergeToColumn,this);

        console.log('merged column');
        console.log(mergedColumn);

        compositeColumns.push(mergedColumn);

      }
      


      return compositeColumns;

    }

    this.getPointsInColumn = function(position){

      var column = [];
      var x = position.x;

      // add points to column from top
      for (var y=0; y<this.parent.height; y++) {

        column.push(this.parent.getPixel(x,y));

      }

      return column;

    }

    this.getPointsInRow = function(position){



    }
    //this.calculatePoints();

  }
}