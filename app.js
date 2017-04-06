window.onload = function() {

  var http = new XMLHttpRequest();

  // Declares
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
      console.log(JSON.parse(http.response));
    }
  }

  // Grabs the data. True is for asynchronous and false is for sync
  http.open("GET", "person.json", true)
  http.send();

  // JQuery way
  $.get("person.json", function(data) {
    document.write(
      '<li>' + data.name + '</li>',
      '<li>' + data.age + '</li>',
      '<li>' + data.address.street + '</li>',
      '<li>' + data.address.city + '</li>'
    )
  })
}



/*

0 - request is not initialized
1 - request has been set up
2 - request has been sent
3 - request is in process
4 - request is complete

*/
