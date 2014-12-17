'use strict';

angular.module('adverts').directive('carte', ['d3','$http','shapes','_', function(d3,$http,shapes,_){
    return {
      restrict : 'E',
      link: link
    };
    function link(scope, el, attrs){

              $http.get('lib/shapes/lib/eure.json',{responseType : 'json'})
              .success(function(response) {
                //$scope.eure = response;
              //  console.log(d3.select(el[0]));
                //$scope.records = response;
                console.log(response);
                //d3.select(el[0]).  // ...
                var data = response;

              //affichage
              var buildings = [], roads = [], amenities = [], naturals = [];
var i;
for(i = data.length - 1; i > 0; i-- ){

	if(typeof data[i].building !== 'undefined' && data[i].building === true )
		{
		//console.log('buildings');
		buildings.push( shapes.createBuilding(data[i]) );
		}
	else if(typeof data[i].natural !== 'undefined' && data[i].natural === 'water')
		{
		naturals.push( shapes.createNatural(data[i]));
		//console.log(data[i].natural);
		}
	else if(typeof data[i].amenity !== 'undefined' && (data[i].amenity === 'hospital' || data[i].amenity === 'parking'))
		{
		amenities.push(shapes.createAmenity(data[i]));
		}
	else
		{
		roads.push( shapes.createRoad(data[i]) );
		}


}

//_.each(buildings, function(b){console.log(b.toString())});

/*_.each(buildings, function(b){console.log(b.toString())});
_.each(roads, function(b){console.log(b.toString())});
_.each(naturals, function(b){console.log(b.toString())});
_.each(amenities, function(b){console.log(b.toString())});*/

var w = document.body.clientWidth;
var h = w/1.5;


//The SVG Container

var svgContainer = d3.select('carte').append('svg')
.attr('width', w/1.2)
.attr('height', h/2.3)
.call(d3.behavior.zoom().scaleExtent([0.5, 8]).on("zoom", zoom))
.append('g')
.attr('transform', 'scale('+(w/(1.3*w))+')');



var p = '';
_.each(naturals, function(b){
	p=p+' '+b.toSvgPath();
	//console.log(b.toSvgPath());
	//console.log(p);
	});

var sp = p.split('M');

for ( var int = 0; int < sp.length; int++) {
svgContainer.append('path')
			.attr('d', function(d) {return 'M '+sp[int];})
			.attr('stroke', 'green')
			.attr('stroke-width', 1)
			.attr('fill', 'rgb(148, 244, 152)');
}

p='';

_.each(roads, function(b){
	p=p+' '+b.toSvgPath();
	//console.log(b.toSvgPath());
	//console.log(p)
	});

sp = p.split('M');

for ( var int = 0; int < sp.length; int++) {
svgContainer.append('path')
			.attr('d', function(d) {return 'M '+sp[int];})
			.attr('stroke', 'grey')
			.attr('stroke-width', 1)
			.attr('fill', 'rgb(171, 204, 255)');
}

p='';
_.each(amenities, function(b){
	p=p+' '+b.toSvgPath();
	//console.log(b.toSvgPath());
	//console.log(p)
	});

sp = p.split('M');

for ( var int = 0; int < sp.length; int++) {
svgContainer.append('path')
			.attr('d', function(d) {return 'M '+sp[int];})
			.attr('stroke', 'grey')
			.attr('stroke-width', 1)
			.attr('fill', 'rgb(218, 218, 218)');
}

p='';
_.each(buildings, function(b){
	p=p+' '+b.toSvgPath();
	//console.log(b.toSvgPath());
	//console.log(p)
	});

sp = p.split('M');

//add immoBat

addHidden('immoF','immoBat','');

for ( var int = 0; int < sp.length; int++) {
svgContainer.append('path')
	.classed('buildings',1)
	.attr('id',function(d, i ){return int;})
	.attr('d', function(d) {return 'M '+sp[int];})
	.on('click', function(d,i){
		d3.selectAll('.buildings').classed('select',0);
		d3.select(this)
			.classed('select',1);
		addHidden('immoF','immoBat',this.id);
		})
	.on('dblclick', function(d,i){
		d3.select(this)
			.classed('select',0);
		})
	.on('mouseover', function(d, i){
			d3.select(this)
				.classed('over', 1);
		})
		.on('mouseout', function(d, i){
			d3.select(this)
				.classed('over', 0);
		});

	}

              //fin affichage

function zoom() {
  svgContainer.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}


              });
        };



function addHidden(theForm, key, value){

	if(document.getElementById(key)==null)
	{
		var input = document.createElement('input');
		input.type = 'hidden';
		input.name = key;
		input.id= key;
		input.value = value;
		document.getElementById(theForm).appendChild(input);
	}
	else
	{var immoBat = document.getElementById(key);

		immoBat.value = value;
	}

}

}]);


