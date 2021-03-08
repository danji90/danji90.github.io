jQuery(document).ready(function($) {
//  ===== Navigation =====
/* Collapse nav-bar on click */
  $(function() {
    $('.navbar-nav li a').click(function(event) {
      /* Colla  pse if not a dropdpwn menu */
      if (!$(this).hasClass('dropdown-toggle')) {
        $('.navbar-collapse').collapse('hide');
      }
    });
  });

  /* Scroll animations */
  $('#navHome').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#home').offset().top,
    }, 1000);
  });

  $('#navAbout').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#about').offset().top,
    }, 1000);
  });

  $('#navXP').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#xp').offset().top,
    }, 1000);
  });

  $('#navMap').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#mapSec').offset().top,
    }, 1000);
  });

  $('#navProjects').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#projects').offset().top,
    }, 1000);
  });

  $('#navGithub').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#githubSec').offset().top,
    }, 1000);
  });

  $('#navEdu').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#education').offset().top,
    }, 1000);
  });

  $('#navSkills').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#skills').offset().top,
    }, 1000);
  });


  /* ======= Skillset *=======*/
  $('.level-bar-inner').css('width', '0');

  $('.level-bar-inner').each(function() {
    var itemWidth = $(this).data('level');
    // $(this).css('width', itemWidth)
    $(this).animate({
      width: itemWidth,
    }, 800);
  });

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
  GitHubCalendar('#github-graph', 'danji90');


  /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
  // GitHubActivity.feed({ username: "danji90", selector: "#ghfeed" });


  // /////////////////////Map object + Features/////////////////////////

  // //Leaflet////

  // Define baselayers
  let streets = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    maxZoom: 22,
    maxNativeZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
  let satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmdhdmlzaCIsImEiOiJjaXFheHJmc2YwMDdoaHNrcWM4Yjhsa2twIn0.8i1Xxwd1XifUU98dGE9nsQ', {
    id: 'mapbox.satellite',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery � <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 22,
    maxNativeZoom: 18,
  });
  let relief =  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 22,
    maxNativeZoom: 18,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Main map object
  let map = L.map('map', {
    center: [1051773.48, 6092948.38],
    zoom: 10,
    layers: [streets],
    maxZoom: 22,
    maxNativeZoom: 18,
  });

  // disable default scroll
  map.scrollWheelZoom.disable();

  // Ctrl+Scroll enable
  $('#map').on('mousewheel DOMMouseScroll', function(event) {
    event.stopPropagation();
    if (event.ctrlKey == true) {
      event.preventDefault();
      map.scrollWheelZoom.enable();
      $('#map').removeClass('map-scroll');
      setTimeout(function() {
        map.scrollWheelZoom.disable();
      }, 1000);
    } else {
      map.scrollWheelZoom.disable();
      $('#map').addClass('map-scroll');
    }
  });

  $(window).on('mousewheel DOMMouseScroll', function(event) {
    $('#map').removeClass('map-scroll');
  });

  // Add method to layer control class
  L.Control.Layers.include({
    getOverlays: function() {
      // create hash to hold all layers
      var control, layers;
      layers = {};
      control = this;

      // loop thru all layers in control
      control._layers.forEach(function(obj) {
        var layerName;

        // check if layer is an overlay
        if (obj.overlay) {
          // get name of overlay
          layerName = obj.name;
          // store whether it's present on the map or not
          return layers[layerName] = control._map.hasLayer(obj.layer);
        }
      });

      return layers;
    }
  });


  // // Map markers & legend

  // time slider

  let dt_from = '1990/09/12 23:59:00';
  let dt_to = '2019/05/02 00:00:00';

  $('.slider-time').html('13.09.1990');
  $('.slider-time2').html('02.05.2019');

  let startDate = Date.parse(dt_from);
  let endDate = Date.parse(dt_to);

  let min_val = startDate/1000;
  let max_val = endDate/1000;

  function zeroPad(num, places) {
    let zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
  }
  function formatDT(__dt) {
    var year = __dt.getFullYear();
    var month = zeroPad(__dt.getMonth()+1, 2);
    var date = zeroPad(__dt.getDate(), 2);
    // var hours = zeroPad(__dt.getHours(), 2);
    // var minutes = zeroPad(__dt.getMinutes(), 2);
    // var seconds = zeroPad(__dt.getSeconds(), 2);
    // return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
    return date + '.' + month + '.' + year
  };


  $('#slider-range').slider({
    range: true,
    min: min_val,
    max: max_val,
    step: 10,
    values: [min_val, max_val],
    slide: function(e, ui) {
      var dt_cur_from = new Date(ui.values[0]*1000); // .format("yyyy-mm-dd hh:ii:ss");
      $('.slider-time').html(formatDT(dt_cur_from));
      var dt_cur_to = new Date(ui.values[1]*1000); // .format("yyyy-mm-dd hh:ii:ss");
      $('.slider-time2').html(formatDT(dt_cur_to));

      // Get active layers
      active = control.getOverlays()

      // Set time slider global parameters
      startDate = dt_cur_from;
      endDate = dt_cur_to

      // Clear present layers
      eduLayer.clearLayers()
      workLayer.clearLayers()
      residentLayer.clearLayers()

      // Redefine layers and add to map on time slider change
      eduSubgroup = createFilteredLayer(education, eduLayer, startDate, endDate)
      workSubgroup = createFilteredLayer(work, workLayer, startDate, endDate)
      resiSubgroup = createFilteredLayer(residence, residentLayer, startDate, endDate)

      // Only add to map if they are currently active
      if (active.Education){eduSubgroup.addTo(map)}
      if (active.Work){workSubgroup.addTo(map)}
      if (active.Resident){resiSubgroup.addTo(map)}
    },
  });

  // Add general marker cluster group

  let mcg = L.markerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
  }).addTo(map);


  // function for adding marker layer

  function createFilteredLayer(markerArray, layer, start, end) {

    // data = timeFilter(markerArray, start, end)

    let subgroup = layer
    let markers = L.geoJSON(markerArray, {
      pointToLayer: function(feature, latlng) {
        var icon = L.divIcon({
          className: 'mapIcon',
          html: feature.properties.icon,
        });
        return L.marker(latlng, {icon: icon});
      },
      filter: function(feature, layer) {
        let eventStart = new Date(String(feature.properties.timestamp[0][0]));
        let eventEnd = new Date(String(feature.properties.timestamp[0][1]));
        if (eventStart.getTime()>startDate && eventStart.getTime()<endDate || startDate>eventStart.getTime() && endDate<eventEnd.getTime()) {
          return true;
        } else {
          return false
        }
      },
      onEachFeature: function(feature, layer) {
        // layer.bindPopup('<p align="center"><strong>'+ feature.properties.type + '</strong><p><h6>'+feature.properties.title+'</h6><p><a href="'+feature.properties.link+'" target="_blank">'+feature.properties.facility+'</a>, '+feature.properties.city+', '+feature.properties.country+'</p><p>'+feature.properties.timestamp+'</p><p><strong>Descripton</strong>: '+feature.properties.description);
        if (feature.properties.type == 'Work' || feature.properties.type == 'Education'){
          layer.bindPopup('<p align="center"><strong>'+ feature.properties.type + '</strong><p><h6>'+feature.properties.title+'</h6><p><a href="'+feature.properties.link+'" target="_blank">'+feature.properties.facility+'</a>, '+feature.properties.city+', '+feature.properties.country+'</p><p>'+ new Date(feature.properties.timestamp[0][0]).toLocaleString("en-us", { month: "long" }) + ' ' + new Date(feature.properties.timestamp[0][0]).getFullYear() + ' - '+ new Date(feature.properties.timestamp[0][1]).toLocaleString("en-us", { month: "long" }) + ' ' + new Date(feature.properties.timestamp[0][1]).getFullYear() +'</p><p><strong>Descripton</strong>: '+feature.properties.description);
        } else {
          layer.bindPopup('<p align="center"><strong>'+ feature.properties.type + '</strong><p>' + feature.properties.city+', '+feature.properties.country +'</p><p>'+ new Date(feature.properties.timestamp[0][0]).toLocaleString("en-us", { month: "long" }) + ' ' + new Date(feature.properties.timestamp[0][0]).getFullYear() + ' - '+ new Date(feature.properties.timestamp[0][1]).toLocaleString("en-us", { month: "long" }) + ' ' + new Date(feature.properties.timestamp[0][1]).getFullYear() +'</p><p><strong>Descripton</strong>: '+feature.properties.description);
        }

      },
    });

    subgroup.addLayer(markers);
    subgroup.on('add', function() {
      map.fitBounds(mcg.getBounds());
    });

    return subgroup
  }

  let eduLayer = L.featureGroup.subGroup(mcg);

  let workLayer = L.featureGroup.subGroup(mcg);

  let residentLayer = L.featureGroup.subGroup(mcg);

  let countriesLayer = L.featureGroup();
  let countryPolygons = L.geoJSON(countries, {
    style: function(feature) {
    		return {
        color: '#FF6347'
      };
    	},
    onEachFeature: function(feature, layer) {
      layer.bindPopup('<p align="center"><strong>'+ feature.properties.sovereignt + '</strong><p>');
    },
  });
  countriesLayer.addLayer(countryPolygons);
  // countriesLayer.addTo(map)
  countriesLayer.on('add', function() {
    map.fitBounds(countriesLayer.getBounds());
  });

  // var remWork = map.on('overlayremove', function(a) { map.removeLayer(workLayer)});

  let overlays = {
    'Education': eduLayer,
    'Work': workLayer,
    'Resident': residentLayer,
    'Countries explored': countriesLayer,
  };

  let baseLayers = {
    'Topographic': streets,
    'Relief': relief,
    'Imagery': satellite,
  };

  let control = new L.control.layers(baseLayers, overlays, {
    autoZIndex: true,
  }).addTo(map);

  eduSubgroup = createFilteredLayer(education, eduLayer, startDate, endDate)
  workSubgroup = createFilteredLayer(work, workLayer, startDate, endDate)
  resiSubgroup = createFilteredLayer(residence, residentLayer, startDate, endDate)

  eduSubgroup.addTo(map)
  workSubgroup.addTo(map)
  resiSubgroup.addTo(map)

});
