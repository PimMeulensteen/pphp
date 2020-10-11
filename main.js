isHidden = function(elem) {
    'use strict';
    if (!(elem instanceof Element)) { throw new Error('DomUtil: elem is not an element.'); }
    const style = getComputedStyle(elem);
    if (style.display === 'none') { return false; }
    if (style.visibility !== 'visible') { return false; }
    if (style.opacity < 0.1) { return false; }
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width === 0) {
        return false;
    }
    const elemCenter = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    if (elemCenter.x < 0) { return false; }
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) { return false; }
    if (elemCenter.y < 0) { return false; }
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) { return false; }
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
        if (pointContainer === elem) { return true; }
    } while (pointContainer = pointContainer.parentNode);

    return false;
};

get_name_of_section = function(section) {
    'use strict';
    return section.firstElementChild.innerHTML;
};

update = function() {
    'use strict';
    const elems = [...document.getElementsByTagName("section")];
    const visible_elem = elems.filter(el => isHidden(el));

    const nav_elem = document.getElementsByTagName("nav")[0];
    nav_elem.innerHTML = ""
    if (window.innerWidth >= 1000) {

        for (let i in elems) {
            var node = document.createElement("li");
            var textnode = document.createTextNode(get_name_of_section(elems[i]));

            if (!visible_elem.includes(elems[i])) {
                node.style.color = "#555";
            };
            node.appendChild(textnode);
            nav_elem.appendChild(node)
        };
    };
};

update()

window.addEventListener("scroll", update);
window.addEventListener("resize", update);