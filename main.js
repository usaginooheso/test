
//ページを開いたら
//ゲーム開始前の3カウントを消す
//現在の問題総数を表示
window.onload = function() {
    countThreeArea.textContent = "";
    $('#countThreeArea').hide();
    mondaiJPArea.textContent = "現在の問題数：" + mondaiNumTotal;
}

//問題
var mondai = {
    0:{
        "jp":"デパートのアドバルーン",
        "kana":"でぱーとのあどばるーん",
        "al":"depa-tonoadobaru-nn"
    },
    1:{"jp":"さようでございましたか",
        "kana":"さようでございましたか",
       "al":"sayoudegozaimasitaka"},
    2:{"jp":"嬉しく思います",
        "kana":"うれしくおもいます",
        "al":"uresikuomoimasu"},
    3:{"jp":"ひよこピヨピヨ",
        "kana":"ひよこぴよぴよ",
        "al":"hiyokopiyopiyo"},
    4:{"jp":"お気軽にお問い合わせください",
        "kana":"おきがるにおといあわせください",
        "al":"okigaruniotoiawasekudasai"},
    5:{"jp":"鉛筆削り",
        "kana":"えんぴつけずり",
        "al":"enpitukezuri"},
    6:{"jp":"シェフの気まぐれサラダ",
        "kana":"しぇふのきまぐれさらだ",
        "al":"syefunokimaguresarada"},
    7:{"jp":"また何かございましたら",
        "kana":"またなにかございましたら",
        "al":"matananikagozaimasitara"},
    8:{"jp":"傘でゴルフの練習",
        "kana":"かさでごるふのれんしゅう",
        "al":"kasadegorufunorensyuu"},
    9:{"jp":"デパートのアドバルーン",
        "kana":"でぱーとのあどばるーん",
        "al":"depa-tonoadobaru-nn"},
}

//問題の総数を数える
var mondaiNumTotal = 0;
for(var key in mondai){
    mondaiNumTotal++;
}

//変数
var countThree = 1; //ゲーム開始前の3カウント
var timeLimit = 10; //ゲームの制限時間


var mondaiNum = 150;//ゲームの問題数 未定義
var odai;           //お題
var odaiMojiNum;    //お題の何文字目を入力中か（添字）
var odaiChars;      //お題alphabelを1文字ずつ配列に格納したもの
var odaiKanaChars;  //お題のひらがなを1文字ずつ配列に格納したもの

var typedNum;       //合っていた数
var clearMondaiNum; //クリアしたお題の数
var missNum;        //ミス入力の数
var score;          //未定義
var timerID1;
var timerID2;

