// viewer.js — Pagely 전자책 뷰어
(function () {
  "use strict";

  // ── 본문 데이터 ──
  // ※ 저작권 보호를 위해 실제 도서 내용이 아닌, 데모용으로 자체 작성한 미리보기 샘플 텍스트입니다.
  const pages = [
    {
      title: "프롤로그 — 어느 차선을 달릴 것인가",
      paragraphs: [
        "도로 위에는 여러 개의 차선이 있다. 어떤 사람은 한 번도 의심하지 않고 가장 안쪽 차선만 따라간다. 모두가 그렇게 달리기 때문이다. 그러나 목적지에 빨리 닿는 사람들은 늘 따로 있다. 그들은 차선을 바꿀 줄 아는 사람들이다.",
        "이 책은 '더 빨리 달리는 법'에 대한 이야기가 아니다. 애초에 어느 차선 위에 있는지를 묻는 이야기다. 잘못된 차선에서는 아무리 액셀을 밟아도 결국 같은 자리를 맴돌 뿐이다.",
        "지금부터 우리는 세 가지 길을 살펴볼 것이다. 멈춰 선 길, 천천히 가는 길, 그리고 앞질러 가는 길.",
      ],
    },
    {
      title: "1장 — 멈춰 선 길",
      paragraphs: [
        "첫 번째 길은 아무 계획 없이 오늘을 소비하는 삶이다. 들어온 만큼, 혹은 그 이상을 쓴다. 내일은 내일의 내가 알아서 할 것이라 믿는다.",
        "이 길 위에서는 작은 사건 하나에도 모든 것이 흔들린다. 예상치 못한 지출, 갑작스러운 변화 앞에서 버틸 여유가 없기 때문이다. 자유로워 보이지만, 사실은 가장 불안정한 길이다.",
        "문제는 속도가 아니라 방향이었다. 출발점에서 한 걸음도 나아가지 못한 채, 우리는 종종 '운이 없었다'고 말한다.",
      ],
    },
    {
      title: "2장 — 천천히 가는 길",
      paragraphs: [
        "두 번째 길은 성실의 길이다. 아끼고, 모으고, 오랜 시간을 들여 조금씩 쌓아 올린다. 분명 멈춰 선 길보다는 낫다.",
        "그러나 이 길에는 한 가지 함정이 있다. 결과를 보기까지 너무 오랜 시간이 걸린다는 것이다. 인생에서 가장 활기찬 시기를 대부분 '나중'을 위해 저당 잡힌다.",
        "성실함은 훌륭한 미덕이다. 다만, 성실함만으로는 충분하지 않을 때가 있다. 시간을 내 편으로 만드는 구조가 없다면 말이다.",
      ],
    },
    {
      title: "3장 — 앞질러 가는 길",
      paragraphs: [
        "세 번째 길은 '시스템'을 만드는 길이다. 내가 직접 모든 일을 하지 않아도, 가치를 만들어 내는 구조를 세우는 것이다.",
        "여기서 핵심은 '내 시간과 돈을 맞바꾸는 관계'를 끊는 데 있다. 잠든 사이에도, 다른 일을 하는 동안에도 작동하는 무언가를 가질 때 비로소 차선이 바뀐다.",
        "물론 이 길은 처음이 가장 가파르다. 그러나 한 번 궤도에 오르면, 들인 노력에 비해 훨씬 멀리 나아간다.",
      ],
    },
    {
      title: "4장 — 시스템의 다섯 가지 씨앗",
      paragraphs: [
        "좋은 시스템에는 공통점이 있다. 많은 사람에게 가닿고, 시간이 지나도 가치를 잃지 않으며, 나 없이도 굴러간다는 것이다.",
        "그래서 우리는 묻는다. 지금 하는 일은 나의 시간을 쓰고 사라지는가, 아니면 쌓여서 다음을 만들어 내는가?",
        "이 질문에 답할 수 있을 때, 비로소 우리는 운전대를 제대로 쥔 셈이다.",
      ],
    },
    {
      title: "에필로그 — 지금, 차선을 바꿔라",
      paragraphs: [
        "차선을 바꾸는 데 가장 좋은 때는 언제나 '지금'이다. 완벽한 조건이 갖춰지기를 기다리는 동안에도 도로는 계속 흐르고 있다.",
        "방향을 점검하고, 작은 시스템 하나를 세우는 것. 거창할 필요는 없다. 중요한 것은 오늘 핸들을 한 뼘이라도 틀어 보는 일이다.",
        "당신은 지금, 어느 차선을 달리고 있는가?",
      ],
    },
  ];

  // ── 상태 ──
  let current = 0;
  let fontSize = 17; // px
  const themes = ["", "theme-sepia", "theme-dark"];
  let themeIndex = 0;

  // ── 요소 ──
  const body = document.getElementById("viewerBody");
  const pageEl = document.getElementById("viewerPage");
  const indicator = document.getElementById("pageIndicator");
  const progressBar = document.getElementById("progressBar");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");

  // ── 렌더 ──
  function render() {
    const page = pages[current];
    let html = "<h2>" + page.title + "</h2>";
    page.paragraphs.forEach(function (p) {
      html += "<p>" + p + "</p>";
    });
    if (current === pages.length - 1) {
      html +=
        '<div class="reader-note"><i class="bi bi-info-circle"></i> ' +
        "여기까지는 구독 회원을 위한 미리보기입니다. 전체 내용은 도서를 소장하거나 구독을 이어가면 계속 읽을 수 있어요.</div>";
    }
    pageEl.innerHTML = html;
    pageEl.scrollTop = 0;

    indicator.textContent = current + 1 + " / " + pages.length;
    progressBar.style.width = ((current + 1) / pages.length) * 100 + "%";
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === pages.length - 1;
  }

  // ── 페이지 이동 ──
  function go(delta) {
    const next = current + delta;
    if (next < 0 || next >= pages.length) return;
    current = next;
    render();
  }

  prevBtn.addEventListener("click", function () { go(-1); });
  nextBtn.addEventListener("click", function () { go(1); });

  // 키보드 좌우 화살표
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  });

  // ── 글자 크기 ──
  function applyFont() {
    pageEl.style.setProperty("--reader-font", fontSize + "px");
  }

  document.getElementById("fontUp").addEventListener("click", function () {
    fontSize = Math.min(fontSize + 1, 26);
    applyFont();
  });
  document.getElementById("fontDown").addEventListener("click", function () {
    fontSize = Math.max(fontSize - 1, 13);
    applyFont();
  });

  // ── 배경 테마 (기본 → 세피아 → 야간) ──
  document.getElementById("themeToggle").addEventListener("click", function () {
    body.classList.remove(themes[themeIndex] || "no-theme");
    themeIndex = (themeIndex + 1) % themes.length;
    if (themes[themeIndex]) body.classList.add(themes[themeIndex]);

    const icon = this.querySelector("i");
    icon.className =
      themeIndex === 2 ? "bi bi-sun" : themeIndex === 1 ? "bi bi-book" : "bi bi-moon-stars";
  });

  // ── 초기화 ──
  applyFont();
  render();
})();
