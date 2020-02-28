import { saveUserProfile } from "../../helpers/AuthHelpers"

/**
 * 
 * @param {*} http_status 
 * @param {*} data 
 * @param {*} state 
 */
export const evaluate_response = (http_status, data, state) => {
    switch (http_status) {
        case 200:
            saveUserProfile(data.data)
            return {
                isLoading: false,
                tabHeader: 'Update Your Profile',
                operation: 'update',
                profileData: !state.initialLoad ? data.data : state.profileData,
                initialLoad: true
            }
        case 201:
            saveUserProfile(data.data)
            return {
                isLoading: false,
                tabHeader: 'Saccessfully Created Your Profile',
                operation: 'update',
                notify: true,
                notificationSeverity: 'success',
                notificationMessage: 'Successfully Created Your Profile'
            }
        case 205:
            return {
                isLoading: false,
                tabHeader: 'Profile',
                operation: 'update',
                notify: true,
                notificationSeverity: 'success',
                notificationMessage: 'Successfully Updated Your Profile'
            }
        case 404:
            return {
                isLoading: false,
                tabHeader: 'Create Your Profile',
                operation: 'create'
            }
        case 405:
            return {
                isLoading: false,
                tabHeader: 'An error occured. Please reload the page, and try again.',
                operation: 'create',
                notify: true,
                notificationSeverity: 'error',
                notificationMessage: 'An error occured. Please reload the page, and try again.'
            }
        case 422:
            return {
                isLoading: false,
                tabHeader: 'An error occured. Please reload the page, and try again.',
                operation: 'create',
                notify: true,
                notificationSeverity: 'error',
                notificationMessage: 'An error occured. Please reload the page, and try again.'
            }
        case 500:
            return {
                isLoading: false,
                tabHeader: 'An error occured. Please reload the page, and try again.',
                operation: null,
                notify: true,
                notificationSeverity: 'error',
                notificationMessage: 'An error occured. Please reload the page, and try again.'
            }
        default:
            return {
                isLoading: true,
                tabHeader: '',
                operation: null
            }
    }
}