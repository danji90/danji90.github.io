jQuery(document).ready(function($) {

  /*===== Navigation =====*/

  /* Collapse nav-bar on click */
  $(function(){
    $(".navbar-nav li a").click(function(event) {
      /* Collapse if not a dropdpwn menu */
      if (!$(this).hasClass("dropdown-toggle")){
        $(".navbar-collapse").collapse('hide');
      }
    });
  });

  /* Scroll animations */
  $("#navHome").click(function() {
      $([document.documentElement, document.body]).animate({
          scrollTop: $("#home").offset().top
      }, 1000);
  });

  $("#navAbout").click(function() {
      $([document.documentElement, document.body]).animate({
          scrollTop: $("#about").offset().top
      }, 1000);
  });

  $("#navXP").click(function() {
      $([document.documentElement, document.body]).animate({
          scrollTop: $("#xp").offset().top
      }, 1000);
  });

  $("#navMap").click(function() {
      $([document.documentElement, document.body]).animate({
          scrollTop: $("#mapSec").offset().top
      }, 1000);
  });

  $("#navProjects").click(function() {
      $([document.documentElement, document.body]).animate({
          scrollTop: $("#projects").offset().top
      }, 1000);
  });

  $("#navGithub").click(function() {
      $([document.documentElement, document.body]).animate({
          scrollTop: $("#githubSec").offset().top
      }, 1000);
  });

  $("#navEdu").click(function() {
      $([document.documentElement, document.body]).animate({
          scrollTop: $("#education").offset().top
      }, 1000);
  });

  $("#navSkills").click(function() {
      $([document.documentElement, document.body]).animate({
          scrollTop: $("#skills").offset().top
      }, 1000);
  });



  /*======= Skillset *=======*/
  $('.level-bar-inner').css('width', '0');

  $('.level-bar-inner').each(function() {
      var itemWidth = $(this).data('level');
      // $(this).css('width', itemWidth)
      $(this).animate({
        width: itemWidth
      }, 800);
    })

  /* Bootstrap Tooltip for Skillset */
  $('.level-label').tooltip();

  /* jQuery RSS - https://github.com/sdepold/jquery-rss */

  /*
  $("#rss-feeds").rss(

      //Change this to your own rss feeds
      "https://feeds.feedburner.com/TechCrunch/startups",

      {
      // how many entries do you want?
      // default: 4
      // valid values: any integer
      limit: 3,

      // the effect, which is used to let the entries appear
      // default: 'show'
      // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
      effect: 'slideFastSynced',

      // will request the API via https
    // default: false
    // valid values: false, true
    ssl: true,

      // outer template for the html transformation
      // default: "<ul>{entries}</ul>"
      // valid values: any string
      layoutTemplate: "<div class='items'>{entries}</div>",

      // inner template for each entry
      // default: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
      // valid values: any string
      entryTemplate: '<div class="item"><h3 class="title"><a href="{url}" target="_blank">{title}</a></h3><div><p>{shortBodyPlain}</p><a class="more-link" href="{url}" target="_blank"><i class="fas fa-external-link-alt"></i>Read more</a></div></div>'

      }
  );
  */


  /* Github Calendar - https://github.com/IonicaBizau/github-calendar */
  GitHubCalendar("#github-graph", "danji90");


  /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
  //GitHubActivity.feed({ username: "danji90", selector: "#ghfeed" });


  ///////////////////////Map object + Features/////////////////////////

  ////Leaflet////

  // Define map attribution variable
  var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery � <a href="http://mapbox.com">Mapbox</a>'

  // Define basemap source URL
  var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmdhdmlzaCIsImEiOiJjaXFheHJmc2YwMDdoaHNrcWM4Yjhsa2twIn0.8i1Xxwd1XifUU98dGE9nsQ';

  // Define baselayers
  var grayscale = L.tileLayer(mbUrl, {
    id: 'mapbox.light',
    attribution: mbAttr,
    maxZoom: 22,
    maxNativeZoom: 18
  })
  var streets = L.tileLayer(mbUrl, {
    id: 'mapbox.streets',
    attribution: mbAttr,
    maxZoom: 22,
    maxNativeZoom: 18
  })
  var outdoors = L.tileLayer(mbUrl, {
    id: 'mapbox.outdoors',
    attribution: mbAttr,
    maxZoom: 22,
    maxNativeZoom: 18
  })
  var satellite = L.tileLayer(mbUrl, {
    id: 'mapbox.satellite',
    attribution: mbAttr,
    maxZoom: 22,
    maxNativeZoom: 18
  })
  var dark = L.tileLayer(mbUrl, {
    id: 'mapbox.dark',
    attribution: mbAttr,
    maxZoom: 22,
    maxNativeZoom: 18
  })
  var satellitestreets = L.tileLayer(mbUrl, {
    id: 'mapbox.streets-satellite',
    attribution: mbAttr,
    maxZoom: 22,
    maxNativeZoom: 18
  });

  // Main map object
  var map = L.map('map', {
    center: [40, -20],
    zoom: 2,
    layers: [streets],
    maxZoom: 22,
    maxNativeZoom: 18
  });

  // disable default scroll
  map.scrollWheelZoom.disable();

  // Ctrl+Scroll enable
  $("#map").on('mousewheel DOMMouseScroll', function (event) {
    event.stopPropagation();
     if (event.ctrlKey == true) {
             event.preventDefault();
         map.scrollWheelZoom.enable();
           $('#map').removeClass('map-scroll');
         setTimeout(function(){
             map.scrollWheelZoom.disable();
         }, 1000);
     } else {
         map.scrollWheelZoom.disable();
         $('#map').addClass('map-scroll');
     }
   });

  $(window).on('mousewheel DOMMouseScroll', function (event) {
       $('#map').removeClass('map-scroll');
    })


  //// Map markers & legend

  //Education

  var mcg = L.markerClusterGroup({
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: false
  }).addTo(map);

  var eduLayer = L.featureGroup.subGroup(mcg);
  var eduMarkers =  L.geoJSON(education, {
      pointToLayer: function(feature, latlng) {
        var icon = L.divIcon({
          className: 'mapIcon',
          html: feature.properties.icon
          });
        return L.marker(latlng, {icon: icon});
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup('<p align="center"><strong>'+ feature.properties.type + '</strong><p><h6>'+feature.properties.title+'</h6><p><a href="'+feature.properties.link+'" target="_blank">'+feature.properties.facility+'</a>, '+feature.properties.city+', '+feature.properties.country+'</p><p>'+feature.properties.timestamp+'</p><p><strong>Descripton</strong>: '+feature.properties.description);
      }
    })
  eduLayer.addLayer(eduMarkers)
  eduLayer.addTo(map)
  eduLayer.on('add', function(){
    map.fitBounds(mcg.getBounds());
  })

  // Work

  var workLayer = L.featureGroup.subGroup(mcg);
  var workMarkers =  L.geoJSON(work, {
      pointToLayer: function(feature, latlng) {
        var icon = L.divIcon({
          className: 'mapIcon',
          html: feature.properties.icon
          });
        return L.marker(latlng, {icon: icon});
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup('<p align="center"><strong>'+ feature.properties.type + '</strong><p><h6>' + feature.properties.title+'</h6><p><a href="'+feature.properties.link+'" target="_blank">'+feature.properties.facility+'</a>, '+feature.properties.city+', '+feature.properties.country+'</p><p>'+feature.properties.timestamp+'</p><p><strong>Descripton</strong>: '+feature.properties.description);
      }
    })
  workLayer.addLayer(workMarkers)
  workLayer.addTo(map)
  workLayer.on('add', function(){
    map.fitBounds(mcg.getBounds());
  })


  var residentLayer = L.featureGroup.subGroup(mcg);
  var residentMarkers =  L.geoJSON(residence, {
      pointToLayer: function(feature, latlng) {
        var icon = L.divIcon({
          className: 'mapIcon',
          html: feature.properties.icon
          });
        return L.marker(latlng, {icon: icon});
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup('<p align="center"><strong>'+ feature.properties.type + '</strong><p>' + feature.properties.city+', '+feature.properties.country+'</p><p>'+feature.properties.timestamp+'</p><p><strong>Descripton</strong>: '+feature.properties.description);
      }
    })
  residentLayer.addLayer(residentMarkers)
  residentLayer.addTo(map)
  residentLayer.on('add', function(){
    map.fitBounds(mcg.getBounds());
  })

  var countriesLayer = L.featureGroup();
  var coutryPolygons =  L.geoJSON(countries, {
      style: function (feature) {
    		return {
          color: "#FF6347"
        };
    	},
      onEachFeature: function (feature, layer) {
        layer.bindPopup('<p align="center"><strong>'+ feature.properties.sovereignt + '</strong><p>');
      }
    })
  countriesLayer.addLayer(coutryPolygons)
  // countriesLayer.addTo(map)
  countriesLayer.on('add', function(){
    map.fitBounds(countriesLayer.getBounds());
  })

  var remWork = map.on('overlayremove', function(a) { map.removeLayer(workLayer)});

  var overlays = {
    "Education": eduLayer,
    "Work": workLayer,
    "Resident": residentLayer,
    "Countries explored": countriesLayer
  }

  var baseLayers = {
    "Topographic": streets,
    "Gray": dark,
    "Imagery": satellite
  };

  // map.on('layeradd', function(e) {
  //   map.fitBounds(mcg.getBounds());
  // })

  L.control.layers(baseLayers, overlays, {
    autoZIndex: true
    }).addTo(map);


});
