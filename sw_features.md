
Interactive Streetview Image display

link to the API: https://developers.google.com/maps/documentation/javascript/streetview

first stage features: 
  - loading a static route from either a file or pulling from an API endpoint (should be in an encoded polyline or gpx format, to be able to work with dynamic routes in the future)
  - automatically going along the route and displaying panoramic images with smooth transitions (not sure the google js api provides that out of the box or not)
  - being able to stop the ride, loop back and forward and resume

later stage features (what we need to prepare for):
  - being able to draw on street view images, like displaying a marker at a certain point
  - being able to take control with a button, like in the real google street view, displaying the interactive buttons to move manually forward, grab the picture to turn around etc..
  - being able to change the route dynamically (the streetviewer just need to have a loader that responds to events like real-time re-routing)
