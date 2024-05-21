// TODO: add client side code for single page application
let addOn = '';

function main() {
    const filterBtn = document.getElementById('filterBtn'); 
    filterBtn.addEventListener('click', handleFilter);
    const addBtn = document.getElementById('addBtn'); 
    addBtn.addEventListener('click', handleClick);
    loadReviews();
}

async function handleClick(evt){
    evt.preventDefault();
    const name = document.querySelector('#name').value;
    const semester = document.querySelector('#semester').value;
    const year = document.querySelector('#year').value;
    const review = document.querySelector('#review').value;

    const config = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({name: name, semester: semester, year: year, review: review})
    };

    addOn = '';
    const res = await fetch("http://localhost:3000/api/reviews", config);
    const data = await res.json();
    addReviewsToPage(data);
}

async function handleFilter(evt) {
    evt.preventDefault();
    const semester = document.querySelector('#filterSemester').value;
    const year = document.querySelector('#filterYear').value;
    addOn = '';
    if(semester && year){
        addOn = '?semester=' + semester + '&year=' + year;
    } else if(semester){
        addOn = '?semester=' + semester;
    } else if(year){
        addOn =  '?year=' + year;
    }
}

async function loadReviews() {
    const res = await fetch('http://localhost:3000/api/reviews' + addOn);
    const data = await res.json();
    addReviewsToPage(data);
    setTimeout(loadReviews, 500);
}
  
function addReviewsToPage(reviews) {
    tbody = document.getElementById('content').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    for(const rev of reviews) {
        const row = tbody.insertRow();
        for(const d in rev){
            var cell = row.insertCell();
            var text = document.createTextNode(rev[d]);
            cell.appendChild(text);
        }
    }
}

document.addEventListener("DOMContentLoaded", main);
