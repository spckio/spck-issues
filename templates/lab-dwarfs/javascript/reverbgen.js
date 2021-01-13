"use strict";
if (typeof AudioContext == 'undefined') { // Safari
  window['AudioContext'] = window['webkitAudioContext'];
  window['OfflineAudioContext'] = window['webkitOfflineAudioContext'];
}

function randomInclusive() {
  return Math.floor(Math.random() * 0x20000000000000) / 0x1fffffffffffff;
}

function getChannelData(buf) {
  const channels = [];
  for (let a = 0; a < buf.numberOfChannels; ++a) {
    channels[a] = buf.getChannelData(a);
  }
  return channels;
}

function applyGradualLowpass(buf, lpFreqStart, lpFreqEnd, lpFreqEndAt, done) {
  if (!lpFreqStart) {
    done(buf);
    return;
  }
  lpFreqStart = Math.min(lpFreqStart, 0.5 * buf.sampleRate);
  lpFreqEnd = Math.min(lpFreqEnd, 0.5 * buf.sampleRate);
  const channels = getChannelData(buf);
  const audioContext = new OfflineAudioContext(buf.numberOfChannels, channels[0].length, buf.sampleRate);
  const player = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  filter.type = 'lowpass';
  filter.Q.value = 0.0001;
  filter.frequency.setValueAtTime(lpFreqStart, 0);
  filter.frequency.linearRampToValueAtTime(lpFreqEnd, lpFreqEndAt);
  filter.connect(audioContext.destination);
  player.buffer = buf;
  player.connect(filter);
  player.start();
  audioContext.oncomplete = function(event) {
    done(event.renderedBuffer);
  };
  audioContext.startRendering();
}

function generateReverb(options, done) {
  const audioContext = options.audioContext || new AudioContext;
  const sampleRate = options.sampleRate || audioContext.sampleRate;
  const channels = options.channels || 2;
  const length = 1.5 * options.decay;
  const lengthFrames = Math.ceil(sampleRate * length);
  const fadeInFrames = Math.ceil(sampleRate * options.fadeIn);
  const decayFrames = Math.ceil(sampleRate * options.decay);
  const decayBase = Math.pow(0.001, 1 / decayFrames);
  const buf = audioContext.createBuffer(channels, lengthFrames, sampleRate);
  for (let a = 0; a < channels; ++a) {
    const chan = buf.getChannelData(a);
    for (let b = 0; b < lengthFrames; ++b) {
      chan[b] = (2 * randomInclusive() - 1) * Math.pow(decayBase, b);
    }
    for (let b = 0; b < fadeInFrames; ++b) {
      chan[b] *= b / fadeInFrames;
    }
  }
  applyGradualLowpass(buf, options.lpFreqStart, options.lpFreqEnd, options.decay, done);
}
