import React from "react"
export default function LoadingFavoriteCompany() {
    return(
        <div class="loaderLoading">
            <div class="loaderMiniContainer">
                <div class="barContainer">
                <span class="bar1"></span>
                <span class="bar1 bar2"></span>
                </div>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 101 114"
                class="svgIconLupa"
                >
                <circle
                    stroke-width="7"
                    stroke="#0551b5"
                    transform="rotate(36.0692 46.1726 46.1727)"
                    r="29.5497"
                    cy="46.1727"
                    cx="46.1726"
                ></circle>
                <line
                    stroke-width="7"
                    stroke="#0551b5"
                    y2="111.784"
                    x2="97.7088"
                    y1="67.7837"
                    x1="61.7089"
                ></line>
                </svg>
            </div>
        </div>
    )
}