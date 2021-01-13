"use strict";
const TEMPO_MUL = 120 / 118;
function noteFreq(n) {
    return 440 * Math.pow(2, (n - 69) / 12);
}
let ac;
let out;
let songStart;
function audioInit() {
    ac = new AudioContext;
    out = ac.createGain();
    out.gain.value = 0.4;
    return reverb();
}
function playNote(n, start, end) {
    const freq = noteFreq(n);
    start *= TEMPO_MUL;
    end *= TEMPO_MUL;
    const osc = ac.createOscillator();
    osc.type = 'square';
    osc.frequency.value = freq;
    decay(osc, start).connect(out);
    osc.start(songStart + start);
    osc.stop(songStart + end);
}
function decay(osc, start) {
    const env = ac.createGain();
    env.gain.setValueAtTime(0.5, songStart + start);
    env.gain.exponentialRampToValueAtTime(0.00001, songStart + start + 1.5 * TEMPO_MUL);
    osc.connect(env);
    return env;
}
/* --- Experimental --- */
function reverb() {
    const conv = ac.createConvolver();
    const dry = ac.createGain();
    const wet = ac.createGain();
    dry.gain.value = 2 / 3;
    wet.gain.value = 1 / 3;
    out.connect(conv);
    out.connect(dry);
    conv.connect(wet);
    dry.connect(ac.destination);
    wet.connect(ac.destination);
    return new Promise(function (resolve) {
        generateReverb({
            audioContext: ac,
            fadeIn: 0.00001,
            decay: 1.5 * TEMPO_MUL,
            lpFreqStart: 16000,
            lpFreqEnd: 1000,
        }, function (buf) {
            conv.buffer = buf;
            resolve();
        });
    });
}
