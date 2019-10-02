// // Client file
const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate = document.querySelector(
  "#location-message-template"
).innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;
// Options
// Creates an object with two arguments-> Destructures object
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});
// Function for auto scrolling to most recent message-> runs after rending messages or location messages
// Will run conditionally
const autoScroll = () => {
  // logic for determining if user is scrolled to bottom of messages-> height of message element needed to do this
  // New message element-> lastElementChild property grabs last element as a child (new message)
  const $newMessage = $messages.lastElementChild;
  // Height of last message (new message) ----> (standard content + margin)
  const newMessageStyles = getComputedStyle($newMessage); // variable newMessageStyles gets computed styles of element with getComputedStyle (provided by browser) -> provides margin for newMessage
  const newMessageMargin = parseInt(newMessageStyles.marginBottom); // convert value to number
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin; // offsetHeight takes standard content into account, not margins

  //  Visible height
  const visibleHeight = $messages.offsetHeight;

  // Total height of messages container
  const containerHeight = $messages.scrollHeight;

  // Determines how far user is scrolling
  // scrollTop gives us exact distance from the top of scroll bar
  const scrollOffset = $messages.scrollTop + visibleHeight; // Adds scroll bar height to give accurate pic of how far from bottom user is

  // straight forward logic for determining if user has already scrolled before latest message was added
  if (containerHeight - newMessageHeight <= scrollOffset) {
    // setting value to total available content user can scroll through
    // Pushes user to bottom where most recent message appears
    $messages.scrollTop = $messages.scrollHeight;
  }
};

socket.on("message", message => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm a")
  });
  $messages.insertAdjacentHTML("beforeend", html); // Adds new messages at bottom
  autoScroll();
});

socket.on("locationMessage", message => {
  console.log(message);
  const html = Mustache.render(locationMessageTemplate, {
    username: message.username,
    url: message.url,
    createdAt: moment(message.createdAt).format("h:mm a")
  });
  $messages.insertAdjacentHTML("beforeend", html); //  Location renders at bottom of div
  autoScroll();
});

socket.on("roomData", ({ room, users }) => {
  // console.log(room);
  // console.log(users);
  const html = Mustache.render(sidebarTemplate, {
    room,
    users
  });
  document.querySelector("#sidebar").innerHTML = html;
});

$messageForm.addEventListener("submit", e => {
  e.preventDefault();

  $messageFormButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, error => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }

    console.log("Message delivered!");
  });
});

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }

  $sendLocationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition(position => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      () => {
        $sendLocationButton.removeAttribute("disabled");
        console.log("Location shared!");
      }
    );
  });
});
// Accepts username and room user is trying to join
socket.emit("join", { username, room }, error => {
  // error handling
  if (error) {
    alert(error);
    location.href = "/";
  }
});
