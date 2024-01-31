import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ClarityIcons} from '@cds/core/icon';
import {ClarityModule} from '@clr/angular';
import {ThemeToggleComponent, ToastContainerComponent} from 'clr-extension';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

import {VerticalNavComponent} from './core/components/vertical-nav/vertical-nav.component';

// register the languages you need
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);

// register clarity icons
ClarityIcons.addIcons([
  'pipes',
  `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.33204 17H5.85613C6.03967 17 6.18817 16.8567 6.18817 16.68V14.9417C6.18817 14.765 6.03967 14.6217 5.85613 14.6217H5.25164L5.23192 5.6825C5.23128 5.4114 5.34054 5.15626 5.539 4.96423C5.73711 4.77219 6.00431 4.66626 6.29356 4.66562C6.57403 4.66562 6.838 4.77062 7.03644 4.96157C7.23587 5.15297 7.34578 5.40765 7.34611 5.67891L7.35583 12.3255C7.35746 13.4456 7.81208 14.498 8.63504 15.2884C9.45575 16.0767 10.5459 16.5108 11.7045 16.5108C11.7048 16.5108 11.7136 16.5108 11.7139 16.5108C12.8757 16.5084 13.9672 16.0703 14.7869 15.2771C15.6067 14.4839 16.0567 13.4305 16.0541 12.3108L16.0347 3.37828H16.668C16.8515 3.37828 17 3.235 17 3.05829V1.31999C17 1.14328 16.8515 1 16.668 1H12.1442C11.9607 1 11.8122 1.14328 11.8122 1.31999V3.05829C11.8122 3.235 11.9607 3.37828 12.1442 3.37828H12.7383L12.758 12.3174C12.7587 12.5884 12.6494 12.8436 12.4509 13.0356C12.2528 13.2277 11.9885 13.3336 11.7048 13.3342C11.4243 13.3342 11.1604 13.2292 10.9619 13.0383C10.7625 12.8469 10.6526 12.592 10.652 12.321L10.6425 5.67468C10.6412 4.55453 10.187 3.50203 9.36334 2.71124C8.54231 1.92313 7.44954 1.48907 6.27606 1.48907C5.11422 1.49141 4.02275 1.92954 3.20302 2.72281C2.3833 3.51594 1.93323 4.56954 1.93582 5.68907L1.95554 14.6217H1.33204C1.1485 14.6217 1 14.765 1 14.9417V16.68C1 16.8567 1.1485 17 1.33204 17ZM12.4762 1.64001H16.3359V2.73829H15.702H13.0696H12.4762V1.64001ZM3.67385 3.17438C4.36842 2.50234 5.29289 2.13111 6.28577 2.12906C7.2725 2.12906 8.19891 2.49688 8.89445 3.16469C9.59227 3.83469 9.97717 4.72641 9.97847 5.67548L9.98786 12.322C9.98852 12.7642 10.1682 13.1797 10.4931 13.4916C10.817 13.8028 11.2473 13.9742 11.7084 13.9742C12.1675 13.9733 12.5985 13.8003 12.9218 13.4872C13.2451 13.1741 13.4228 12.7581 13.4221 12.3161L13.4023 3.37828H15.3706L15.3901 12.312C15.392 13.2608 15.0107 14.1534 14.3161 14.8255C13.6215 15.4975 12.6971 15.8688 11.7133 15.8708H11.7045C10.723 15.8708 9.79913 15.503 9.10393 14.835C8.40645 14.1653 8.02153 13.2738 8.01993 12.3245L8.01019 5.67814C8.00988 5.23594 7.83055 4.82047 7.50533 4.50827C7.18138 4.19703 6.75108 4.02563 6.29 4.02563C5.82533 4.02657 5.39147 4.19953 5.06818 4.51266C4.74489 4.82579 4.56719 5.24171 4.56785 5.68375L4.58761 14.6216H2.61969L2.5999 5.68782C2.59796 4.73907 2.97927 3.84642 3.67385 3.17438ZM1.66407 15.2617H5.52407V16.36H1.66407V15.2617Z" fill="currentColor"/>
  </svg>`,
]);

