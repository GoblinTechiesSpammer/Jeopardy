//Global constant variables, initially hardcoded.

const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;



// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];



/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

//I added "await" to the function because I don't know how I would do it otherwise.

async function getCategoryIds() {

    let response = await axios.get("https://jservice.io/api/categories", {params : {count : 100}});
    //Don't know how many categories there are otherwise I'd add a random offset
    //parameter to start the request from a random point in the data and have
    //acess to ALL of the categories in the api rather than just the first 100.

    console.log(_.shuffle(response.data));

    let categoryIds = _.shuffle(response.data.map(function(item){
        return item.id;
    }));

    console.log(categoryIds);

    return categoryIds.slice(0, NUM_CATEGORIES);
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    let response = await axios.get("https://jservice.io/api/category", {params : {id : catId}});
    console.log(response.data);

    return _.pick(response.data, ['title', 'clues']);
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

function fillTable() {
    $("#jeopardy thead").append("<tr></tr>");
    for (let i = 0; i < NUM_CATEGORIES; i++) {
        $("#jeopardy thead tr").append("<td></td>");
    }

    for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++) {
        $("#jeopardy tbody").append("<tr></tr>");
        for (let j = 0; j < NUM_CATEGORIES; j++) {
            $("#jeopardy tbody:last-child").append("<td></td>");
        }
    }

    for (let td of document.querySelectorAll("tbody td")){          //IDK how to do this with jQuery
        td.innerText = "?";
    }
    
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO