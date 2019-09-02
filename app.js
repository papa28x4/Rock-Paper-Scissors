const reset = document.querySelector('#reset');
const buttonArea =  document.querySelector('.for1 .buttons');
const buttons = document.querySelectorAll('.for1 .controls');
const image1 = document.querySelector('#image-1');
const image2 = document.querySelector('#image-2');
let players = document.querySelectorAll('.scores p:first-Child');
let player1score = document.querySelector('#player1Scores p:last-child');
let player2score = document.querySelector('#player2Scores p:last-child');
let comments = document.querySelector('#comments');
let result = document.querySelector('#result');
const imageFolder = "assets/";
let audio = document.createElement('audio');
const winningCondition = 10;
const winPoints = 2;
const ImageArray = ['rock.png', 'paper.png','scissors.png']
const numBtn = ImageArray.length
let action = ['smashes', 'swallows', 'shreds'];
let playlist = ['rock.wav', 'paper.wav', 'scissors.wav'];
let scores, gameOver, winningPlayer, index; 

const start =()=>{
    scores = [0,0]; 
    gameOver = false;
    winningPlayer = 0
    index = '';
    player1score.innerHTML = `<p>${scores[0]}</p>`;
    player2score.innerHTML = `<p>${scores[1]}</p>`;
    players[0].innerHTML = 'Player 1';
    players[1].innerHTML = 'Computer';
    image1.src = image2.src = '';
    comments.innerHTML = '';
    result.innerHTML = '';
}

window.addEventListener("load", start);

reset.addEventListener('click', start)

const playAudio =(winningPlayer, choice0, choice1)=>{
    audio.src = winningPlayer === 1 ? `${imageFolder}`+playlist[ImageArray.indexOf(`${choice1}.png`)] : `${imageFolder}`+playlist[ImageArray.indexOf(`${choice0}.PNG`)]
    audio.play()
}

const wins = (choice0, choice1) =>{ 
    winningPlayer = 0;
    playAudio(winningPlayer, choice0, choice1);
    let fatality = action[ImageArray.indexOf(`${choice0}.PNG`)];
    comments.innerHTML = `<p>${choice0} ${fatality} ${choice1}<p><br><p>${players[0].textContent} wins this round<p>`;
    scores[0] += winPoints;
    player1score.innerHTML = `<p>${scores[0]}</p>`
    checkWinningCondition(scores[0], winningPlayer);
}

const loses = (choice0, choice1) =>{
    winningPlayer = 1;
    playAudio(winningPlayer, choice0, choice1);
    let fatality = action[ImageArray.indexOf(`${choice1}.PNG`)];
    comments.innerHTML = `<p>${choice1} ${fatality} ${choice0}<p><br><p>${players[1].textContent} wins this round<p>`
    scores[1] += winPoints;
    player2score.innerHTML = `<p>${scores[1]}</p>`;
    checkWinningCondition(scores[1], winningPlayer)
}

const checkWinningCondition =(playerScore, winningPlayer)=>{
    if(playerScore === winningCondition){
         players[winningPlayer].innerHTML = `<p style="color:red; font-weight:bolder;">Winner!</p>`;
         gameOver = true;
        result.innerHTML += `<p style="color:red;">Game Over</p>`;
    }
}

buttonArea.addEventListener('click', (event)=>{
    if(!gameOver){
        const choices = [];
        if(event.target.className === 'controls' ){ 

                image1.src = `${imageFolder}${event.target.id}.PNG`
                index = Math.floor(Math.random() * numBtn)
                image2.src = `${imageFolder}${ImageArray[index]}` 
                let temp = event.target.id.split('-')
                let temp2 = ImageArray[index].split('.')
                choices.unshift(temp[0],temp2[0])
                
                if(choices[0] === choices[1]){
                comments.innerHTML = `<p>We have a tie<p>`
        }else{
            
                if(choices[0] === 'rock'){
                    choices.includes('scissors')? wins(choices[0], choices[1]) : loses(choices[0], choices[1])
                }
                else if(choices[0] === 'paper'){
                    choices.includes('rock')? wins(choices[0], choices[1]) : loses(choices[0], choices[1])
                }
                else if(choices[0] === 'scissors'){
                    choices.includes('paper')? wins(choices[0], choices[1]) : loses(choices[0], choices[1])
                } 
            }
        }
    }  
})
