
$(document).ready(function() {

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip(); 

    // WYSIWYG toolbar

    $('.toolbar a').click(function(e) {

        var command = $(this).data('command');
   
        if (command == 'h1' || command == 'h2' || command == 'p') {
            document.execCommand('formatBlock', false, command);
        }
        
        if (command == 'forecolor' || command == 'backcolor') {
            document.execCommand($(this).data('command'), false, $(this).data('value'));
        }
        
        if (command == 'createlink' || command == 'insertimage') {
            url = prompt('Enter the link here: ','http:\/\/');
            document.execCommand($(this).data('command'), false, url);
        }
        
        else document.execCommand($(this).data('command'), false, null);
   
    });



// AUTO SAVE (content will be saved locally)

(function() {

    try {

        (window.localStorage.getItem) // will throw in Firefox under some settings
    } catch (e) {

        return; // quit because dom.storage.enabled is false
    }

    var title = document.querySelector('#title');
    var description = document.querySelector('#description');

    // place content from previous edit
    if (!description.innerHTML || !title.innerHTML) {

        description.innerHTML = window.localStorage.getItem('description');
        title.innerHTML = window.localStorage.getItem('title');

    }

    updateLog(false);


    // your content will be saved locally
    document.querySelector('#description').addEventListener('keyup', function() {

        window.localStorage.setItem('description', description.innerHTML);
        window.localStorage.setItem('title', title.innerHTML);
        window.localStorage.setItem('timestamp', (new Date()).getTime());

        updateLog(true);

    }, false);

    document.querySelector('#title').addEventListener('keyup', function() {

        window.localStorage.setItem('description', description.innerHTML);
        window.localStorage.setItem('title', title.innerHTML);
        window.localStorage.setItem('timestamp', (new Date()).getTime());

        updateLog(true);

    }, false);



    function updateLog(new_save) {

        var log = document.querySelector("#ta-log");

        var delta = 0;

        if (window.localStorage.getItem('description') || window.localStorage.getItem('title')) {

            delta = ((new Date()).getTime() - (new Date()).setTime(window.localStorage.getItem('timestamp'))) / 1000;

            if (new_save) {

                log.textContent = 'Saved.';

                setTimeout(function() {

                    log.textContent = 'Draft.';

                }, 3000); 

            } else {

                log.textContent = 'last saved: ' + delta + 's ago';

            }

        }

    }



})();



});
    


