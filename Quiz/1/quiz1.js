const quizData = [
	{
		question: "[土佐打刃物タンちゃん]タンちゃんは高知の伝統工芸品のなにをモチーフにしているかな？",
		choices: [
			{ text: "土佐打刃物" },
			{ text: "土佐和紙" },
			{ text: "土佐珊瑚" },
			{ text: "土佐備長炭" },
		],
		correct: 0,
	},
	
    {
      question: "[フラフラ フラくん]フラくんは端午の節句に飾られる旗がモチーフなんだ　その旗の名前は次のうちどれかな？",
      choices: [
        { text: "フラフ" },
        { text: "フランクフルト" },
        { text: "フラフープ"},
        { text: "フラミンゴ" },
      ],
      correct: 0,
    },

    {
      question: "[瀧のシブキちゃん]瀧のシブキちゃんは香美市にある滝がモチーフなんだ　次のうちどれかな？",
      choices: [
        { text: "「轟の滝（とどろきのたき）」と「大荒の滝（おおあれのたき）」" },
        { text: "「岩屋の滝（いわやのたき）」" },
        { text: "「カツオのた滝（かつおのたたき）」"},
        { text: "「しら滝（しらたき）」" },
      ],
      correct: 0,
    },
    
    {
      question: "[あじさいひめ]あじさいひめはある花が道のように咲いている場所がモチーフなんだ　次のうちどれかな？",
      choices: [
        { text: "ひまわりロード" },
        { text: "あさがおロード" },
        { text: "あじさいロード"},
        { text: "ゆりロード" },
      ],
      correct: 2,
    },

    {
      question: "[かりかり　モモコちゃん]モモコちゃんは独特な食感の桃がモチーフなんだ　次のうちどれかな？",
      choices: [
        { text: "さくさく桃子" },
        { text: "パリパリ桃子" },
        { text: "ガリガリ桃子"},
        { text: "かりかり桃子" },
      ],
      correct: 3,
    },	

    {
      question: "[さくらてんし]さくらてんしはなにをモチーフにしているかな？",
      choices: [
        { text: "もも" },
        { text: "さくらんぼ" },
        { text: "うめ"},
        { text: "さくら" },
      ],
      correct: 3,
    },

    {
      question: "[しいたけ　たけちゃん]たけちゃんはなにをモチーフにしているかな？",
      choices: [
        { text: "菌床しめじ" },
        { text: "菌床エリンギ" },
        { text: "菌床なめこ"},
        { text: "菌床しいたけ" },
      ],
      correct: 3,
    },		
	
    {
      question: "[ぎんなん　ぎんちゃん]ぎんちゃんはなにをモチーフにしているかな？",
      choices: [
        { text: "ちゃわんむし" },
        { text: "たまごやき" },
        { text: "ぎんなん"},
        { text: "まんじゅう" },
      ],
      correct: 2,
    },	

    {
      question: "[龍河洞リューくん]リューくんの体温は龍河洞と同じなんだ　リューくんの体温は次のうちどれかな？",
      choices: [
        { text: "１００℃" },
        { text: "１６℃" },
        { text: "３６．５℃"},
        { text: "２７３℃" },
      ],
      correct: 1,
    },

    {
      question: "[ゆずぼうや]ゆずぼうやのモチーフにしているかな",
      choices: [
        { text: "ぶんたん" },
        { text: "こなつ" },
        { text: "ゆず"},
        { text: "直七" },
      ],
      correct: 2,
    },

    {
      question: "[さんれい　さんちゃん]さんちゃんのモチーフになったおやまの名前は次のうちどれかな？",
      choices: [
        { text: "おれい" },
        { text: "さんれい" },
        { text: "かれい"},
        { text: "しれい" },
      ],
      correct: 1,
    },

    {
      question: "[物部アユちゃん]物部アユちゃんのモチーフになっている魚の名前は次のうちどれかな？",
      choices: [
        { text: "カツオ" },
        { text: "さば" },
        { text: "アユ"},
        { text: "しらす" },
      ],
      correct: 2,
    },

    {
      question: "[森のモリくん]森のモリくんは西熊サオリガ原にある大きな木がモチーフなんだ　次のうちどれかな？",
      choices: [
        { text: "「イヌザクラ」と「トチノキ」" },
        { text: "「ネコザクラ」と「キノチト」" },
        { text: "「ケヤキ」と「ブナ」"},
        { text: "「スギ」と「ヒノキ」" },
      ],
      correct: 0,
    },
	// 他の問題もここに追加
];

