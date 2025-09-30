const quizData = [
	{
		question: "[ごめん　えきお君]ごめんえきお君は駅で働くひとがモチーフだよ.次のうちどれかな？",
		choices: [
			{ text: "警察官さん" },
			{ text: "駅員さん" },
			{ text: "消防士さん" },
			{ text: "運転手さん" },
		],
		correct: 1,
	},

	{
		question: "[ごめん　まちこさん]今も高知を走っている路面電車には外国からきたものがあるんだどこの国から来たものかな？",
		choices: [
			{ text: "ポルトガル" },
			{ text: "オーストラリア" },
			{ text: "イギリス" },
			{ text: "ドイツ" },
		],
		correct: 0,
	},

	{
		question: "[たてだ　そらこちゃん]たてだ　そらこちゃんは働く女性がモチーフなんだ　どの職業がモチーフかな？",
		choices: [
			{ text: "秘書" },
			{ text: "搭乗員" },
			{ text: "事務員" },
			{ text: "パティシエ" },
		],
		correct: 1,

	},
	
	{
		question: "[のいち　どんまん]のいちどんまんのモチーフになっているコンクールは次のうちどれかな？",
		choices: [
			{ text: "ちんどんコンクール" },
			{ text: "どんちゃんコンクール" },
			{ text: "しくしくコンクール" },
			{ text: "ごろごろコンクール" },
		],
		correct: 0,
		
	},

	{
		question: "[よしかわ　うなお君]よしかわ　うなお君はとある魚がモチーフなんだ　次のうちどれかな？",
		choices: [
			{ text: "なまず" },
			{ text: "うつぼ" },
			{ text: "あなご" },
			{ text: "うなぎ" },
		],
		correct: 3,
		
	},
	
	{
		question: "[あかおか　えきんさん]えきんさんのモチーフ、弘瀬金蔵さんは通称でなんと呼ばれていたかな？？",
		choices: [
			{ text: "弘金" },
			{ text: "絵金" },
			{ text: "瀬金" },
			{ text: "蔵金" },
		],
		correct: 1,
		
	},

	{
		question: "[かがみ　みかんちゃん]かがみ　みかんちゃんは高知県で人気のみかんがモチーフなんだ　次のうちどれかな？",
		choices: [
			{ text: "山南みかん" },
			{ text: "川北みかん" },
			{ text: "山北みかん" },
			{ text: "川南みかん" },
		],
		correct: 2,
		
	},

	{
		question: "[やす　にんぎょちゃん]にんぎょちゃんのモチーフになっている「ミス・マーメイドコンテスト」はどこで開催されているかな？",
		choices: [
			{ text: "ヤ・スイパーク" },
			{ text: "タ・スイパーク" },
			{ text: "ヤ・シィパーク" },
			{ text: "ス・ギィパーク" },
		],
		correct: 2,
		
	},
];

let currentQuiz = quizData; // 全問題をそのまま使用
let currentQuestion = 0;
let Charscore = localStorage.getItem("score") || 0;
let score = Number(Charscore);
let CharAnserQuestion = localStorage.getItem("AnserQuestion") || 0;
let AnserQuestion = Number(CharAnserQuestion);
let Right = 0;
let QuizNumber = [0,1,2,3,4,5,6,7];
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
			bit = bit+2;
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