import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useIntl } from 'react-intl';
import { motion } from 'framer-motion';
import { useStandardizedAnimation } from '../../services/standardizedAnimation.service';
import { BigButton } from '../big-button/big-button';
import { Controls } from '../controls/controls';
import { useGigsService } from '../../services/gigs.service';

import './reportProblem.scss';

const TEXTAREA_ROWS_SIZE = 6;

export const ReportProblem: FC = () => {
    const intl = useIntl();
    const { gigId } = useParams();
    const navigate = useNavigate();
    const { sendComplaint } = useGigsService();
    const { generateAnimation } = useStandardizedAnimation();
    const [complaint, setComplaint] = useState<string>('');

    const onNavigateBack = () => {
        navigate(`../${gigId}`);
    };

    return (
        <motion.section
            className="report-problem"
            {...generateAnimation('slideInBottom')}
        >
            <div className="report-problem__body">
                <Controls
                    leftSideOption="back"
                    navigateBack={false}
                    onLeftSideClick={() => onNavigateBack()}
                />
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
                        value={complaint}
                        onChange={(event) => setComplaint(event?.target?.value)}
                    />
                </div>

                <div className="report-problem__actions">
                    <BigButton
                        text={intl.formatMessage({ id: 'REPORT_A_PROBLEM' })}
                        color="accent"
                        onClick={() => sendComplaint(gigId!, complaint)}
                        className="report-problem__big-button"
                        disabled={!complaint || !gigId}
                    />
                </div>
            </div>
        </motion.section>
    );
};
