import lbsnForMobilityAnalysis from '../documents/MarshHunnD_SocialMediaMobility.pdf';

const initialState = {
  sections: [
    {
      id: 'home',
      name: 'Home',
      nav: 'home',
      tab: true,
    },
    {
      id: 'basic',
      name: 'Basic Information',
      nav: 'home',
    },
    {
      id: 'about',
      name: 'About Me',
      nav: 'about',
      tab: true,
    },
    {
      id: 'lifeMap',
      name: 'Life Map',
      nav: 'lifeMap',
      tab: true,
    },
    {
      id: 'projects',
      name: 'Projects',
      nav: 'projects',
      tab: true,
    },
    {
      id: 'experience',
      name: 'Experience',
      nav: 'experience',
      tab: true,
    },
    {
      id: 'work',
      name: 'Work',
      nav: 'experience',
    },
    {
      id: 'education',
      name: 'Education',
      nav: 'experience',
    },
    {
      id: 'skills',
      name: 'Skills',
      nav: 'experience',
    },
    {
      id: 'languages',
      name: 'Languages',
      nav: 'experience',
    },
    {
      id: 'github',
      name: 'My Github',
      nav: 'github',
      tab: true,
    },
  ],
  educationItems: [
    {
      id: 'master',
      title: 'MSc Geospatial Technologies',
      details: {
        facility:
          'Universität Münster - Universitat Jaume I - Universidade Nova de Lisboa',
        note_1: 'Erasmus Mundus Joint Master Degree (2017-2019)',
        note_2: 'Erasmus Mundus Scholarship Holder',
        thesis:
          'Thesis: Interoperability Enhancement of IoT Sensor Network Applications for Environmental Monitoring Using Open Web Standards',
      },
    },
    {
      id: 'bachelor',
      title: 'BSc Environmental Systems Sciences - Focus on Geography',
      details: {
        facility: 'Universität Graz (2011-2016)',
        thesis:
          'Thesis: Investigating rockfall at alpine rock walls using Terrestial Laser Scanning',
      },
    },
    {
      id: 'celta',
      title: 'Certificate in English Language Teaching to Adults (CELTA)',
      details: {
        facility: 'ITTC Bournemouth (July 2015)',
      },
    },
    {
      id: 'patentino',
      title: 'Certificate of Bilingualism (Italian-German): Patentino A',
      details: {},
    },
  ],
  projects: [
    {
      id: 'tree-app',
      name: 'Tree-App',
      facility: {
        name: 'geOps - Spatial Web',
        url: 'https://www.geops.ch/',
      },
      description:
        'Forest management is characterized by long-term decisions that usually only affect the next generations. In times of climate change, it is becoming more and more important to make the right decision for the future of forests. On this subject, geOps has developed an app for tree species recommendations for the Swiss Federal Research Institute for Forests, Snow and Landscape WSL, which is intended to be an aid in making decisions about planting and caring for trees.',
      images: [
        {
          name: 'tree_app-logo.png',
        },
        {
          name: 'tree_app.png',
          latest: true,
        },
      ],
      tools: [
        {
          name: 'ReactJs',
          webLink: 'https://reactjs.org/',
        },
        {
          name: 'React Semantic-UI',
          webLink: 'https://react.semantic-ui.com/',
        },
        {
          name: 'OpenLayers',
          webLink: 'https://openlayers.org/',
        },
        {
          name: 'Redux',
          webLink: 'https://redux.js.org/',
        },
        {
          name: 'Cypress',
          webLink: 'https://www.cypress.io/',
        },
      ],
      keyWords: ['WSL, PWA, Forestry, Climate Change'],
      webLink: 'https://tree-app.ch/',
      latest: true,
    },
    {
      id: 'trafimage-maps',
      name: 'Trafimage-Maps',
      facility: {
        name: 'geOps - Spatial Web',
        url: 'https://www.geops.ch/',
      },
      description:
        'The official Geo-Portal for the Swiss Federal Railways (SBB).',
      images: [
        {
          name: 'trafimage-maps.png',
        },
      ],
      tools: [
        {
          name: 'ReactJs',
          webLink: 'https://reactjs.org/',
        },
        {
          name: 'Material-Ui',
          webLink: 'https://material-ui.com/',
        },
        {
          name: 'OpenLayers',
          webLink: 'https://openlayers.org/',
        },
        {
          name: 'Redux',
          webLink: 'https://redux.js.org/',
        },
        {
          name: 'Cypress',
          webLink: 'https://www.cypress.io/',
        },
        {
          name: 'Web Component',
          webLink:
            'https://developer.mozilla.org/en-US/docs/Web/Web_Components',
        },
      ],
      keyWords: ['SBB, Geoportal, Railway networks, Web Component'],
      webLink: 'https://maps.trafimage.ch/',
    },
    {
      id: 'mapset',
      name: 'Mapset - Editor',
      facility: {
        name: 'geOps - Spatial Web',
        url: 'https://www.geops.ch/',
      },
      description:
        'Mapset allows the easy creation of clear and visually appealing layout graphics. With just a few clicks, you can visualize plans for changed stops, communicate the situation with construction projects, ensure customer management at events or provide information about special operational cases on site.',
      images: [
        {
          name: 'plan_editor2.png',
        },
        {
          name: 'plan_editor1.png',
        },
      ],
      tools: [
        {
          name: 'ReactJs',
          webLink: 'https://reactjs.org/',
        },
        {
          name: 'OpenLayers',
          webLink: 'https://openlayers.org/',
        },
        {
          name: 'Redux',
          webLink: 'https://redux.js.org/',
        },
        {
          name: 'OpenId',
          webLink: 'https://openid.net/',
        },
        {
          name: 'SASS',
          webLink: 'https://sass-lang.com/',
        },
        {
          name: 'Jest',
          webLink: 'https://jestjs.io/',
        },
        {
          name: 'Cypress',
          webLink: 'https://www.cypress.io/',
        },
        {
          name: 'OpenLayers-Editor',
          webLink: 'https://openlayers-editor.geops.de/',
        },
      ],
      keyWords: [
        'Public Transit, OpenLayers-Editor, Rail Replacement Services, Web Map Editor',
      ],
      webLink: 'https://mapset.io',
    },
    {
      id: 'mobility-toolbox-js',
      name: 'mobility-toolbox-js',
      facility: {
        name: 'geOps - Spatial Web',
        url: 'https://www.geops.ch/',
      },
      description:
        'Toolbox for JavaScript applications in the domains of mobility and logistics. The tools in this library have been inspired by many projects realized for public transport agencies, mobility providers and logistics companies.',
      images: [
        {
          name: 'mobilitytoolboxjs2.png',
        },
      ],
      tools: [
        {
          name: 'OpenLayers',
          webLink: 'https://openlayers.org/',
        },
        {
          name: 'mapbox-gl-js',
          webLink: 'https://docs.mapbox.com/mapbox-gl-js/api/',
        },
        {
          name: 'Material-Ui',
          webLink: 'https://material-ui.com/',
        },
      ],
      keyWords: ['Public transport, mobility, Real-time tracking, javascript'],
      webLink: 'https://mobility-toolbox-js.geops.de/',
    },
    {
      id: 'senviro',
      name: 'SEnviro for Agriculture',
      facility: {
        name: 'Universitat Jaume I',
        url: 'https://www.uji.es/',
      },
      description:
        'This project emerged at Universitat Jaume I and focuses on the development of an IoT full stack for monitoring vineyards. In the scope of my Master Thesis (Interoperability Enhancement of IoT Sensor Network Applications for Environmental Monitoring Using Open Web Standards), my work consisted of the deployment and comparison of open source Sensor Web Standard implementations to increase the potential interoperability for agricultural IoT applications.',
      images: [
        {
          name: 'senviro3.jpg',
        },
        {
          name: 'senviroConnect.jpg',
        },
      ],
      tools: [
        {
          name: 'Linux - Ubuntu',
          webLink: undefined,
        },
        {
          name: 'Docker',
          webLink: 'https://www.docker.com/',
        },
        {
          name: 'Python',
          webLink: undefined,
        },
        {
          name: 'RabbitMQ',
          webLink: 'https://www.rabbitmq.com/',
        },
        {
          name: 'Frost-Server',
          webLink: 'https://www.iosb.fraunhofer.de/servlet/is/80113/',
        },
        {
          name: '52North-SOS',
          webLink: 'https://52north.org/software/software-projects/sos/',
        },
        {
          name: 'WebThing API',
          webLink: 'https://iot.mozilla.org/wot/',
        },
        {
          name: 'Google Cloud Platform',
          webLink: 'https://cloud.google.com/',
        },
        {
          name: 'Postman',
          webLink: 'https://www.postman.com/',
        },
      ],
      keyWords: [
        'Sensors, Internet of Things, Environmental Monitoring, Smart Farming, MQTT, OGC, Interoperability, SensorThings API, SOS, Mozilla IoT, Pika',
      ],
      webLink: 'http://www.senviro.uji.es/',
    },
    {
      id: 'geomundus',
      name: 'GeoMundus Conference 2018',
      facility: {
        name: 'Universidade Nova de Lisboa',
        url: 'https://www.unl.pt/en',
      },
      description:
        "GeoMundus is a free international symposium organised by the students from the Erasmus Mundus Master's of Science in Geospatial Technologies. The conference aims to share cutting-edge scientific research, knowledge, and skills in the fields of Geospatial Technologies, Geoinformatics, and Geosciences, including but not limited to geographic information systems and sciences, spatial cognition, geography, and spatial data sciences. <br /> <br /> As part of the GeoMundus web team, I was in charge of the GeoMundus website development and maintenance. This included collaborating with all the other teams and regularly updating website content.",
      images: [
        {
          name: 'geomundus.jpg',
        },
        {
          name: 'geomundus1.jpg',
        },
      ],
      tools: [
        {
          name: 'HTML5',
          webLink: undefined,
        },
        {
          name: 'javaScript',
          webLink: undefined,
        },
        {
          name: 'CSS',
          webLink: undefined,
        },
        {
          name: 'Google Maps API',
          webLink: undefined,
        },
        {
          name: 'Google Forms',
          webLink: undefined,
        },
      ],
      keyWords: [],
      webLink: 'http://geomundus.org/2019/',
    },
    {
      id: 'elippss',
      name: 'ELIPPSS Data Portal',
      facility: {
        name: 'University of Münster - Institute for Geoinformatics',
        url: 'https://www.uni-muenster.de/Geoinformatics/',
      },
      description:
        'This project emerged from the Unmanned Aerial Systems course at the Institute for GeoInformatics in the University of Münster. The main objective of the project was the development and application of exploratory approaches using several geospatial technologies to monitor the renaturation process in the Aa River, which flows through Münster. I was part of the Web Portal team, one of seven collaborating teams. Our objective was to use mostly open-source technologies to create a data exploration portal for heterogenous data created in the scope of the project.',
      images: [
        {
          name: 'elippss.jpg',
        },
        {
          name: 'elippss1.jpg',
        },
      ],
      tools: [
        {
          name: 'javaScript',
          webLink: undefined,
        },
        {
          name: 'Nodejs',
          webLink: 'https://nodejs.org/en/',
        },
        {
          name: 'AngularJS',
          webLink: 'https://angularjs.org/',
        },
        {
          name: 'AngularHTTPAuthentication',
          webLink:
            'https://github.com/cornflourblue/angular-authentication-example',
        },
        {
          name: 'HTML5',
          webLink: undefined,
        },
        {
          name: 'CSS',
          webLink: undefined,
        },
        {
          name: 'Bootstrap',
          webLink: 'https://getbootstrap.com/',
        },
        {
          name: 'LeafletJS',
          webLink: 'leafletjs.com/',
        },
        {
          name: 'Heroku',
          webLink: 'https://www.heroku.com/',
        },
        {
          name: 'Google Fusion Table',
          webLink:
            'https://support.google.com/fusiontables/answer/9551050?visit_id=637197861880426997-2146411836&rd=1',
        },
      ],
      keyWords: [],
      webLink: 'http://elippss.herokuapp.com/',
    },
  ],
  skills: [
    {
      id: 'javascript',
      name: 'JavaScript ES6',
      progress: 90,
      description:
        'Having developed, maintained and improved several client applications, staying up-to-date with the newest javascript functions was crucial to ensure code quality and performance. Object and array destructuring, array spreding, ternary conditions and optional chaining operators are just some of the various javascript functions I use day in, day out.',
    },
    {
      id: 'html&css',
      name: 'HTML & CSS',
      progress: 90,
      description:
        'A profound knowledge of HTML and CSS is essential when creating client-side web applications. I have expert knowledge in the newest HTML5 features, regularly use CSS extensions like SASS or SCSS and handle app responsitivity with ease.',
    },
    {
      id: 'react',
      name: 'React',
      progress: 80,
      description:
        'At geOps - Spatial Web, all frontend applications are build on the latest ReactJs. The frontend team always keeps track of new React features. I feel confident when using hooks, managing state and handling component life cycles.',
    },
    {
      id: 'material-ui',
      name: 'Material-UI',
      progress: 80,
      description:
        "Material Design is a well established web desighn concept and is used all accross the web. material-ui is a library of React components, making client-side development swift and elegant. I've used material-ui in countless personal and professional projects",
    },
    {
      id: 'openLayers',
      name: 'Openlayers',
      progress: 70,
      description:
        'Of all the javascript map APIs, I most frequently use Openlayers. This open-source library provides a vast framework for creating web maps and tools for analysing and visualising spatial data.',
    },
    {
      id: 'mapbox-gl',
      name: 'mapbox-gl-js',
      progress: 60,
      description:
        'geOps basemaps are created and hosted as MVTs (Mapbox Vector Tiles). On the client side these maps rich on data can be consumed using mapbox-gl-js, a powerful mapping API focused on the development of Vector Tile base maps. I have used this library in numerous applications.',
    },
    {
      id: 'angular',
      name: 'Angular',
      progress: 60,
      description:
        'I have created several Angular applications, including MEAN servers and complex client-server authentication modules.',
    },
    {
      id: 'testing',
      name: 'Unit & E2E tests',
      progress: 60,
      description:
        'Having a high test coverage for web applications is a good way of garanteeing functionality, quality, performance and maintainability. I have good experience in writing client-side tests with technologies like Enzyme, Jest and Cypress.',
    },
    {
      id: 'python',
      name: 'Python',
      progress: 50,
      description:
        'Though not my primary focus, I have used Python in several academic projects and also have professional experience using Django. I have written scripts for data processing, adapters for IoT data management and for geo-visualisation.',
    },
    {
      id: 'sql',
      name: 'SQL',
      progress: 60,
      description:
        'My experience with databases is mostly grounded in PostgreSQL and PostGIS databases. I have used indices, triggers and SQL functions. I am familiar with complex queries and query operators, including spatial operators and routing.',
    },
    {
      id: 'r',
      name: 'R',
      progress: 30,
      description:
        'R was necessary in countless projects during my university career. I have used several visualisation libraries, created Shiny Apps and performed data and spatial analyses in R.',
    },
    {
      id: 'git',
      name: 'Git',
      progress: 90,
      description:
        'All of my coding projects are backed up on GitHub, many of which have several contributors. I am experienced with team work on Git, including branching, merging and pull requests. I generally use Heroku to host and test applications.',
    },
    {
      id: 'mqtt&rabitmq',
      name: 'MQTT & RabbitMQ',
      progress: 30,
      description:
        "I've used RabbitMQ message broker platform to write broker applications connecting IoT devices with Sensor Web Standard databases using Python and MQTT publish/subscribe messaging.",
    },
    {
      id: 'arcgis&qgis',
      name: 'ArcGIS & QGIS',
      progress: 30,
      description:
        'I have used GIS in countless projects, using commercial products (ArcMap, ArcGIS Pro, ArcGIS Online...) as well as Open Source software (QGIS). I also have programming experience with GDAL, OGR, PyQGIS and ArcPy.',
    },
    {
      id: 'linux',
      name: 'Linux Shell',
      progress: 80,
      description:
        'I grew up using Windows, but in most of my work experience I was working on Linux server infrastructures, accessing servers remotely through a terminal. I have experience with Ubuntu and Centos.',
    },
    {
      id: 'wms&wfs',
      name: 'WMS & WFS',
      progress: 30,
      description:
        'I have experience with WMS and WFS services, including commercial ones like the ESRI cloud and open-source solutions like GeoServer.',
    },
    {
      id: 'lidar&pointclouds',
      name: 'LiDAR & point clouds',
      progress: 30,
      description:
        'During my BSc I used Terrestrial Laser Scanners. I have experience processing and analysing point cloud data using different software like RiScan Pro and CloudCompare.',
    },
  ],
  languages: [
    {
      id: 'english',
      name: 'English',
      stars: 5,
    },
    {
      id: 'german',
      name: 'German',
      stars: 5,
    },
    {
      id: 'italian',
      name: 'Italian',
      stars: 4,
    },
    {
      id: 'spanish',
      name: 'Spanish',
      stars: 4,
    },
    {
      id: 'french',
      name: 'French',
      stars: 2,
    },
  ],
  articles: [
    {
      id: 'LBSNmobility',
      name: 'Using Data from Location Based Social Networks in Human Mobility Analysis',
      url: lbsnForMobilityAnalysis,
    },
    {
      id: 'thesis',
      name: 'A Comparative Study in the Standardization of IoT Devices Using Geospatial Web Standards',
      url: 'https://ieeexplore.ieee.org/abstract/document/9224992',
      published: true,
    },
    {
      id: 'geOps_cypress_export',
      name: 'Testing file exports with Cypress in CI',
      url: 'https://geops.com/blog/testing-file-exports-with-cypress-in-ci',
      published: true,
    },
    {
      id: 'geops_maximum_canvas_size',
      name: 'Determining maximum HTML Canvas sizes',
      url: 'https://geops.com/en/blog/html-canvas-for-raster-exports',
      published: true,
    },
    {
      id: 'geops_mapset_with_mui',
      name: 'mapset 2.0 with MUI           ',
      url: 'https://geops.com/en/blog/mapset-with-mui',
      published: true,
    },
    {
      id: 'geops_react_testing_library',
      name: 'Migrating from enzyme to testing-library/react',
      url: 'https://geops.com/en/blog/migration-enzyme-react-testing-library',
      published: true,
    },
  ],
  workItems: [
    {
      id: 'geops',
      position: 'Software Engineer',
      facility: {
        name: 'geOps - Spatial Web',
        url: 'https://www.geops.ch/',
      },
      time: 'May 2019 - present',
      description:
        'Modern web applications based on geographical and real-time data are the core competence of geOps. It specialises on public transport, mobility, logistics and the environment and when selecting technologies, it has a clear focus on open source.',
      list: {
        header: 'Core tasks:',
        items: [
          'UI component engineering with <a href="https://reactjs.org/" target="_blank rel="noopener noreferrer">ReactJs</a>',
          'Continuous frontend development in <a href="https://geops.ch/solution" target="_blank rel="noopener noreferrer">geOps client applications</a>',
          'Expansion and maintenance of <a href="https://github.com/geops" target="_blank rel="noopener noreferrer">geOps frontend libraries and packages</a>',
          'Application quality assessment through E2E and unit tests',
          'Main responsible for Continuous Integration in several geOps client applications (<a href="https://editor.mapset.io/" target="_blank rel="noopener noreferrer">mapset</a>, <a href="https://mobility.portal.geops.io/" target="_blank rel="noopener noreferrer">mobility portal</a>, <a href="https://routing-demo.geops.io/" target="_blank rel="noopener noreferrer">geOps routing</a> to name a few)',
          'Extension of Django applications using <a href="https://www.django-rest-framework.org/" target="_blank rel="noopener noreferrer">Django Rest Framework</a>',
          'Development of web maps using <a href="https://docs.mapbox.com/api/maps/styles/" target="_blank rel="noopener noreferrer">mapbox styles</a> and mapboxgl-js',
          'Regular frontend code reviewing',
          'Writing Blog articles for the <a href="https://geops.ch/en/blog" target="_blank rel="noopener noreferrer">geOps blog</a>',
        ],
      },
    },
    {
      id: 'eurac',
      position: 'GI Researcher & Database Engineer',
      facility: {
        name: 'EURAC Research - Institute for Earth Observation',
        url: 'https://www.eurac.edu/en/institutes-centers/institute-for-earth-observation',
      },
      time: 'January 2017 - July 2017',
      description:
        'After an initial internship I was fully employed in the Technology for Environmental Monitoring research group of the institute. As part of the MONALISA project, my main activities lay in the design, deployment and maintenance of a database containing large amounts of environmental data using the OGC sensor web standard Sensor Observation Service (SOS).',
      list: {
        header: 'Core tasks:',
        items: [
          'Management of heterogeneous environmental data from in-situ monitoring stations',
          'Database management for Sensor Observation Service (SOS) in Environmental/Agricultural applications with PostgreSQL/PostGIS',
          'SOS database design and implementation',
          'Establishment and maintenance of the <a href="http://monalisasos.eurac.edu/sos/index" target="_blank rel="noopener noreferrer">MONALISA data explorer</a> web platform and database via XML documents and python scripts',
          'Automated file processing via python scripts',
          'Assistance in accessing SOS databases via R-plugins',
          'Development and maintenance of <a href="http://webgis.eurac.edu/" target="_blank rel="noopener noreferrer">EURAC Web-GIS applications</a> using open source WMS/WFS tools (GeoServer) and web development technologies (javaScript, HTML, CSS)',
          'Maintenance of environmental monitoring sensors on ground stations',
        ],
      },
    },
  ],
  credits: [
    {
      name: 'ReactJS',
      url: 'https://reactjs.org/',
    },
    {
      name: 'React-Redux',
      url: 'https://react-redux.js.org/',
    },
    {
      name: 'Material-UI',
      url: 'https://mui.com/',
    },
    {
      name: 'Openlayers',
      url: 'https://openlayers.org/',
    },
    {
      name: 'react-spatial',
      url: 'https://react-spatial.geops.io/',
    },
    {
      name: 'mobility-toolbox-js',
      url: 'https://mobility-toolbox-js.geops.io/',
    },
    {
      name: 'react-tooltip',
      url: 'https://wwayne.github.io/react-tooltip/',
    },
    {
      name: 'react-image-gallery',
      url: 'https://github.com/xiaolin/react-image-gallery',
    },
    {
      name: 'react-github-calendar',
      url: 'https://grubersjoe.github.io/react-github-calendar/',
    },
    {
      name: 'react-intersection-observer',
      url: 'https://github.com/thebuilder/react-intersection-observer',
    },
    {
      name: 'scroll-into-view',
      url: 'https://github.com/KoryNunn/scroll-into-view',
    },
  ],
};

export default initialState;
