let dic = {
    "monday": "lunes",
    "tuesday": "martes",
    "wednesday": "miercoles",
    "thursday": "jueves",
    "friday": "viernes",
    "saturday": "sabado",
    "sunday": "domingo"
}

let array = []

let daysContainer = document.getElementById("daysContainer")
let from = document.getElementById("from")
let to = document.getElementById("to")

let day = document.getElementById("day")

let btnAddDay = document.getElementById("btnAddDay")
let btnGuardar = document.getElementById("btnGuardar")

let medicForm = document.getElementById("medicForm")


btnAddDay.addEventListener("click", addDay)
btnGuardar.addEventListener("click", sendData)





addHours()


function sendData(e) {
    e.preventDefault()
    let hours = []
    let from = document.getElementById("from").value
    let to = document.getElementById("to").value

    from = parseInt(from, 10)
    to = parseInt(to, 10)
    for(let i = from; i <= to; i += 1) {
        hours.push(i)
    }

    // Genera bucle infinito

    $.ajax({
        type: 'POST',
        url: '/api/medic',
        data: {
            dni: document.getElementById("dni").value,
            phone: document.getElementById("phone").value,
            specialism: document.getElementById("specialism").value,
            name: document.getElementById("name").value,
            hours: hours,
            days: array
        },
        dataType: 'json'
    }).done(function(){
        console.log("hecho")
    })
}

function addDay(e) {
    e.preventDefault()

    let value = day.value

    if (array.find(e => e == value) == undefined) {
        array.push(value)
    }

    addContentDay(array)

}

function addContentDay(array) {
    let content = ''
    array.forEach(element => {
        content += `
        <button style="margin-rigth: 2px;" type="button" class="btn btn-dark">
            ${dic[element]} <span class="badge badge-light">X</span>
        </button>`

    });

    daysContainer.innerHTML = content

}

function addHours() {
    let content = ""

    for (let i = 1; i < 24; i += 1) {
        content += `<option value="${i}">${i}</option>`
    }

    console.log(content)

    from.innerHTML = content
    to.innerHTML = content


}