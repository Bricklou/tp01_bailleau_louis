/**
 * Objet contenant toutes les références vers les champs inputs, les valeurs ET les validations
 */
const inputs = {
    nom: {
        element: document.getElementById('nom'),
        value: '',
        validation: (val) => typeof val === 'string' && val.length > 0,
        valid: false
    },
    prenom: {
        element: document.getElementById('prenom'),
        value: '',
        validation: (val) => typeof val === 'string' && val.length > 0,
        valid: false
    },
    adresse: {
        element: document.getElementById('adresse'),
        value: '',
        validation: (val) => typeof val === 'string' && val.length > 0,
        valid: false
    },
    codePostal: {
        element: document.getElementById('codePostal'),
        value: null,
        validation: (val) => typeof val === 'number' && val > 0,
        valid: false
    },
    ville: {
        element: document.getElementById('ville'),
        value: '',
        validation: (val) => typeof val === 'string' && val.length > 0,
        valid: false
    },
    telephone: {
        element: document.getElementById('telephone'),
        value: '',
        validation: (val) => typeof val === 'string' && val.length > 0,
        valid: false
    },
    email: {
        element: document.getElementById('email'),
        value: '',
        validation: (val) => typeof val === 'string' && val.length > 0,
        valid: false
    },
    login: {
        element: document.getElementById('login'),
        value: '',
        validation: (val) => typeof val === 'string' && val.length > 0,
        valid: false
    },
    motDePasse: {
        element: document.getElementById('motDePasse'),
        value: '',
        validation: (val) => typeof val === 'string' && val.length > 0,
        valid: false
    },
    confirmation: {
        element: document.getElementById('confirmation'),
        value: '',
        validation: (val) => inputs.motDePasse.value === val && val.length > 0,
        valid: false
    }
}

const button = document.querySelector('button[type="submit"]')
const form = document.getElementById('submit-form')

/**
 * Update the button state
 * @param {boolean} valid
 */
function setValid(valid) {
    if (valid) {
        button.removeAttribute('disabled')
    } else {
        button.setAttribute('disabled', 'disabled')
    }
}

/**
 * Fonction de debounce pour éviter de spammer les événements
 * @param {Function} func fonction callback appelé lors du débounce
 * @param {number} timeout temps en millisecondes avant d'appeler la fonction callback
 * @returns {Function} fonction de debounce
 */
function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

/**
 * Revalide si les champs sont valides
 */
function revalidateForm() {
    let isValid = true
    for (const obj of Object.values(inputs)) {
        if (!obj.valid) {
            isValid = false
            break;
        }
    }

    setValid(isValid);
}

/**
 * Exécution de la validation pour un champ input
 */
function validateInput(input) {
    const valid = input.validation(input.value)

    if (!valid) {
        input.element.classList.add('error')
    } else {
        input.element.classList.remove('error')
    }
}

/**
 * Vérifie si le formulare est valide
 */
function validateForm() {
    Object.values(inputs).forEach(validateInput)
    revalidateForm()
}


Object.values(inputs).forEach((obj) => {
    obj.element.addEventListener('input', debounce((event) => {
        if (obj.element instanceof HTMLInputElement && obj.element.getAttribute('type') === 'number') {
            obj.value = parseInt(event.target.value)
        } else {
            obj.value = event.target.value
        }

        const valid = obj.validation(obj.value);
        obj.valid = valid

        if (!valid) {
            setValid(false)
            obj.element.classList.add('error')
        } else {
            obj.element.classList.remove('error')
        }

        revalidateForm();
    }, 500))
})

revalidateForm()

/**
 * Quand le formulaire est soumis
 */
form.addEventListener('submit', (event) => {
    event.preventDefault();

    validateForm();

    alert(`Bonjour ${inputs.prenom.value} ${inputs.nom.value} !`);
})