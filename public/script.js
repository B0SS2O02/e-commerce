const redirect = (route) => {
    if (route.search('none') == -1) {
        window.location.replace(route);
    }
}

const getChecked = () => {
    if (document.querySelector('input[name="id"]:checked')) {
        return document.querySelector('input[name="id"]:checked').value
    } else {
        return null
    }
}

const editLink = (path) => {
    if (path != 'none') {
        redirect(path + getChecked())
    }

}


const Delete = (path) => {
    if (confirm(`You have deleted element by id ${getChecked()}`)) {
        redirect(path + getChecked())
    }
}