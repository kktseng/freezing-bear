//Used to test with command line
// process.argv.forEach(function (val, index, array) {
//   instagramAPI(val);
// });

// instagramAPI("puppy");

function flickrAPI(queryString)
{

var arr = [];

var http = require('http');

var options = {
  host: 'api.flickr.com',
  port: 80,
  //api_key was generated by DENNIS
  path : '/services/rest/?format=json&nojsoncallback=1&api_key=d7474b230425db0b2f6097dce4a20a9f&method=flickr.photos.search&per_page=10&text=' + queryString // the rest of the url with parameters if needed
};

var req = http.request(options, function(res) {
  var result = '';
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    //console.log('got data back!');
    result += chunk;
  });

  res.on('end', function () {
    //console.log('request is done');

    var object = JSON.parse(result);

  	var photo = object.photos.photo;

 	for (var i=0; i < object.photos.photo.length; i++)
    {
    	var farm_id = photo[i].farm;
    	var server_id = photo[i].server;
        var id = photo[i].id;
    	var secret = photo[i].secret;

    	var replacements = { "{farmid}":farm_id, "{serverid}":server_id, "{id}":id, "{secret}":secret};

    	var url = "http://farm{farmid}.staticflickr.com/{serverid}/{id}_{secret}.jpg";
    	url = url.replace(/\{\w+\}/g, function(all) {
			return replacements[all] || all;
		});

		//console.info(url);
    arr.push(url);
    }

  });

});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();

return arr;

}

function instagramAPI(queryString)
{

var arr = [];

var https = require('https');

var options = {
  host: 'api.instagram.com',
  port: 443,
  //api_key was generated by DENNIS
  path : '/v1/tags/' + queryString + '/media/recent?access_token=35596053.f59def8.cc4fd7a9bb23496f91f072d02c76daea' // the rest of the url with parameters if needed
};


var req = https.request(options, function(res) {
  var result = '';
  //res.setEncoding('utf8');
  res.on('data', function (d) {
    //console.log('got data back!');
    result += d;
  });

  res.on('end', function () {
    //console.log('request is done');

    //console.log(result);

    var object = JSON.parse(result);

    //console.log(object);

    var images = object.data;

  for (var i=0; i < images.length; i++)
    {

      //Get only 10 results
      if (i == 10)
        break;

    var url = images[i].images.standard_resolution.url;

    //console.info(url);
    arr.push(url);
    }

  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();
return arr;
}

function tumblrAPI(queryString)
{

var arr = [];

var http = require('http');

var options = {
  host: 'api.tumblr.com',
  port: 80,
  //api_key was generated by DENNIS
  path : 'http://api.tumblr.com/v2/tagged?tag=' + queryString + '&limit=10&api_key=bYPrsG99z2mJTSnp5HXiOD0N5zcCmG6wYgw8FBWC5MfSigw34M' // the rest of the url with parameters if needed
};


var req = http.request(options, function(res) {
  var result = '';
  //res.setEncoding('utf8');
  res.on('data', function (d) {
    //console.log('got data back!');
    result += d;
  });

  res.on('end', function () {
    //console.log('request is done');

   // console.log(result);

    var object = JSON.parse(result);

    //console.log(object);

    var images = object.response;

  for (var i=0; i < images.length; i++)
    {

    var url = images[i].photos[0].original_size.url;

    //console.info(url);
    arr.push(url);
    }

  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();
return arr;
}