// detail.js — Pagely 도서 상세페이지 인터랙션
(function () {
  "use strict";

  // ── 위시리스트(하트) 토글 ──
  const wishBtn = document.getElementById("wishBtn");
  if (wishBtn) {
    wishBtn.addEventListener("click", function () {
      const active = this.classList.toggle("active");
      const icon = this.querySelector("i");
      icon.classList.toggle("bi-heart");
      icon.classList.toggle("bi-heart-fill");
      this.lastChild.textContent = active ? " 위시리스트 추가됨" : " 위시리스트";
    });
  }

  // ── 공유하기: 현재 페이지 주소 복사 ──
  const shareBtn = document.getElementById("shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      const url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(url)
          .then(() => alert("링크가 복사되었습니다.\n" + url))
          .catch(() => alert("링크: " + url));
      } else {
        alert("링크: " + url);
      }
    });
  }

  // ── 장바구니 담은 도서 수 (네비 배지) ──
  let cartCount = 0;
  const cartBadge = document.getElementById("cartCount");

  function updateCartBadge() {
    if (!cartBadge) return;
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? "inline-block" : "none";
  }

  // ── 장바구니 담기 ──
  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    cartBtn.addEventListener("click", function () {
      cartCount += 1;
      updateCartBadge();
      alert("'부의 추월차선'을(를) 장바구니에 담았습니다.");
    });
  }

  // ── 소장하기 → 토스페이먼츠 결제 연동 ──
  // 테스트 클라이언트 키. 실제 서비스 시 토스페이먼츠 대시보드의 우리 팀 키로 교체하세요.
  // https://developers.tosspayments.com/my/api-keys
  const TOSS_CLIENT_KEY = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";

  const BOOK = { name: "부의 추월차선", amount: 12000 };

  // 결제 완료/실패 후 돌아올 주소 (현재 폴더 기준)
  const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);

  const buyBtn = document.getElementById("buyBtn");
  if (buyBtn) {
    buyBtn.addEventListener("click", function () {
      if (typeof TossPayments === "undefined") {
        alert("결제 모듈을 불러오지 못했습니다. 인터넷 연결을 확인해 주세요.");
        return;
      }

      const tossPayments = TossPayments(TOSS_CLIENT_KEY);
      const orderId = "pagely_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

      tossPayments
        .requestPayment("카드", {
          amount: BOOK.amount,
          orderId: orderId,
          orderName: BOOK.name,
          customerName: "Pagely 고객",
          successUrl: baseUrl + "index.html",
          failUrl: baseUrl + "index.html",
        })
        .catch(function (error) {
          if (error.code === "USER_CANCEL") {
            // 사용자가 결제창을 닫음 — 별도 처리 없음
          } else {
            alert("결제 요청 중 오류가 발생했습니다: " + error.message);
          }
        });
    });
  }

  const subscribeBtn = document.getElementById("subscribeBtn");
  if (subscribeBtn) {
    subscribeBtn.addEventListener("click", function () {
      // 전자책 뷰어로 이동
      window.location.href = "viewer.html";
    });
  }
})();
