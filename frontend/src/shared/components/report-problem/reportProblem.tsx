import { FC } from 'react';
import './reportProblem.scss';
import { BigButton } from '../big-button/big-button';
import { Controls } from '../controls/controls';
import { useIntl } from 'react-intl';
import { useReportProblem } from '../../services/reportProblem.service';

const TEXTAREA_ROWS_SIZE = 6;

export const ReportProblem: FC = () => {
    const intl = useIntl();
    const {
        problemDescription,
        handleReportProblem,
        setProblemDescription,
        onBack
    } = useReportProblem();

    return (
        <section className="report-problem">
            <Controls leftSideOption="back" onLeftSideClick={onBack} />

            <div className="report-problem-body">
                <div className="report-problem__content">
                    <p className="report-problem__describe">
                        {intl.formatMessage({ id: 'DESCRIBE_PROBLEM' })}
                    </p>

                    <textarea
                        className="report-problem__message"
                        placeholder={intl.formatMessage({
                            id: 'WHAT_WENT_WRONG'
                        })}
                        rows={TEXTAREA_ROWS_SIZE}
                        value={problemDescription}
                        onChange={(event) =>
                            setProblemDescription(event?.target?.value)
                        }
                    />
                </div>

                <div className="report-problem__actions">
                    <BigButton
                        text={intl.formatMessage({ id: 'REPORT_A_PROBLEM' })}
                        color="accent"
                        onClick={handleReportProblem}
                        className="report-problem__big-button"
                    />
                </div>
            </div>
        </section>
    );
};
