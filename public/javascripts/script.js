var url = "/";
var primus = Primus.connect(url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
  });
  
  primus.on('data', function(data) {

    if(data.btn) {

      var answerCounter = document.querySelectorAll(".main_comment").length+1;
      var comment = `
      <div class="main_comment comments__textBox">
        <p>${data.comment}</p>
        <div class="comments__user">
          <img class="comments__userImg" src="${data.userPicture}" alt="${data.username}">
          <p class="comments__userName">${data.username}</p>
        </div>
      </div>
      <div class="comments__reply__form comments__reply" id="comments__reply${answerCounter}">
        <input class="comments_reply_input" type="text" placeholder="Plaats commentaar..." data-answernumber="${answerCounter}">
      </div>`;
      document.querySelector(".comments").innerHTML += comment;

    } else {

      var answerId = data.answerId;
      var comment = `
      <div class="comments__textBox reply">
        <p>${data.subcomment}</p>
        <div class="comments__user">
          <img class="comments__userImg" src="${data.userPicture}" alt="${data.username}">
          <p class="comments__userName comments__userName--highlight">${data.username}</p>
        </div>
      </div>`;
      document.querySelector("#comments__reply"+answerId).insertAdjacentHTML('beforebegin', comment);

    }

});


  if(document.querySelector(".header__bottom")) {
    
    // Trigger a new answer
    document.querySelector(".bottom__answerInput__button").addEventListener("click", function(e){
        var txtAnswer = document.querySelector(".bottom__answerInput__input");
        var text = txtAnswer.value;
        var btn = true;
        var questionId = document.querySelector(".subheader__title").id;
        var userId = document.querySelector("#userId").value;
        primus.write({ 
          comment: text,
          btn: btn,
          questionId: questionId,
          userId: userId
         });

        txtAnswer.value = "";
        e.preventDefault();
    });

    
    // Trigger a new comment
    document.querySelector(".comments").addEventListener("keydown", function(e){
      if(e.keyCode == 13){
          // ENTER!
          var el = e.target;
          var text = el.value;
          var answerId = el.dataset.answernumber;
          var questionId = document.querySelector(".subheader__title").id;
          var userId = document.querySelector("#userId").value;
          primus.write({ 
            subcomment: text,
            questionId: questionId,
            answerId: answerId,
            userId: userId
          });

          el.value = "";
          e.preventDefault();
      }
    });
  }




















