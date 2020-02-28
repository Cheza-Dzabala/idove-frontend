import CountryList from 'react-select-country-list';

/**
 * Evaluates country codes and returns the full name of the country.
 * 
 * @param {String} code Country code to be evaluated
 * 
 * @returns {String} Country
 */
export const getCountry = (code) => {
    const countries = CountryList().getData();
    const country = countries.filter(country => country.value === code);
    return country[0].label;
}

/**
 * @param {String} gender the single letter of the gender F / M / NB
 * 
 * @returns {Strung} returns the full gender name
 */
export const getGender = (identifier) => ({
    'F': 'Female',
    'M': "Male",
    'NB': 'Non Binary'
})[identifier];

/**
 * Maps objects into new instances of form data
 * 
 * @param {Object} mappables 
 * 
 * @returns {FormData} an instance of formdata ready to be sent via API
 */

export const objectMapper = (mappables) => {
    const formData = new FormData();
    Object.entries(mappables).map(item => formData.append(item[0], item[1]));
    return formData;
}
