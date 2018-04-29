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
      var comment = `
      <div class="comments__textBox">
        <p>${data.body}</p>
        <div class="comments__user">
          <img class="comments__userImg" src="" alt="">
          <p class="comments__userName">das</p>
        </div>
      </div>`;
      document.querySelector(".comments").innerHTML += comment;
    } else {
      var comment = `
      <div class="comments__textBox reply">
        <p>${data.body}</p>
        <div class="comments__user">
          <img class="comments__userImg" src="../images/user1.png" alt="">
          <p class="comments__userName comments__userName--highlight">Anneke Kodeur</p>
        </div>
      </div>`;
      document.querySelector("#thisId").innerHTML += comment;
    }

});


  if(document.querySelector(".header__bottom")) {
    
    // Trigger a new answer
    document.querySelector(".bottom__answerInput__button").addEventListener("click", function(e){
        var txtAnswer = document.querySelector(".bottom__answerInput__input");
        var answer = txtAnswer.value;
        var btn = true;
        //var questionId = document.querySelector(".questionDetails").dataset.questionid;
        primus.write({ 
          body: answer,
          btn: btn
         });

        txtAnswer.value = "";
        e.preventDefault();
    });

    
    // Trigger a new comment
    document.querySelector(".comments_reply_input").addEventListener("keydown", function(e){
      if(e.keyCode == 13){
          // ENTER!
          var el = e.target;
          var comment = el.value;
          // var answerId = el.dataset.answernumber;
          // var questionId = document.querySelector(".questionDetails").dataset.questionid;
          primus.write({ body: comment });

          el.value = "";
          e.preventDefault();
      }
    });
  }