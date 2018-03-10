const STREAM = require('./util/stream');
//const STREAM = require('./util/stream_mam');

/* holds our STREAM objects */
var stream = [];

//#############################################
//##	      	  SETUP SENSORS	 	     ##
//#############################################

/* pseudo functions */

async function getHumidity () {
	return await {'humidity' : '37.2 %RH'};
}

async function getTemperature () {
	return await {'temperature' : '22.0 °C'};
}

async function getPressure () {
	return await {'pressure' : '933 hPa'};
}

//#############################################
//##              SETUP STREAMS              ##
//#############################################

stream.push(new STREAM ({
  'host': 'http://0.0.0.0',
  'port':  14265,
  'id':   'RaspBerry',
  'location':  '52.26°N 13.42°E',
  'tag':  'SENSORSTREAM999ONE', /* for tangle-stream */
  'depth': 3
}))

stream[0].addSource(getHumidity);
stream[0].addSource(getTemperature);
stream[0].addSource(getPressure);

//#############################################
//##              EXECUTION HEAD             ##
//#############################################

console.log('\n###########################');
console.log('##    SensorNode v1.0    ##');
console.log('###########################');
console.log('\nTimeout: ' + (timeout = (process.argv[2] >= 60 ? process.argv[2] : 60)) + ' sec');
/*                             depends on node performance ^^			  ^^ */

console.log('Streams: ' + stream.length);

function run () {

 stream.forEach(function(s) {
   s.handle();
 })

 setTimeout(run, timeout*1000);
}

/* start */
run();

