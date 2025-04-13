$(document).ready(function(){
    const $tabsContainer = $('.tabs_block');
    const $tabsWrapper = $tabsContainer.find('.tabs');
    const $tabs = $tabsWrapper.find('li');
    const $tabContents = $('.tab_content');

    let containerWidth = $tabsContainer.width();
    let tabWidths = [];
    let visibleStart = 0;

    // getBoundingClientRect orqali widthlarni aniq olamiz
    $tabs.each(function () {
        const rect = this.getBoundingClientRect();
        tabWidths.push(rect.width);
    });

    function showTabs(startIndex) {
        $tabs.hide();
        let totalWidth = 0;
        let endIndex = startIndex;
    
        // Nechta sig'adi - aniq hisobla
        for (let i = startIndex; i < $tabs.length; i++) {
            totalWidth += tabWidths[i];
            if (totalWidth <= containerWidth) {
                $tabs.eq(i).show();
                endIndex = i;
            } else {
                break;
            }
        }
    
        visibleStart = startIndex;
    
        // Buttonlarni boshqarish
        $('.tab_prev').toggle(visibleStart > 0);
        $('.tab_next').toggle(endIndex < $tabs.length - 1);
    }
    

    $('.tab_next').click(function () {
        let nextStart = visibleStart;
        let total = 0;
    
        // Keyingi to'plam qayerdan boshlanishi kerakligini hisobla
        for (let i = visibleStart; i < $tabs.length; i++) {
            total += tabWidths[i];
            if (total > containerWidth) {
                nextStart = i;
                break;
            }
        }
    
        showTabs(nextStart);
    });
    
    $('.tab_prev').click(function () {
        let prevStart = 0;
        let total = 0;
    
        // Oldingilarni hisobla
        for (let i = visibleStart - 1; i >= 0; i--) {
            total += tabWidths[i];
            if (total > containerWidth) {
                prevStart = i + 1;
                break;
            }
            prevStart = i;
        }
    
        showTabs(prevStart);
    });
    
    // Tab click
    $tabs.click(function () {
        $tabs.removeClass('active');
        $(this).addClass('active');

        const index = $(this).index();
        $tabContents.hide().eq(index).show();
    });

    // Init
    $tabs.removeClass('active').eq(0).addClass('active');
    $tabContents.hide().eq(0).show();
    showTabs(0);



    // hamburger
    $(".hamurger_menu").on('click',function(e){
        e.preventDefault();
        $(".header_menus").addClass("active")
    })
    
    $(".close").on('click',function(e){
        e.preventDefault();
        $(".header_menus").removeClass("active")
    })


    // 
});