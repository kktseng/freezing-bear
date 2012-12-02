// instagramAPI(process.argv[2])
//flickrAPI(process.argv[2])
// tumblrAPI(process.argv[2])


function flickrAPI(queryString, callback, index)
{
arr = [];
 
apiURL = "http://api.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=d7474b230425db0b2f6097dce4a20a9f&method=flickr.photos.search&page=" + index + "&per_page=10$&sort=relevance&text=" + queryString;
$.getJSON(apiURL,function(data) {

   photo = data.photos.photo;

   for (i=0; i < data.photos.photo.length; i++)
   {
    farm_id = photo[i].farm;
    server_id = photo[i].server;
    id = photo[i].id;
    secret = photo[i].secret;

    replacements = { "{farmid}":farm_id, "{serverid}":server_id, "{id}":id, "{secret}":secret};

     url = "http://farm{farmid}.staticflickr.com/{serverid}/{id}_{secret}.jpg";
     url = url.replace(/\{\w+\}/g, function(all) {
     return replacements[all] || all;
   });

    console.log(url);
    arr.push(url);
  }
  callback(arr);
  });

}

function instagramAPI(queryString, callback)
{
arr = [];

apiURL = "https://api.instagram.com/v1/tags/" + queryString + "/media/recent?access_token=35596053.f59def8.cc4fd7a9bb23496f91f072d02c76daea&callback=?";
$.getJSON(apiURL,function(data) {

  images = data.data;

  for (i=0; i < images.length; i++)
    {

      //Get only 10 results
      if (i == 10)
        break;

    url = images[i].images.standard_resolution.url;
    console.info(url);
    arr.push(url);
    }
    callback(arr);
});
}

function tumblrAPI(queryString, callback)
{
arr = [];

apiURL = "https://api.tumblr.com/v2/tagged?tag=" + queryString + "&limit=10&api_key=bYPrsG99z2mJTSnp5HXiOD0N5zcCmG6wYgw8FBWC5MfSigw34M&callback=?";
$.getJSON(apiURL,function(data) {

  images = data.response;

  for (var i=0; i < images.length; i++)
    {

    if (images[i].photos != null)
    {
    url = images[i].photos[0].original_size.url;
    console.info(url);
    arr.push(url);
    }
    }
    callback(arr);
});

}