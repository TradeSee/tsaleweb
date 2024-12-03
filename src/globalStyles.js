import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle`
  ${css`
    @keyframes empty {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes searchLoading {
      0% {
        transform: translateX(0%) rotate(70deg);
      }

      100% {
        transform: translateX(100px) rotate(10deg);
      }
    }

    @keyframes barLoading {
      0% {
        background-position: left;
      }
      100% {
        background-position: right;
      }
    }

    @keyframes moveErroLog {
      from {
        right: -400px;
      }

      to {
        right: 0px;
      }
    }
    @keyframes moveErroLogClose {
      from {
        right: 0px;
      }

      to {
        right: -400px;
      }
    }

    @keyframes bellRing {
      0%,
      100% {
        transform-origin: top;
      }

      15% {
        transform: rotateZ(10deg);
      }

      30% {
        transform: rotateZ(-10deg);
      }

      45% {
        transform: rotateZ(5deg);
      }

      60% {
        transform: rotateZ(-5deg);
      }

      75% {
        transform: rotateZ(2deg);
      }
    }

    @keyframes greenbottomBubbles {
      0% {
        background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
          70% -10%, 70% 0%;
      }

      50% {
        background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%,
          95% 60%, 105% 0%;
      }

      100% {
        background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%,
          95% 70%, 110% 10%;
        background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
      }
    }

    @keyframes greentopBubbles {
      0% {
        background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
          40% 90%, 55% 90%, 70% 90%;
      }

      50% {
        background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
          50% 50%, 65% 20%, 90% 30%;
      }

      100% {
        background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
          50% 40%, 65% 10%, 90% 20%;
        background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
      }
    }

    @keyframes shine {
      0% {
        left: -100px;
      }

      60% {
        left: 100%;
      }

      to {
        left: 100%;
      }
    }

    @keyframes App-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `}

  * {
    box-sizing: border-box;
  }

  body {
    counter-reset: page;
    font-family: 'Inter', sans-serif;
  }

  .App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

html {
  scroll-behavior: smooth;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.balanceEffect {
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: #ffff;
  gap: 10px;
  font-weight: bold;
  outline: none;
  overflow: hidden;
  font-size: 15px;
  cursor: pointer;
}

.balanceEffect:hover {
  transform: scale(1.05);
  border-color: #fff9;
}

.balanceEffect:hover .icon {
  transform: translate(4px);
}

.balanceEffect:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.balanceEffect::before {
  content: "";
  position: absolute;
  width: 100px;
  height: 100%;
  background-image: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0) 70%
  );
  top: 0;
  left: -100px;
  opacity: 0.6;
}

@keyframes shine {
  0% {
    left: -100px;
  }

  60% {
    left: 100%;
  }

  to {
    left: 100%;
  }
}

.optDrewar:hover {
  background-color: ${({ theme }) => theme.colors.main[500]};
  cursor: pointer;
  border-radius: 15px;
}
.optDrewarOpen {
  background-color: ${({ theme }) => theme.colors.main[500]};
  cursor: pointer;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}

.BtnBannerGlass {
  position: relative;
  padding: 0px 0px;
  border-radius: 6px;
  border: none;
  color: #fff;
  cursor: pointer;
  background-color: #fff;
  transition: all 0.2s ease;
  z-index: 999999999;
}

.BtnBannerGlass:active {
  transform: scale(0.96);
}

.BtnBannerGlass:before,
.BtnBannerGlass:after {
  position: absolute;
  content: "";
  width: 150%;
  left: 50%;
  height: 100%;
  transform: translateX(-50%);
  z-index: -1000;
  background-repeat: no-repeat;
}

.BtnBannerGlass:hover:before {
  top: -70%;
  background-image: radial-gradient(circle, #fff 20%, transparent 20%),
    radial-gradient(circle, transparent 20%, #fff 20%, transparent 30%),
    radial-gradient(circle, #fff 20%, transparent 20%),
    radial-gradient(circle, #fff 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, #fff 15%, transparent 20%),
    radial-gradient(circle, #fff 20%, transparent 20%),
    radial-gradient(circle, #fff 20%, transparent 20%),
    radial-gradient(circle, #fff 20%, transparent 20%),
    radial-gradient(circle, #fff 20%, transparent 20%);
  background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%,
    10% 10%, 18% 18%;
  background-position: 50% 120%;
  animation: greentopBubbles 0.6s ease;
}

@keyframes greentopBubbles {
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
      40% 90%, 55% 90%, 70% 90%;
  }

  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
      50% 50%, 65% 20%, 90% 30%;
  }

  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
      50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}

.BtnBannerGlass:hover::after {
  bottom: -70%;
  background-image: radial-gradient(circle, #fff 20%, transparent 20%),
    radial-gradient(circle, #fff 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, #fff 15%, transparent 20%),
    radial-gradient(circle, #fff 20%, transparent 20%),
    radial-gradient(circle, #fff 20%, transparent 20%),
    radial-gradient(circle, #fff 20%, transparent 20%),
    radial-gradient(circle, #fff 20%, transparent 20%);
  background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 20% 20%, 18% 18%;
  background-position: 50% 0%;
  animation: greenbottomBubbles 0.6s ease;
}

@keyframes greenbottomBubbles {
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
      70% -10%, 70% 0%;
  }

  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
      105% 0%;
  }

  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
      110% 10%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}

.btnNotification {
  width: 50px;
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /*background-color: rgb(44, 44, 44);*/
  background-color: ${({ theme }) => theme.colors.main[500]};
  border-radius: 50%;
  cursor: pointer;
  transition-duration: 0.3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.13);
  border: none;
}

.bell {
  width: 18px;
}

.bell path {
  fill: white;
}

.btnNotification:hover {
  background-color: ${({ theme }) => theme.colors.dark[900]};
  /*background-color: rgb(56, 56, 56);*/
}

.btnNotification:hover .bell {
  animation: bellRing 0.9s both;
}

/* bell ringing animation keyframes*/
@keyframes bellRing {
  0%,
  100% {
    transform-origin: top;
  }

  15% {
    transform: rotateZ(10deg);
  }

  30% {
    transform: rotateZ(-10deg);
  }

  45% {
    transform: rotateZ(5deg);
  }

  60% {
    transform: rotateZ(-5deg);
  }

  75% {
    transform: rotateZ(2deg);
  }
}

.btnNotification:active {
  transform: scale(0.8);
}

.mainSearch {
  /*max-width: 190px;*/
  background-color: #f5f5f5;
  color: #4b4b4b;
  font-weight: bold;
  padding: 0.15rem 0.5rem;
  min-height: 40px;
  border-radius: 14px;
  outline: none;
  border: none;
  line-height: 1.15;
  box-shadow: 0px 10px 20px -18px;
  padding-left: 30px;
  -webkit-appearance: none;
  appearance: none;
}
.mainSearch::placeholder {
  color: #8a97aa;
}

*::-webkit-calendar-picker-indicator {
  display: none !important;
  background-color: inherit;
  opacity: 0;
}

.mainSearch:focus {
  border-bottom: 2px solid ${({ theme }) => theme.colors.main[500]};
  border-radius: 14px;
}

.mainSearch:hover {
  outline: 1px solid ${({ theme }) => theme.colors.light[100]};
}
.cardServices {
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-weight: bolder;
}

.cardServices:hover {
  transform: scale(1.02);
}

.cardServices:active {
  transform: scale(0.95) rotateZ(1.7deg);
}

.groupInputSale {
  display: flex;
  line-height: 30px;
  align-items: center;
  position: relative;
}

.inputSale {
  width: 100%;
  height: 45px;
  line-height: 30px;
  padding-left: 12px;
  border: 2px solid transparent;
  border-radius: 10px;
  outline: none;
  background-color: #f8fafc;
  color: #4b4b4b;
  transition: 0.5s ease;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.light[100]};
  font-weight: 530;
  font-size: 13px;
}

.inputSale-error {
  width: 100%;
  height: 45px;
  line-height: 30px;
  padding-left: 3rem;
  border: 2px solid transparent;
  border-radius: 10px;
  outline: none;
  background-color: #f8fafc;
  color: #4b4b4b;
  transition: 0.5s ease;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.danger.light} !important;
  font-weight: 530;
  font-size: 13px;
}

.inputSale::placeholder {
  color: #94a3b8;
}

.inputSale:focus,
input:hover {
  outline: none;
  border-color: ${({ theme }) => theme.colors.main[500]};
  background-color: #fff;
  box-shadow: 0 0 0 5px rgb(129 140 248 / 30%);
}

.iconInputSale {
  position: absolute;
  left: 1rem;
  fill: none;
  width: 1rem;
  height: 1rem;
}
.iconInputHide {
  position: absolute;
  right: 1rem;
  fill: none;
  width: 1rem;
  height: 1rem;
  opacity: 0.5;
}

.iconInput {
  position: absolute;
  right: 1rem;
  fill: none;
  width: 1rem;
  height: 1rem;
}

.iconInputFix {
  position: absolute;
  right: 2rem;
  fill: none;
  width: 1rem;
  height: 1rem;
}

.cardErroLogin {
  width: 100%;
  max-width: 290px;
  height: 70px;
  background: #353535;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: left;
  backdrop-filter: blur(10px);
  transition: 0.5s ease-in-out;
}

.cardErroLogin:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.imgErroLogin {
  width: 45px;
  height: 45px;
  margin-left: 10px;
  border-radius: 10px;
}

.cardErroLogin:hover > .imgErroLogin {
  transition: 0.5s ease-in-out;
}

.textBoxErroLogin {
  width: calc(100% - 90px);
  margin-left: 15px;
  color: white;
  font-family: "Poppins" sans-serif;
  height: 70px;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.textContentErroLogin {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: -17px;
}

.spanErroLogin {
  font-size: 10px;
}

.h1ErroLogin {
  font-size: 16px;
  font-weight: bold;
}

.pErroLogin {
  font-size: 12px;
  font-weight: lighter;
}

.erroStep0 {
  top: 0;
  right: -400px;
}

.erroStep1 {
  top: 0;
  right: -400px;
  animation: moveErroLog 0.5s forwards;
}
.erroStep2 {
  top: 0;
  right: 0px;
  animation: moveErroLogClose 0.5s forwards;
}

@keyframes moveErroLog {
  from {
    right: -400px;
  }

  to {
    right: 0px;
  }
}
@keyframes moveErroLogClose {
  from {
    right: 0px;
  }

  to {
    right: -400px;
  }
}

::-webkit-scrollbar {
  height: 8px; /* Altura da scrollbar */
  background-color: #ffffff; /* Cor do fundo da scrollbar */
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: ${({ theme }) =>
    theme.colors.button.main}; /* Cor do preenchimento da scrollbar */
  border-radius: 10px; /* Raio do canto da scrollbar */
}

/* Quando o cursor estiver sobre a scrollbar */
::-webkit-scrollbar-thumb:hover {
  background-color: ${({ theme }) =>
    theme.colors.button
      .hover}; /* Cor do preenchimento da scrollbar quando o cursor estiver sobre ela */
}

/* Quando a scrollbar estiver ativa (ou seja, quando ela tiver sido clicada) */
::-webkit-scrollbar-thumb:active {
  background-color: ${({ theme }) =>
    theme.colors.button
      .active}; /* Cor do preenchimento da scrollbar quando ela estiver ativa */
}

.btnNextBlue {
  background-color: ${({ theme }) => theme.colors.button.main};
}
.btnNextBlue:hover {
  background-color: ${({ theme }) => theme.colors.button.hover};
  cursor: pointer;
}
.btnNextWhite {
  background-color: #fff;
}
.btnNextWhite:hover {
  background-color: #d7e2fc;
  cursor: pointer;
}
.btnNextBlueLock {
  background-color: #628cf5;
}
.btnNextBlueLock:hover {
  background-color: #628cf5;
  cursor: no-drop;
}

.lineLM1 {
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Número máximo de linhas */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.lineLM2 {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Número máximo de linhas */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.lineLM3 {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Número máximo de linhas */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.lineLM4 {
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Número máximo de linhas */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.lineLM5 {
  display: -webkit-box;
  -webkit-line-clamp: 5; /* Número máximo de linhas */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.lineLM6 {
  display: -webkit-box;
  -webkit-line-clamp: 6; /* Número máximo de linhas */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.wrapper {
  display: inline-flex;
  list-style: none;
  height: 120px;
  width: 100%;
  padding-top: 40px;
  font-family: "Poppins", sans-serif;
  justify-content: center;
}

.wrapper .icon {
  position: relative;
  background: #F3F3F3;
  border-radius: 50%;
  margin: 10px;
  width: 40px;
  height: 40px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip {
  position: absolute;
  top: 0;
  font-size: 14px;
  background: #fff;
  color: #fff;
  padding: 5px 8px;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip::before {
  position: absolute;
  content: "";
  height: 8px;
  width: 8px;
  background: #fff;
  bottom: -3px;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon:hover .tooltip {
  top: -45px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.wrapper .icon:hover span,
.wrapper .icon:hover .tooltip {
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
}

.wrapper .facebook:hover,
.wrapper .facebook:hover .tooltip,
.wrapper .facebook:hover .tooltip::before {
  background: #c3c3c3;
  color: #fff;
}

.wrapper .twitter:hover,
.wrapper .twitter:hover .tooltip,
.wrapper .twitter:hover .tooltip::before {
  background: #c3c3c3;
  color: #17283e;
}

.wrapper .instagram:hover,
.wrapper .instagram:hover .tooltip,
.wrapper .instagram:hover .tooltip::before {
  background: #c3c3c3;
  color: #17283e;
}

.selectSale::-ms-expand {
  display: none;
}

.selectSale {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.cardsFavoriteCompanies:hover {
  background-color: #d9dff1;
  border-radius: 12px;
  cursor: pointer;
}

/*--------------*/

.loaderLoading {
  display: flex;
  align-items: center;
  justify-content: center;
}
.loaderMiniContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 130px;
  height: fit-content;
}
.barContainer {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  background-position: left;
}
.bar1 {
  width: 100%;
  height: 8px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.main[500]},
    #a0b8f5,
    ${({ theme }) => theme.colors.main[500]}
  );
  background-size: 200% 100%;
  border-radius: 10px;
  animation: barLoading ease-in-out 3s infinite alternate-reverse;
}

@keyframes barLoading {
  0% {
    background-position: left;
  }
  100% {
    background-position: right;
  }
}
.bar2 {
  width: 50%;
}
.svgIconLupa {
  position: absolute;
  left: -25px;
  margin-top: 18px;
  z-index: 2;
  width: 30%;
  animation: searchLoading ease-in-out 3s infinite alternate-reverse;
}
@keyframes searchLoading {
  0% {
    transform: translateX(0%) rotate(70deg);
  }

  100% {
    transform: translateX(100px) rotate(10deg);
  }
}

/*------------*/

.article-wrapper {
  width: 100%;
  -webkit-transition: 0.15s all ease-in-out;
  transition: 0.15s all ease-in-out;
  border-radius: 6px;
  padding: 5px;
  border: 4px solid transparent;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.light[100]};
  height: 270px;
}

.article-wrapper:hover {
  -webkit-box-shadow: 10px 10px 0 ${({ theme }) =>
    theme.colors.main[500]}, 20px 20px 0 #4444bd;
  box-shadow: 10px 10px 0 ${({ theme }) =>
    theme.colors.main[500]}, 20px 20px 0 #4444bd;
  border-color: #0578c5;
  -webkit-transform: translate(-20px, -20px);
  -ms-transform: translate(-20px, -20px);
  transform: translate(-20px, -20px);
}

.article-wrapper:active {
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
  transform: translate(0, 0);
}

.types {
  gap: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  place-content: flex-start;
}

.rounded-lg {
 /* class tailwind */
  border-radius: 6px;
}

.article-wrapper:hover .project-hover {
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  background-color: #a6c2f0;
}

.project-info {
  padding-top: 20px;
  padding: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  gap: 20px;
}

.project-title {
  font-size: 1.6em;
  margin: 0;
  font-weight: 600;
 /* depend de la font */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #4b4b4b;
}

.flex-pr {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.project-type {
  background: #94b2ff;
  color: ${({ theme }) => theme.colors.main[500]};
  background: #D9E2FB;
  color: #366dfb;
  font-weight: bold;
  padding: 0.3em 0.7em;
  border-radius: 15px;
  font-size: 12px;
  letter-spacing: -0.6px;
}

.project-hover {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  padding: 9px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.container-project {
  width: 100%;
  height: 180px;
  background: ${({ theme }) => theme.colors.dark[950]};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 20px;
}

/*------*/

.bodyEmpty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.boxEmpty {
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  animation: empty 2s infinite;
}

@keyframes empty {
  0% {
      opacity: 1;
  }
  50% {
      opacity: 0.5;
  }
  100% {
      opacity: 1;
  }
}

.metalListHover {
  cursor: pointer;
}

.metalListHover:hover {
  background-color: ${({ theme }) => theme.colors.light[100]};
}

.metalListSelect {
  background-color: ${({ theme }) => theme.colors.light[100]};
}

.cardNotification {
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

.cardNotification:hover {
  background-color: #E5EDFF;
};
`;

export default GlobalStyles;
