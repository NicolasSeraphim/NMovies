// Evento de scroll da página
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50)
        navbar.classList.add('scrolled')
    else
        navbar.classList.remove('scrolled');
})

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTRhMzU1Zjk0ODcwODUyOTg0ZjliMjJhM2VkZjJkMyIsIm5iZiI6MTczMjIwNzc2My4wNTE5Mzc2LCJzdWIiOiI2NzNjZWJkOGYwNjM0Y2VhMzgyYjdjMTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.eapm_I6cO2aPnaLW6gw0xVs0FZH7YTqcLw1AunO1MU0'
    }
};

//formatação de datas

function formatarData(data) {
    var d = new Date(data),
        mes = '' + (d.getMonth() + 1),
        dia = '' + d.getDate(),
        ano = d.getFullYear();
    mes = mes.length < 2 ? '0' + mes : mes;
    dia = dia.length < 2 ? '0' + dia : dia;
 return [dia, mes, ano].join('/');

}

//Exibir e esconder Loading

function toggleLoading() {
    let loader = document.querySelector('.loader');
    loader.style.display = loader.style.display == 'none' ? 'block' : 'none'; 
}