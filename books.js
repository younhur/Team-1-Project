// books.js — Pagely 도서 카탈로그 + 메인↔상세 연결 + 상세페이지 렌더링
//
// 역할
//  1) 모든 도서 정보를 한곳(CATALOG)에 보관 (제목을 키로 사용)
//  2) 메인/목록 페이지: 각 도서 카드의 "담기" 링크를 detail.html?book=<제목> 으로 자동 연결
//  3) 상세 페이지: URL 의 ?book= 값을 읽어 해당 도서 정보로 화면을 채움
//
// index.html(팀원 담당)에는 <script src="books.js"></script> 한 줄만 추가하면 된다.
(function () {
  "use strict";

  // ── 도서 카탈로그 (제목 → 정보) ──
  const CATALOG = {
    "부의 추월차선": {
      author: "엠제이 드마코 저 · 신소영 역",
      category: "경제경영",
      publisher: "토트", pubDate: "2013.01", pages: "472p", format: "EPUB/PDF",
      price: 12000, originalPrice: 15000,
      rating: 4.7, reviewCount: 1243,
      cover: "images/book_fastlane.jpg",
      desc:
        "당신은 지금 어느 차선을 달리고 있는가? 세계적인 베스트셀러이자 재테크 분야의 " +
        "바이블로 불리는 이 책은 부자가 되는 진짜 방법을 알려준다. 저자 엠제이 드마코는 " +
        "단순히 아끼고 절약하는 방식이 아닌, 빠른 부를 만드는 시스템 구축의 중요성을 강조한다.<br /><br />" +
        "평범한 사람들이 평생 일하고도 부자가 되지 못하는 이유를 '서행차선'이라는 개념으로 " +
        "날카롭게 분석하며, 누구나 인생의 '추월차선'으로 갈아탈 수 있는 구체적인 로드맵을 제시한다. " +
        "돈이 아니라 시간의 자유를 원하는 모든 이에게 권하는 단 한 권의 책.",
      toc: [
        { part: "1부 — 부의 잘못된 지도", lines: [["1장. 나는 어떻게 백만장자가 되었나", "p.18"], ["2장. 부의 신화와 수학", "p.34"], ["3장. 느린 차선의 치명적 결함", "p.52"]] },
        { part: "2부 — 부의 추월차선으로 갈아타기", lines: [["4장. 추월차선의 사고방식", "p.88"], ["5장. 부의 5가지 씨앗", "p.110"]] },
        { part: "3부 — 시스템을 만드는 법", lines: [["6장. 돈을 만드는 시스템", "p.158"], ["7장. 자동화의 힘", "p.182"]] },
        { part: "4부 — 재정적 자유를 향한 로드맵", lines: [["8장. 자유를 향한 마지막 관문", "p.420"], ["9장. 지금 시작하라", "p.448"]] }
      ]
    },

    "아주 작은 습관의 힘": {
      author: "제임스 클리어 저",
      category: "자기개발",
      publisher: "비즈니스북스", pubDate: "2019.02", pages: "320p", format: "EPUB/PDF",
      price: 13500, originalPrice: 16000,
      rating: 4.8, reviewCount: 2105,
      cover: "images/book_selfdev1.png",
      desc:
        "매일 1%의 작은 변화가 만들어내는 놀라운 복리의 힘. 좋은 습관은 쉽게 만들고 나쁜 습관은 " +
        "자연스럽게 버리는, 과학적이고 실천적인 행동 설계의 모든 것을 담았다.<br /><br />" +
        "의지력에 기대지 않고 환경과 시스템을 바꿔 변화를 지속시키는 구체적인 방법을 알려준다.",
      toc: [
        { part: "1부 — 습관의 작동 원리", lines: [["1장. 아주 작은 습관의 놀라운 힘", "p.16"], ["2장. 정체성을 바꾸는 습관", "p.42"]] },
        { part: "2부 — 4가지 행동 변화 법칙", lines: [["3장. 분명하게 만들어라", "p.78"], ["4장. 매력적으로 만들어라", "p.120"], ["5장. 쉽게, 그리고 만족스럽게", "p.166"]] }
      ]
    },

    "달빛 아래 우리": {
      author: "김서연 저",
      category: "로맨스",
      publisher: "페이지문학", pubDate: "2024.06", pages: "268p", format: "EPUB",
      price: 8900, originalPrice: 11000,
      rating: 4.5, reviewCount: 642,
      cover: "images/book_romance1.png",
      desc:
        "달빛이 닿는 골목 끝 작은 서점에서 시작된 두 사람의 이야기. 서툴지만 진심이었던 " +
        "첫 마음을 섬세한 문장으로 그려낸 감성 로맨스.<br /><br />" +
        "스쳐 지나갈 뻔한 인연이 책 한 권으로 이어지는, 잔잔하고 따뜻한 사랑 이야기.",
      toc: [
        { part: "1부 — 골목 끝 서점", lines: [["1장. 우연한 첫 만남", "p.12"], ["2장. 빌려간 책", "p.46"]] },
        { part: "2부 — 달빛 아래에서", lines: [["3장. 말하지 못한 마음", "p.92"], ["4장. 우리의 계절", "p.150"]] }
      ]
    },

    "검과 마법의 제국": {
      author: "이준혁 저",
      category: "판타지",
      publisher: "페이지판타지", pubDate: "2023.09", pages: "412p", format: "EPUB",
      price: 9500, originalPrice: 12000,
      rating: 4.6, reviewCount: 988,
      cover: "images/book_fantasy1.png",
      desc:
        "검과 마법이 지배하는 대륙, 몰락한 제국의 마지막 후예가 운명을 건 여정에 나선다. " +
        "장대한 세계관과 숨막히는 전투가 펼쳐지는 본격 판타지.<br /><br />" +
        "잃어버린 왕좌와 대륙의 비밀을 둘러싼 거대한 모험이 시작된다.",
      toc: [
        { part: "1부 — 몰락한 제국", lines: [["1장. 마지막 후예", "p.10"], ["2장. 떠나는 길", "p.52"]] },
        { part: "2부 — 검과 마법", lines: [["3장. 동료들", "p.108"], ["4장. 첫 전투", "p.176"]] }
      ]
    },

    "돈의 심리학": {
      author: "모건 하우절 저",
      category: "경제경영",
      publisher: "인플루엔셜", pubDate: "2021.01", pages: "280p", format: "EPUB/PDF",
      price: 14000, originalPrice: 17000,
      rating: 4.7, reviewCount: 1532,
      cover: "images/book_economy2.png",
      desc:
        "부는 지식이 아니라 행동의 문제다. 돈을 대하는 인간의 심리와 습관을 19가지 통찰로 " +
        "풀어내며, 평생 흔들리지 않는 자산 관리의 태도를 알려준다.<br /><br />" +
        "복잡한 금융 이론 대신, 부와 행복을 함께 지키는 마음가짐에 대한 이야기.",
      toc: [
        { part: "1부 — 돈을 대하는 마음", lines: [["1장. 아무도 미치지 않았다", "p.14"], ["2장. 행운과 리스크", "p.40"]] },
        { part: "2부 — 부의 태도", lines: [["3장. 결코 충분하지 않다", "p.86"], ["4장. 복리의 마법", "p.132"]] }
      ]
    },

    "슬램덩크 완전판": {
      author: "이노우에 타케히코 저",
      category: "만화",
      publisher: "대원씨아이", pubDate: "2018.11", pages: "200p", format: "EPUB",
      price: 7500, originalPrice: 9000,
      rating: 4.9, reviewCount: 3120,
      cover: "images/book_comic1.png",
      desc:
        "농구를 시작한 불량소년 강백호와 북산고 농구부의 뜨거운 청춘. 세대를 뛰어넘어 " +
        "사랑받는 전설적 농구 만화의 완전판.<br /><br />" +
        "포기란 없다 — 코트 위에서 성장하는 소년들의 빛나는 순간을 다시 만난다.",
      toc: [
        { part: "1부 — 농구를 시작하다", lines: [["1화. 강백호 등장", "p.6"], ["2화. 풋내기 슛", "p.40"]] },
        { part: "2부 — 북산고 농구부", lines: [["3화. 라이벌", "p.92"], ["4화. 첫 경기", "p.150"]] }
      ]
    },

    "미라클 모닝": {
      author: "할 엘로드 저",
      category: "자기개발",
      publisher: "한빛비즈", pubDate: "2016.05", pages: "304p", format: "EPUB/PDF",
      price: 11000, originalPrice: 13500,
      rating: 4.4, reviewCount: 870,
      cover: "images/book_selfdev2.png",
      desc:
        "아침 시간을 바꾸면 인생이 바뀐다. 누구나 따라 할 수 있는 6가지 아침 습관으로 " +
        "하루를, 그리고 삶 전체를 변화시키는 방법을 제시한다.<br /><br />" +
        "평범한 아침을 인생 최고의 시간으로 만드는 가장 확실한 루틴.",
      toc: [
        { part: "1부 — 아침을 바꾸는 이유", lines: [["1장. 인생을 바꾸는 아침", "p.12"], ["2장. 기상의 기술", "p.40"]] },
        { part: "2부 — 6가지 아침 습관", lines: [["3장. 침묵·확언·시각화", "p.78"], ["4장. 운동·독서·쓰기", "p.120"]] }
      ]
    },

    "제로 투 원": {
      author: "피터 틸 저",
      category: "경제경영",
      publisher: "한국경제신문", pubDate: "2014.11", pages: "252p", format: "EPUB/PDF",
      price: 13000, originalPrice: 15500,
      rating: 4.6, reviewCount: 1340,
      cover: "images/book_economy3.png",
      desc:
        "경쟁하지 말고 독점하라. 0에서 1을 만드는 창업가의 사고법과, 미래를 만드는 " +
        "스타트업의 비밀을 실리콘밸리 거물이 직접 들려준다.<br /><br />" +
        "남들이 보지 못한 진실을 찾아 새로운 가치를 창조하는 법에 관한 책.",
      toc: [
        { part: "1부 — 미래를 만드는 질문", lines: [["1장. 0에서 1로", "p.10"], ["2장. 경쟁이라는 환상", "p.44"]] },
        { part: "2부 — 독점의 기술", lines: [["3장. 스타트업의 비밀", "p.96"], ["4장. 마지막 우위", "p.158"]] }
      ]
    },

    "검과 마법의 제국 2": {
      author: "이준혁 저",
      category: "판타지",
      publisher: "페이지판타지", pubDate: "2024.03", pages: "428p", format: "EPUB",
      price: 9500, originalPrice: 12000,
      rating: 4.5, reviewCount: 410,
      cover: "images/book_fantasy1.png",
      desc:
        "제국의 후예가 잃어버린 왕좌를 되찾기 위한 두 번째 여정. 새로운 동료와 더 강력한 적, " +
        "그리고 대륙을 뒤흔들 비밀이 드러난다.<br /><br />" +
        "'검과 마법의 제국' 시리즈의 스케일을 한층 키운 후속작.",
      toc: [
        { part: "1부 — 두 번째 여정", lines: [["1장. 돌아온 후예", "p.10"], ["2장. 새로운 동료", "p.54"]] },
        { part: "2부 — 왕좌를 향해", lines: [["3장. 더 강한 적", "p.112"], ["4장. 대륙의 비밀", "p.180"]] }
      ]
    },

    "달빛 아래 우리 3": {
      author: "김서연 저",
      category: "로맨스",
      publisher: "페이지문학", pubDate: "2025.02", pages: "276p", format: "EPUB",
      price: 8900, originalPrice: 11000,
      rating: 4.6, reviewCount: 305,
      cover: "images/book_romance1.png",
      desc:
        "서점 골목에서 시작된 두 사람의 사랑이 맞이한 새로운 계절. 곁에 있어 더 애틋한 마음을 " +
        "담은 '달빛 아래 우리' 시리즈의 세 번째 이야기.<br /><br />" +
        "익숙해진 사이에서도 변하지 않는 진심을 그린 따뜻한 완결편.",
      toc: [
        { part: "1부 — 새로운 계절", lines: [["1장. 다시 그 골목", "p.12"], ["2장. 변하지 않은 마음", "p.48"]] },
        { part: "2부 — 곁에서", lines: [["3장. 작은 다툼", "p.94"], ["4장. 우리, 계속", "p.152"]] }
      ]
    }
  };

  const DEFAULT_TITLE = "부의 추월차선";

  // ── 유틸 ──
  function formatPrice(n) {
    return "₩" + Number(n).toLocaleString("ko-KR");
  }

  // 평점(0~5)을 별 아이콘 HTML 로 변환
  function starsHtml(rating) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) html += '<i class="bi bi-star-fill"></i>';
      else if (rating >= i - 0.5) html += '<i class="bi bi-star-half"></i>';
      else html += '<i class="bi bi-star"></i>';
    }
    return html;
  }

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  // ── 1) 메인/목록/상세의 도서 카드 "담기" 링크를 책별 상세페이지로 자동 연결 ──
  function wireBookLinks() {
    const links = document.querySelectorAll('a[href="detail.html"]');
    links.forEach(function (a) {
      const card = a.closest(".book-card");
      if (!card) return;
      const titleEl = card.querySelector(".book-title");
      if (!titleEl) return;
      const title = titleEl.textContent.trim();
      a.setAttribute("href", "detail.html?book=" + encodeURIComponent(title));
    });
  }

  // ── 2) 상세페이지 렌더링 ──
  function renderToc(toc) {
    const acc = document.getElementById("tocAccordion");
    if (!acc || !toc) return;
    acc.innerHTML = toc
      .map(function (part, i) {
        const collapseId = "toc" + (i + 1);
        const open = i === 0;
        const lines = part.lines
          .map(function (l) {
            return (
              '<div class="toc-line"><span>' + l[0] + '</span><span class="toc-page">' + l[1] + "</span></div>"
            );
          })
          .join("");
        return (
          '<div class="accordion-item">' +
          '<h3 class="accordion-header">' +
          '<button class="accordion-button' + (open ? "" : " collapsed") + '" type="button" ' +
          'data-bs-toggle="collapse" data-bs-target="#' + collapseId + '">' + part.part + "</button>" +
          "</h3>" +
          '<div id="' + collapseId + '" class="accordion-collapse collapse' + (open ? " show" : "") + '" data-bs-parent="#tocAccordion">' +
          '<div class="accordion-body">' + lines + "</div>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  function renderDetail(title, book) {
    // 문서 제목
    document.title = title + " — Pagely";

    // 장르 태그
    const genre = document.querySelector(".genre-tag");
    if (genre) genre.textContent = book.category;

    // 제목 / 저자
    const titleEl = document.querySelector(".detail-title");
    if (titleEl) titleEl.textContent = title;
    const authorEl = document.querySelector(".detail-author");
    if (authorEl) authorEl.textContent = book.author;

    // 상단 별점 (리뷰 수 포함) — 페이지 내 첫 번째 .detail-stars
    const headerStars = document.querySelector(".detail-stars");
    if (headerStars) {
      headerStars.innerHTML =
        starsHtml(book.rating) +
        '<span class="review-count">' + book.rating + " (리뷰 " + book.reviewCount.toLocaleString("ko-KR") + "개)</span>";
    }

    // 정보 행: [출판사, 출간일, 페이지, 파일형식] 순서
    const vals = document.querySelectorAll(".info-row .info-val");
    if (vals.length >= 4) {
      vals[0].textContent = book.publisher;
      vals[1].textContent = book.pubDate;
      vals[2].textContent = book.pages;
      vals[3].textContent = book.format;
    }

    // 가격
    const priceEl = document.querySelector(".detail-price");
    if (priceEl) {
      let html = formatPrice(book.price) + " ";
      html += '<span class="price-sub">';
      if (book.originalPrice) html += '<del class="text-muted">' + formatPrice(book.originalPrice) + "</del> · ";
      html += "구독 시 무료</span>";
      priceEl.innerHTML = html;
    }

    // 표지 (이미지가 없으면 기본 표지로 대체)
    const cover = document.querySelector(".detail-cover-img");
    if (cover) {
      cover.alt = title + " 표지";
      cover.onerror = function () {
        this.onerror = null;
        this.src = "images/book_fastlane.jpg";
      };
      cover.src = book.cover;
    }

    // 책 소개
    const desc = document.querySelector(".detail-desc");
    if (desc) desc.innerHTML = book.desc;

    // 브레드크럼: [홈, 카테고리, 현재 도서]
    const crumbs = document.querySelectorAll(".breadcrumb .breadcrumb-item");
    if (crumbs.length >= 3) {
      const catLink = crumbs[1].querySelector("a");
      if (catLink) catLink.textContent = book.category;
      crumbs[2].textContent = title;
    }

    // 리뷰 요약 (점수 / 별 / 개수) — 헤더 평점과 일치시킴
    const reviewScore = document.querySelector(".review-score");
    if (reviewScore) reviewScore.textContent = book.rating;
    const summary = document.querySelector(".review-summary");
    if (summary) {
      const summaryStars = summary.querySelector(".detail-stars");
      if (summaryStars) summaryStars.innerHTML = starsHtml(book.rating);
      const countEl = summary.querySelector(".text-muted");
      if (countEl) countEl.textContent = "리뷰 " + book.reviewCount.toLocaleString("ko-KR") + "개";
    }

    // 목차
    renderToc(book.toc);
  }

  // ── 실행 ── (스크립트가 </body> 직전에 로드되므로 DOM 은 준비된 상태)
  wireBookLinks();

  // 상세페이지인지 판별 (.detail-title 존재 여부)
  if (document.querySelector(".detail-title")) {
    let title = getParam("book");
    let book = title && CATALOG[title] ? CATALOG[title] : null;
    if (!book) {
      title = DEFAULT_TITLE;
      book = CATALOG[DEFAULT_TITLE];
    }
    renderDetail(title, book);
    // detail.js 에서 장바구니/결제에 사용
    window.PAGELY_BOOK = { name: title, amount: book.price };
  }

  // 다른 스크립트에서 접근할 수 있도록 카탈로그 노출
  window.PAGELY_CATALOG = CATALOG;
})();
