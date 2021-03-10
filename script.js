"use strict";

// The model of all features
const features = {
    drinksholder: false,
    led: false,
    propeller: false,
    shield: false,
    solarfan: false
};

window.addEventListener("DOMContentLoaded", start);

function start() {
    console.log("start");
    // register toggle-clicks
    document.querySelectorAll(".option").forEach(option => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
    console.log(" - Toggle clicked");
    const target = event.currentTarget;
    const feature = target.dataset.feature;

    // : Toggle feature in "model"
    features[feature] = !features[feature];

    //  Is feature already in selction area?
    const featureElementIsActive = document.querySelector(`#selected ul li[data-feature=${feature}]`);
    console.log(featureElementIsActive);

    // if (featureElementIsActive) {
    //     target.classList.remove("chosen");
    //     featureElementIsActive.classList.remove("animate-feature-in");
    //     featureElementIsActive.offsetHeight;
    //     featureElementIsActive.classList.add("animate-feature-out");

    //     const activefeatureElements = document.querySelectorAll(`img[data-feature=${feature}]`);
    //     activefeatureElements.forEach(activefeatureElement => {
    //         activefeatureElement.classList.add("hide");
    //     });

    //     featureElementIsActive.removeEventListener("transitionend", elementTransitionEnd);
    // }
    // If feature is (now) turned on:
    if (features[feature]) {
        console.log(`Feature ${feature} is turned on!`);

        // - mark target as chosen (add class "chosen")
        target.classList.add("chosen");
        console.log(target, " is chosen");
        // - un-hide the feature-layer(s) in the #product-preview;
        const featureElements = document.querySelectorAll(`img[data-feature=${feature}]`);

        featureElements.forEach(featureElement => {
            featureElement.classList.remove("hide");
        });
        // - create featureElement and append to #selected ul
        const featureElement = createFeatureElement(feature);
        document.querySelector("#selected ul").append(featureElement);
        // - create FLIP-animation to animate featureElement from img in target, to its intended position. Do it with normal animation or transition class!

        // 1. The first: Find the start position
        const start = target.getBoundingClientRect();
        // 2. Second: Find end position
        const end = featureElement.getBoundingClientRect();
        // 3. Third: Translate element to start pos
        const diffX = start.x - end.x;
        const diffY = start.y - end.y;

        featureElement.style.setProperty("--diffX", diffX + "px");
        featureElement.style.setProperty("--diffY", diffY + "px");

        // featureElement.style.transform = `translate(${diffX}px, (${diffY}px)`

        // Make it recalculate layout frames
        featureElement.offsetHeight;

        // 4. Fourth: Animate element to translate(0,0);
        // featureElement.style.transition = "transform 1s";
        // featureElement.style.transform = "translate(0,0)";
        featureElement.classList.add("animate-feature-in");

    }

    // Else - if the feature (became) turned off:
    else if (!features[feature]) {
        // feature removed
        console.log(`Feature ${feature} is turned off!`);
        // - no longer mark target as chosen
        target.classList.remove("chosen");
        console.log("Remove chosen");
        // - hide the feature-layer(s) in the #product-preview
        const featureElements = document.querySelectorAll(`img[data-feature=${feature}]`);

        featureElements.forEach((featureElement) => {
            featureElement.classList.add("hide");
        });
        // - find the existing featureElement in #selected ul
        const featureElement = document.querySelector(`#selected ul li[data-feature=${feature}]`);
        // - create FLIP-animation to animate featureElement to img in target
        featureElement.classList.remove("animate-feature-in");
        featureElement.offsetHeight;
        featureElement.classList.add("animate-feature-out");
        // - when animation is complete, remove featureElement from the DOM
        featureElement.addEventListener("animationend", elementAnimationEnd);
    }
}

function elementAnimationEnd() {
    this.remove();
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
    const li = document.createElement("li");
    li.dataset.feature = feature;

    const img = document.createElement("img");
    img.src = `images/feature_${feature}.png`;
    img.alt = capitalize(feature);

    li.append(img);

    return li;
}

function capitalize(text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}