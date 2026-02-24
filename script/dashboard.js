
// for the  count we have to get the element first then we can do operation
// then i will get the card parent then i will make a function for counting the children length of the container .so i can show it on the total by changing the inner text
// at the same way i can do with others the idea is that i will create an array and push the element to it .
// then i will change the inner text of the count for every single push in the array the count will be increase or decrease

// creating 2 array so we can push item on it and later we can count it and change the status of the count
let interviewList =[];
let rejectionList=[];

let totalCount=document.getElementById('total-job');
let totalInterviewCount=document.getElementById('total-interview');
let totalRejectionCount=document.getElementById('total-rejection');

const allFilterBtn=document.getElementById('all-filter-btn');
const interviewBtn=document.getElementById('interview-btn');
const rejectedBtn=document.getElementById('rejected-btn');
const mainContainer=document.querySelector('main');


// this is for getting the parent container of cards to count the value of cards
const allCards =document.getElementById('all-card');



// writing a function counting the value

function Counter(){
    totalCount.innerText=allCards.children.length;
    totalInterviewCount.innerText=interviewList.length;
    totalRejectionCount.innerText=rejectionList.length;

}
Counter()

// for toggling btn
// this is also we use onclick in the html work as add event listener
// now we remove the btn bg and add the color upon  click to the color
function toggleStyle(id){
    allFilterBtn.classList.remove('btn-info');
    interviewBtn.classList.remove('btn-info');
    rejectedBtn.classList.remove('btn-info');


    const selected =document.getElementById(id);
    selected.classList.add('btn-info');

}


// for interview and reject btn
// the parameter event and target is means where i click show the just the value of  that place
mainContainer.addEventListener('click',function (event){
    //we will go to the main parent and gather information  and make a object then push it on the array        
  const parentNode = event.target.parentNode.parentNode;
  const companyName =parentNode.querySelector('.company-name').innerText;
  const companyPosition=parentNode.querySelector('.position').innerText;
  const companySalary =parentNode.querySelector('.salary').innerText;
  const applicationStatus =parentNode.querySelector('.application-status').innerText;
  const responsibility =parentNode.querySelector('.role-description').innerText;

//   now i will make an object using the info 
const cardInfo={
    companyName,
    companyPosition,
    companySalary,
    applicationStatus,
    responsibility
}
// now i will check for not add the same info many time
const infoExist=interviewList.find(info => info.companyName == cardInfo.companyName)
if(!infoExist){
    interviewList.push(cardInfo);
    
}
// console.log(interviewList);
  
})
// after pushing the element we have to show the card in somewhere so we create a section
const filteredSectionInfo=document.getElementById('filtered-section')

// now i will create html inside the section