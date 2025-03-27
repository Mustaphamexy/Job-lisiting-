const filter = document.querySelector(".filter-box");
const clear = document.querySelector(".clear-button");
const container = document.querySelector(".container");
const filterContainer = document.querySelector(".filter-container");
const filterSection = document.querySelector(".filter");

let filteredActive = []


async function getData() {
    try {
        const response = await fetch("./data.json");
        if (response.ok === false) {
            throw new Error ("failed to fetch"); 
        }
            const data = await response.json();
            showData(data);
            
        }  catch (error)   {
            console.log(error);
        }
    }
    
    getData();
    
    function showData(data){
            container.innerHTML = data.map((each, index) => {
                    return `
                  <div class="job-card ${each.featured ? 'featured' : ''}">
                <img src="${each.logo}" alt="">

                <div class="Job-list"> 
                     <div class="job-profile">
                        <div class="firstline">
                            <h3>${each.company}</h3>
                            <div class="job-status">
                                ${each.new ? `<span class="new">New!</span>` : ""}
                                ${each.featured ? `<span class="featured">Featured</span>` : ""}
                            </div>
                        </div>
                        <h2>${each.position}</h2>
                        <ul>
                            <li>${each.postedAt}</li>
                            <li>${each.contract}</li>
                            <li>${each.location}</li>
                        </ul>
                     </div>
                     <hr>
                     <div class="skills">
                         <button>${each.role}</button>
                         <button>${each.level}</button>
                        ${each.languages.map(lang => `<button>${lang}</button>`).join('')}
                        ${each.tools.map(tool => `<button>${tool}</button>`).join('')}
                    </div>
                </div>
            </div>
            `;
        }).join("");

        AddSkill();
} 


function AddSkill() {
    const skillButton = document.querySelectorAll(".skills button");

    console.log(skillButton);
    skillButton.forEach(button => {
        button.addEventListener("click", () => {
            const skill = button.innerText;
            if (!filteredActive.includes(skill)) {
                filteredActive.push(skill);
                FilterDisplay();
                applyFilter();
            }
        });
    });
}

function FilterDisplay() {
    filterContainer.innerHTML = filteredActive.map(skill => `
         <div class="filter-box">
                        <p>${skill}</p>
                        <button class="remove-filter" data-skill="${skill}"><img src="images/icon-remove.svg" alt=""></button>
                     </div>
        `).join("");

        document.querySelectorAll(".remove-filter").forEach(button => {
            button.addEventListener("click", () => {
                removeFilter(button.dataset.skill);
            });
        });

        filterSection.style.display = filteredActive.length > 0 ? "flex" : "none";
        clear.style.display = filteredActive.length > 0 ? "block" : "none";
}

function applyFilter() {
    const jobCards = document.querySelectorAll(".job-card");

    jobCards.forEach(card => {
        const skills = Array.from(card.querySelectorAll(".skills button")).map(btn => btn.innerText);
        const isMatch = filteredActive.every(skill => skills.includes(skill));
        card.style.display = isMatch ? "flex" : "none";
    });
}


function removeFilter(filter) {
    filteredActive = filteredActive.filter(f => f !== filter); 
    FilterDisplay();
    applyFilter();
}

clear.addEventListener("click", () => {
    filteredActive = [];
    FilterDisplay();
    DisplayJobs();
});

function DisplayJobs() {
    document.querySelectorAll(".job-card").forEach(card => {
        card.style.display = "flex";
    });
}