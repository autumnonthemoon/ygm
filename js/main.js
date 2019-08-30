let firstClick = 'false';
let received = 0;
let sent = -1;
let letter = 0;
let letter2 = 0;
let voiceRecordingJoe = 0;
let voiceRecordingMeg = 0;

let receivedBox = document.querySelector('.received');
received.textContent = "";
let text = document.querySelector('.text');
let voice = document.getElementById('voice');
let message = document.getElementById('message');
let timeReceived = document.querySelector('timeReceived');
//message container
let messages = document.querySelector('.messages');
let messageContainer = document.querySelector('.inner-content');
//entirechatbox
let chatBox = document.querySelector('.content');
//end button
let end = document.getElementById('refreshButton');

//envelope
let envelopeBack = document.querySelector('.back');
let envelopeLetter = document.querySelector('.letter');
let envelope = document.querySelector('.envelope');

//nextbutton
let next = document.querySelector('#next');

let joeFox = [
  "I had a gut feeling you would be on line now.",
  "I can give you advice. I'm great at advice.",
  "Is it about love?",
  "I'm a brilliant businessman. It's what I do best. What is your business?",
  "Minus specifics, it is hard to help. Except to say, go to the mattresses.",
  "It's from the Godfather. It means you have to go war.",
  "The Godfather is the I Ching. The Godfather is the sum of all wisdom. The Godfather is the answer to any question. What should I pack for my summer vacation? Leave the gun, take the cannoli. What day of the week is it? Maunday, Tuesday, Thursday, Wednesday. And the answer to your question is 'Go to the mattresses.' You're at war. It's not personal, it's business. It's not personal, it's business. Recite that to yourself every time you feel you're losing your nerve. I know you worry about being brave. This is your chance. Fight. Fight to the death."
];
let kathleenKelly = ["If only you could help.", "No, how cute is that. My business is in trouble.", "No specifics, remember.", "What?", "What is it with men and the Godfather?"];
let soundEffectJoe = [
  "tom1.mp3",
  "tom2.mp3",
  "tom3.mp3",
  "tom4.mp3",
  "tom5.mp3",
  "tom6.mp3",
  "tom7.mp3"
];
let soundEffectMeg = ["meg1.mp3", "meg2.mp3", "meg3.mp3", "meg4.mp3", "meg5.mp3"];

function messageArrived() {
  message.play();
  if (!envelopeLetter.classList.contains('open')) {
    setTimeout(function() {
      envelopeLetter.classList.add('open');
    }, 500);
    envelopeBack.classList.add('open');
    envelopeBack.classList.remove('closed');
    envelope.classList.add('open');

  }
}

function play(sound, person, soundNumber) {
  sound.src = "sound/" + person[soundNumber];
  sound.play();
}

function displayText() {
  //create time
  let timeBox = document.querySelector('.time');
  let time = new Date();
  let hours = (
    time.getHours() < 10
    ? '0' + time.getHours()
    : '' + time.getHours());
  let minutes = (
    time.getMinutes() < 10
    ? '0' + time.getMinutes()
    : '' + time.getMinutes());

  setTimeout(function() {
    //create new div for messages
    let joeFoxMessage = document.createElement('div');
    joeFoxMessage.id = 'joeFoxMessage' + received;
    joeFoxMessage.classList.add('joeFoxMessage');
    joeFoxMessage.textContent = joeFox[received];
    messages.append(joeFoxMessage);

    //create span for time messages
    let timeMessage = document.createElement('span');
    timeMessage.classList.add('joeTimeMessage');
    timeMessage.textContent = hours + ":" + minutes;
    messages.append(timeMessage);

    //scroll down when new message arrived
    messageContainer.scrollTop = messageContainer.scrollHeight;

    //soundeffect message
    messageArrived();
    play(voice, soundEffectJoe, voiceRecordingJoe);

    //when done playing voice messages
    voice.onended = function() {
      received++;
      voiceRecordingJoe++;

      //the second message comes after first without response
      if (received == 1) {
        //create separate message for second one
        let joeFoxSecondMessage = document.createElement('div');
        joeFoxSecondMessage.classList.add('joeFoxMessage');
        joeFoxSecondMessage.textContent = joeFox[1];
        messages.append(joeFoxSecondMessage);

        //create span for time messages
        let timeMessage = document.createElement('span');
        timeMessage.classList.add('joeTimeMessage');
        timeMessage.textContent = hours + ":" + minutes;
        messages.append(timeMessage);

        //sound effect
        play(voice, soundEffectJoe, voiceRecordingJoe);
        messageArrived();

        voice.onended = function() {
          setTimeout(function () {
            voiceRecordingJoe++;
            received++;
            next.removeAttribute('disabled');
            let hourglass = document.querySelector('.far.fa-hourglass');
            hourglass.classList.remove('rotate');
            next.innerHTML = "Next";

            next.style.cursor = "pointer";

            if (envelopeLetter.classList.contains('open')) {
              setTimeout(function() {
                envelopeBack.classList.remove('open');
                envelopeBack.classList.add('closed');

              }, 600);
              envelopeLetter.classList.remove('open');
              envelope.classList.remove('open');
            }
          }, 300);
        };
      } else {
        if (received == joeFox.length) {
          setTimeout(function () {
            next.setAttribute('disabled', 'disabled');
            let hourglass = document.querySelector('.far.fa-hourglass');
            hourglass.classList.add('rotate');
            next.style.display = "none";
            end.style.display = 'block';
            end.innerHTML = "You are offline. Refresh?";
            end.style.cursor = 'pointer';
            chatBox.style.display = "none";
            messageArrived();

            if (envelopeLetter.classList.contains('open')) {
              setTimeout(function() {
                envelopeBack.classList.remove('open');
                envelopeBack.classList.add('closed');

              }, 600);
              envelopeLetter.classList.remove('open');
              envelope.classList.remove('open');
            }
          }, 1600);


        } else {
          next.removeAttribute('disabled');
          let hourglass = document.querySelector('.far.fa-hourglass');
          hourglass.classList.remove('rotate');
          next.innerHTML = "Next";
          next.style.cursor = "pointer";

          if (envelopeLetter.classList.contains('open')) {
            setTimeout(function() {
              envelopeBack.classList.remove('open');
              envelopeBack.classList.add('closed');

            }, 600);
            envelopeLetter.classList.remove('open');
            envelope.classList.remove('open');
          }
        }
      }
    }

    if (received >= joeFox.length) {
      received = 0;
    }

  }, 1500);
}
let shopgirl = document.querySelector('.shopgirl');