function wordset(){
	henkan=new Array(
        ["あ","a"],
		["い","i"],
		["う","u","wu"],
		["え","e"],
		["お","o"],
		["か","ka","ca"],
		["き","ki"],
		["く","ku","cu"],
		["け","ke"],
		["こ","ko","co"],
		["さ","sa"],
		["し","shi","si","ci"],
		["す","su"],
		["せ","se","ce"],
		["そ","so"],
		["た","ta"],
		["ち","chi","ti"],
		["つ","tsu","tu"],
		["て","te"],
		["と","to"],
		["な","na"],
		["に","ni"],
		["ぬ","nu"],
		["ね","ne"],
		["の","no"],
		["は","ha"],
		["ひ","hi"],
		["ふ","fu","hu"],
		["へ","he"],
		["ほ","ho"],
		["ま","ma"],
		["み","mi"],
		["む","mu"],
		["め","me"],
		["も","mo"],
		["や","ya"],
		["ゆ","yu"],
		["よ","yo"],
		["ら","ra"],
		["り","ri"],
		["る","ru"],
		["れ","re"],
		["ろ","ro"],
		["わ","wa"],
		["を","wo"],
		["ん","nn","n"],
		["が","ga"],
		["ぎ","gi"],
		["ぐ","gu"],
		["げ","ge"],
		["ご","go"],
		["ざ","za"],
		["じ","ji","zi"],
		["ず","zu"],
		["ぜ","ze"],
		["ぞ","zo"],
		["だ","da"],
		["ぢ","di"],
		["づ","du"],
		["で","de"],
		["ど","do"],
		["ば","ba"],
		["び","bi"],
		["ぶ","bu"],
		["べ","be"],
		["ぼ","bo"],
		["ぱ","pa"],
		["ぴ","pi"],
		["ぷ","pu"],
		["ぺ","pe"],
		["ぽ","po"],
		["ー","-"],
		["うぃ","wi","whi","uli","uxi","ulyi","uxyi"],
		["うぇ","we","whe","ule","uxe","ulye","uxye"],
		["きゃ","kya","kilya","kixya"],
		["きぃ","kyi","kili","kixi","kilyi","kixyi"],
		["きゅ","kyu","kilyu","kixyu"],
		["きぇ","kye","kile","kixe","kilye","kixye"],
		["きょ","kyo","kilyo","kixyo"],
		["ぎゃ","gya","gilya","gixya"],
		["ぎゅ","gyu","gilyu","gixyu"],
		["ぎょ","gyo","gilyo","gixyo"],
		["くぉ","qo","kulo","kuxo","culo","cuxo"],
		["しゃ","sha","sya","silya","sixya","shilya","shixya","cilya","cixya"],
		["しぃ","syi","sili","silyi","sixi","sixyi","shili","shilyi","shixi","shixyi","cili","cilyi","cixi","cixyi"],
		["しゅ","shu","syu","silyu","sixyu","shilyu","shixyu","cilyu","cixyu"],
		["しぇ","she","sye","sile","silye","sixe","sixye","shile","shilye","shixe","shixye","cile","cilye","cixe","cixye"],
		["しょ","sho","syo","silyo","sixyo","shilyo","shixyo","cilyo","cixyo"],
		["じゃ","ja","jya","jilya","jixya","zya","zilya","zixya"],
		["じゅ","ju","jyu","jilyu","jixyu","zyu","zilyu","zixyu"],
		["じぇ","je","jye","jile","jixe","jilye","jixye","zye","zile","zixe","zilye","zixye"],
		["じょ","jo","jyo","jilyo","jixyo","zyo","zilyo","zixyo"],
		["ちゃ","cha","cya","tya","tilya","tixya","chilya","chixya"],
		["ちゅ","chu","cyu","tyu","tilyu","tixyu","chilyu","chixyu"],
		["ちぇ","che","cye","tye","tile","tixe","tilye","tixye","chile","chixe","chilye","chilxye"],
		["ちょ","cho","cyo","tyo","tilyo","tixyo","chilyo","chixyo"],
		["ぢゅ","dyu","dilyu","dixyu"],
		["てぃ","thi","teli","texi","telyi","texyi"],
		["でぃ","dhi","deli","dexi","delyi","dexyi"],
		["でゅ","dhu","delyu","dexyu"],
		["ふぁ","fa","fula","fuxa","hula","huxa","fwa"],
		["ふぃ","fi","fyi","fuli","fuxi","fulyi","fuxyi","huli","huxi","hulyi","huxyi","fwi"],
		["ふぇ","fe","fye","fule","fuxe","fulye","fuxye","hule","huxe","hulye","huxye","fwe"],
		["ふぉ","fo","fulo","fuxo","hulo","huxo"],
		["ふゅ","fyu","fulyu","fuxyu","hulyu","huxyu"],
		["にゃ","nya","nilya","nixya"],
		["にゅ","nyu","nilyu","nixyu"],
		["にょ","nyo","nilyo","nixyo"],
		["ひゃ","hya","hilya","hixya"],
		["ひゅ","hyu","hilyu","hixyu"],
		["ひょ","hyo","hilyo","hixyo"],
		["びゃ","bya","bilya","bixya"],
		["びゅ","byu","bilyu","bixyu"],
		["びょ","byo","bilyo","bixyo"],
		["ぴゃ","pya","pilya","pixya"],
		["ぴゅ","pyu","pilyu","pixyu"],
		["ぴょ","pyo","pilyo","pixyo"],
		["みゃ","mya","milya","mixya"],
		["みゅ","myu","milyu","mixyu"],
		["みょ","myo","milyo","mixyo"],
		["りゃ","rya","rilya","rixya"],
		["りゅ","ryu","rilyu","rixyu"],
		["りょ","ryo","rilyo","rixyo"],
		["うぉ","who","ulo","uxo"],
		["っ","tt","ltu","xtu","ltsu"],
		["ぁ","la","xa"],
		["ぃ","li","xi"],
		["ぅ","lu","xu"],
		["ぇ","le","xe"],
		["ぉ","lo","xo"],
		["ゃ","lya","xya"],
		["ゅ","lyu","xyu"],
		["ょ","lyo","xyo"]
    );
}

