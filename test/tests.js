test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});

test( "test parent", function() {

  var child = {};
  var parent = {};

  console.log(child);
  child.setParent(parent);

  equal(child.parent,parent);

  var c1 = new Spektra.Components.Canvas(3,3);
  var v1 = new Spektra.Components.Vertex('top',3,3);

  v1.setParent(c1);

  equal(v1.parent,c1);

});

test( "test canvas", function() {
  
  var canvas = new Spektra.Components.Canvas(12,12);
  console.log(canvas);

  equal(canvas.height,12,"height check");
  equal(canvas.width,12,"width check");
  equal(canvas.pixels.length,144,"pixel count check");
    
});

test( "test vertex", function() {

  var canvas = new Spektra.Components.Canvas(3,6);

  var v1 = new Spektra.Components.Vertex('top',canvas);
  var v2 = new Spektra.Components.Vertex('right',canvas);
  
  console.log(v1);
  console.log(v2);

  equal(v1.points.length,3);
  equal(v2.points.length,6);

  var c1 = new Spektra.Components.Canvas(2,2);
  var c2 = new Spektra.Components.Canvas(2,2);

  c1.vertices.top.pairWithVertex(c2.vertices.bottom);

  equal(c1.vertices.top.pair.vertex,c2.vertices.bottom);
  equal(c2.vertices.bottom.pair.vertex,c1.vertices.top);

});

