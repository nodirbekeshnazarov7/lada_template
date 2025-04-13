$(document).ready(function () {

    /** -------------------------------
     *  TABS
     * --------------------------------*/
    const $tabsContainer = $('.tabs_block');
    if ($tabsContainer.length) {
        const $tabsWrapper = $tabsContainer.find('.tabs');
        const $tabs = $tabsWrapper.find('li');
        const $tabContents = $('.tab_content');

        let containerWidth = $tabsContainer.width();
        let tabWidths = [];
        let visibleStart = 0;

        $tabs.each(function () {
            tabWidths.push(this.getBoundingClientRect().width);
        });

        function showTabs(startIndex) {
            $tabs.hide();
            let totalWidth = 0;
            let endIndex = startIndex;

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
            $('.tab_prev').toggle(visibleStart > 0);
            $('.tab_next').toggle(endIndex < $tabs.length - 1);
        }

        $('.tab_next').on('click', function () {
            let nextStart = visibleStart;
            let total = 0;

            for (let i = visibleStart; i < $tabs.length; i++) {
                total += tabWidths[i];
                if (total > containerWidth) {
                    nextStart = i;
                    break;
                }
            }

            showTabs(nextStart);
        });

        $('.tab_prev').on('click', function () {
            let prevStart = 0;
            let total = 0;

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

        $tabs.on('click', function () {
            $tabs.removeClass('active');
            $(this).addClass('active');
            const index = $(this).index();
            $tabContents.hide().eq(index).show();
        });

        // Init
        $tabs.removeClass('active').eq(0).addClass('active');
        $tabContents.hide().eq(0).show();
        showTabs(0);
    }

    /** -------------------------------
     *  HAMBURGER MENU
     * --------------------------------*/
    $(".hamurger_menu").on('click', function (e) {
        e.preventDefault();
        $(".header_menus").addClass("active");
    });

    $(".close").on('click', function (e) {
        e.preventDefault();
        $(".header_menus").removeClass("active");
    });

    /** -------------------------------
     *  CUSTOM SELECT
     * --------------------------------*/
    function createCustomSelect($select) {
        const wrapper = $('<div class="custom-select-wrapper"></div>');
        const firstOptionText = $select.find("option").first().text();
        const selected = $(`<div class="custom-selected"><span class="text">${firstOptionText}</span><span class="arrow"></span></div>`);
        const dropdown = $('<div class="custom-select-dropdown"><input type="text" class="search" placeholder="Поиск..."><ul class="options"></ul></div>');

        const svgArrow = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
              <path d="M4.5 6.17554L9 10.2926L13.5 6.17554" stroke="#2B303A" stroke-opacity="0.58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        selected.find(".arrow").html(svgArrow);

        $select.find("option").each(function () {
            const value = $(this).val();
            const text = $(this).text();
            if (text.trim() !== "") {
                dropdown.find(".options").append(`<li data-value="${value}">${text}</li>`);
            }
        });

        wrapper.append(selected).append(dropdown);
        $select.after(wrapper).hide(); // hide original select

        selected.on("click", function (e) {
            e.stopPropagation();
            $(".custom-select-wrapper").not(wrapper).removeClass("open")
                .find("svg").css("transform", "rotate(0)");
            wrapper.toggleClass("open");
            selected.find("svg").css("transform", wrapper.hasClass("open") ? "rotate(180deg)" : "rotate(0)");
        });

        dropdown.on("click", "li", function () {
            const text = $(this).text();
            const value = $(this).data("value");
            selected.find(".text").text(text);
            $select.val(value).trigger("change");
            wrapper.removeClass("open");
            selected.find("svg").css("transform", "rotate(0)");
        });

        dropdown.find(".search").on("keyup", function () {
            const keyword = $(this).val().toLowerCase();
            dropdown.find("li").each(function () {
                $(this).toggle($(this).text().toLowerCase().includes(keyword));
            });
        });

        $(document).on("click", function (e) {
            if (!wrapper.is(e.target) && wrapper.has(e.target).length === 0) {
                wrapper.removeClass("open");
                selected.find("svg").css("transform", "rotate(0)");
            }
        });
    }

    $("select.custom-select-original").each(function () {
        createCustomSelect($(this));
    });

});
