"use strict";
const goldSpawn = [
    [10, 'autorun'],
    [20, 'illuminate'],
];
let totalGold = 0;
let draftCost = 1;
let draftCostPrev = 1;
function updateButtons() {
    $setEnabled('btn-draft', totalGold >= draftCost);
    $setEnabled('btn-covfefe', totalGold >= 10);
    $setEnabled('btn-autorun', totalGold >= 20);
    $setEnabled('btn-develop', totalGold >= 20);
    $setEnabled('btn-fasta', totalGold >= 25);
    $setEnabled('btn-illuminate', totalGold >= 25);
    $setEnabled('btn-develop2', totalGold >= 25);
    $setEnabled('btn-turborun', totalGold >= 30);
    $setEnabled('btn-genetic', totalGold >= 30);
    $setEnabled('btn-speedrun', totalGold >= 40);
    $setEnabled('btn-portal', totalGold >= 60);
    $setEnabled('btn-delorean', totalGold >= 90);
}
function updateGold(n) {
    if (totalGold == 0) { // First update
        $('gold-title').style.display = 'inline';
        $spawn('draft');
        $spawn('covfefe');
    }
    totalGold += n;
    while (goldSpawn.length && totalGold >= goldSpawn[0][0]) {
        $spawn(goldSpawn[0][1]);
        goldSpawn.shift();
    }
    $setContent('gold-count', totalGold);
    updateButtons();
}
function updateDraftCost() {
    let t = draftCost;
    draftCost += draftCostPrev;
    draftCostPrev = t;
    $setContent('dwarf-cost', draftCost);
    updateButtons();
}