ClarityIcons.addIcons([
  'utilities',
  `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.52856 10.8784L8.06284 11.4662C7.39714 12.3023 6.79143 13.0733 6.30857 13.7025C6.02856 14.1043 5.41142 14.4529 4.78285 14.5563C4.64857 14.577 4.51999 14.5888 4.39428 14.5888C3.96857 14.5888 3.5857 14.4647 3.27142 14.2254C2.99141 13.995 2.77999 13.7734 2.61713 13.5489C2.31427 13.1235 2.20285 12.5829 2.29428 11.9832C2.39142 11.3304 2.7257 10.6893 3.12571 10.3909C3.83999 9.81783 4.68855 9.09702 5.58856 8.3319L5.85141 8.11034L6.25714 8.52983L5.95142 8.78979C5.04856 9.55491 4.19713 10.2787 3.46857 10.8636C3.2257 11.0468 2.94284 11.5165 2.85999 12.0718C2.81143 12.382 2.81143 12.8252 3.07714 13.1944C3.21142 13.3835 3.3857 13.5637 3.61999 13.7587C3.96571 14.0216 4.39714 14.0186 4.69427 13.9714C5.23142 13.8827 5.68285 13.5903 5.85427 13.3451C6.34571 12.704 6.95428 11.9271 7.62285 11.0911L8.11999 10.4589L8.51427 10.8665C8.51999 10.8725 8.52285 10.8754 8.52856 10.8784Z" fill="currentColor"/>
<path d="M14.8371 4.36449L13.8571 6.9789C13.8429 7.0173 13.8229 7.05275 13.7943 7.07935C13.06 7.83855 11.9628 8.09556 10.9943 7.75288C10.8971 7.87991 10.7943 8.01285 10.6857 8.14875L10.02 8.99363L9.61428 8.57415L10.2457 7.77652C10.3686 7.61699 10.4828 7.46928 10.5943 7.32157L10.6771 7.21523C10.7571 7.10888 10.8971 7.07343 11.0143 7.12661C11.7971 7.48111 12.7257 7.31272 13.3486 6.70417L14.2371 4.33198L14.1857 4.2788L12.4571 6.06606C12.3457 6.18423 12.1629 6.18423 12.0514 6.06606L10.5029 4.46492C10.4514 4.41175 10.42 4.33493 10.42 4.25812C10.42 4.17837 10.4514 4.10452 10.5029 4.04839L12.2343 2.26112L11.7914 1.80323L9.50285 2.72198C8.79143 3.50186 8.71428 4.71603 9.32857 5.57272C9.41998 5.70271 9.39714 5.8829 9.27713 5.9804C8.91142 6.28172 8.50285 6.62144 8.07428 6.98186L7.66571 6.55942C8.03428 6.25217 8.38856 5.95676 8.71714 5.68498C8.09714 4.60081 8.25714 3.17396 9.13713 2.26112C9.16571 2.23158 9.19999 2.2109 9.23714 2.19613L11.76 1.18286C11.8657 1.1415 11.9828 1.1681 12.0657 1.2508L12.8429 2.05138C12.8943 2.10751 12.9257 2.18137 12.9257 2.26112C12.9257 2.33793 12.8943 2.41474 12.8429 2.47087L11.1086 4.25812L12.2543 5.43978L13.9828 3.65253C14.0943 3.53731 14.2771 3.53731 14.3857 3.65253L14.7714 4.04839C14.8543 4.1311 14.88 4.25517 14.8371 4.36449Z" fill="currentColor"/>
<path d="M3.93613 6.0101C3.88562 6.0101 3.83484 5.99625 3.78908 5.96798L2.22184 4.99547C2.18166 4.97066 2.1479 4.93576 2.1239 4.89421L1.18361 3.27376C1.11609 3.1575 1.13395 3.00864 1.22658 2.91286L2.48049 1.61667C2.57312 1.52031 2.7171 1.503 2.82954 1.57224L4.39678 2.54445C4.43696 2.56927 4.47072 2.60417 4.49472 2.64572L5.43501 4.26617C5.50253 4.38243 5.48467 4.53129 5.39204 4.62707L4.13813 5.92355C4.08317 5.98038 4.00979 6.0101 3.93613 6.0101ZM2.57703 4.52696L3.89176 5.34282L4.83038 4.37233L4.04159 3.01296L2.72686 2.1974L1.78825 3.1676L2.57703 4.52696Z" fill="currentColor"/>
<path d="M10.1743 9.56969C10.0628 9.68489 9.87999 9.68489 9.76855 9.56969L5.18855 4.83419L4.33998 5.71452L8.6857 10.2107C8.70285 10.2255 8.71713 10.2432 8.73141 10.258L8.91997 10.45C9.03141 10.5652 9.03141 10.7514 8.91997 10.8666C8.86284 10.9256 8.79142 10.9552 8.71713 10.9552C8.64856 10.9552 8.58283 10.9316 8.52855 10.8784C8.52284 10.8754 8.51998 10.8725 8.51426 10.8666L8.11998 10.4589L3.73427 5.92131C3.62284 5.8061 3.62284 5.62 3.73427 5.50478L4.9857 4.20791C5.03999 4.15178 5.11142 4.12225 5.18855 4.12225C5.26569 4.12225 5.33712 4.15178 5.39141 4.20791L10.1743 9.15315C10.2857 9.26836 10.2857 9.45448 10.1743 9.56969Z" fill="currentColor"/>
<path d="M8.97684 12.7472C8.90374 12.7472 8.83064 12.7184 8.77483 12.6607L7.77902 11.6311C7.66741 11.5157 7.66741 11.3287 7.77902 11.2133L10.695 8.1983C10.8066 8.08291 10.9874 8.08291 11.0991 8.1983L12.0949 9.22793C12.2065 9.34332 12.2065 9.53027 12.0949 9.64566L9.17885 12.6607C9.12305 12.7184 9.04994 12.7472 8.97684 12.7472ZM8.38505 11.4222L8.97684 12.0341L11.4888 9.43679L10.897 8.8249L8.38505 11.4222Z" fill="currentColor"/>
<path d="M12.9006 15.1273H12.8998C12.409 15.127 11.9481 14.9291 11.6013 14.5699L9.26699 12.1538C9.15567 12.0381 9.15567 11.8512 9.26727 11.7358C9.37888 11.621 9.55996 11.6207 9.67157 11.7361L12.0058 14.1525C12.2444 14.4 12.5622 14.5362 12.9001 14.5364H12.9006C13.2385 14.5364 13.5561 14.4003 13.7949 14.1533C14.0337 13.9061 14.1654 13.5778 14.1654 13.2281C14.1652 12.8788 14.0335 12.5502 13.7943 12.3035L11.457 9.89001C11.3454 9.77462 11.3454 9.58767 11.4567 9.47199C11.5683 9.35659 11.7494 9.35688 11.861 9.4717L14.1981 11.8852C14.5452 12.2438 14.7366 12.7204 14.7369 13.2279C14.7369 13.7353 14.546 14.2125 14.1989 14.5711C13.8521 14.9297 13.3912 15.127 12.9006 15.1273Z" fill="currentColor"/>
</svg>
`,
]);

