import{a as i,u as d,r,h as c,j as s}from"./index-QoongkVf.js";import{S as u}from"./slick-theme-BrkaxeiP.js";const h=()=>{const{GetBannerImages:a,loading:m,error:f}=i(e=>e.banner),t=d(),[n,o]=r.useState([]);r.useEffect(()=>{t(c())},[t]),r.useEffect(()=>{a&&a.map(e=>o(e.images))},[a]);var l={dots:!0,infinite:!0,speed:1e3,slidesToShow:1,slidesToScroll:1,autoplay:!0,fade:!0,arrows:!1};return s.jsx("div",{className:"rounded-3xl w-full sm:pt-16 pt-8 ",children:s.jsx(u,{className:"slider_main w-full",...l,children:n&&n.map(e=>s.jsx("div",{className:"overflow-hidden rounded-3xl",children:s.jsx("img",{className:`
              w-full 
              h-[180px] sm:h-[420px] lg:h-[520px] 
              object-cover 
              rounded-3xl 
              transition duration-700 transform hover:scale-110
            `,src:e,alt:"Banner"})},e))})})};export{h as default};
