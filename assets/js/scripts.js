$(document).ready(function () {
  // accordion
  $('.accordion-header').on('click', function () {
    var $item = $(this).closest('.accordion-item');
    var $content = $item.find('.accordion-content');
    let $box = $item.find('.accordion-box');
    if($box.hasClass('show')){
      $item.removeClass('active');
      $box.removeClass('show');
    }
    else{
      $box.addClass('show');
      $item.addClass('active');
    }
  
    $('.accordion-content').not($content).slideUp();
    $content.slideToggle();
  });
  



// Modal ochish
$('.open_custom_modal').on('click', function (e) {
    e.preventDefault();
    var modal_id = $(this).data('bs-target');
    $(modal_id).fadeIn(200);
    $('body').css('overflow', 'hidden');
  });

  // Modal yopish
  $(document).on('click', '.custom_modal_close, .custom_modal_backdrop', function () {
    $(this).closest('.custom_modal').fadeOut(200);
    $('body').css('overflow', '');
  });

  // Form submitni bloklab, validatsiya qilish
  $('.custom_modal form').on('submit', function (e) {
    e.preventDefault(); // Formani yuborishni to‘xtatamiz

    var $form = $(this);
    var $inputs = $form.find('input[type="text"], input[type="tel"]');
    var $checkbox = $form.find('input[type="checkbox"]');
    var is_valid = true;

    // Inputlar tekshiriladi
    $inputs.each(function () {
      if (!$(this).val().trim()) {
        $(this).addClass('input_error');
        is_valid = false;
      } else {
        $(this).removeClass('input_error');
      }
    });

    // Checkbox tekshiriladi
    if (!$checkbox.prop('checked')) {
      $checkbox.addClass('input_error');
      is_valid = false;
    } else {
      $checkbox.removeClass('input_error');
    }

    if (is_valid) {
      // Hozirgi modalni yopamiz
      $form.closest('.custom_modal').fadeOut(200);
      $('body').css('overflow', 'hidden');

      // 300ms kutamiz, keyin confirm_modalni ochamiz
      setTimeout(function () {
        $('#confirm_modal').fadeIn(200);
      }, 300);
    }
  });
  $('.trade form').on('submit', function (e) {
    e.preventDefault(); // Formani yuborishni to‘xtatamiz

    var $form = $(this);
    var $inputs = $form.find('input[type="text"], input[type="tel"]');
    var $checkbox = $form.find('input[type="checkbox"]');
    var is_valid = true;

    // Inputlar tekshiriladi
    $inputs.each(function () {
      if (!$(this).val().trim()) {
        $(this).addClass('input_error');
        is_valid = false;
      } else {
        $(this).removeClass('input_error');
      }
    });

    // Checkbox tekshiriladi
    if (!$checkbox.prop('checked')) {
      $checkbox.addClass('input_error');
      is_valid = false;
    } else {
      $checkbox.removeClass('input_error');
    }

    if (is_valid) {
      // Hozirgi modalni yopamiz
      $form.closest('.custom_modal').fadeOut(200);
      $('body').css('overflow', 'hidden');

      // 300ms kutamiz, keyin confirm_modalni ochamiz
      setTimeout(function () {
        $('#confirm_modal').fadeIn(200);
      }, 300);
    }
  });
  $('.credit form').on('submit', function (e) {
    e.preventDefault(); // Formani yuborishni to‘xtatamiz

    var $form = $(this);
    var $inputs = $form.find('input[type="text"], input[type="tel"]');
    var $checkbox = $form.find('input[type="checkbox"]');
    var is_valid = true;

    // Inputlar tekshiriladi
    $inputs.each(function () {
      if (!$(this).val().trim()) {
        $(this).addClass('input_error');
        is_valid = false;
      } else {
        $(this).removeClass('input_error');
      }
    });

    // Checkbox tekshiriladi
    if (!$checkbox.prop('checked')) {
      $checkbox.addClass('input_error');
      is_valid = false;
    } else {
      $checkbox.removeClass('input_error');
    }

    if (is_valid) {
      // Hozirgi modalni yopamiz
      $form.closest('.custom_modal').fadeOut(200);
      $('body').css('overflow', 'hidden');

      // 300ms kutamiz, keyin confirm_modalni ochamiz
      setTimeout(function () {
        $('#confirm_modal').fadeIn(200);
      }, 300);
    }
  });

  // A tugmalar o‘rniga form submit qilish
  $('.custom_modal .credit_button a').on('click', function (e) {
    e.preventDefault();
    $(this).closest('form').submit();
  });
  $('.trade .trade_button a').on('click', function (e) {
    e.preventDefault();
    $(this).closest('form').submit();
  });
  $('.credit .credit_button a').on('click', function (e) {
    e.preventDefault();
    $(this).closest('form').submit();
  });

//   ============ Credit swiper
var creditSwiper = new Swiper(".credit_swiper", {
    spaceBetween: 10,
    pagination: {
      el: ".credit-pagination",
    },
  });

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
    $(".hamburger_menu").on('click', function (e) {
        e.preventDefault();
        $(".header_menus_wrapper").addClass("active");
        $('body').addClass('no_scroll');
    });

    $(".header_menus_block .close, .header_backdrop").on('click', function (e) {
        e.preventDefault();
        $(".header_menus_wrapper").removeClass("active");
        $('body').removeClass('no_scroll');
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


    // Equipment card show more
    const $equipmentItems = $('.equipment_card');
    const $equipmentButton = $('.equipment_more a');
    const $equipmentButtonText = $('.equipment_more span');
    const $equipmentButtonImg = $('.equipment_more img');
    const equipmentItemsToShow = 3;

    let isExpanded = false;

    function showLimitedItems() {
        $equipmentItems.slice(equipmentItemsToShow).slideUp(); // faqat ortiqchasini yashir
        $equipmentButtonText.text('Показать еще');
        $equipmentButtonImg.removeClass('rotated');
        isExpanded = false;
    }

    function showAllItems() {
        $equipmentItems.slideDown();
        $equipmentButtonText.text('Скрыть');
        $equipmentButtonImg.addClass('rotated');
        isExpanded = true;
    }

    // Boshlanish holati
    $equipmentItems.hide();
    $equipmentItems.slice(0, equipmentItemsToShow).show();

    $equipmentButton.on('click', function (e) {
        e.preventDefault();

        if (isExpanded) {
            showLimitedItems();
        } else {
            showAllItems();
        }
    });

    // HTML classlar bilan moslashtirish
    const footerTextElement = document.querySelector('.footer_desc p');
    const toggleTextLink = document.querySelector('.footer_link .show_more');

    // To'liq matnni olish
    const fullText = footerTextElement.textContent.trim();

    // Maksimal so'zlar soni
    const maxWords = 30;
    const words = fullText.split(" ");
    const shortText = words.slice(0, maxWords).join(" ") + "...";

    // Boshlang'ich matnni qisqartirish
    let isFooterExpanded = false;
    footerTextElement.textContent = shortText;

    toggleTextLink.addEventListener("click", function (e) {
        e.preventDefault();  // Linkning normal xatti-harakatini oldini olish
        isFooterExpanded = !isFooterExpanded;

        if (isFooterExpanded) {
            footerTextElement.textContent = fullText;
            toggleTextLink.textContent = "Скрыть";
        } else {
            footerTextElement.textContent = shortText;
            toggleTextLink.textContent = "Подробнее";
        }
    });


});
