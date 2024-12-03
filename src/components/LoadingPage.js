import React from "react";
import { ContainerLoading } from "../assets/styles";
import './index.css'

export default function LoadingPage() {
    return(
        <ContainerLoading>
            <section class="container">
                <div>
                <div>
                    <span class="one h6"></span>
                    <span class="two h3"></span>
                </div>
                </div>


                <div>
                <div>
                    <span class="one h1"></span>
                    <span class="two h4"></span>
                </div>
                </div>


                <div>
                <div>
                    <span class="one h5"></span>
                    <span class="two h2"></span>
                </div>
                </div>
            </section>

            <div class="spinnerContainer" style={{marginTop: 120, marginLeft: 50}}>
                <div class="loader">
                    <p>loading</p>
                    <div class="words">
                    <span class="word">Sustainable</span>
                    <span class="word">Traceable</span>
                    <span class="word">Reliable</span>
                    <span class="word">Safe</span>
                    <span class="word">Low Cost</span>
                    </div>
                </div>
            </div>
        </ContainerLoading>
    )
}
