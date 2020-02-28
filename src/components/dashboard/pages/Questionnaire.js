import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuestionnaires } from '../../../actions/questionnaireActions';
import QuestionnaireTile from './questionnareComponents/QuestionnaireTile';
import Skeleton from '../../shared/Skeleton';

class Questionnaire extends Component {

    state = {
        questionnairs: {},
        status: 0,
        is_loading: true
    };

    static getDerivedStateFromProps = (nextProps, state) => {
        switch (nextProps.status) {
            case 200:
                console.log(nextProps.questionnaires.data)

                return {
                    questionnaires: nextProps.questionnaires.data,
                    is_loading: false,
                    status: nextProps.status
                }
            default:
                return {
                    is_loading: true,
                }
        }
    }

    componentDidMount = async () => {
        const { getQuestionnaires } = this.props;
        await getQuestionnaires();
    }

    render() {
        const { status, questionnaires } = this.state;
        // const { questionnaires } = this.props;
        // console.log('Questionnaires', questionnaires);
        return (
            <div>
                <div className="ui-block-title">
                    <h6 className="title">Questionnaires</h6>
                </div>
                <div className="ui-block-content">
                    {
                        status === 200 ? questionnaires.map(questionnaire => {
                            return <QuestionnaireTile
                                key={questionnaire.id}
                                id={questionnaire.id}
                                title={questionnaire.title}
                                summary={questionnaire.summary}
                                hasFilled={questionnaire.hasFilled}
                                numberOfQuestions={questionnaire.number_of_questions}
                                questions={questionnaire.questions}
                            />
                        })
                            : <Skeleton />
                    }
                </div >
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    questionnaires: state.questionnaires.data,
    status: state.questionnaires.http_status
});

export default connect(mapStateToProps, { getQuestionnaires })(Questionnaire);