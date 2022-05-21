const form = document.getElementById('processForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = formData.get('text');
    console.log(data)
    if (data.length > 6) {
        Swal.fire(
            'Данные норм',
            'да-да ура ура',
            'success'
        );
    } else {
        Swal.fire(
            'Данные вообще не норм',
            'да-да ура ура',
            'error'
        );
    }
});