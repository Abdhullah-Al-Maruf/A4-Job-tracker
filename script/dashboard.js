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

    // const currentStatus = id;

    selected.classList.add('btn-info');
    //this is for btn toggle info hide and show
    if (id == 'filter-interview-btn') {
        allCards.classList.add('hidden');
        filteredSectionInfo.classList.remove('hidden')
        renderingInterview(); 

    } else if (id == "all-filter-btn") {
        allCards.classList.remove('hidden');
        filteredSectionInfo.classList.add('hidden')
    } else if (id == "filter-rejected-btn") {
        allCards.classList.add('hidden');
        filteredSectionInfo.classList.remove('hidden')
        renderingRejection(); 
    }
}


// for interview and reject btn
mainContainer.addEventListener('click', function (event) {
    const target = event.target;

    // INTERVIEW BUTTON
    if (target.classList.contains('interview-btn') || target.closest('.interview-btn')) {
        const interviewButton = target.classList.contains('interview-btn') ? target : target.closest('.interview-btn');
        const parentNode = interviewButton.closest('.flex');
        if (!parentNode) return;
        
        const companyName = parentNode.querySelector('.company-name').innerText;
        const companyPosition = parentNode.querySelector('.position').innerText;
        const companySalary = parentNode.querySelector('.salary').innerText;
        const responsibility = parentNode.querySelector('.role-description').innerText;
        
        parentNode.querySelector('.application-status').innerText = 'Interviewed';
        
        const cardInfo = {
            companyName,
            companyPosition,
            companySalary,
            applicationStatus: 'Interviewed',
            responsibility
        }
        
        const infoExist = interviewList.find(info => info.companyName == cardInfo.companyName)
        
        if (!infoExist) {
            interviewList.push(cardInfo);
        }
        
        rejectionList = rejectionList.filter(item => item.companyName != cardInfo.companyName)
        Counter();
        
        // IF WE ARE IN REJECTED TAB - remove card immediately
        if (!filteredSectionInfo.classList.contains('hidden') && rejectedBtn.classList.contains('btn-info')) {
            parentNode.remove(); // Remove from Rejected tab
        } 
        // IF WE ARE IN INTERVIEW TAB - refresh the view
        else if (!filteredSectionInfo.classList.contains('hidden') && interviewBtn.classList.contains('btn-info')) {
            renderingInterview();
        }
        // IF WE ARE IN ALL TAB - just update status
        else if (!allCards.classList.contains('hidden')) {
            // Card already updated
        }

    // REJECTED BUTTON
    } else if (event.target.classList.contains('rejected-btn') || target.closest('.rejected-btn')) {
        const rejectedButton = target.classList.contains('rejected-btn') ? target : target.closest('.rejected-btn');
        const parentNode = rejectedButton.closest('.flex');
        if (!parentNode) return;
        
        const companyName = parentNode.querySelector('.company-name').innerText;
        const companyPosition = parentNode.querySelector('.position').innerText;
        const companySalary = parentNode.querySelector('.salary').innerText;
        const responsibility = parentNode.querySelector('.role-description').innerText;
        
        parentNode.querySelector('.application-status').innerText = 'Rejected';
        
        const cardInfo = {
            companyName,
            companyPosition,
            companySalary,
            applicationStatus: 'Rejected',
            responsibility
        }
        
        const infoExist = rejectionList.find(info => info.companyName == cardInfo.companyName)
        
        if (!infoExist) {
            rejectionList.push(cardInfo);
        }
        
        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName)
        Counter();
        
        // IF WE ARE IN INTERVIEW TAB - remove card immediately
        if (!filteredSectionInfo.classList.contains('hidden') && interviewBtn.classList.contains('btn-info')) {
            parentNode.remove(); // Remove from Interview tab
        } 
        // IF WE ARE IN REJECTED TAB - refresh the view
        else if (!filteredSectionInfo.classList.contains('hidden') && rejectedBtn.classList.contains('btn-info')) {
            renderingRejection();
        }
        // IF WE ARE IN ALL TAB - just update status
        else if (!allCards.classList.contains('hidden')) {
            // Card already updated
        }
    }
    // this is the trash btn  function
      else if (event.target.closest('.trash-btn')) {
    const jobCard = target.closest('.flex');
    
    if (jobCard) {
        const companyName = jobCard.querySelector('.company-name').innerText;
        
        // Remove from arrays
        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectionList = rejectionList.filter(item => item.companyName !== companyName);
        
        // Remove from page
        jobCard.remove();
        
        // Update counters
        Counter();
        
        // Refresh the view
        if (!filteredSectionInfo.classList.contains('hidden')) {
            if (interviewBtn.classList.contains('btn-info')) {
                renderingInterview();
            } else if (rejectedBtn.classList.contains('btn-info')) {
                renderingRejection();
            }
        }
    }
    return;
}
   
})


// now i will create html inside the section
function renderingInterview() {
    filteredSectionInfo.innerHTML = ''

    if(interviewList.length<=0){
            const section = document.createElement("section");
            section.innerHTML = `
            <div class="text-center bg-white py-20 rounded-md border-gray-200 shadow-md"> 
                <img src="./icon/jobs.png" alt="" class="mx-auto mb-5">
                <h2 class="mb-1 font-semibold text-2xl text-[#002C5C]">No jobs available</h2>
                <p class="text-lg text-[#64748B]">Check back soon for new job opportunities</p>
            </div>
            `
         filteredSectionInfo.appendChild(section);   
    }
else{
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
                <div  class="shrink-0"><button class="  btn trash-btn p-3 rounded-full">
                        <img src="icon/Trash.png" alt="" ></button></div>
      `
        filteredSectionInfo.appendChild(div);
    }
}


   
}



// now i will create html inside the section
function renderingRejection() {
    filteredSectionInfo.innerHTML = ''

    if(rejectionList.length<=0){
            const section = document.createElement("section");
            section.innerHTML = `
            <div class="text-center bg-white py-20 rounded-md border-gray-200 shadow-md"> 
                <img src="./icon/jobs.png" alt="" class="mx-auto mb-5">
                <h2 class="mb-1 font-semibold text-2xl text-[#002C5C]">No jobs available</h2>
                <p class="text-lg text-[#64748B]">Check back soon for new job opportunities</p>
            </div>
            `
         filteredSectionInfo.appendChild(section);   
    }
    else {
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
                <div  class="shrink-0"><button class="  btn trash-btn  p-3 rounded-full">
                        <img src="icon/Trash.png" alt="" ></button></div>
      `
        filteredSectionInfo.appendChild(div);
    }
}
    }






















   