$(document).ready(function () {
  // accordion

  $('.accordion-header').on('click', function () {
    const $item = $(this).closest('.accordion-item');
    const $content = $item.find('.accordion-content');
    const $box = $item.find('.accordion-box');

    // Agar hozirgi item ochiq bo‘lsa - yopamiz
    if ($item.hasClass('active')) {
      $item.removeClass('active');
      $box.removeClass('show');
      $content.stop(true, true).slideUp(); // stop() orqali animatsiyani to‘xtatamiz
    } else {
      // Boshqa barcha accordionlarni yopamiz
      $('.accordion-item.active').removeClass('active').find('.accordion-box').removeClass('show');
      $('.accordion-content').stop(true, true).slideUp();

      // Faol itemga class beramiz va ochamiz
      $item.addClass('active');
      $box.addClass('show');
      $content.stop(true, true).slideDown();
    }
  });
  $('.accordion-header').eq(0).trigger('click');



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
    const $tabsWrapper = $tabsContainer.find('.tabs_swiper');
    const $tabs = $tabsWrapper.find('.swiper-slide');
    const $tabContents = $('.tab_content');

    var tabs_swiper = new Swiper(".tabs_swiper", {
      slidesPerView: "auto",
      spaceBetween: 15,
      navigation: {
        nextEl: ".tab_next",
        prevEl: ".tab_prev",
      },
      breakpoints: {
        576: {
          spaceBetween: 37,
        }
      },
      on: {
        init: function () {
          updateNavButtons(this);
        },
        slideChange: function () {
          updateNavButtons(this);
        },
        reachBeginning: function () {
          document.querySelector(".tab_prev").style.display = "none";
        },
        reachEnd: function () {
          document.querySelector(".tab_next").style.display = "none";
        },
        fromEdge: function () {
          updateNavButtons(this);
        },
      }
    });

    function updateNavButtons(swiper) {
      const prevBtn = document.querySelector(".tab_prev");
      const nextBtn = document.querySelector(".tab_next");

      if (swiper.isBeginning) {
        prevBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
      }

      if (swiper.isEnd) {
        nextBtn.style.display = "none";
      } else {
        nextBtn.style.display = "block";
      }
    }

    // let containerWidth = $tabsContainer.width();
    // let tabWidths = [];
    // let visibleStart = 0;

    // $tabs.each(function () {
    //     tabWidths.push(this.getBoundingClientRect().width);
    // });

    // function showTabs(startIndex) {
    //     $tabs.hide();
    //     let totalWidth = 0;
    //     let endIndex = startIndex;

    //     for (let i = startIndex; i < $tabs.length; i++) {
    //         totalWidth += tabWidths[i];
    //         if (totalWidth <= containerWidth) {
    //             $tabs.eq(i).show();
    //             endIndex = i;
    //         } else {
    //             break;
    //         }
    //     }

    //     visibleStart = startIndex;
    //     $('.tab_prev').toggle(visibleStart > 0);
    //     $('.tab_next').toggle(endIndex < $tabs.length - 1);
    // }

    // $('.tab_next').on('click', function () {
    //     let nextStart = visibleStart;
    //     let total = 0;

    //     for (let i = visibleStart; i < $tabs.length; i++) {
    //         total += tabWidths[i];
    //         if (total > containerWidth) {
    //             nextStart = i;
    //             break;
    //         }
    //     }

    //     showTabs(nextStart);
    // });

    // $('.tab_prev').on('click', function () {
    //     let prevStart = 0;
    //     let total = 0;

    //     for (let i = visibleStart - 1; i >= 0; i--) {
    //         total += tabWidths[i];
    //         if (total > containerWidth) {
    //             prevStart = i + 1;
    //             break;
    //         }
    //         prevStart = i;
    //     }

    //     showTabs(prevStart);
    // });

    $tabs.on('click', function () {
      $tabs.removeClass('active');
      $(this).addClass('active');
      const index = $(this).index();
      $tabContents.hide().eq(index).show();
    });

    // Init
    $tabs.removeClass('active').eq(0).addClass('active');
    $tabContents.hide().eq(0).show();
    // showTabs(0);
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

  $(".menu_item a").on("click", function (e) {
    e.preventDefault();
    $(".menu_item a").removeClass('active');
    $(this).addClass('active');
    const target = $(this).attr("href").replace('#', '');
    const isMobile = window.innerWidth <= 992;
    let sectionId = isMobile ? `#${target}-mobile` : `#${target}-desktop`;
    let $targetEl = $(sectionId);
    if (!$targetEl.length) {
      sectionId = `#${target}`;
      $targetEl = $(sectionId);
    }
    if ($targetEl.length) {
      $("html, body").animate({
        scrollTop: $targetEl.offset().top
      }, 500);
    }
  });



  /** -------------------------------
   *  CUSTOM SELECT
   * --------------------------------*/
  function createCustomSelect($select) {
    const wrapper = $('<div class="custom-select-wrapper"></div>');

    // Birinchi option faqat sarlavha sifatida ishlatiladi
    const options = $select.find("option");
    const firstOptionText = options.first().text();
    const selected = $(`
      <div class="custom-selected">
      <span class="text">${firstOptionText}</span>
      <span class="arrow"></span>
      </div>
      `);

    const dropdown = $('<div class="custom-select-dropdown"><input type="text" class="search" placeholder="Поиск..."><ul class="options"></ul></div>');

    const svgArrow = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
      <path d="M4.5 6.17554L9 10.2926L13.5 6.17554" stroke="#2B303A" stroke-opacity="0.58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `;
    selected.find(".arrow").html(svgArrow);

    // Faqat birinchi optiondan keyingi optionlar ko‘rsatiladi
    options.slice(1).each(function () {
      const value = $(this).val();
      const text = $(this).text();
      if (text.trim() !== "") {
        dropdown.find(".options").append(`<li data-value="${value}">${text}</li>`);
      }
    });

    wrapper.append(selected).append(dropdown);
    $select.after(wrapper).hide(); // asl selectni yashirish

    // select bosilganda ochish/yopish
    selected.on("click", function (e) {
      e.stopPropagation();
      $(".custom-select-wrapper").not(wrapper).removeClass("open")
        .find("svg").css("transform", "rotate(0)");
      wrapper.toggleClass("open");
      selected.find("svg").css("transform", wrapper.hasClass("open") ? "rotate(180deg)" : "rotate(0)");
    });

    // option tanlanganda
    dropdown.on("click", "li", function () {
      const text = $(this).text();
      const value = $(this).data("value");
      selected.find(".text").text(text);
      $select.val(value).trigger("change");
      wrapper.removeClass("open");
      selected.find("svg").css("transform", "rotate(0)");
    });

    // qidiruv funksiyasi
    dropdown.find(".search").on("keyup", function () {
      const keyword = $(this).val().toLowerCase();
      dropdown.find("li").each(function () {
        $(this).toggle($(this).text().toLowerCase().includes(keyword));
      });
    });

    // tashqariga bosilganda yopiladi
    $(document).on("click", function (e) {
      if (!wrapper.is(e.target) && wrapper.has(e.target).length === 0) {
        wrapper.removeClass("open");
        selected.find("svg").css("transform", "rotate(0)");
      }
    });
  }

  // Select elementlar uchun custom select yaratish
  // $("select.custom-select-original").each(function () {
  //     createCustomSelect($(this));
  //   });
  if ($(".custom-select-original").length > 0) {
    $('.custom-select-original').select2();
  
    $('.custom-select-original').each(function () {
      const $select = $(this);
      const select2Container = $select.next('.select2-container');
  
      if (select2Container.find('.custom-svg-arrow').length > 0) return;
  
      // SVG arrow bilan konteyner
      const svgArrow = `
        <div class="custom-svg-arrow" style="position: absolute; right: 10px; top: 14px; pointer-events: none;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
            <path d="M4.5 6.17554L9 10.2926L13.5 6.17554" stroke="#2B303A" stroke-opacity="0.58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      `;
  
      select2Container.css('position', 'relative');
      select2Container.find('.select2-selection--single').append(svgArrow);
      select2Container.find('.select2-selection__arrow').hide();
    });
  
    // Arrow'ni aylantirish funksiyasi
    $('.custom-select-original').on('select2:open', function () {
      $(this).next('.select2-container').find('.custom-svg-arrow').css('transform', 'rotate(180deg)');
    });
  
    $('.custom-select-original').on('select2:close', function () {
      $(this).next('.select2-container').find('.custom-svg-arrow').css('transform', 'rotate(0deg)');
    });
  }
  


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

  const $footerTextElement = $('.footer_desc p');
  const $toggleTextLink = $('.footer_link .show_more');

  const fullText = $footerTextElement.text().trim();
  const sentenceEndRegex = /.*?[.!?](?=\s+[А-ЯA-Z])/s;
  const match = fullText.match(sentenceEndRegex);
  const shortText = match ? match[0] : fullText;

  let isFooterExpanded = false;

  // Boshlang'ich holatda faqat qisqa matnni ko'rsatish
  $footerTextElement.text(shortText);

  // Tugma bosilganda matnni o'zgartirish
  $toggleTextLink.on('click', function (e) {
    e.preventDefault();
    isFooterExpanded = !isFooterExpanded;

    if (isFooterExpanded) {
      $footerTextElement.text(fullText); // To'liq matnni ko'rsatish
      $toggleTextLink.text("Скрыть"); // Tugmani "Скрыть" ga o'zgartirish
    } else {
      $footerTextElement.text(shortText); // Qisqa matnni qaytarish
      $toggleTextLink.text("Подробнее"); // Tugmani "Подробнее" ga o'zgartirish
    }
  });



});