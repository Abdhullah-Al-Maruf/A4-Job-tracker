
// for the  count we have to get the element first then we can do operation
// then i will get the card parent then i will make a function for counting the children length of the container .so i can show it on the total by changing the inner text
// at the same way i can do with others the idea is that i will create an array and push the element to it .
// then i will change the inner text of the count for every single push in the array the count will be increase or decrease

// creating 2 array so we can push item on it and later we can count it and change the status of the count
let interviewList = [];
let rejectionList = [];


let totalCount = document.getElementById('total-job');
let totalCountTwo = document.getElementById('job-count-two');
let totalInterviewCount = document.getElementById('total-interview');
let totalRejectionCount = document.getElementById('total-rejection');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewBtn = document.getElementById('filter-interview-btn');
const rejectedBtn = document.getElementById('filter-rejected-btn');
const mainContainer = document.querySelector('main');
// after pushing the element we have to show the card in somewhere so we create a section
const filteredSectionInfo = document.getElementById('filtered-section')


// this is for getting the parent container of cards to count the value of cards
const allCards = document.getElementById('all-card');



// writing a function counting the value

function Counter() {
    totalCount.innerText = allCards.children.length;
    totalCountTwo.innerText = allCards.children.length;
    totalInterviewCount.innerText = interviewList.length;
    totalRejectionCount.innerText = rejectionList.length;

}
Counter()

// for toggling btn
// this is also we use onclick in the html work as add event listener
// now we remove the btn bg and add the color upon  click to the color
function toggleStyle(id) {
    allFilterBtn.classList.remove('btn-info');
    interviewBtn.classList.remove('btn-info');
    rejectedBtn.classList.remove('btn-info');


    const selected = document.getElementById(id);

    const currentStatus = id;

    selected.classList.add('btn-info');
    //this is for btn toggle info hide and show
    if (id == 'filter-interview-btn') {
        allCards.classList.add('hidden');
        filteredSectionInfo.classList.remove('hidden')

    } else if (id == "all-filter-btn") {
        allCards.classList.remove('hidden');
        filteredSectionInfo.classList.add('hidden')
    } else if (id == "filter-rejected-btn") {
        allCards.classList.add('hidden');
        filteredSectionInfo.classList.remove('hidden')
    }




}


// for interview and reject btn
// the parameter event and target is means where i click show the just the value of  that place
mainContainer.addEventListener('click', function (event) {
    // for testing
    // console.log(event.target.classList.contains('interview-btn'));

    if (event.target.classList.contains('interview-btn')) {
        //we will go to the main parent and gather information  and make a object then push it on the array        
        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.company-name').innerText;
        const companyPosition = parentNode.querySelector('.position').innerText;
        const companySalary = parentNode.querySelector('.salary').innerText;
        const applicationStatus = parentNode.querySelector('.application-status').innerText;
        const responsibility = parentNode.querySelector('.role-description').innerText;
        parentNode.querySelector('.application-status').innerText = 'Interviewed';
        //   now i will make an object using the info 
        const cardInfo = {
            companyName,
            companyPosition,
            companySalary,
            applicationStatus: 'Interviewed',
            responsibility
        }
        // now i will check for not add the same info many time
        const infoExist = interviewList.find(info => info.companyName == cardInfo.companyName)
        // because we click on  interviewBtn so we will change the status  to interviewed
        if (!infoExist) {
            interviewList.push(cardInfo);

        }
        rejectionList = rejectionList.filter(item => item.companyName != cardInfo.companyName)
        renderingInterview();
        Counter();

    } else if (event.target.classList.contains('rejected-btn')) {
        //we will go to the main parent and gather information  and make a object then push it on the array        
        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.company-name').innerText;
        const companyPosition = parentNode.querySelector('.position').innerText;
        const companySalary = parentNode.querySelector('.salary').innerText;
        const applicationStatus = parentNode.querySelector('.application-status').innerText;
        const responsibility = parentNode.querySelector('.role-description').innerText;
        parentNode.querySelector('.application-status').innerText = 'Rejected';
        //   now i will make an object using the info 
        const cardInfo = {
            companyName,
            companyPosition,
            companySalary,
            applicationStatus: 'Rejected',
            responsibility
        }
        // now i will check for not add the same info many time
        const infoExist = rejectionList.find(info => info.companyName == cardInfo.companyName)
        // because we click on  interviewBtn so we will change the status  to interviewed
        if (!infoExist) {
            rejectionList.push(cardInfo);
        }
        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName)
        renderingRejection();
        Counter();


    }
})




// now i will create html inside the section
function renderingInterview() {


    filteredSectionInfo.innerHTML = ''

    for (let item of interviewList) {
        console.log(item);
        let div = document.createElement('div');
        div.className = 'flex flex-col md:flex-row lg:justify-between rounded-md p-6 shadow mb-4 '
        div.innerHTML = `
       <!-- main part-1 -->
                
                <div class="space-y-5  ">
                    <div>
                        <h3 class=" company-name text-xl font-bold text-neutral">${item.companyName}</h3>
                        <p class=" position text-gray-500">${item.companyPosition}</p>
                    </div>
                    <p class= " salary text-gray-500">${item.companySalary}</p>
                    <div class="space-y-2">
                        <div class="bg-gray-200 text-neutral max-w-[125px] py-2 px-3 rounded-md text-center">
                            <p class="application-status text-neutral font-semibold">${item.applicationStatus}</p>
                        </div>
                        <p class="role-description"> ${item.responsibility}</p>
                    </div>
                    <div class="mb-3 md:mb-0">
                        <button class="btn interview-btn  btn-outline btn-success">INTERVIEW</button>
                        <button class="btn rejected-btn btn-outline btn-error">REJECTED</button>
                    </div>

                </div>
                <!-- main part-2 -->
                <div  class="shrink-0"><button class="  btn  p-3 rounded-full">
                        <img src="icon/Trash.png" alt="" ></button></div>
      `
        filteredSectionInfo.appendChild(div);
    }

}
// now i will create html inside the section
function renderingRejection() {


    filteredSectionInfo.innerHTML = ''

    for (let item of rejectionList) {
        console.log(item);
        let div = document.createElement('div');
        div.className = 'flex flex-col md:flex-row lg:justify-between rounded-md p-6 shadow mb-4 '
        div.innerHTML = `
       <!-- main part-1 -->
                
                <div class="space-y-5  ">
                    <div>
                        <h3 class=" company-name text-xl font-bold text-neutral">${item.companyName}</h3>
                        <p class=" position text-gray-500">${item.companyPosition}</p>
                    </div>
                    <p class= " salary text-gray-500">${item.companySalary}</p>
                    <div class="space-y-2">
                        <div class="bg-gray-200 text-neutral max-w-[125px] py-2 px-3 rounded-md text-center">
                            <p class="application-status text-neutral font-semibold">${item.applicationStatus}</p>
                        </div>
                        <p class="role-description"> ${item.responsibility}</p>
                    </div>
                    <div class="mb-3 md:mb-0">
                        <button class="btn interview-btn  btn-outline btn-success">INTERVIEW</button>
                        <button class="btn rejected-btn btn-outline btn-error">REJECTED</button>
                    </div>

                </div>
                <!-- main part-2 -->
                <div  class="shrink-0"><button class="  btn  p-3 rounded-full">
                        <img src="icon/Trash.png" alt="" ></button></div>
      `
        filteredSectionInfo.appendChild(div);
    }

}