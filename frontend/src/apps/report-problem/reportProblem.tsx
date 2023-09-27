import { FC, useState } from 'react';
import './reportProblem.scss';
import { BigButton } from '../../shared/components/big-button/big-button';
import { Controls } from '../../shared/components/controls/controls';
import { useIntl } from 'react-intl';
import { useSearchParams  } from 'react-router-dom';

const TEXTAREA_ROWS_SIZE = 6;

export const ReportProblem: FC = () => {
  const [problemDescription, setProblemDescription] = useState<string>('');
  const intl = useIntl();
  const [searchparams] = useSearchParams();

  const onBack = () => {
    history?.back?.();
  }

  /**
   * Not implemented yet.
   */
  const handleReportProblem = () => {
    console.log('Gig id: ', searchparams.get('gigId'));
    console.log('Report problem: ', problemDescription);
  };

  return (

    <section className="report-problem">
      <Controls
        leftSideOption='back'
        onLeftSideClick={onBack}
      />

      <div className="report-problem-root">
        <div className="report-problem-root__content">
          <p className="report-problem-root__describe">{intl.formatMessage({ id: 'DESCRIBE_PROBLEM' })}</p>

          <textarea
            className="new-gig__input report-problem-root__message"
            placeholder="What went wrong?"
            rows={TEXTAREA_ROWS_SIZE}
            value={problemDescription}
            onChange={(event) => setProblemDescription(event?.target?.value)}
          />
        </div>

        <div className="report-problem-root__actions">
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