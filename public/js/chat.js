const socket = io();

const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location")
const $messages = document.querySelector("#messages")

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate = document.querySelector("#location-message-template").innerHTML;


socket.on("message", message => { // Render user messages 
  console.log(message)
  const html = Mustache.render(messageTemplate, { // stores html rendered to browser
      message: message
  })
  $messages.insertAdjacentHTML("beforeend", html) // Adds new messages at bottom 
});


socket.on("locationMessage", (url) => { // Render location template when sent by user
  console.log("url", url)
  const html = Mustache.render(locationMessageTemplate, {
    url: url
  })
  $messages.insertAdjacentHTML("beforeend", html) //  Location renders at bottom of div
})

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Disbales form once submited
  $messageFormButton.setAttribute("disabled", "disabled")

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, (error) => {
    $messageFormButton.removeAttribute("disbaled");
    $messageFormInput.value = ""
    $messageFormInput.focus()
   
    if (error) {
      return console.log(error)
    }

    console.log("Message delivered.")
  });
});

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Error Geolocation is not supported by your browser.");
  }

  $sendLocationButton.setAttribute("disabled", "disabled")
 
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, () => {
      $sendLocationButton.removeAttribute("disabled")
      console.log("Location shared.")
    });
  });
});
