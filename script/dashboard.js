
// for the  count we have to get the element first then we can do operation
// then i will get the card parent then i will make a function for counting the children length of the container .so i can show it on the total by changing the inner text
// at the same way i can do with others the idea is that i will create an array and push the element to it .
// then i will change the inner text of the count for every single push in the array the count will be increase or decrease



let totalCount=document.getElementById('total-job');
let totalInterviewCount=document.getElementById('total-interview');
let totalRejectionCount=document.getElementById('total-rejection');
// creating 2 array so we can push item on it and later we can count it and change the status of the count
let interviewList =[];
let rejectionList=[];
// this is for getting the parent container of cards to count the value of cards
const allCards =document.getElementById('all-card');

// writing a function counting the value

function Counter(){
//    console.log(allCards.children.length);
    totalCount.innerText=allCards.children.length;
    totalInterviewCount.innerText=interviewList.length;
    totalRejectionCount.innerText=rejectionList.length;

}

Counter()
