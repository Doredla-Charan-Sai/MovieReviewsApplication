let movieInputElement = document.getElementById('movie-name');
let reviewInputElement = document.getElementById('review-txt');
let addBtnElement = document.getElementById('add-btn');
let saveBtnElement = document.getElementById('save-btn');
let clearBtnElement = document.getElementById('clear-btn');
let listContElement = document.getElementById('movies-list');

function fetchList(){
    let result = localStorage.getItem('moviesList');
    if(result===null) return [];
    else  return JSON.parse(result);
}

let movieReviewsList = fetchList();

saveBtnElement.onclick = function(){
    localStorage.setItem('moviesList',JSON.stringify(movieReviewsList));
    movieInputElement.value = "";
    reviewInputElement.value = "";
}

function deleteReview(objectNo){
    let deleteElement = movieReviewsList.findIndex(function(each){
        if(each.uniqueNo===objectNo) return true;
        else return false;
    });
    movieReviewsList.splice(deleteElement-1,1);
}

function createAndAppend(newReview){
    let listId = "li"+ newReview.uniqueNo;
    let listElement = document.createElement('li');
    listElement.classList.add('list-element');
    listElement.id = listId;
    
    let movieHead = document.createElement('h1');
    movieHead.classList.add('movie-head');
    movieHead.textContent = newReview.name;
    listElement.appendChild(movieHead);

    let reviewPara = document.createElement('p');
    reviewPara.classList.add('review-para');
    reviewPara.textContent = newReview.review;
    listElement.appendChild(reviewPara);

    let deleteIconContainer = document.createElement('div');
    deleteIconContainer.classList.add('delete-icon-cont');
    let deleteIconElement = document.createElement('i');
    deleteIconElement.classList.add("fa-sharp", "fa-solid", "fa-trash", 'delete');
    deleteIconContainer.appendChild(deleteIconElement);
    listElement.appendChild(deleteIconContainer);

    deleteIconElement.onclick = function(){
        deleteReview(newReview.uniqueNo);
        let item = document.getElementById(listId);
        listContElement.removeChild(item);
    }

    listContElement.appendChild(listElement);
}

for(let each of movieReviewsList){
    createAndAppend(each);
}

clearBtnElement.onclick = function(){
    movieInputElement.value = "";
    reviewInputElement.value = "";
    listContElement.textContent = "";
    movieReviewsList = [];
    localStorage.removeItem('moviesList');
}

addBtnElement.onclick = function(){
    let itemsLength = movieReviewsList.length;
    if(movieInputElement.value==="" && reviewInputElement.value===""){
        alert("Enter Movie and Review");
    }else if(movieInputElement.value==="" && reviewInputElement.value!=""){
        alert("Enter Movie name")
    }else if(movieInputElement.value!="" && reviewInputElement.value===""){
        alert("Enter review also");
    }else{
        let reviewObject = {
            uniqueNo: itemsLength,
            name: movieInputElement.value,
            review: reviewInputElement.value
        }
        itemsLength++;
        movieReviewsList.push(reviewObject);
        createAndAppend(reviewObject);
        movieInputElement.value = "";
        reviewInputElement.value = "";
    }
}