ClarityIcons.addIcons([
  'components',
  `<svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 13C14.8589 13 14.7178 12.9702 14.5864 12.9102L3.58643 7.91016C3.229 7.74805 3 7.39209 3 7C3 6.60791 3.229 6.25195 3.58643 6.08984L14.5864 1.08984C14.8491 0.969727 15.1509 0.969727 15.4136 1.08984L26.4136 6.08984C26.771 6.25195 27 6.60791 27 7C27 7.39209 26.771 7.74805 26.4136 7.91016L15.4136 12.9102C15.2822 12.9702 15.1411 13 15 13ZM6.4165 7L15 10.9014L23.5835 7L15 3.09863L6.4165 7Z" fill="currentColor"/>
  <path d="M13 29C12.8594 29 12.7183 28.9702 12.5864 28.9102L1.58643 23.9102C1.229 23.748 1 23.3921 1 23V11C1 10.6602 1.17285 10.3433 1.4585 10.1592C1.74512 9.97558 2.10547 9.9497 2.41357 10.0898L13.4136 15.0898C13.771 15.252 14 15.6079 14 16V28C14 28.3398 13.8271 28.6567 13.5415 28.8408C13.3774 28.9463 13.189 29 13 29ZM3 22.356L12 26.4468V16.644L3 12.5532V22.356Z" fill="currentColor"/>
  <path d="M17 29C16.811 29 16.6226 28.9463 16.4585 28.8408C16.1729 28.6567 16 28.3398 16 28V16C16 15.6079 16.229 15.252 16.5864 15.0898L27.5864 10.0898C27.895 9.94922 28.2554 9.97461 28.5415 10.1592C28.8271 10.3433 29 10.6602 29 11V23C29 23.3921 28.771 23.748 28.4136 23.9102L17.4136 28.9102C17.2817 28.9702 17.1406 29 17 29ZM18 16.644V26.4468L27 22.356V12.5532L18 16.644Z" fill="currentColor"/>
  </svg>
`,
]);

