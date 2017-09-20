var flexItems = document.querySelectorAll('.teamSections');
var lastPanel;

function toggleOpen() {

    if (lastPanel === this) {} else if (lastPanel) {
        lastPanel.classList.remove('open')
    }
    this.classList.toggle('open');
    lastPanel = this;
}

flexItems.forEach(item => item.addEventListener('click', toggleOpen));

$('.teamMember').click(function(e){
    e.stopPropagation();
    // var state = $(this).hasClass("flipped");
    // $('.teamMember').removeClass("flipped");
    // if(!state)
    //     $(this).addClass("flipped");
})
