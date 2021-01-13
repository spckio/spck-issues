"use strict";
$click('btn-adventure', () => {
    if (dwarfsWaiting.length)
        dwarfsWaiting[0].purpose = 1 /* TREASURE */;
    if (started)
        return;
    try {
        audioInit().then(playLoop);
    }
    catch (err) {
    }
    started = true;
});
$click('btn-draft', () => {
    updateGold(-draftCost);
    updateDraftCost();
    dwarfs.push(new Dwarf);
    $setContent('dwarf-count', dwarfs.length);
    $('dwarf-plural').style.display = dwarfs.length == 1 ? 'none' : 'inline';
});
$click('btn-covfefe', () => {
    updateGold(-10);
    dwarfSpeed *= 1.2;
    $despawn('covfefe');
    $spawn('fasta');
});
$click('btn-fasta', () => {
    updateGold(-25);
    dwarfSpeed *= 1.1;
    $despawn('fasta');
});
$click('btn-autorun', () => {
    updateGold(-20);
    hasAutorun = true;
    $despawn('autorun');
    $spawn('turborun');
});
$click('btn-turborun', () => {
    updateGold(-30);
    autorunSpeed *= 0.5;
    $despawn('turborun');
    $spawn('speedrun');
});
$click('btn-speedrun', () => {
    updateGold(-40);
    autorunSpeed *= 0.5;
    $despawn('speedrun');
});
$click('btn-illuminate', () => {
    updateGold(-25);
    forest.palette = PAL_FOREST;
    forest.buf = bufForestLit;
    speedForest *= 1.3;
    $despawn('illuminate');
    setTimeout(() => {
        paused = true;
        forest.buf = bufForestKegs;
        dwarfsFoundAle();
        $spawnModal('kegs');
    }, 10000);
});
$click('btn-continue', () => {
    $despawnModal('kegs', () => {
        paused = false;
        $spawn('orbital');
    });
});
$click('btn-orbital', () => {
    paused = true;
    $spawnModal('nuke');
});
$click('btn-continue2', () => {
    $despawnModal('nuke', () => {
        $despawn('orbital');
        orbital(() => {
            dwarfsNoAle();
            forest.palette = PAL_WASTELAND;
            forest.buf = bufWasteland;
            paused = false;
            goldSpawn.push([10, 'develop']);
            updateGold(0);
        });
    });
});
$click('btn-develop', () => {
    updateGold(-20);
    forest.buf = bufWastelandRoad;
    speedForest *= 1.3;
    $despawn('develop');
    $spawn('develop2');
});
$click('btn-develop2', () => {
    updateGold(-25);
    forest.buf = bufWastelandAperture;
    dwarfCapacity = 2;
    $despawn('develop2');
    $spawn('genetic');
    goldSpawn.push([30, 'portal']);
    goldSpawn.push([60, 'delorean']);
    updateGold(0);
});
$click('btn-genetic', () => {
    updateGold(-30);
    dwarfCapacity = 3;
    $despawn('genetic');
});
$click('btn-portal', () => {
    updateGold(-60);
    renderPortal(bufFortress.getContext('2d'), 432 - 3 /* B_SCALE */ * 6, 70 /* groundLevel */ - 3 /* B_SCALE */, PAL_PORTAL_BLUE);
    renderPortal(bufFortressExit.getContext('2d'), 432 - 3 /* B_SCALE */ * 6, 70 /* groundLevel */ - 3 /* B_SCALE */, PAL_PORTAL_BLUE);
    renderPortal(bufTreasure.getContext('2d'), 32, 70 /* groundLevel */ - 3 /* B_SCALE */, PAL_PORTAL_ORANGE);
    dwarfPortal = true;
    $despawn('portal');
});
$click('btn-delorean', () => {
    updateGold(-90);
    fortress.buf = bufFortressExit;
    $despawn('delorean');
    $spawn('back');
});
$click('btn-back', () => {
    $despawn('back');
    setTimeout(() => {
        $despawn('treasure');
        setTimeout(() => {
            $despawn('forest');
            setTimeout(() => {
                $despawn('fortress');
                setTimeout(() => {
                    $despawn('title');
                    setTimeout(() => {
                        location.reload();
                    }, 300);
                }, 300);
            }, 300);
        }, 300);
    }, 10);
});
for (let btn of ['btn-adventure', 'btn-draft', 'btn-covfefe', 'btn-fasta', 'btn-autorun',
    'btn-turborun', 'btn-speedrun', 'btn-illuminate', 'btn-continue', 'btn-orbital',
    'btn-continue2', 'btn-develop', 'btn-develop2', 'btn-genetic', 'btn-portal',
    'btn-delorean', 'btn-back']) {
    $(btn).oncontextmenu = function (event) {
        event.preventDefault();
    };
}
const preventDoubleTapZoom = (delay) => {
    let beforeLastTouchStart = 0;
    let lastTouchStart = 0;
    document.addEventListener('touchstart', () => {
        beforeLastTouchStart = lastTouchStart;
        lastTouchStart = Date.now();
    });
    document.addEventListener('touchend', (event) => {
        const touchEnd = Date.now();
        if (touchEnd - beforeLastTouchStart < delay) {
            event.preventDefault();
        }
        const target = event.target;
        if (target && target.click) {
            target.click();
        }
    });
};
preventDoubleTapZoom(400);
