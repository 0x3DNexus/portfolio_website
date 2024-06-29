document.addEventListener('DOMContentLoaded', () => {
    //access the root styles
    const rootStyles = getComputedStyle(document.documentElement);

    //add a global theme
    let currentTheme = 'dark';
    let currentTab = 'home';
    let background = '';
    let textColor = '';

    //add active navBar and content properties
    let navTabs = document.querySelectorAll('.navEl');
    let contents = document.querySelectorAll('.contentDiv');
    let body = document.querySelector('body');
    body.style.overflowY = 'hidden';

    let currentActiveTab = navTabs[0];
    setActiveTabColor(currentActiveTab, currentTheme);

    navTabs.forEach(tab => {

        tab.addEventListener('click', () => {

            //remove active class from all the tabs and reset all tab colors
            navTabs.forEach(t => { t.classList.remove('active');})
            tab.classList.add('active');
            currentActiveTab = tab;

            const targetContent = tab.getAttribute('id');
            currentTab = targetContent;

            //call the function even when the active tab is changed
            changeColors(currentTheme, currentTab);

            //add scroll bar only to overview and projects page
            if (targetContent !== 'home' && targetContent !== 'contact') {
                body.style.overflowY = 'visible';
            }
            else {
                body.style.overflowY = 'hidden';
            }

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

    //event listener for hover event
    navTabs.forEach(tab => {
        tab.addEventListener('mouseover', () => {

            tab.style.cursor = 'pointer';

            //do not apply hover effects if tab is active
            if (tab.classList.contains('active')) return;

            if (currentTheme === 'light') tab.style.color = rootStyles.getPropertyValue('--dark-primary-color').trim();
            else tab.style.color = 'white';
        })

        tab.addEventListener('mouseout', () => {
            if (tab.classList.contains('active')) return;
            tab.style.color = '#a0a0a0';
        })
    })


    function setActiveTabColor(currentActiveTab, currentTheme) {
        navTabs.forEach(this_tab => this_tab.style.color = '#a0a0a0'); //reset all the tabs color

        if (currentTheme === 'light') currentActiveTab.style.color = rootStyles.getPropertyValue('--dark-primary-color').trim();
        else currentActiveTab.style.color = 'white';
    }

    //marked for optimization
    function changeColors(currentTheme, currentTab) {
        setActiveTabColor(currentActiveTab, currentTheme);

        // Default colors for dark theme
        background = rootStyles.getPropertyValue('--dark-primary-color').trim();
        textColor = 'white';

        // Override with light theme colors if applicable
        if (currentTheme === 'light') {
            background = rootStyles.getPropertyValue('--light-primary-color').trim();
            textColor = rootStyles.getPropertyValue('--dark-primary-color').trim();
        }

        // Special handling for the home tab
        if (currentTab === 'home') {
            background = rootStyles.getPropertyValue('--dark-linear-gradient').trim();
            if (currentTheme === 'light') background = rootStyles.getPropertyValue('--light-linear-gradient').trim();
        }
        
        //check for the inner circles on the progress bars
        let innerCircle = document.querySelectorAll('.innerCircularProgressBar');
        if (currentTheme === 'light') {
            innerCircle.forEach(element => {
                element.style.background = rootStyles.getPropertyValue('--light-primary-color').trim();
            })
        }
        else {
            innerCircle.forEach(element => {
                element.style.background = rootStyles.getPropertyValue('--dark-primary-color').trim();
            })
        }

        //for the contact page
        let socials = document.querySelectorAll('.socialLogos');
        let inputFields = document.querySelectorAll('.contactAreaInput, .contactAreaText');

        if(currentTheme === 'light'){
            socials.forEach(element => element.style.color = rootStyles.getPropertyValue('--dark-primary-color').trim());
            inputFields.forEach(input => {input.style.background = 'white'; input.style.color = rootStyles.getPropertyValue('--dark-primary-color').trim();});
        }
        else{
            socials.forEach(element => element.style.color = rootStyles.getPropertyValue('--light-primary-color').trim());
            inputFields.forEach(input => {input.style.background = '#4b4742'; input.style.color = 'white';});
        }

        body.style.background = background;
        body.style.color = textColor; 

    }

    function applyAndRemoveTransition(background){
        body.style.transition = 'background 0.3s ease';

        setTimeout(() =>{
            body.style.transition = 'none';
        },300)
    }

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

    prog.forEach(element => {
        let c_progress = element.querySelector('.circularProgressBar');
        let c_percent = element.querySelector('.circularPercentage');

        let barFill = c_percent.textContent.split('%')[0];
        barFill = parseInt(barFill);

        c_progress.style.background = `conic-gradient(#f36b39 ${barFill * 3.6}deg, #a0a0a0 0deg)`;

    })

    //code for project page
    let backToHomeButton = document.querySelector('.backToHome');

    backToHomeButton.addEventListener('click', () => {
        //select all the nav bar and home div with #home id
        let homeTab = document.querySelectorAll('#home');

        //select and remove the underline from projects tab (#project returns the nav Element as its the first matching id)
        let projectTab = document.querySelectorAll('#projects');

        //make the projects page inactive
        projectTab.forEach(proj => proj.classList.remove('active'));

        //navigate back to home tab
        homeTab.forEach(home => {
            body.style.overflowY = 'hidden';
            home.classList.add('active');
        });

        currentActiveTab = homeTab[0];
        currentTab = 'home';
        changeColors(currentTheme, currentTab);
    })

    //toggle light and dark mode
    let toggleButton = document.querySelector('#toggle');
    let sun = document.querySelector('.fa-sun');
    let moon = document.querySelector('.fa-moon');

    toggleButton.addEventListener('click', () => {
        if (currentTheme === 'dark') {

            //view line no. 6 for declaration of variable;
            currentTheme = 'light';
            changeColors(currentTheme, currentTab);
            applyAndRemoveTransition(background, textColor);

            sun.style.display = 'inline';
            sun.style.color = '#a0a0a0';
            moon.style.display = 'none';
        }
        else {
            currentTheme = 'dark';
            changeColors(currentTheme, currentTab);
            applyAndRemoveTransition(background, textColor);

            sun.style.display = 'none';
            moon.style.display = 'inline';
        }
    })

})