function write() {
  //create time
  let timeBox = document.querySelector('.time');
  let time = new Date();
  let hours = (
    time.getHours() < 10
    ? '0' + time.getHours()
    : '' + time.getHours());
  let minutes = (
    time.getMinutes() < 10
    ? '0' + time.getMinutes()
    : '' + time.getMinutes());

  if (firstClick == 'false') {
    next.textContent = 'Next';
    firstClick = 'true';
  }

  let text = document.querySelector('.text');

  if (sent == -1) {
    displayText();
    next.setAttribute('disabled', 'disabled');
    next.innerHTML = "<i class='far fa-hourglass'></i>";
    let hourglass = document.querySelector('.far.fa-hourglass');
    hourglass.classList.add('rotate');
    next.style.cursor = "default";
  } else {
    if (letter < kathleenKelly[sent].length) {
      text.textContent += kathleenKelly[sent].charAt(letter);
      letter++;
      setTimeout(write, 85);
      next.setAttribute('disabled', 'disabled');
    } else {

      voice.onended = function() {
        setTimeout(function () {
          //create new div for messages
          let kathleenMessage = document.createElement('div');
          kathleenMessage.id = 'kathleenMessage' + received;
          kathleenMessage.classList.add('kathleenMessage');
          kathleenMessage.textContent = kathleenKelly[sent];

          //create span for time messages
          let timeMessageKat = document.createElement('span');
          timeMessageKat.classList.add('katTimeMessage');
          timeMessageKat.textContent = hours + ":" + minutes;
          messages.append(kathleenMessage);
          messages.append(timeMessageKat);

          //scroll down when new message arrived
          messageContainer.scrollTop = messageContainer.scrollHeight;

          letter = 0;
          sent++;

          voiceRecordingMeg++;
          displayText();
          //remove message when done
          text.textContent = "";
        }, 300);
      }

    }
  }
}

function playKathleenVoice() {
  if (sent == -1) {
    sent++;
  } else {
    next.innerHTML = '<i class="far fa-hourglass"></i>';
    let hourglass = document.querySelector('.far.fa-hourglass');
    hourglass.classList.add('rotate');
    next.style.cursor = "default";

    play(voice, soundEffectMeg, voiceRecordingMeg);
  }

}

next.addEventListener('click', function() {
  write();
  playKathleenVoice();
});

let login = document.querySelector('#login');
let loginScreen = document.querySelector('.loginScreen');
login.addEventListener('click', start);
let startApp = 'false';

function start() {
  let nickNameJoe = document.querySelector('.NY152');
  let typeBox = document.querySelector('.typeBox');
  let emoticon = document.querySelector('.emoticon');

  if (startApp == 'false') {
    next.style.opacity = '1';
    loginScreen.classList.add('hide');
    startApp = 'true';
    nickNameJoe.style.opacity = 1;
    typeBox.style.opacity = 1;
    emoticon.style.opacity = 1;
    messageContainer.style.opacity = 1;

    write();
    playKathleenVoice();
  }
}

function refreshPage() {
  window.location.reload(true);
}

end.addEventListener('click', refreshPage);