//CarteView

angular.module('adverts').directive('carteview', ['d3','$http','shapes','_', function(d3,$http,shapes,_){
    return {
      restrict : 'E',
      link: link,
      scope: false
    };
    function link(scope, el, attrs){

              $http.get('lib/shapes/lib/eure.json',{responseType : 'json'})
              .success(function(response) {
                //$scope.eure = response;
              //  console.log(d3.select(el[0]));
                //$scope.records = response;
                //console.log(response[0]);
                //d3.select(el[0]).  // ...
                var data = response;

              //affichage
              var buildings = [], roads = [], amenities = [], naturals = [];
var i;
for(i = data.length - 1; i > 0; i-- ){

	if(typeof data[i].building !== 'undefined' && data[i].building === true )
		{
		//console.log('buildings');
		buildings.push( shapes.createBuilding(data[i]) );
		}
	else if(typeof data[i].natural !== 'undefined' && data[i].natural === 'water')
		{
		naturals.push( shapes.createNatural(data[i]));
		//console.log(data[i].natural);
		}
	else if(typeof data[i].amenity !== 'undefined' && (data[i].amenity === 'hospital' || data[i].amenity === 'parking'))
		{
		amenities.push(shapes.createAmenity(data[i]));
		}
	else
		{
		roads.push( shapes.createRoad(data[i]) );
		}


}

//_.each(buildings, function(b){console.log(b.toString())});

/*_.each(buildings, function(b){console.log(b.toString())});
_.each(roads, function(b){console.log(b.toString())});
_.each(naturals, function(b){console.log(b.toString())});
_.each(amenities, function(b){console.log(b.toString())});*/

var w = document.body.clientWidth;
var h = w/1.5;
//The SVG Container
var svgContainer = d3.select('carteview').append('svg')
																		.attr('width', w/1.5)
																		.attr('height', h/2)
									.append('g')
									.attr('transform', 'scale('+(w/(1.2*w))+')');

var p = '';
_.each(naturals, function(b){
	p=p+' '+b.toSvgPath();
	//console.log(b.toSvgPath());
	//console.log(p);
	});

var sp = p.split('M');
var int;
for (int = 0; int < sp.length; int++) {
svgContainer.append('path')
			.attr('d', function(d) {return 'M '+sp[int];})
			.attr('stroke', 'green')
			.attr('stroke-width', 1)
			.attr('fill', 'rgb(148, 244, 152)');
}

p='';

_.each(roads, function(b){
	p=p+' '+b.toSvgPath();
	//console.log(b.toSvgPath());
	//console.log(p)
	});

sp = p.split('M');

for (int = 0; int < sp.length; int++) {
svgContainer.append('path')
			.attr('d', function(d) {return 'M '+sp[int];})
			.attr('stroke', 'grey')
			.attr('stroke-width', 1)
			.attr('fill', 'rgb(171, 204, 255)');
}

p='';
_.each(amenities, function(b){
	p=p+' '+b.toSvgPath();
	//console.log(b.toSvgPath());
	//console.log(p)
	});

sp = p.split('M');

for (int = 0; int < sp.length; int++) {
svgContainer.append('path')
			.attr('d', function(d) {return 'M '+sp[int];})
			.attr('stroke', 'grey')
			.attr('stroke-width', 1)
			.attr('fill', 'rgb(218, 218, 218)');
}

p='';
_.each(buildings, function(b){
	p=p+' '+b.toSvgPath();
	//console.log(b.toSvgPath());
	//console.log(p)
	});

sp = p.split('M');

for (int = 0; int < sp.length; int++) {
svgContainer.append('path')
	.classed('buildings',1)
	.attr('id',function(d, i ){return int;})
	.attr('d', function(d) {return 'M '+sp[int];});

	}
/*var art = angular.element(document.getElementById('sc')).scope().advert;
var e = document.getElementById('immoBat').value;
*/


		scope.$watch(function(scope) { 
			
				document.getElementById(scope.advert.immoBat).style.fill = 'black'; return scope.advert.immoBat; 
			
		},function() {});

              //fin affichage
              });
        };



}]);



