let tokenizer;
(function(){
function initKuromojiAndQuiz() {
  kuromoji.builder({ dicPath: "../../dict/" }).build(function(err, t) {
    if (err) {
      console.error(err);
      return;
    }
    tokenizer = t;
    console.log("Kuromoji ready ✅");

    // Kuromoji 初期化後にクイズを開始
    loadQuestion();
  });
}
// ルビ付け関数
function addRuby(text) {
  if (!tokenizer) return text;
  const tokens = tokenizer.tokenize(text);
  return tokens.map(token => {
    if (token.reading && token.surface_form !== token.reading) {
      return `<ruby>${token.surface_form}<rt>${token.reading}</rt></ruby>`;
    } else {
      return token.surface_form;
    }
  }).join('');
}

const quizData = [
	{
		question: "[やなせライオン]やなせライオンが見守ってきたのはどこかな？",
		choices: [
			{ text: "なんこく町" },
			{ text: "あんぱん町" },
			{ text: "御免町" },
			{ text: "ばいきん町" },
		],
		correct: 2,
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
let QuizNumber = [0];
let i = 0;
const Questions = 1;
const totalQuestion = localStorage.getItem("totalQuestion");
// 初期化

// 問題と選択肢を表示
function loadQuestion() {
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("answer-section").style.display = "none";
  document.getElementById("final-result").style.display = "none";

  const questionData = quizData[i];

  // 問題文にルビを付けて表示
  document.getElementById("question").innerHTML = addRuby(questionData.question);

  // 選択肢表示
  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = "";
  questionData.choices.forEach((choice, index) => {
    const choiceDiv = document.createElement("div");
    choiceDiv.classList.add("choice");
    // ここを変更：textContent -> innerHTML にして addRuby() の結果を入れる
    choiceDiv.innerHTML = `${index + 1}. ${addRuby(choice.text)}`;
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
		resultText.innerHTML = "<span class='correct'> <ruby>正解<rt>せいかい</rt></ruby>！</span>";
		//score++;
		Right++;
		//localStorage.setItem("score", score);

	} else {
		resultText.innerHTML = "<span class='wrong'><ruby>不正解<rt>ふせいかい</rt></ruby>です。</span>";
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
		setTimeout(() =>{
      endCord();
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
function endCord() {
  const gasUrl = "https://script.google.com/macros/s/AKfycby-9lUW73-r32G7pmNsPAkSIz6yR6bDBGk3S5HNbnXuvWbWJcjm97tMQKdXlF8sYXN3/exec";

  if (AnserQuestion == totalQuestion) {
    // A: クリア画面に行くときだけカウントする
    fetch(gasUrl).finally(() => {
      window.location.href = '../../clear.html';
    });
  } else {
    // B: クリアじゃないときはカウントせずに移動だけ
    window.location.href = '../../newquiz.html';
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
		},5000);
}


window.onload = () => {
  initKuromojiAndQuiz();
};
// ---------- 補助: カタカナ -> ひらがな ----------
function katakanaToHiragana(str) {
  // カタカナ（U+30A1 .. U+30F3）をひらがな（U+3041 .. U+3093）に変換。
  // 長音符（ー U+30FC）などはそのまま残す。
  return Array.from(str).map(ch => {
    const code = ch.charCodeAt(0);
    // カタカナ範囲のうち対応するひらがながあるコードだけ変換
    if (code >= 0x30A1 && code <= 0x30F3) {
      return String.fromCharCode(code - 0x60);
    }
    return ch;
  }).join('');
}

// ---------- ルビ付け関数（漢字のみ、ひらがな表記のルビ） ----------
// ---------- ルビ付け関数（漢字部分のみに限定） ----------
function addRuby(text) {
  if (!tokenizer) return text;

  const tokens = tokenizer.tokenize(text);

  return tokens.map(token => {
    const surface = token.surface_form;
    const readingRaw = token.reading ? katakanaToHiragana(token.reading) : "";

    // 漢字が含まれていない、または読みがない場合はそのまま返す
    if (!/\p{Script=Han}/u.test(surface) || !readingRaw || surface === readingRaw) {
      return escapeHtml(surface);
    }

    // --- ここから「送り仮名」を分離する最小限の処理 ---
    let s = surface.length - 1;
    let r = readingRaw.length - 1;

    // お尻の文字が一致している間（送り仮名）は、ルビに含めないように削る
    while (s >= 0 && r >= 0 && surface[s] === readingRaw[r] && !/\p{Script=Han}/u.test(surface[s])) {
      s--;
      r--;
    }

    const kanjiPart = surface.substring(0, s + 1);
    const readingPart = readingRaw.substring(0, r + 1);
    const okuriganaPart = surface.substring(s + 1);

    return `<ruby>${escapeHtml(kanjiPart)}<rt>${escapeHtml(readingPart)}</rt></ruby>${escapeHtml(okuriganaPart)}`;
  }).join('');
}

// 必要ならHTMLエスケープ（トークンに <> 等が入る可能性を防ぐ）
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[c]);
}
window.nextQuestion = nextQuestion;
window.endCord = endCord;
})();
