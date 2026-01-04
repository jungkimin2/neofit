const supportsWebP = (() => {
  try {
    return document
      .createElement('canvas')
      .toDataURL('image/webp')
      .startsWith('data:image/webp');
  } catch (error) {
    return false;
  }
})();

const applyResponsiveImage = (imgElement, fallbackPath) => {
  if (!imgElement) return;

  const fallback = fallbackPath || imgElement.getAttribute('data-fallback') || imgElement.getAttribute('src') || '';
  const declaredWebp = imgElement.getAttribute('data-webp');

  if (imgElement.tagName === 'SOURCE') {
    if (fallback) {
      imgElement.setAttribute('data-fallback', fallback);
      imgElement.srcset = fallback;
    }
  } else {
    if (fallback) {
      imgElement.setAttribute('data-fallback', fallback);
      imgElement.src = fallback;
    }
    imgElement.removeAttribute('srcset');
  }

  if (!supportsWebP) {
    return;
  }

  const webpPath = declaredWebp || (fallback ? fallback.replace(/\.(png|jpg|jpeg)$/i, '.webp') : '');
  if (!webpPath || webpPath === fallback) {
    return;
  }

  const tester = new Image();

  tester.onload = () => {
    if (imgElement.tagName === 'SOURCE') {
      imgElement.srcset = webpPath;
    } else {
      imgElement.src = webpPath;
    }
    if (!declaredWebp) {
      imgElement.setAttribute('data-webp', webpPath);
    }
  };

  tester.onerror = () => {
    if (imgElement.tagName === 'SOURCE') {
      if (fallback) {
        imgElement.srcset = fallback;
      } else {
        imgElement.removeAttribute('srcset');
      }
    } else if (fallback) {
      imgElement.src = fallback;
    }
  };

  tester.src = webpPath;
};

// 모바일 전용 간단한 하이브 챌린지 팝업 함수 (PC와 완전 분리)
window.showMobileHiveChallengePopup = function () {
  console.log('🚀 모바일 하이브 챌린지 팝업 열기! (PC 영향 없음)');

  // 기존 모바일 팝업이 있다면 제거
  const existingPopup = document.getElementById('mobileHiveChallengePopup');
  if (existingPopup) {
    existingPopup.remove();
  }

  // 오버레이 생성
  const overlay = document.createElement('div');
  overlay.id = 'mobileHiveChallengePopup';
  overlay.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background-color: rgba(0, 0, 0, 0.9) !important;
    z-index: 2147483647 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    opacity: 0 !important;
    transition: opacity 0.3s ease !important;
  `;

  // 이미지 생성 (PC와 동일한 이미지)
  const img = document.createElement('img');
  applyResponsiveImage(img, './images/neohive93.jpg');
  img.alt = '모바일 하이브 챌린지';
  img.style.cssText = `
    max-width: 95%;
    max-height: 85%;
    object-fit: contain;
  `;

  // 닫기 버튼 생성
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255,255,255,0.9);
    border: none;
    font-size: 28px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 2147483647;
    color: #333;
  `;

  // 팝업 닫기 함수
  function closeMobilePopup() {
    overlay.style.opacity = '0';
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.remove();
      }
      document.body.style.overflow = '';
    }, 300);
  }

  // 이벤트 리스너
  closeBtn.onclick = closeMobilePopup;
  overlay.onclick = function (e) {
    if (e.target === overlay) closeMobilePopup();
  };

  // 이미지 로딩 확인
  img.onload = function () {
    console.log('✅ 모바일 하이브 챌린지 이미지 로딩 완료!');
  };
  img.onerror = function () {
    console.error('❌ 모바일 하이브 챌린지 이미지 로딩 실패!', img.src);
  };

  // DOM 조립 및 추가
  overlay.appendChild(img);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  console.log('✅ 모바일 팝업 DOM에 추가됨');

  // 페이드 인 효과
  setTimeout(() => {
    overlay.style.opacity = '1';
    console.log('✨ 모바일 팝업 페이드 인 완료');
  }, 10);
};

