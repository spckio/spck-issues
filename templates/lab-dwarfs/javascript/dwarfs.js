"use strict";
let dwarfCapacity = 1;
let dwarfSpeed = 10;
let speedFortress = 0.9;
let speedForest = 0.59;
let speedTreasure = 0.9;
let dwarfAle = false;
let dwarfPortal = false;
const cacheDwarfs = {};
class Dwarf {
    constructor() {
        this.pos = 0;
        this.prevPos = 0;
        this.gold = 0;
        this.purpose = 0 /* NONE */;
        this.turnBack = false;
        this.height = 70 /* groundLevel */;
        this.drunkSpeed = 0.1 - Math.random() * 0.05;
    }
    _render(palette, canvas) {
        for (let y = 0; y < B_DWARF.length; ++y) {
            for (let x = 0; x < 8; ++x) {
                const n = B_DWARF[y] >> 2 * (7 - x) & 0b11;
                if (n != 0b10) {
                    canvas.fillStyle = '#' + palette[n];
                    canvas.fillRect(3 /* B_SCALE */ * x, 3 /* B_SCALE */ * y, 3 /* B_SCALE */, 3 /* B_SCALE */);
                }
            }
        }
    }
    buf(palette) {
        return cacheDwarfs[palette[0]] ||
            (cacheDwarfs[palette[0]] = renderBuf(3 /* B_SCALE */ * 8, 3 /* B_SCALE */ * 11, this._render.bind(this, palette)));
    }
    advance() {
        this.prevPos = this.pos;
        const speed = dwarfSpeed * (this.pos < 230 ? speedFortress :
            (this.pos > 690 ? speedTreasure : speedForest));
        switch (this.purpose) {
            case 1 /* TREASURE */:
                this.turnBack = false;
                this.pos += speed;
                if (this.pos >= 2 * SCREEN_WIDTH) {
                    this.pos = 2 * SCREEN_WIDTH;
                    this.gold = dwarfCapacity;
                    this.purpose = 2 /* FORTRESS */;
                }
                break;
            case 2 /* FORTRESS */:
                this.turnBack = true;
                this.pos -= speed;
                if (this.pos <= 0) {
                    this.pos = 0;
                    updateGold(this.gold);
                    this.gold = 0;
                    this.purpose = 0 /* NONE */;
                    this.turnBack = false;
                }
                break;
            case 3 /* ALE */:
                if (Math.random() < 0.004)
                    this.turnBack = !this.turnBack;
                this.pos += this.drunkSpeed * (this.turnBack ? -speed : speed);
                if (this.pos < 250) {
                    this.pos = 250;
                    this.turnBack = false;
                }
                else if (this.pos > 670) {
                    this.pos = 670;
                    this.turnBack = true;
                }
                break;
        }
    }
    haveFun(setPos) {
        if (setPos) {
            this.pos = (0 | Math.random() * 420) + 250;
            this.prevPos = this.pos;
            this.turnBack = Math.random() < 0.5;
        }
        this.gold = 0;
        this.purpose = 3 /* ALE */;
        this.height = (0 | Math.random() * 35) + 50;
    }
}
const dwarfs = [];
let dwarfsWaiting = [];
function dwarfsFoundAle() {
    dwarfAle = true;
    dwarfs.forEach(dwarf => dwarf.haveFun(true));
}
function dwarfsNoAle() {
    dwarfAle = false;
    const survivors = dwarfs.filter(dwarf => dwarf.pos < 230 || dwarf.pos > 690).length;
    dwarfs.splice(0, dwarfs.length);
    for (let n = 0; n < Math.max(survivors, 3); ++n)
        dwarfs.push(new Dwarf);
    draftCost = 3;
    draftCostPrev = 2;
    $setContent('dwarf-count', dwarfs.length);
    $setContent('dwarf-cost', draftCost);
}
