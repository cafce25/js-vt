export function initialize() {
  const fenway = { lat: 42.345573, lng: -71.098326 };
  const chicago = new google.maps.LatLng(41.850033, -87.6500523);
  const directions_request = {
    origin: { lat: 42.38072479568091, lng: -71.08838067087879},
    //destination: { lat: 42.38019776770384, lng: -71.08812317883321},
    destination: {lat: 42.381616374312244, lng: -71.08730242284857},
    //waypoints: [
      //{
        //location: 'Joplin, MO',
        //stopover: false
      //},{
        //location: 'Oklahoma City, OK',
        //stopover: true
      //}],
    provideRouteAlternatives: false,
    travelMode: 'WALKING',
    //drivingOptions: {
      //departureTime: new Date([> now, or future date <]),
      //trafficModel: 'pessimistic'
    //},
    unitSystem: google.maps.UnitSystem.IMPERIAL
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    center: fenway,
    zoom: 14,
  });
  const directions = new google.maps.DirectionsService();

  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: fenway,
      pov: {
        heading: 34,
        pitch: 10,
      },
    }
  );
  directions.route(directions_request, (result, status) => {
    if (status == 'OK') {
      console.log(result);

      let i = 0;
      function display_next() {
        panorama.setPosition(result.routes[0].overview_path[i]);
        i += 1;
        setTimeout(display_next, 1000);
      }
      display_next();
      map.setStreetView(panorama);
    }
    else {
      console.log("bad status");
    }
  });
}




window.initialize = initialize;
