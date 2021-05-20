// ==UserScript==
// @name mai-acm-rating-js-script 
// @description 
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       vboyarkin
// @include mai2020.contest.codeforces.com/*/customrating/
// ==/UserScript==

(function () {
    const CONTEST = 3;
    const PRACTICE = 1;

    let guys_rows = document.querySelector('tbody').children;
    let guys_r1 = document.querySelector('thead').children[0];
    let guys_garbage = document.querySelector('thead').children[1];

    let th = document.createElement("th");
    guys_r1.insertBefore(th, guys_r1.children[1]);
    guys_garbage.insertBefore(document.createElement("th"), guys_garbage.children[0]);
    th.innerText = "Примерные баллы"

    let scores = [].map.call(guys_rows, row => {
        return [].reduce.call(row.children, (acc, cell) => {

            if (cell.classList.contains('overall-custom-rating-practice') && cell.classList.contains('overall-custom-rating-accepted')) return acc + PRACTICE;
            else if (cell.classList.contains('overall-custom-rating-contestant') && cell.classList.contains('overall-custom-rating-accepted')) return acc + CONTEST;

            return acc;
        }, 0);
    })

    let highest = Math.max.apply(null, scores);

    scores = scores.map(score => (score / highest) * 1.5);

    [].forEach.call(guys_rows, (row, i) => {
        let sc_td = document.createElement("td");
        sc_td.classList.toggle("left");
        row.insertBefore(sc_td, row.children[1]);
        let score = Math.round(scores[i] * 100) / 100;
        sc_td.innerText = score;
    })

    return scores

})()