window.onload = function() {

  /*

  HTTP Requests

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

  */

  /*
  // AJAX: One way to avoid callback hell
  function errorHandler(jqXHR, textStatus, error) {
    console.log(error);
  }

  $.ajax({
    type: "GET",
    url: "person.json",
    success: personCallback,
    error: errorHandler
  });

  function personCallback(data) {
    console.log(data);
  }

  $.ajax({
    type: "GET",
    url: "person2.json",
    success: person2Callback,
    error: errorHandler
  });

  function person2Callback(data) {
    console.log(data);
  }

  $.ajax({
    type: "GET",
    url: "person3.json",
    success: person3Callback,
    error: errorHandler
  });

  function person3Callback(data) {
    console.log(data);
  }

  */

  /*
  // HTTP and Promise
  function get(url) {
    return new Promise(function(resolve, reject) {
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", url, true);
      xhttp.onload = function() {
        if(xhttp.status == 200) {
          resolve(JSON.parse(xhttp.response));
        }else {
          reject(xhttp.statusText)
        }
      };
      xhttp.onerror = function() {
        reject(xhttp.statusText)
      };
      xhttp.send();
    });
  }

  var promise = get("person.json");
  promise.then(function(person) {
    console.log(person);
    return get("person2.json");
  }).then(function(person2) {
    console.log(person2);
    return get("person3.json");
  }).then(function(person3) {
    console.log(person3);
  }).catch(function(error) {
    console.log(error);
  })

  // AJAX and Promise
  $.get('person.json').then(function(person) {
    console.log(person);
    return $.get('person2.json');
  }).then(function(person2) {
    console.log(person2);
    return $.get('person3.json');
  }).then(function(person3) {
    console.log(person3);
  }).catch(function(error) {
    console.log(error);
  })

  */

  /*
  // Generators

  function* gen() {
    console.log('apple');
    console.log('orange');
    console.log('banana');
  }

  var myGen = gen();
  myGen.next();

  // Using yeild keyword
  function* gen1() {
    yield console.log('apple');
    yield console.log('orange');
    yield console.log('banana');
  }

  var myGen1 = gen1();
  myGen1.next();
  myGen1.next();
  myGen1.next();


  // Passing Value
  function* gen2() {
    var a = yield "apple";
    var b = yield "orange";
    var c = yield "banana";

    return a + b + c;
  }

  var myGen2 = gen2();
  console.log(myGen2.next());
  console.log(myGen2.next(4));
  console.log(myGen2.next(8));
  console.log(myGen2.next(10));

  */

  // Generators and Asynchronous
  genWrap(function* () {

    let person = yield $.get('person.json');
    console.log(person);
    let person2 = yield $.get('person2.json');
    console.log(person2);
    let person3 = yield $.get('person3.json');
    console.log(person3);

  });

  function genWrap(generator) {

    var gen = generator();

    function handle(yielded) {
      if(!yielded.done) {
        yielded.value.then(function(data) {
          return handle(gen.next(data));
        })
      }
    }

    return handle(gen.next())
  }

}



/*

0 - request is not initialized
1 - request has been set up
2 - request has been sent
3 - request is in process
4 - request is complete

*/
