// Client-side js file is responsible for loading in and handling socket io script in index.html
//  Connects to server using web socket function io
const socket = io();
// accepts two arguments. Name of event and function to run when event occurs
socket.on("message", message => {
  console.log(message);
});

document.querySelector("#message-form").addEventListener("submit", e => {
  e.preventDefault();

  const message = e.target.elements.message.value;
// RUNS when event is acknoweledged
  socket.emit("sendMessage", message, (error) => {
    if (error) {
      return console.log(error)
    }

    console.log("Message delivered.")
  });
});

document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Error Geolocation is not supported by your browser.");
  }
  // When GEolocation is supported
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, () => {
      console.log("Location shared.")
    });
  });
});