//ひらがな→ローマ字チェンジ
function kanaromaChange(){
    console.log(odaiKanaChars);
    for(var i = 0; i < odaiKanaChars.length; i++){
        if (odaiKanaChars.charAt(i+1) == "ぁ") {
            if (odaiKanaChars.charAt(i) == "ふ") {
                romaji += "fa";
                i++;
            }
        } else if (odaiKanaChars.charAt(i+1) == "ぃ") {
            if (odaiKanaChars.charAt(i) == "ふ") {
                romaji += "fi";
                i++;
            }
        } else if (odaiKanaChars.charAt(i+1) == "ぇ") {
            if (odaiKanaChars.charAt(i) == "ふ") {
                romaji += "fe";
                i++;
            }
        } else if (odaiKanaChars.charAt(i+1) == "ぉ") {
            if (odaiKanaChars.charAt(i) == "ふ") {
                romaji += "fo";
                i++;
            }
        } else if (odaiKanaChars.charAt(i+1) == "") {
            if (odaiKanaChars.charAt(i) == "ふ") {
                romaji += "fe";
                i++;
            }
        }
    }
}

//初期化
function init() {
    $('#mondaiJPArea,#mondaiArea').hide();
    $('#typedMojiArea,#infoArea').hide();
    mondaiJPArea.textContent = "";
    mondaiArea.textContent = "";
    typedMojiArea.textContent = "";
    timeLeftArea.textContent = "";
    typedMojiArea.textContent = "";
    missNumArea.textContent = "";

    $('#countThreeArea').show();
    countThreeArea.textContent = "Ready?";

    countThree = 3;
    timeLeft = timeLimit;

    typedNum = 0;
    clearMondaiNum = 0;
    missNum = 0;
    score = 0;
}

//ゲーム開始前のカウントダウン
function countDownB4game() {
    if (countThree <= 0) { //カウントが0以下になったら
        clearInterval(timerID1);
        countThreeArea.textContent = "";
        $('#countThreeArea').hide();
        $('#mondaiJPArea,#mondaiArea').show();
        $('#typedMojiArea,#infoArea').show();
        startTyping();
        return;
    }
    countThreeArea.textContent = countThree;
    countThree--;
}

//スタートボタン押下
$('#startBtn').click(function() {
    init();
    timerID1 = setInterval("countDownB4game()", 1000); //1秒ごとに動作
});

//ゲームプレイ中のカウントダウン
function countDownGametime() {
    if (timeLeft <= 0) {
        timeLeftArea.textContent = timeLeft;
        stopTyping();
        return;
    }
    timeLeftArea.textContent = timeLeft;
    timeLeft--;
}

//ゲーム開始
function startTyping() {
    setOdai();
    countDownGametime(); //カウントダウン開始
    timerID2 = setInterval("countDownGametime()", 1000); //1秒ごとにカウントダウン実行
    //startBtn.disabled = true;
}


//配列のシャッフル
function shuffle(array) {
  var n = array.length, t, i;
  while (n) {
    i = Math.floor(Math.random() * n--);
    t = array[n];
    array[n] = array[i];
    array[i] = t;
  }
  return array;
}

//問題の生成
function setOdai() {
    odaiNanmojime = 0; //入力中の文字
    var rand = Math.floor(Math.random() * mondaiNumTotal);
    //console.log(rand);
    var odai = mondai[rand];
    //console.log(odai);
    mondaiJPArea.textContent = odai["jp"];
    console.log(odai["jp"]);
    mondaiArea.textContent = odai["al"].toUpperCase();

    typedMojiArea.textContent = "";

    //お題を一文字ずつ分割して配列に入れる
    odaiChars = odai["al"].toUpperCase().split('');

    //お題（ひらがな）を一文字ずつ分割して配列に入れる
    odaiKanaChars = odai["kana"].split('');
    //kanaromaChange();
}

//押したキーを判定する処理
document.onkeydown = function(e) {
    var pressedKey;//押したキー
    if(e.keyCode == 189){
        ositaKey = "-";
    } else {
        //押した文字（キー）の取得
        ositaKey = String.fromCharCode(e.keyCode);
    }
    //お題文字と押した文字が一致していたら
    if (ositaKey == odaiChars[odaiNanmojime]) {
        odaiNanmojime++;
        typedNum++;
        typedMojiArea.textContent = typedMojiArea.textContent + ositaKey;
        typedNumArea.textContent = typedNum;
        if (odaiChars.length == odaiNanmojime) {
            clearMondaiNum++;
            clearMondaiNumArea.textContent = clearMondaiNum;
            setOdai();
        }
    } else {
        missNum++;
        missNumArea.textContent = missNum;
    }
};

//ゲーム終了
function stopTyping() {
    odaiNanmojime = [];
    clearInterval(timerID2);
    typedNumArea.textContent = typedNum;
    missNumArea.textContent = missNum;
    //startBtn.disabled = false;
}
