function Game() {
    this.questionSection = $('#questions')
    this.answerLeft = $('#answersLeft')
    this.answerRight = $('#answersRight')
    this.strikes = 0
    this.q_keys = fy_shuffle(Object.keys(QUESTIONS))
    this.q_index = 0
}
Game.prototype.start = function() {
    this.answerLeft.empty()
    this.answerRight.empty()
    $("#strikes").empty()
    this.strikes = 0
    this.createGame()
}

Game.prototype.createGame = function() {
    idx = this.q_index

    if (idx <= this.q_keys.length){
        q = this.getQuestion(idx)
        answers = this.getAnswer(q)
        this.questionSection.html(q)
        self = this
        
        function blocks(i) {
            if (i < answers.length) {
                return self.createAnswer(answers[i]["answer"], answers[i]["points"], i);
            }
            
            return self.createAnswer(null, null, i);
        }
    
        for (var i = 0; i <= 5; i++) {
            var row = $('<div class="row"></div>');
            row.append(blocks(i));
            
            if (i<=2){
                this.answerLeft.append(row);
            }else{
                this.answerRight.append(row);
            }
        }
        
        this.q_index += 1
    }
}
Game.prototype.createAnswer = function(answer, points, i) {
    var section = $('<div class="answerblock" id="section_' + i + '"></div');
    var inner = $('<div></div>');
    section.append(inner);

    if (answer && points) {
        section.addClass('active');
        inner.addClass('answer');
        inner.append('<div class="front"><span>' + (i + 1) + '</span></div>');
        inner.append('<div class="back"><span class="left">' + answer + '</span><b>' + points + '</b></div>');
        this.addClick(inner, points);
    } else {
        inner.addClass('inactive');
        inner.addClass('answer');
        inner.append('<div class="front"></div>');
        inner.append('<div class="back"></div>');
    }

    return section;
}
Game.prototype.getQuestion = function(idx) {
    return this.q_keys[idx]
}
Game.prototype.getAnswer = function(q) {
    return QUESTIONS[q]
}
Game.prototype.addClick = function(section, points){
    section.flip({
        axis: 'x',
        trigger: 'click'
    });
    self = this
    section.click(function(){   
        self.addRoundPoints(points)
    })
}
Game.prototype.addRoundPoints = function(points){
    currPoints = parseInt($("#boardScore").html())
    currPoints += points
    $("#boardScore").html(currPoints)
}
 var game = new Game();
$("#answers").ready(function() {
    t1 = $("#team1_name").val();
    t2 = $("#team2_name").val()
    game.start()
    game.strike()
});
function showGif(){
    gif = new Image()
    gif.src = getGifSrc()
    return gif
}
function getGifSrc(){
    return 'gifs/' + Math.floor(Math.random() * 21) + '.gif' 
}
Game.prototype.strike = function(){
    self = this
$("#strike").click(function() {
    modal = $("#gifModal")
    gif = showGif()
    op = parseInt(modal.css("opacity"))
    modal.css({ opacity: 1 })
    $("#gif").append(gif)
    setTimeout(function(){
        $("#gif").children().remove();
        modal.css({ opacity: 0 })
        $("#strikes").append("X")
        self.strikes += 1
        if (self.strikes > 2){
            self.strikes = 0
            setTimeout(function() {
                $("#strikes").empty()
            }, 2000);
        }
    }, 6000);

    
});}
Game.prototype.reset = function() {
    this.strikes = 0;
    $('#strike').empty();
}

$("#team1_add").click(function() {
    addPoints = parseInt($("#boardScore").html())
    currPoints = parseInt($("#team1").html())
    currPoints += addPoints
    $("#team1").html(currPoints)
    $("#boardScore").empty()
    $("#boardScore").html(0)
    game.start()
});
$("#team2_add").click(function() {
    addPoints = parseInt($("#boardScore").html())
    currPoints = parseInt($("#team2").html())
    currPoints += addPoints
    $("#team2").html(currPoints)
    $("#boardScore").empty()
    $("#boardScore").html(0)
    game.start()
});