// 하이브 챌린지 팝업 함수 - 전역 최상위에서 먼저 정의
window.showHiveChallengePopup = function () {
  console.log('🚀 showHiveChallengePopup 함수 시작!');

  // 기존 팝업이 있다면 제거
  const existingPopup = document.getElementById('hiveChallengePopup');
  if (existingPopup) {
    console.log('🗑️ 기존 팝업 제거');
    existingPopup.remove();
  }

  // 오버레이 생성
  const overlay = document.createElement('div');
  overlay.id = 'hiveChallengePopup';
  overlay.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background-color: rgba(0, 0, 0, 0.9) !important;
    z-index: 99999999999 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    opacity: 0 !important;
    transition: opacity 0.3s ease !important;
    pointer-events: auto !important;
    transform: translateZ(999px) !important;
    will-change: opacity, transform !important;
    isolation: isolate !important;
    contain: layout style paint !important;
  `;

  // 컨테이너 생성
  const container = document.createElement('div');
  const isMobile = window.innerWidth <= 768;

  container.style.cssText = `
    position: relative !important;
    max-width: 95% !important;
    max-height: 85% !important;
    background: white !important;
    border-radius: 15px !important;
    overflow: hidden !important;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8) !important;
    z-index: 99999999999 !important;
    transform: translateZ(1000px) !important;
    will-change: transform !important;
    isolation: isolate !important;
    contain: layout style paint !important;
    ${isMobile ? 'padding-top: 88px !important;' : ''}
  `;

  // 컨텐츠 생성 (모바일은 HTML, PC는 이미지)
  let contentElement;

  if (isMobile) {
    // 모바일용 HTML 구조
    contentElement = document.createElement('div');
    contentElement.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #2d5a3d, #1a4d2e);
        padding: 30px 20px;
        border-radius: 15px;
        color: white;
        text-align: center;
        position: relative;
        overflow: hidden;
      ">
        <!-- 로고 -->
        <div style="margin-bottom: -17px !important; transform: translateY(-32px) !important;">
          <img src="https://via.placeholder.com/100x50/ffffff/000000?text=NEOHIVE" alt="NEOHIVE" style="height: 40px; opacity: 0.9;">
        </div>
        
        <!-- 메인 텍스트 (여백 최소화) -->
        <h1 style="font-size: 18px; font-weight: bold; margin: 0 0 2px 0; line-height: 1.2;">성장, 팀워크, 그리고 상금의 기회!</h1>
        <h2 style="
          font-size: 14px; 
          font-weight: bold; 
          margin: 0 0 15px 0; 
          line-height: 1.2;
          color: #ffffff;
        ">"네오-하이브 시즌2: 우리팀, 우리의 성장"</h2>
        
        <!-- 총 상금 -->
        <div style="background: rgba(255,255,255,0.95); color: #2d5a3d; padding: 12px 20px; border-radius: 25px; margin: 15px 0 10px 0; font-size: 16px; font-weight: bold;">
          총 상금 300만원!!
        </div>
        
        <!-- 챌린지 패키지 -->
        <div style="background: rgba(0,0,0,0.9); border: 2px solid #7BE495; border-radius: 15px; padding: 15px; margin-bottom: 15px;">
          <h4 style="color: #7BE495; font-size: 14px; font-weight: bold; margin: 0 0 8px 0;">🎯 네오 하이브 챌린지 패키지</h4>
          <p style="color: #fff; font-size: 12px; margin: 0; text-align: left; line-height: 1.4;">
            • 5~15% 함께 이용권 할인 받고 바로 챌린지 도전!<br>
            • 지금 신청하면 성장과 보상이 함께 찾아옵니다.
          </p>
        </div>
        
        <!-- 기간 -->
        <p style="color: #fff; font-size: 13px; font-weight: bold; margin: 0 0 15px 0;">📅 시즌2 참가&팀매칭 기간 : 9/15 ~ 10/31</p>
        
        <!-- 이벤트 내용 -->
        <div style="background: rgba(255,255,255,0.2); border-radius: 10px; padding: 12px; margin-bottom: 15px; text-align: left;">
          <h4 style="color: #7BE495; font-size: 13px; margin: 0 0 8px 0;">🎯 이벤트 개요</h4>
          <p style="font-size: 11px; margin: 0 0 8px 0; line-height: 1.3;">희원이라면 누구나 참여 가능한 이벤트</p>
          
          <h5 style="color: #FFD700; font-size: 12px; margin: 8px 0 4px 0;">🤝 팀 매칭 및 팀 운동</h5>
          <p style="font-size: 10px; margin: 0 0 8px 0; line-height: 1.3;">
            • 팀 매칭 기간동안 자유롭게 여러 팀원과 운동 진행<br>
            • 다양한 팀과 운동을 통해 서로 알아가고 최종 시즌2 챌린지 기간에 팀 선정!!
          </p>
          
          <h5 style="color: #FF6B9D; font-size: 12px; margin: 8px 0 4px 0;">🚩 접수 상승 조건</h5>
          <p style="font-size: 10px; margin: 0 0 8px 0; line-height: 1.3;">
            • 달성률과 함께 운동협력 접수 UPI<br>
            • 팀의 건강한 변화 - 체중, 근육량, 체력 등이 좋아질수록 접수 UPI
          </p>
          
          <h5 style="color: #FF4444; font-size: 12px; margin: 8px 0 4px 0;">🎁 팀 접수간 레이드 혜택!!</h5>
          <p style="font-size: 10px; margin: 0; line-height: 1.3;">운동복, 락커, 회원권 할인 혜택!!</p>
        </div>
        
        <!-- 버튼들 -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
          <label style="display: flex; align-items: center; color: white; font-size: 12px;">
            <input type="checkbox" style="margin-right: 8px;"> 오늘 하루 안보기
          </label>
          <div>
            <button style="background: #666; color: white; border: none; border-radius: 20px; padding: 8px 16px; margin-right: 8px; font-size: 12px;">×</button>
            <button style="background: #7BE495; color: #1a4d2e; border: none; border-radius: 20px; padding: 10px 20px; font-weight: bold; font-size: 14px;">참가하기</button>
          </div>
        </div>
      </div>
    `;
  } else {
    // PC용 기존 이미지
    const picture = document.createElement('picture');
    const source = document.createElement('source');
    source.type = 'image/webp';
    picture.appendChild(source);

    const img = document.createElement('img');
    img.alt = '하이브 챌린지';
    img.style.cssText = `
      width: 100%;
      height: auto;
      display: block;
      max-width: 800px;
      max-height: 600px;
      object-fit: contain;
    `;
    picture.appendChild(img);

    applyResponsiveImage(source, './images/neohive93.jpg');
    applyResponsiveImage(img, './images/neohive93.jpg');

    contentElement = picture;
  }

  // 닫기 버튼 생성
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '×';
  // 모바일과 데스크톱에 따른 닫기 버튼 위치 조정
  closeButton.style.cssText = `
    position: absolute;
    top: ${isMobile ? '130px' : '10px'};
    right: 15px;
    background: none;
    border: none;
    font-size: 24px;
    color: #333;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    z-index: 99999999999;
  `;

  // 팝업 닫기 함수
  function closeHiveChallengePopup() {
    overlay.style.opacity = '0';
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.remove();
      }
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    }, 300);
  }

  // 이벤트 리스너 추가
  closeButton.addEventListener('click', closeHiveChallengePopup);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      closeHiveChallengePopup();
    }
  });

  // 요소들 조립
  container.appendChild(contentElement);
  container.appendChild(closeButton);
  overlay.appendChild(container);

  // DOM에 추가 (문서의 맨 마지막으로)
  document.body.insertAdjacentElement('beforeend', overlay);
  console.log('✅ 팝업이 DOM 맨 마지막에 추가됨');

  // 스크롤 방지
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = '0';
  document.body.style.width = '100%';

  // 페이드 인 효과
  setTimeout(() => {
    overlay.style.opacity = '1';
    console.log('✨ 페이드 인 효과 적용됨');
  }, 10);
};

