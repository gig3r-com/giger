import { FC, useState } from 'react';
import './reportProblem.scss';
import { BigButton } from '../../shared/components/big-button/big-button';
import { Controls } from '../../shared/components/controls/controls';
import { useIntl } from 'react-intl';

export const ReportProblem: FC = () => {
  const [problemDescription, setProblemDescription] = useState<string>('');
  const intl = useIntl();

  /**
   * Not implemented yet.
   */
  const handleReportProblem = () => {};

  return (
    <section className="report-problem">
          
      <Controls
        leftSideOption='back'
        onLeftSideClick={() => {}}
      />
      <div className='report-problem__content'>
      <p className="report-problem__describe">{intl.formatMessage({id: 'DESCRIBE_PROBLEM'})}</p>
           
      <textarea
        className='new-gig__input report-problem__message'
        placeholder='What went wrong?'
        value={problemDescription}
        onChange={(event) => setProblemDescription(event.target.value) }
      />
            
      <BigButton 
        text={intl.formatMessage({ id: 'REPORT_A_PROBLEM' })} 
        color='accent'
        onClick={handleReportProblem}
        className='report-problem__big-button'
      />
      </div>
    </section>
  );
};
