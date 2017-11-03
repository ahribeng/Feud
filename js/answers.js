createGame = function(q) {
    $('#answersLeft').empty();
    $('#answersRight').empty();
    answers = QUESTIONS[q]
    function blocks(i) {
        if (i < answers.length) {
            return createAnswer(answers[i]["answer"], answers[i]["points"], i);
        }
        return createAnswer(null, null, i);
    }
    
    for (var i = 0; i <= 5; i++) {
        var row = $('<div class="row"></div>');
        row.append(blocks(i));
        if (i<=2){
            $('#answersLeft').append(row);
        }else{
            $('#answersRight').append(row);
        }
    }
 
}
createAnswer = function(answer, points, i) {
    var section = $('<div class="answerblock" id="section_' + i + '"></div');
    var inner = $('<div></div>');
    section.append(inner);

    if (answer && points) {
        section.addClass('active');
        inner.addClass('answer');
        inner.append('<div class="front"><span class="left">' + answer + '</span><b>' + points + '</b></div>');
    } else {
        inner.addClass('inactive');
        inner.addClass('answer');
        inner.append('<div class="front"></div>');
        inner.append('<div class="back"></div>');
    }

    return section;
}
 
t = new Trie()
t.addDictionary(Object.keys(QUESTIONS))

$('#questioninput').keyup(function() {
    input = document.getElementById("questioninput");
    words = t.findWordsWithPrefix(input.value)
    q = $('#q')
    q.empty()
    for (var i = 0; i < words.length; i++) {
      q.append('<option value="QQQ">'.replace("QQQ", words[i]));
    };
});
$(document).keypress(function(e) {
    if(e.which == 13) {
        createGame(document.getElementById("questioninput").value)
    }
});
