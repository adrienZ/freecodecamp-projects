var $ = function (element) {
    return document.getElementsByClassName(element);
};
var quotes = [
   ["The things you own end up owning you.", "Tyler Durden"],

    [" It\'s only after we\'ve lost everything that we\'re free to do anything.", "Tyler Durden"],
    ["This is your life and it\'s ending one minute at a time.", "Narrator"],

    [" You\'re not your job. You\'re not how much money you have in the bank. You\'re not the car you drive. You\'re not the contents of your wallet. You\'re not your fucking khakis. You\'re the all-singing, all-dancing crap of the world", "Tyler Durden"],

    ["Listen up, maggots. You are not special. You are not a beautiful or unique snowflake. You\'re the same decaying organic matter as everything else.", "Tyler Durden"],

    ["Welcome to Fight Club. The first rule of Fight Club is: you do not talk about Fight Club. The second rule of Fight Club is: you DO NOT talk about Fight Club!", "Tyler Durden"],

    ["You met me at a very strange time in my life.", "Narrator"],

    ["I found freedom. Losing all hope was freedom.", "Narraror"],

    ["On a long enough timeline, the survival rate for everyone drops to zero.", "Narrator"],

    ["We\'re a generation of men raised by women. I\'m wondering if another woman is really the answer we need.", "Tyler Durden"],

    ["Hey, you created me. I didn\'t create some loser alter-ego to make myself feel better. Take some responsibility!", "Tyler Durden"],

    ["Without pain, without sacrifice, we would have nothing. Like the first monkey shot into space.", "Tyler Durden"],

    ["Every evening I died, and every evening I was born again, resurrected.", "Narrator"],

    ["My God. I haven\'t been fucked like that since grade school.", "Marla Singer"],

    ["I ran. I ran until my muscles burned and my veins pumped battery acid. Then I ran some more.", "Narrator"],

    ["Marla\'s philosophy of life is that she might die at any moment. The tragedy, she said, was that she didn\'t.", "Narrator"],

    ["You\'re the worst thing that\'s ever happened to me.", "Narrator"],

    ["When the fight was over, nothing was solved, but nothing mattered. We all felt saved.", "Narrator"],

    ["Like so many others, I had become a slave to the Ikea nesting instinct.", "Narrator"],


    ["Alright, alright, I got it. I got it - shit I lost it.", "Tyler Durden"]

];

function random() {

    var i = Math.floor(Math.random() * quotes.length)
    var quote = quotes[i][0];
    var author = quotes[i][1];


    document.getElementById("text").innerHTML = quote;
    document.getElementById("author").innerHTML = "- " + author;
    document.getElementById("twitter").href = "https://twitter.com/intent/tweet?text=" + quote + " - " + author + " %23FightClub";
}
