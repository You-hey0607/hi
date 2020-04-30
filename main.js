'use strict'
{
const words = [
    'apple',
    'sky',
    'blue',
    'middle',
    'set',
]


let   word ; //words配列からランダムに要素を取得
let   loc ;  
let   score ;
let   miss ;
const timeLimit = 3 * 1000;//jsでは時間規格は基本的にmm秒 
let   startTime;
let   isPlaying = false;   //gameが始まっているか判定

 const target  = document.getElementById('target');
 const scoreLabel = document.getElementById('score');
 const missLabel = document.getElementById('miss');
 const timerLabel = document.getElementById('timer');
 
////////////////////////////function//////////////////////////////////////
function upadateTarget(){
    let placeholder = '';
    for (let i= 0; i<loc; i++){
        placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc); //loc番目から最後までのwordの文字列を表示
}

function updateTimer(){                                     //ゲーム残り時間の計算
    const timeLeft = startTime + timeLimit -Date.now();
    timerLabel.textContent = (timeLeft/1000).toFixed(2);    //秒単位、toFixed小数点二桁

    const timeoutId = setTimeout(() => {
        updateTimer();
    }, 10);                                                 //10mm秒毎にupdatetimerを実行し、カウントダウン

    if(timeLeft < 0){
        isPlaying = false;                                  //0になるとゲーム進行判定false

        clearTimeout(timeoutId);
        timerLabel.textContent = '0.00';
        
        setTimeout(()=>{
            showResult();
        }, 100);                                           //0.1秒後にalertを実行
      
        target.textContent = 'click to replay';             //replay
    }
}

function showResult(){
    const accuracy = score + miss === 0 ? 0 : score /(score + miss) * 100;
    alert(`${score} letter, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!!`);
}





////////////////////////window event/////////////////////////////////////////

window.addEventListener('click', (e) =>{      //windowをクリックするとwordを取得
    if(isPlaying === true){
        return;                               //ゲーム進行中はタイマーの処理は無効化
    }

    isPlaying = true;

    loc = 0;                                   //window click時に初期化
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() *words.length)];

    target.textContent = word;
    startTime = Date.now();
    updateTimer();                   
});

 window.addEventListener('keydown', (e) =>{     //windowにタイプされた文字の取得
    if(isPlaying !== true){                     //ゲームがは始まっていないときはwindow.keyは実行しない
        return; 
    }
    
    console.log(e.key);

    if(e.key === word[loc]){                    //タイプされた文字がtargetと同じか判定
        console.log('score');                   //正ならloccationを1つ進める
        loc++;
        if(loc === words.length){               //locationが文字列の最後に来たとき、wordを更新
            word = words[Math.floor(Math.random() *words.length)]; 
            loc = 0;
        }
        upadateTarget()                         //正なら文字列を__に変更する関数
        score++;
        scoreLabel.textContent = score;
    }else{
        console.log('miss');
        miss++;
        missLabel.textContent = miss;
    }
 });
}
