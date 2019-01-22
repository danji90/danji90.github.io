(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var app = require('../../node_modules/jquery-mobile/js/jquery.mobile.js');

module.exports = function () {
jQuery(document).ready(function($) {


    /*======= Skillset *=======*/

    $('.level-bar-inner').css('width', '0');

    $(window).on('load', function() {

        $('.level-bar-inner').each(function() {

            var itemWidth = $(this).data('level');

            $(this).animate({
                width: itemWidth
            }, 800);

        });

    });

    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();


    /* jQuery RSS - https://github.com/sdepold/jquery-rss */

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

    /* Github Calendar - https://github.com/IonicaBizau/github-calendar */
    GitHubCalendar("#github-graph", "IonicaBizau");


    /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
    GitHubActivity.feed({ username: "caseyscarborough", selector: "#ghfeed" });

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

    ///////////////////////Map object + Features/////////////////////////

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

    // Map markers & layers

    var baseLayers = {
      "Streets": streets,
      "Gray": dark,
      "Imagery": satellite
    };

    for (i=0;i<places.features.length; i++){
      L.geoJSON(places.features[i]).addTo(map);
    }

});
} //browserify

},{"../../node_modules/jquery-mobile/js/jquery.mobile.js":2}],2:[function(require,module,exports){
/*!
 * jQuery Mobile Library @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"require",
			"jquery-ui/widget",
			"./widgets/loader",
			"./widgets/loader.backcompat",
			"./events",
			"./events/navigate",
			"./navigation/path",
			"./navigation/history",
			"./navigation/navigator",
			"./navigation/method",
			"./widgets/pagecontainer.transitions",
			"./transitions/handlers",
			"./transitions/visuals",
			"./animationComplete",
			"./navigation",
			"./degradeInputs",
			"./widgets/page.dialog",
			"./widgets/page.dialog.backcompat",
			"./widgets/pagecontainer",
			"./widgets/collapsible",
			"./widgets/collapsibleSet",
			"./grid",
			"./widgets/navbar",
			"./widgets/navbar.backcompat",
			"./widgets/navbar.morebutton",
			"./widgets/listview",
			"./widgets/listview.backcompat",
			"./widgets/listview.autodividers",
			"./widgets/listview.hidedividers",
			"./nojs",
			"./jquery-ui/widgets/accordion",
			"./jquery-ui/widgets/checkboxradio",
			"./jquery-ui/widgets/button",
			"./widgets/forms/button",
			"./widgets/forms/button.backcompat",
			"./widgets/forms/checkboxradio",
			"./widgets/forms/checkboxradio.backcompat",
			"./widgets/forms/slider",
			"./widgets/forms/slider.backcompat",
			"./widgets/forms/slider.tooltip",
			"./widgets/forms/flipswitch",
			"./widgets/forms/flipswitch.backcompat",
			"./widgets/forms/rangeslider",
			"./widgets/forms/rangeslider.backcompat",
			"./widgets/forms/textinput",
			"./widgets/forms/textinput.backcompat",
			"./widgets/forms/clearButton",
			"./widgets/forms/autogrow",
			"./widgets/forms/select.backcompat",
			"./widgets/forms/select.custom",
			"./widgets/forms/select.custom.backcompat",
			"./jquery-ui/widgets/controlgroup",
			"./widgets/controlgroup",
			"./widgets/enhancer.backcompat",
			"./widgets/controlgroup.backcompat",
			"./widgets/controlgroup.selectmenu",
			"./widgets/toolbar",
			"./widgets/fixedToolbar",
			"./widgets/fixedToolbar.backcompat",
			"./widgets/popup",
			"./widgets/popup.backcompat",
			"./widgets/popup.arrow",
			"./widgets/popup.arrow.backcompat",
			"./widgets/panel",
			"./widgets/table",
			"./widgets/table.columntoggle",
			"./widgets/table.columntoggle.popup",
			"./widgets/table.reflow",
			"./widgets/filterable",
			"./jquery-ui/widgets/tabs",
			"./widgets/tabs.ajax",
			"./zoom",
			"./zoom/iosorientationfix" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function() {
require( [ "./init" ], function() {} );
} );

},{}]},{},[1]);
