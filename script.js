var musicArtists=["Michael Jackson", "Eminem", "Taylor Swift", "Madonna", "Elvis", "Beyonce", "Rihanna", "Bob Dylan", "Lady Gaga", "Prince", "Elton John", "Kanye West", "Whitney Houston", "Frank Sinatra", "Katy Perry"];
var presidents=["Washington", "Adams", "Jefferson", "Madison", "Monroe", "Jackson", "Lincoln", "Roosevelt", "Eisenhower", "Kennedy", "Nixon", "Carter", "Reagan", "Bush", "Clinton", "Obama", "Trump"];
var countries=["Azerbaijan", "Bangladesh", "Croatia", "Djibouti", "Eritrea", "Fiji", "Ghana", "Honduras", "Indonesia", "Jamaica", "Kazakhstan", "Latvia", "Mozambique", "Namibia", "Oman", "Pakistan", "Qatar", "Rwanda", "Slovenia", "Turkmenistan", "Uzbekistan", "Vietnam", "Yemen", "Zimbabwe"];
var movies=["Forrest Gump", "Godfather", "Titanic", "Matrix", "Inception", "Princess Bride", "Iron Man", "Anchorman", "Borat", "Pitch Perfect", "School of Rock", "Despicable Me", "Frozen", "Cars", "Moana"];
var categories=[musicArtists, presidents, countries, movies];
var categoryTitles=["Music Artists", "Presidents", "Countries", "Movies"];
var word="";
var guessedLetters=[];
numberOfGuesses=5;
var newCategory="";
var imageNames=["Pics/1.jpg", "Pics/2.jpg", "Pics/3.jpg", "Pics/4.jpg", "Pics/5.jpg", "Pics/6.jpg"];

function populateLetters(){
    var letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(var i=0;i<letters.length;i++){
        var button=document.createElement("button");
        button.innerHTML=letters[i];
        document.getElementById("letterRow").appendChild(button);
        button.setAttribute("onclick", "addLettersAndGuesses(this.value); buttonClicked()");
        button.setAttribute("value", letters[i]);
        button.setAttribute("id", letters[i]);
        button.setAttribute("class", "allLetters btn btn-danger")
    }
}

function buttonClicked() {
    printWord();
    printGuesses();
    determineImage();
    endGame()
}
function startGame(input) {
    document.getElementById("letterRow").style.display="block";
    document.getElementById("guesses").style.display="block";
    document.getElementById("newCategory").style.display= "inline";
    document.getElementById("newWord").style.display="inline";
    document.getElementById("title").style.display="none";
    document.getElementById("byLine").style.display="none";
    document.getElementById("category").style.display="none";
    var value=parseInt(input);
    newCategory=categories[value];
    newWord();
    document.getElementById("categoryTitle").innerHTML=categoryTitles[value];
    determineImage();
}

function newWord(){
    var elements = document.getElementsByClassName("allLetters");
    for(var j=0;j<elements.length;j++){
        elements[j].style.display="inline";
    }
    word=newCategory[Math.floor(Math.random() * newCategory.length)];
    word=word.toUpperCase();
    guessedLetters=[];
    printWord(word);
    numberOfGuesses=5;
    document.getElementById("guesses").innerHTML="Guesses Remaining: "+ numberOfGuesses;
    for(var i=0;i<elements.length;i++){
        elements[i].disabled=false;
    }
    determineImage();
    document.getElementById("guessesBank").innerHTML="Letters Guessed:";
    document.getElementById("dead").style.display="none";
    document.getElementById("congrats").style.display="none";
}

function addLettersAndGuesses(letter){
    document.getElementById(letter).disabled=true;
    document.getElementById(letter).style.dsiplay="none";
    guessedLetters.push(letter);
    var letterInWord=false;
    for(var j=0; j<word.length; j++){
        if(word.charAt(j)==letter){
            letterInWord=true;
        }
    }
    if(letterInWord==false){
        numberOfGuesses=numberOfGuesses-1;
    }
    document.getElementById("guesses").innerHTML="Guesses Remaining: "+ numberOfGuesses;
}

function printWord() {
    var element=document.getElementById("printedWord");
    var printedWord="";
    var developingWord="";
    var fontValue = (1/word.length) * 500;
    element.style.fontSize=fontValue + "px";
    for(var i=0;i<word.length;i++){
        var letter=word.charAt(i);
        if(letter==" "){
            printedWord+="&nbsp&nbsp";
            developingWord+="^";
        }else{
            for(j=0; j<guessedLetters.length;j++){
                if(guessedLetters[j]==letter) {
                    printedWord+= letter;
                    developingWord+=letter;
                }
            }
            if(developingWord.charAt(i)!=letter){
                printedWord+="_ ";
                developingWord+="^";
            }
        }
    }
    element.innerHTML=printedWord;
}

function printGuesses(){
    var text="";
    for(var i=0;i<guessedLetters.length;i++){
        text+="&nbsp&nbsp" + guessedLetters[i]
    }
    document.getElementById("guessesBank").innerHTML="Letters Guessed:"+text;
}

function determineImage(){
    var div=document.getElementById("image");
    div.innerHTML="";
    var text=imageNames[5];
    var j=5;
    for(var i=0;i<numberOfGuesses;i++){
        j-=1;
        text=imageNames[j];
    }
    var image=document.createElement("img");
    image.setAttribute("src", text);
    image.setAttribute("width", "200");
    image.setAttribute("height", "350");
    div.appendChild(image);
}

function endGame(){
    if(numberOfGuesses==0){
        document.getElementById("dead").style.display="block";
    }
    var gameOver=isGameOver();
    if(gameOver==true){
        document.getElementById("congrats").style.display="block";
    }
    if(gameOver==true||numberOfGuesses==0){
        var elements = document.getElementsByClassName("allLetters");
        for(var i=0;i<elements.length;i++){
            elements[i].disabled=true;
            elements[i].style.display="none";
        }
    }
}

function isGameOver(){
    var count=0;
    for(var i=0;i<(word.length);i++){
        var letter=word.charAt(i);
        for(var j=0; j<guessedLetters.length;j++){
            if(letter==guessedLetters[j]||letter==" "){
                count+=1;
                break;
            }
        }
    }
    if(count==(word.length)){
        return true;
    }else{
        return false;
    }
}