let currentQuiz = quizData; // 全問題をそのまま使用
let currentQuestion = 0;
let Charscore = localStorage.getItem("score") || 0;
let score = Number(Charscore);
let CharAnserQuestion = localStorage.getItem("AnserQuestion") || 0;
let AnserQuestion = Number(CharAnserQuestion);
let Right = 0;
let QuizNumber = [0,1,2,3,4,5,6,7,8,9,10,11,12];
let i = 0;
const Questions = 3;
const totalQuestion = localStorage.getItem("totalQuestion");
document.getElementById("total-questions").textContent = AnserQuestion+1;

// 初期化
function initQuiz() {
	currentQuestion = 0; // 問題番号の初期化
	//score = 0; // スコアの初期化
	var Q = QuizNumber.length;
	while (Q) {
    var j = Math.floor( Math.random() * Q );
    var t = QuizNumber[--Q];
    QuizNumber[Q] = QuizNumber[j];
    QuizNumber[j] = t;
	}
	loadQuestion();
}

// 問題と選択肢を表示
function loadQuestion() {
	document.getElementById("quiz-container").style.display = "block";
	document.getElementById("answer-section").style.display = "none";
	document.getElementById("final-result").style.display = "none";

	// 問題番号を表示
	/*document.getElementById("question-number").textContent = `第 ${
      currentQuestion + 1
    } 問`;*/

	const questionData = currentQuiz[QuizNumber[i]];

	document.getElementById("question").textContent = questionData.question;
	const choicesContainer = document.getElementById("choices-container");
	choicesContainer.innerHTML = "";

	// 選択肢に番号を付ける
	questionData.choices.forEach((choice, index) => {
		const choiceDiv = document.createElement("div");
		choiceDiv.classList.add("choice");
		choiceDiv.textContent = `${index + 1}. ${choice.text}`; // 番号付きの選択肢
		choiceDiv.onclick = () => checkAnswer(index, questionData);
		choicesContainer.appendChild(choiceDiv);
	});
}

// 答えを確認
function checkAnswer(selected, questionData) {
	document.getElementById("quiz-container").style.display = "none";
	document.getElementById("answer-section").style.display = "block";

	const resultText = document.getElementById("answer-result");
	const choicesContainer = document.getElementById("choices-container");
	choicesContainer.innerHTML = ""; // クリアして選択肢を再描画

	// 正解・不正解のメッセージ表示
	if (selected === questionData.correct) {
		resultText.innerHTML = "<span class='correct'>正解！</span>";
		//score++;
		Right++;
		//localStorage.setItem("score", score);

	} else {
		resultText.innerHTML = "<span class='wrong'>不正解です。</span>";
		localStorage.setItem("score", score);
	}
	//currentQuestion++;
	i++;
	// 最終問題かどうかのチェック
	if (i === Questions) {
		if(Right === Questions){
			AnserQuestion++;
			localStorage.setItem("AnserQuestion",AnserQuestion);
			let test1 = localStorage.getItem("bit") || 0;
			let bit = Number(test1);
			bit = bit+1;
			localStorage.setItem("bit", bit);
		}
		document.getElementById("next-question").textContent = "結果を見る";
		setTimeout(() =>{
			const button = document.getElementById("next-question");
			button.click();
		},3000);
	} else {
		document.getElementById("next-question").textContent = "次の問題";
		setTimeout(() =>{
			const button = document.getElementById("next-question");
			button.click();
		},3000);
	}
}

// 次の問題へ
function nextQuestion() {
	if (i < Questions) {
		loadQuestion();
		document.getElementById("container").scrollIntoView({ behavior: "smooth" }); // containerにスクロール

	} else {
		showResult();
	}
}

//最終結果への遷移関数
function endCord(){
	if(AnserQuestion == totalQuestion){
		window.location.href = '../../clear.html'
	}
	else{
		window.location.href = '../../newquiz.html'
	}
}

// 結果を表示
function showResult() {
	document.getElementById("answer-section").style.display = "none";
	document.getElementById("final-result").style.display = "block";

	const percentage = (Right / Questions) * 100;
	document.getElementById("score").textContent = `正解数: ${Right}/${Questions} (${percentage.toFixed(2)}%)`;
			setTimeout(() =>{
			const button = document.getElementById("restart-quiz");
			button.click();
		},3000);
}

// もう一度遊ぶ
/*function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    initQuiz();
  }*/

// クイズ開始
initQuiz();
