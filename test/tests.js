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

  var c = new Spektra.Components.Canvas(3,6);

  console.log(c);

  equal(c.vertices['top'].points.length,3,'horizontal vertex check');
  equal(c.vertices['right'].points.length,6,'vertical vertex check');

  var c1 = new Spektra.Components.Canvas(2,2);
  var c2 = new Spektra.Components.Canvas(2,2);

  c1.vertices.top.pairWithVertex(c2.vertices.bottom);

  equal(c1.vertices.top.pair.vertex,c2.vertices.bottom,'partner 1 check');
  equal(c2.vertices.bottom.pair.vertex,c1.vertices.top,'partner 2 check');

});

test( "test node", function() {

  var n1 = new Spektra.Components.Node();
  var c1 = new Spektra.Components.Canvas(2,2);
  var c2 = new Spektra.Components.Canvas(2,2);

  n1.addCanvas(c1);
  n1.addCanvas(c2);

  console.log(n1.canvases);
  equal(n1.canvases.length,2,'add canvas count check');

  var n2 = new Spektra.Components.Node();
  n2.addCanvases([c1,c2]);

  equal(n2.canvases.length,2,'add multiple canvases count check');


});

test( "test arena", function(){

  var a1 = new Spektra.Components.Arena();
  var n1 = new Spektra.Components.Node();
  var c1 = new Spektra.Components.Canvas(2,2);
  var c2 = new Spektra.Components.Canvas(2,2);

  n1.addCanvas(c1);
  n1.addCanvas(c2);
  a1.addNode(n1);

  c1.vertices.top.pairWithVertex(c2.vertices.bottom);

  a1.renderMasterCanvas();

  equal(a1.canvases.length,2,'master canvas count');
  equal(a1.canvases[1],c2,'master canvas membership');


});

test( "text pixel proxy", function(){

  var position = new Spektra.Components.Position(0,0);
  var color = new Spektra.Components.Color(0,0,0);
  var pixel = new Spektra.Components.Pixel(position,color);

  var position2 = new Spektra.Components.Position(1,1); 
  var color2 = new Spektra.Components.Color(1,1,1);
  var proxy = new Spektra.Components.PixelProxy(position2,color);

  console.log(proxy);
  proxy.setProxy(pixel);
  equal(proxy.proxy,pixel,'set proxy');

  proxy.setColor(color2);
  equal(proxy.color,color2,'set color');
  equal(proxy.color,pixel.color,'pass color to proxy');

});