ClarityIcons.addIcons([
  'validators',
  `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.04178 1.58543C6.69694 1.58441 7.3442 1.72843 7.93711 2.00716C8.53002 2.28588 9.05389 2.69239 9.47111 3.19752C9.48594 3.2157 9.50422 3.23076 9.5249 3.24183C9.54558 3.25291 9.56825 3.25978 9.59159 3.26206C9.61494 3.26434 9.63851 3.26197 9.66094 3.2551C9.68336 3.24823 9.70421 3.23698 9.72227 3.22202C9.74034 3.20705 9.75526 3.18866 9.76618 3.1679C9.7771 3.14713 9.78381 3.12442 9.78591 3.10105C9.78801 3.07769 9.78547 3.05414 9.77843 3.03177C9.77139 3.00939 9.75999 2.98863 9.74489 2.97068C9.02223 2.09929 8.01538 1.51072 6.90153 1.30854C5.78768 1.10636 4.63821 1.30353 3.65541 1.86534C2.6726 2.42716 1.91945 3.31761 1.52848 4.38001C1.13752 5.44241 1.13381 6.60866 1.51799 7.67353C1.90218 8.73839 2.64964 9.63363 3.62885 10.2017C4.60806 10.7698 5.75625 10.9742 6.87136 10.7792C7.98648 10.5841 8.99706 10.0019 9.72525 9.13518C10.4534 8.26842 10.8526 7.17259 10.8524 6.04054V6.03876C10.8522 5.99162 10.8333 5.94649 10.7997 5.91332C10.7662 5.88014 10.7209 5.86164 10.6738 5.86188C10.6266 5.86211 10.5815 5.88107 10.5483 5.91457C10.5152 5.94808 10.4967 5.99339 10.4969 6.04054C10.4971 6.92193 10.2359 7.78358 9.74629 8.5165C9.25672 9.24942 8.5608 9.82069 7.74654 10.1581C6.93227 10.4954 6.03625 10.5838 5.17178 10.4119C4.30732 10.2399 3.51326 9.81554 2.89002 9.1923C2.26678 8.56906 1.84237 7.775 1.67047 6.91054C1.49856 6.04607 1.58688 5.15005 1.92425 4.33578C2.26163 3.52152 2.8329 2.8256 3.56582 2.33603C4.29874 1.84647 5.16039 1.58526 6.04178 1.58543Z" fill="black"/>
  <path d="M13.0748 11.2445L12.643 10.8126C12.5695 10.7392 12.4698 10.698 12.366 10.698C12.2621 10.698 12.1624 10.7392 12.0889 10.8126L12.04 10.8614L11.1422 9.96518C11.0483 9.86939 10.9895 9.74463 10.9754 9.61119C10.9614 9.47775 10.9929 9.34349 11.0649 9.23024C11.6728 8.2778 11.9947 7.17099 11.9925 6.04109C11.9922 5.67972 11.959 5.31914 11.8935 4.96376C11.8901 4.94012 11.8819 4.91742 11.8695 4.89701C11.857 4.8766 11.8406 4.85891 11.8212 4.84498C11.8018 4.83106 11.7798 4.82118 11.7565 4.81596C11.7332 4.81073 11.7091 4.81025 11.6856 4.81455C11.6621 4.81886 11.6397 4.82785 11.6197 4.841C11.5998 4.85415 11.5827 4.87118 11.5695 4.89108C11.5563 4.91098 11.5472 4.93334 11.5428 4.95682C11.5385 4.9803 11.5388 5.00443 11.544 5.02776C11.6054 5.36204 11.6366 5.7012 11.637 6.04109C11.6393 7.10307 11.337 8.14342 10.7659 9.03878C10.6507 9.22042 10.6004 9.43569 10.6232 9.64956C10.646 9.86342 10.7405 10.0633 10.8914 10.2166L11.7892 11.1127L11.1136 11.7883L10.2174 10.8921C10.0655 10.7396 9.86584 10.6438 9.65178 10.6209C9.43772 10.5981 9.2223 10.6494 9.0416 10.7664C8.14492 11.3362 7.10417 11.6381 6.04178 11.6365H6.03858C5.29609 11.632 4.56182 11.4806 3.87809 11.1911C3.19436 10.9015 2.57468 10.4796 2.05477 9.94948C1.53485 9.41938 1.12497 8.79164 0.848749 8.10243C0.572527 7.41321 0.435422 6.67615 0.445333 5.93371C0.464752 4.80042 0.828561 3.69986 1.48842 2.77828C2.14828 1.8567 3.07294 1.15772 4.13955 0.774217C5.20616 0.390718 6.36422 0.340855 7.45984 0.631255C8.55547 0.921654 9.53679 1.53857 10.2734 2.40002C10.2879 2.41978 10.3063 2.43633 10.3275 2.44863C10.3487 2.46093 10.3722 2.46872 10.3966 2.4715C10.4209 2.47429 10.4456 2.47201 10.469 2.46481C10.4924 2.45762 10.5141 2.44565 10.5327 2.42968C10.5513 2.4137 10.5663 2.39406 10.577 2.37198C10.5876 2.34991 10.5935 2.32587 10.5944 2.30138C10.5953 2.2769 10.5912 2.25249 10.5822 2.22969C10.5732 2.20689 10.5596 2.1862 10.5422 2.16891C9.89194 1.41698 9.06326 0.840354 8.13221 0.491914C7.20115 0.143474 6.19752 0.0343745 5.21334 0.17462C4.22916 0.314866 3.29595 0.699969 2.49928 1.29461C1.70262 1.88925 1.068 2.6744 0.653633 3.57804C0.239266 4.48169 0.0584124 5.47491 0.127658 6.46661C0.196904 7.45832 0.514032 8.41676 1.04996 9.25405C1.58589 10.0913 2.32346 10.7807 3.19503 11.2588C4.06661 11.737 5.04428 11.9887 6.0384 11.9908H6.04178C7.17181 11.9924 8.2788 11.6712 9.23253 11.0651C9.34507 10.9919 9.47936 10.9596 9.61288 10.9736C9.7464 10.9877 9.87103 11.0472 9.96587 11.1422L10.8622 12.0384L10.8128 12.0878C10.7763 12.1242 10.7474 12.1674 10.7276 12.2149C10.7079 12.2625 10.6977 12.3134 10.6977 12.3649C10.6977 12.4164 10.7079 12.4674 10.7276 12.5149C10.7474 12.5625 10.7763 12.6056 10.8128 12.642L13.9664 15.7961C14.04 15.8694 14.1396 15.9105 14.2435 15.9105C14.3473 15.9105 14.4469 15.8694 14.5205 15.7961L15.7963 14.5202C15.8327 14.4839 15.8617 14.4407 15.8814 14.3931C15.9012 14.3456 15.9113 14.2946 15.9113 14.2431C15.9113 14.1917 15.9012 14.1407 15.8814 14.0931C15.8617 14.0456 15.8327 14.0024 15.7963 13.9661L13.0748 11.2445ZM11.0532 12.3645C11.0531 12.3597 11.054 12.3549 11.0559 12.3505C11.0577 12.3461 11.0604 12.342 11.0638 12.3387L11.2372 12.1654L11.2395 12.1639L12.1657 11.2377L12.1673 11.2354L12.3397 11.063C12.3431 11.0595 12.347 11.0567 12.3515 11.0548C12.3559 11.053 12.3606 11.052 12.3654 11.052C12.3702 11.052 12.375 11.053 12.3794 11.0548C12.3838 11.0567 12.3878 11.0595 12.3911 11.063L12.6976 11.3693L11.3703 12.6966L11.0638 12.3911C11.0604 12.3877 11.0576 12.3837 11.0558 12.3792C11.054 12.3747 11.0531 12.3699 11.0532 12.365V12.3645ZM15.5451 14.2686L14.2695 15.5446C14.2626 15.5513 14.2534 15.5551 14.2437 15.5551C14.2341 15.5551 14.2248 15.5513 14.218 15.5446L11.6224 12.949L12.9497 11.6217L15.5452 14.2173C15.5486 14.2206 15.5513 14.2246 15.5531 14.229C15.5549 14.2334 15.5558 14.2381 15.5557 14.2429C15.5558 14.2477 15.5549 14.2524 15.553 14.2568C15.5512 14.2613 15.5485 14.2653 15.5451 14.2686Z" fill="black"/>
  <path d="M14.0156 1.57551C14.0157 1.39962 13.9636 1.22767 13.8659 1.08141C13.7682 0.935157 13.6293 0.821173 13.4668 0.753889C13.3043 0.686605 13.1255 0.669046 12.953 0.703434C12.7805 0.737821 12.6221 0.82261 12.4978 0.947068L6.3328 7.1124L4.88142 5.66102C4.79928 5.57676 4.70122 5.50964 4.59294 5.46357C4.48465 5.4175 4.3683 5.39339 4.25062 5.39263C4.13294 5.39188 4.01629 5.4145 3.90742 5.45918C3.79856 5.50386 3.69965 5.56971 3.61643 5.65292C3.53321 5.73612 3.46735 5.83502 3.42265 5.94388C3.37795 6.05274 3.35532 6.1694 3.35605 6.28707C3.35679 6.40475 3.38089 6.52111 3.42694 6.6294C3.473 6.73769 3.5401 6.83576 3.62436 6.91791L5.70436 8.99791C5.87105 9.16461 6.09714 9.25825 6.33289 9.25825C6.56863 9.25825 6.79472 9.16461 6.96142 8.99791L13.7552 2.20449C13.8381 2.12209 13.9037 2.02406 13.9484 1.9161C13.9932 1.80813 14.016 1.69237 14.0156 1.57551ZM13.5038 1.95258L6.70987 8.74671C6.6083 8.84371 6.47325 8.89784 6.3328 8.89784C6.19235 8.89784 6.0573 8.84371 5.95573 8.74671L3.87556 6.66671C3.82462 6.61751 3.78399 6.55866 3.75603 6.49359C3.72808 6.42853 3.71337 6.35854 3.71276 6.28773C3.71214 6.21691 3.72563 6.14668 3.75245 6.08114C3.77927 6.01559 3.81887 5.95604 3.86895 5.90597C3.91902 5.85589 3.97857 5.81629 4.04411 5.78947C4.10966 5.76266 4.17989 5.74916 4.2507 5.74978C4.32152 5.75039 4.3915 5.76511 4.45657 5.79306C4.52164 5.82101 4.58049 5.86164 4.62969 5.91258L6.20693 7.48965C6.24027 7.52297 6.28548 7.5417 6.33262 7.5417C6.37976 7.5417 6.42497 7.52297 6.45831 7.48965L12.7497 1.19845C12.8512 1.1014 12.9863 1.04725 13.1268 1.04725C13.2672 1.04725 13.4023 1.1014 13.5038 1.19845C13.6038 1.29845 13.6599 1.43405 13.6599 1.57542C13.6599 1.7168 13.6038 1.85257 13.5038 1.95258Z" fill="black"/>
  </svg>
  `,
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    VerticalNavComponent,
    ThemeToggleComponent,
    ToastContainerComponent,
    ClarityModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  onThemeChange(theme: string) {
    const linkElement = document.querySelector('#highlightLink');

    if (linkElement) {
      const newHref = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-${theme}.min.css`;
      linkElement.setAttribute('href', newHref);
    }
  }
}
