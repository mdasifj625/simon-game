const buttonColor = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let start = false;
let level = 0;

$(document).keydown(function (event) {
	if (!start) {
		$('#level-title').text('Level ' + level);
		nextSequence();
		start = true;
	}
});

$('.btn').click(function () {
	const userChosenColor = $(this).attr('id');
	userClickedPattern.push(userChosenColor);
	playSound(userChosenColor);
	animatePress(userChosenColor);
	checkAnswer(userClickedPattern.length - 1);
});

// **********functions****************

function playSound(src) {
	const audio = new Audio('sounds/' + src + '.mp3');
	audio.play();
}

function nextSequence() {
	userClickedPattern = [];
	level++;
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColor = buttonColor[randomNumber];

	gamePattern.push(randomChosenColor);
	$('#' + randomChosenColor)
		.fadeOut(100)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);
	$('#level-title').text('Level ' + level);
	playSound(randomChosenColor);
}

function animatePress(currentColor) {
	$('#' + currentColor).addClass('pressed');
	setTimeout(function () {
		$('#' + currentColor).removeClass('pressed');
	}, 100);
}

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound('wrong');
		$('body').addClass('game-over');
		setTimeout(function () {
			$('body').removeClass('game-over');
		}, 200);
		$('#level-title').text('Game Over, Press Any Key to Restart');
		startOver();
	}
}

function startOver() {
	start = false;
	gamePattern = [];
	level = 0;
}
