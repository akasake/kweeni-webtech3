if( document.querySelector(".subheader__title") != null )
{
    var questionId = document.querySelector(".subheader__title").id;
}
else
{
    var questionId = null;
}

var url = "/?room="+questionId;
var primus = Primus.connect(url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
  });

  primus.on('data', function(data) {

    
});

  if(document.querySelector(".header__bottom")) {
    
    // On a new comment
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

    // On a new subcomment
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
