const socket = io();

const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location")
socket.on("message", message => {
  console.log(message);
});

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
