/**
 * Aaron Putterman
 * 2021-10-03
 */



// get container
// loop over json
// every 3, create new row
// add object to row

const xhr = new XMLHttpRequest(), url = "./assets/json/work.json";
let output = "";
let count = 0;

xhr.onreadystatechange = function() {
    if ( xhr.readyState === 4 && xhr.status === 200 ) {
        const workItems = JSON.parse( xhr.responseText );
        for (let workItem of workItems) {
            // if beginning of new row, add row start TODO
            if(count % 3 == 0){
                output += `<div class="row">`;
            }
            output += templateTron(workItem);
            ++count;
            // if end of row, or index = length-1, add row end TODO
            if(count % 3 == 3 || count == workItems.length){
                output += `</div>`;
            }
        }
        document.getElementById('workContainer').innerHTML = output;
    }
};
xhr.open( "GET", url, true );
xhr.send();

// Good place to put that function that will generate the template html
function templateTron(workItem) {
    let linkObjChain = "";
    for(let linkObj of workItem.links){
        linkObjChain += linkObjChainGenerator(linkObj);
    }
    return `
    <div class="col s4">
        <div class="card small">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${workItem.img}">
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4" style="margin-top:-10px;">${workItem.title}<i class="material-icons right">+</i></span>
                <div class="card-action" style="border:none">
                    ` + linkObjChain + `
                </div>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${workItem.title}<i class="material-icons right">-</i></span>
                <p>${workItem.description}</p>
            </div>
        </div>
    </div>
    `;
}

function linkObjChainGenerator(linkObj){
    return `
        <a href="${linkObj.link}" class="cyan-text text-darken-4">${linkObj.title}</a>
    `;
}
