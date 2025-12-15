async function updateView(button) {
    let api = '';

    if (button.dataset.querytype === 'by_name') {
        let name = document.querySelector('#nameQuery').value;
        api = `http://localhost:3000/api/by_name/${name}`;
    }

    if (button.dataset.querytype === 'by_age') {
        let start = document.querySelector('#startAgeQuery').value;
        let end = document.querySelector('#endAgeQuery').value;
        api = `http://localhost:3000/api/by_age/${start}/${end}`;
    }

    const response = await fetch(api);
    const model = await response.json();
    renderView(model);
}

function renderView(model) {
    let source = document.querySelector('#show_results_view').innerHTML;
    let template = Handlebars.compile(source);
    let html = template(model);
    document.querySelector('#results').innerHTML = html;
}
