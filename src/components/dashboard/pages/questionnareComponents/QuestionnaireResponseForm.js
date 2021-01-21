import React, { useEffect, useState } from 'react';
import Axios from '../../../../helpers/Axios';
import { getToken } from '../../../../helpers/AuthHelpers';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Skeleton from '../../../shared/Skeleton';


export default (props) => {
    const id = props.match.params.id;
    const [questions, setQuestions] = useState([]);
    const [payload, setPayload] = useState({});
    const [formTile, setFormTile] = useState('');
    const [notify, setNotify] = useState(true);
    const [notificationSeverity, setNotificationSeverity] = useState('info');
    const [notificationMessage, setNotificationMessage] = useState('');
    const headers = {
        'Authorization': `Bearer ${getToken()}`
    };

    useEffect(() => {
        Axios.get(`/api/questionnaires/${id}`, { headers })
            .then(response => {
                const { data } = response.data;
                setPayload(
                    {
                        questionnaire_id: id,
                        number_of_questions: data.length,
                        responses: data.map((item, index) => {
                            return {
                                question_id: item.id,
                                response: '',
                                show_on_profile: false
                            }
                        })
                    }
                )
                setQuestions(data);
                setFormTile(response.data.message);
            }).catch(({ response }) => {
                console.log(response);
            })
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const payload_copy = payload;
        payload_copy.responses[parseInt(name)].response = value;
        setPayload(payload_copy);
        console.log(payload)
    }

    const handleSwitch = (index) => {
        const payload_copy = payload;
        const isOn = payload_copy.responses[index].show_on_profile;
        payload_copy.responses[index].show_on_profile = !isOn;
        setPayload(payload_copy);
        console.log(payload)
    }

    const sendData = (e) => {
        e.preventDefault();
        console.log(payload)
        Axios.post('/api/questionnaires', { ...payload }, { headers })
            .then(response => {
                setNotificationMessage('Successfully Completed Questionnaire')
                setNotificationSeverity('success')
                setNotify(true)
            }).catch(({ response }) => {
                setNotificationMessage('response.data.message')
                setNotificationSeverity('error')
                setNotify(true)
            })
    }

    const handleClose = (event, reason) => {
        setNotify(false)
    };


    return (
        <div>
            <Snackbar open={notify} autoHideDuration={6000} onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Alert onClose={handleClose} severity={notificationSeverity}>
                    {notificationMessage}
                </Alert>
            </Snackbar>
            <div className="ui-block-title">
                <h6 className="title">{formTile}</h6>
            </div>
            <div className="ui-block-content">
                {
                    questions.length === 0 ? <Skeleton /> : (
                        <form className="content" onSubmit={sendData}>
                            {questions.map((item, index) => {
                                return (
                                    <div key={item.id}>
                                        <div className="form-group" >
                                            <h6 className="lead">{item.question}</h6>
                                            <textarea className="form-control" name={index} onChange={e => handleChange(e)} required></textarea>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-2">Show on my profile</div>
                                            <div className="col-sm-10">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="gridCheck1" style={{ display: 'inline' }} onChange={e => handleSwitch(index)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                                <button className="btn btn-primary btn-lg full-width" type="submit">Submit</button>
                            </div>
                        </form>
                    )
                }
            </div>
        </div>
    );
}