var UserInterface = (function () {

    Snake.init();
    Snake.setup.keyboard(false);
    Snake.setup.wall(false);
    Snake.setup.fixedTail(false);

    const defaultFPS = 8;
    QLearning.run();
    QLearning.changeSpeed(4);
    QLearning.changeFPS(defaultFPS);

    /// EASTER EGG ///
    document.addEventListener('keyup', KonamiCode);
    var konamiOrder = [38,38,40,40,37,39,37,39,66,65];
    var konamiIndex = 0;

    function KonamiCode (evt) {
        if(konamiOrder[konamiIndex] == evt.keyCode){
            konamiIndex++
        }
        else {
            konamiIndex = 0;
        }

        if (konamiIndex == konamiOrder.length) {
            document.removeEventListener('keyup', KonamiCode);
            QLearning.stop();
            Snake.setup.keyboard(true);
            Snake.setup.tileCount(20);
            Snake.setup.fixedTail(false);
            Snake.reset();
            Snake.start();
        }
    }
    ///

    var btnTrain = document.getElementById('btnTrain');
    var btnReset = document.getElementById('btnReset');
    btnTrain.addEventListener('click', speedFaster);
    btnReset.addEventListener('click', resetSnake);

    var infoScore = document.getElementById('score');
    var infoMissed = document.getElementById('missed');

    var rangerLR = document.getElementById('rangeLR');
    var rangerDF = document.getElementById('rangeDF');
    var rangerRandom = document.getElementById('rangeRandom');
    var checkboxFullSet = document.getElementById('fullSet');

    setInterval(loop, 100);

    function loop () {
        infoScore.innerHTML = 'scored: <b>' + QLearning.info.score() + (QLearning.info.score() == 1 ? ' point' : ' points') + '</b>';
        infoMissed.innerHTML = 'died: <b>' + Math.abs(QLearning.info.missed()) + (Math.abs(QLearning.info.missed()) == 1 ? ' time' : ' times') + '</b>';

        QLearning.changeConst.LearningRate(0.01*rangerLR.value);
        QLearning.changeConst.DiscountFactor(0.01*rangerDF.value);
        QLearning.changeConst.Randomization(0.01*rangerRandom.value);
        QLearning.changeConst.FullSetOfStates(checkboxFullSet.checked);
    }

    async function resetSnake () {
        // await speedSlower();
        // Snake.reset();
        QLearning.stop();
        QLearning.reset();
        Snake.reset();
        Snake.clearTopScore();
        await speedSlower();
    }

    async function speedFaster () {
        modifyingThreads = true;

        rangerLR.disabled = true;
        rangerDF.disabled = true;
        rangerRandom.disabled = true;
        checkboxFullSet.disabled = true;

        QLearning.stop();
        QLearning.startTrain();
        btnTrain.innerHTML = '&vert; &vert; TRAIN';
        btnTrain.removeEventListener('click', speedFaster);
        btnTrain.addEventListener('click', speedSlower);
        modifyingThreads = false;
    }

    async function speedSlower () {
        modifyingThreads = true;
        QLearning.stopTrain();
        QLearning.changeFPS(defaultFPS);

        rangerLR.disabled = false;
        rangerDF.disabled = false;
        rangerRandom.disabled = false;
        checkboxFullSet.disabled = false;
        btnTrain.innerHTML = '&#9654; TRAIN';

        btnTrain.removeEventListener('click', speedSlower);
        btnTrain.addEventListener('click', speedFaster);
        modifyingThreads = false;
    }

})();
