"use strict";
let paused = false;
const startMainloop = (function () {
    const T = 0.02;
    let then = -1;
    let t = 0;
    function mainloop(now) {
        requestAnimationFrame(mainloop);
        if (paused) {
            then = -1;
            return;
        }
        if (then == -1) {
            then = now;
        }
        t += (now - then) * 0.001;
        then = now;
        while (t > 0) {
            t -= T;
            update(T);
        }
        render(t / T + 1);
    }
    function startMainloop() {
        requestAnimationFrame(mainloop);
    }
    return startMainloop;
})();
