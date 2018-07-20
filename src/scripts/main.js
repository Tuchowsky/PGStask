$(document).ready(function(){
    
    let mainContainer = $('#main > .row');
    let footer = $('footer');
    let recentMenuItem = $('.menu-item');
    let aboutUsPhotos = [
        './assets/images/background-1.png',
        './assets/images/background-2.png',
        './assets/images/background-3.png'
    ];
    

    addAboutUsInfo(mainContainer);
    let aboutUsPhotosCont = $('.about-us-photo');
    addPhotos(aboutUsPhotos, aboutUsPhotosCont);
    setTimeout(welcomeLogoFadeOut, 7000);

    let headerHeight = $('header').innerHeight();
    let mainHeight = $('#main').innerHeight();
    let footerHeight = $('footer').innerHeight();
    let windowHeight = $(window).innerHeight();
    

    function welcomeLogoFadeOut(){
        let welcome = $('.welcome-logo');
        welcome.fadeOut('slow');
    }

    //controlling footer by changing it's position to absolute or static
    function checkHeight(){
        if((headerHeight + mainHeight + footerHeight) >= windowHeight){
            footer.removeClass('pos-absolute');
            footer.addClass('pos-static');
        } else {
            footer.removeClass('pos-static');
            footer.addClass('pos-absolute');
        }
    }
    checkHeight();

    function addPhotos(photo, photoCont){
        for(let i = 0; i < photoCont.length; i++){
            photoCont[i].setAttribute('style', 'background-image: url(' + photo[i] + ')');
        }
    }

    function clearContainer(cont){
        cont[0].innerHTML = '';

    }

    //add HTML in About US Section
    function addAboutUsInfo(cont){
        cont[0].innerHTML =
        `<div class="about-us-item col-12 col-sm-6 col-md-4 horizontal-center">
                    <div class="about-us-wrap">
                        <div class="about-us-photo"></div>
                        <div class="about-us-info">
                            <h4>Lorem ipsum</h4>
                            <p>Etiam ullamcorper. Suspendisse a
                            pellentesque dui, non felis maecenas.</p>
                        </div>
                    </div>
                </div>
                <div class="about-us-item col-12 col-sm-6 col-md-4 horizontal-center">
                    <div class="about-us-wrap">
                        <div class="about-us-photo"></div>
                        <div class="about-us-info">
                            <h4>Lorem ipsum</h4>
                            <p>Etiam ullamcorper. Suspendisse a
                            pellentesque dui, non felis maecenas.</p>
                        </div>
                    </div>
                </div>
                <div class="about-us-item col-12 col-sm-6 col-md-4 horizontal-center">
                    <div class="about-us-wrap">
                        <div class="about-us-photo"></div>
                        <div class="about-us-info">
                            <h4>Lorem ipsum</h4>
                            <p>Etiam ullamcorper. Suspendisse a
                            pellentesque dui, non felis maecenas.</p>
                        </div>
                    </div>
                </div>`;
    }
    

    //send request to API and add HTML in Skicams Section
    function sendRequest() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(xhttp.responseText);
                let number = 0;
                for(let i in response){
                    if(response[i].name === 'Azzone' || response[i].name === 'Bionaz'){
                        console.log('działa');
                        mainContainer[0].innerHTML += `
                        <div class="skicam-item col-12 col-sm-7 col-md-6 horizontal-center">
                            <div class="skicam-wrap">
                                <div class="skicam-info center">
                                    <h4>${response[i].name}</h4>
                                </div>
                            
                            </div>
                        </div>
                        `;
                        let skicamWrap = $('.skicam-wrap');                       
                        let iterationCount = 0;

                        for(let j in response[i].cams){
                            if(iterationCount > 1){
                                break;
                            } else {
                                iterationCount++;
                                skicamWrap[number].innerHTML += '<div class="skicam-photo"><img src="' + response[i].cams[j].url +'" alt="photo"' + '/></div>';
                            }
                        }
                        number++; 
                    }
                }
                footer.removeClass('pos-absolute');
                footer.addClass('pos-static');
            }
        };
        xhttp.open("GET", "https://makevoid-skicams.p.mashape.com/cams.json", true);
        xhttp.setRequestHeader("X-Mashape-Key", "kxSXmUymofmshFHhhKxWOSJpqJsJp1I3zNnjsnqKwhITAiC1zw");
        xhttp.send(null);
    }
    
    //add HTML in Contact Section
    function addContactForm(cont){
        cont[0].innerHTML = `
        <div class="contact-item col-12 horizontal-center">
            <form>
                <div class="form-wrap">
                    <div class="form-group">
                        <input type="text" class="form-control required" placeholder="Name *" required>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control required" aria-describedby="emailHelp" placeholder="Email *" required>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control not-required" placeholder="Message" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Send</button>
                </div>
            </form>

        </div>   
        `;
    }

    //controlling content on webpage
    recentMenuItem.on('click', function(){
        $(this).addClass('menu-item-active').siblings($(this)).removeClass('menu-item-active');

        if($(this)[0].textContent.match(/\bAbout Us\b/) && $(this).hasClass('menu-item-active')){
            clearContainer(mainContainer);
            addAboutUsInfo(mainContainer);
            let aboutUsPhotosContSup = $('.about-us-photo');
            addPhotos(aboutUsPhotos, aboutUsPhotosContSup);
            checkHeight();
        } 
        else if ($(this)[0].textContent.match(/\bSkicams\b/) && $(this).hasClass('menu-item-active')){
            footer.fadeOut(0);
            clearContainer(mainContainer);
            sendRequest();
            checkHeight();
            footer.delay(3000).fadeIn(500);

        } 
        else if($(this)[0].textContent.match(/\bContact\b/) && $(this).hasClass('menu-item-active')) {
            clearContainer(mainContainer);
            addContactForm(mainContainer);
        } else {
            return;
        }
        
    });

});