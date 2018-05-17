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

	// get info from primus.js 
	if(data.btn) {
		// display new comment
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
  
	  } else if(data.like) {
			// display liked status and new number of comments
			var alreadyLiked = false; 
			var usersWhoLiked = document.querySelectorAll(".header__bottom__likedUsers__img");
			for (let i = 0; i < usersWhoLiked.length; i++) {
			if(usersWhoLiked[i].alt == data.username) {
				alreadyLiked = true;
			}
			}
			if(!alreadyLiked) {
			var avatar = `<img class="header__bottom__likedUsers__img" src="${data.userPicture}" alt="${data.username}">`;
			document.querySelector(".header__bottom__likedUsers").innerHTML += avatar;
			document.querySelector(".header__bottom__likesBox__Nr").innerHTML = "x" + data.likesCount;
			}

		} else if (data.question){
			var answerId = data.answerId;
			var question = `
			.topic
        .topic__likes
          img(src='/images/icon-cool.svg', alt='icon').topic__likes__icon
          span(class='topic__likes__count')=x"${data.likesCount}"
        .topic__question
          a(href="/kweeni/"+ "${data.slug}")=${data.question}"
        .topic__author
          p=${data.author}
					img(src=${data.picture}, alt='avatar')`;
			document.querySelector(".list__title").innerHTML += question;
					
		}else {
		// display new subcomment
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
    
    // when someone adds new comments
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

    // when someone adds new subcomment
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

	// when someone clicks on like
	document.querySelector(".header__bottom__likesLink").addEventListener("click", function(e){
		var questionId = document.querySelector(".subheader__title").id;
		var like = true;
		var userId = document.querySelector("#userId").value;
		primus.write({ 
		  questionId: questionId,
		  like: like,
		  userId: userId
		});
  
		e.preventDefault();
	  });

	}
	
	if(document.querySelector(".subheader")) {
    
    // when someone adds new question
    document.querySelector(".ask__button").addEventListener("click", function(e){
        var question = document.querySelector(".subheader__prompt__input"); 
        var userId = document.querySelector("#userId").value;
        primus.write({ 
          question: question,
          userId: userId
         });

        question.value = "";
        e.preventDefault();
		});
		
	}