// 모바일 터치 드래그 제한 (팝업 방지하되 클릭은 허용)
if (window.innerWidth <= 768) {
  const isEntryPopupActive = () => {
    const popup = document.getElementById('entryPopup');
    if (!popup) return false;
    const computedDisplay = window.getComputedStyle(popup).display;
    const explicitlyVisible = popup.style.display && popup.style.display !== 'none';
    const hasVisibleClass = popup.classList.contains('popup-visible');
    return document.body.classList.contains('popup-open') ||
      (document.body.classList.contains('popup-active') && (explicitlyVisible || hasVisibleClass || computedDisplay !== 'none'));
  };

  let touchStartTime = 0;
  let touchStartY = 0;

  // 터치 시작 감지
  document.addEventListener('touchstart', function (e) {
    if (!isEntryPopupActive()) {
      return;
    }
    touchStartTime = Date.now();
    touchStartY = e.touches[0].clientY;

    // 멀티터치는 방지
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  // 터치 움직임 제한 (드래그 방지)
  document.addEventListener('touchmove', function (e) {
    if (!isEntryPopupActive()) {
      return;
    }

    // 예외 처리: 슬라이더나 배너 내부에서의 터치는 허용
    if (e.target.closest('.popup-slider-container') || e.target.closest('.naver-banner-container')) {
      return;
    }
    const touchDuration = Date.now() - touchStartTime;
    const touchDistance = Math.abs(e.touches[0].clientY - touchStartY);

    // 50ms 이상 터치하거나 20px 이상 이동하면 드래그로 판단하여 차단
    if (touchDuration > 50 || touchDistance > 20) {
      e.preventDefault();
    }
  }, { passive: false });

  // 바운스 효과 제거
  document.body.style.overscrollBehavior = 'none';
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.webkitTouchCallout = 'none';
}

// 하이브 챌린지 팝업 함수 - 간단한 전역 함수 (모바일 메뉴용)
window.openHiveChallenge = function () {
  console.log('🚀 openHiveChallenge 호출됨! (모바일 메뉴에서)');
  try {
    if (typeof window.showHiveChallengePopup === 'function') {
      console.log('✅ showHiveChallengePopup 함수 존재함');
      window.showHiveChallengePopup();
    } else {
      console.error('❌ showHiveChallengePopup 함수가 정의되지 않음!');
    }
  } catch (error) {
    console.error('❌ openHiveChallenge 실행 중 오류:', error);
  }
};

// 모바일 즉시 감지 및 최적화
(function () {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // 모바일 전용 클래스 즉시 추가
    document.documentElement.classList.add('is-mobile');

    // 불필요한 리소스 로딩 방지
    window.lazyLoadEnabled = true;

    // 모바일 전용 스타일 우선 로드
    const style = document.createElement('style');
    style.textContent = `
      /* 모바일 빠른 렌더링 */
      .is-mobile img { 
        opacity: 1 !important;
      }
      /* 모바일에서 불필요한 애니메이션 단축 */
      .is-mobile * {
        animation-duration: 0.2s !important;
        transition-duration: 0.2s !important;
      }
    `;
    document.head.insertBefore(style, document.head.firstChild);
  }

  // 팝업 체크를 위한 DOM 준비 상태 확인
  function checkPopupStatus() {
    // 초기에는 팝업이 표시되어야 하므로 다른 요소들을 숨긴 상태 유지
    // 팝업이 실제로 닫히거나 사용하지 않을 때만 popup-initialized 클래스 추가
  }

  // DOM이 준비되면 바로 확인 (실제로는 아무것도 하지 않음)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkPopupStatus);
  } else {
    checkPopupStatus();
  }
})();
