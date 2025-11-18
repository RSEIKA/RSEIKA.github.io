let tokenizer;

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
        { text: "「轟の滝」と「大荒の滝」" },
        { text: "「岩屋の滝」" },
        { text: "「カツオのた滝」"},
        { text: "「しら滝」" },
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
		document.getElementById("next-question").innerHTML = `
        <ruby>結果<rt>けっか</rt></ruby>を<ruby>見る<rt>み</rt></ruby>
    `;
		setTimeout(() =>{
			const button = document.getElementById("next-question");
			button.click();
		},5000);
	} else {
		document.getElementById("next-question").innerHTML = `
        <ruby>次<rt>つぎ</rt></ruby>の<ruby>問題<rt>もんだい</rt></ruby>
    `;
		setTimeout(() =>{
			const button = document.getElementById("next-question");
			button.click();
		},5000);
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
function addRuby(text) {
  if (!tokenizer) return text;

  const tokens = tokenizer.tokenize(text);

  return tokens.map(token => {
    const surface = token.surface_form;

    // 1) surface に漢字（Han script）が含まれるか判定（Unicodeプロパティを使用）
    const hasKanji = /\p{Script=Han}/u.test(surface);

    // 2) 読みが存在するか、かつ表層と異なる場合
    const reading = token.reading || "";
    const hasReading = reading.length > 0 && reading !== surface;

    if (hasKanji && hasReading) {
      // kuromoji の reading はカタカナなのでひらがなに変換
      const hira = katakanaToHiragana(reading);
      return `<ruby>${escapeHtml(surface)}<rt>${escapeHtml(hira)}</rt></ruby>`;
    } else {
      // 漢字を含まない、または読みが無い／同じならそのまま返す
      return escapeHtml(surface);
    }
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
