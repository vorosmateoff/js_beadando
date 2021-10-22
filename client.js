var count = 0;
  document.write("<br>");
  while (count < 4096) {
    document.write("<canvas id=\"myCanvas" + count + "\" width=\"25\" height=\"25\" style=\"border:1px solid #000000\"></canvas>");
    var c = document.getElementById("myCanvas" + count);
    var ctx = c.getContext("2d");
    count++;
    if (count % 64 == 0) {
      document.write("<br>");
    }
  }
  const ws = new WebSocket('ws://localhost:8080/');

  ws.onopen = function () {
    console.log('WebSocket Client Connected');
    ws.send('Hi this is web client.');

  };

  ws.onmessage = function (e) {

    console.log(JSON.parse(e.data));
    var frame = e.data.split(';');
    //console.log(frame);
    frame.reverse();
    for (var i =0; i< frame.length; i++) {
      //document.getElementById('myCanvas');
      var c = document.getElementById("myCanvas" + i);
      var ctx = c.getContext("2d");
      ctx.beginPath();
      if (frame[i] == 1) {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, 25, 25);
        ctx.fill();
      }
      else if (frame[i] == 0) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 25, 25);
        ctx.fill();
      }
      else {
        ctx.fillStyle = "tomato";
        ctx.fillRect(0, 0, 25, 25);
        ctx.fill();
      }

    }
  };