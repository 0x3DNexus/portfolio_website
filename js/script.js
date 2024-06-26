document.addEventListener('DOMContentLoaded', () => {

    //add active navBar and content properties
    let navTabs = document.querySelectorAll('.navEl');
    let contents = document.querySelectorAll('.contentDiv');
    let body = document.querySelector('body');
    body.style.overflowY = 'hidden';
    

    navTabs.forEach(tab => {

        tab.addEventListener('click', () => {

            //remove active class from all the tabs
            navTabs.forEach(t => { t.classList.remove('active') })
            tab.classList.add('active');

            const targetContent = tab.getAttribute('id');

            //add linear gradient only to home page
            if(targetContent !== 'home'){
                body.style.background = '#181a1b';
            }
            else{
                body.style.background = 'linear-gradient(to bottom, #2c2e31 43%, #181a1b 43%)';
            }

            //add scroll bar only to overview and projects page
            if(targetContent !== 'home' && targetContent !== 'contact'){
                body.style.overflowY = 'visible';
            }else{
                body.style.overflowY = 'hidden';
            }

            console.log(targetContent);

            contents.forEach(this_content => {
                if (targetContent === this_content.id) {
                    this_content.classList.add('active');
                }
                else {
                    this_content.classList.remove('active');
                }
            })
        })
    })


    //set the percentages at correct position
    let skills = document.querySelectorAll('.skillLevel');

    skills.forEach(skill => {
        const progress = skill.querySelector('.progress');
        const percentage = skill.querySelector('.percentage');

        // Get the width of progress as a percentage
        const widthPercentage = progress.style.width;

        // Set the position of percentage based on progress width
        let progressWidth = parseInt(widthPercentage) || 0;
        progressWidth -= 4;

        // Set width and position of percentage element
        percentage.style.left = `${progressWidth}%`;
    })

    let prog = document.querySelectorAll('.progContainer');

    prog.forEach(element =>{
        let c_progress = element.querySelector('.circularProgressBar');
        let c_percent = element.querySelector('.circularPercentage');

        let barFill = c_percent.textContent.split('%')[0];
        barFill = parseInt(barFill);

        c_progress.style.background = `conic-gradient(#f36b39 ${barFill * 3.6}deg, #a0a0a0 0deg)`;

    })

    //code for project page
    let backToHomeButton = document.querySelector('.backToHome');
    console.log(backToHomeButton);
    
    backToHomeButton.addEventListener('click', () =>{
        //select all the nav bar and home div with #home id
        let homeTab = document.querySelectorAll('#home');

        //select and remove the underline from projects tab (#project returns the nav Element as its the first matching id)
        let projectTab = document.querySelectorAll('#projects');
        
        //make the projects page inactive
        projectTab.forEach(proj => proj.classList.remove('active'))

        //navigate back to home tab
        homeTab.forEach(home => {
            body.style.overflowY = 'hidden';
            home.classList.add('active');
        });

        body.style.background = 'linear-gradient(to bottom, #2c2e31 43%, #181a1b 43%)';
    })
})
