import React from 'react';
import { Pie } from '@ant-design/charts';

import { connect } from 'src/utils/store';
import { formatDate } from 'src/utils';

import { selectCategroiesForPieGraph, selectDataForStarsGraph, selectLatest } from 'src/store/models/skills/selectors';
import { GraphData, Skill } from 'src/store/models/skills/types';

import { ContentBox } from '../ContentBox';
import { Rating } from '../ui/Rating';
import { Text } from '../ui/Typography';

import css from './styles.css';

interface Props {
  pieCategories: GraphData[];
  latestSkills: Skill[];
  starsData: { [key: number]: number };
}

const GraphicsFC = ({ pieCategories, starsData, latestSkills }: Props): JSX.Element => {
  return (
    <div className={css.root}>
      <ContentBox className={css.graphContainer} boxTitle="Навыки">
        {pieCategories.length ? (
          <Pie
            className={css.graph}
            height={300}
            legend={{ position: 'bottom' }}
            tooltip={false}
            angleField="value"
            colorField="type"
            radius={0.8}
            innerRadius={0.65}
            statistic={{ title: { content: 'Всего навыков' } }}
            label={{
              type: 'inner',
              offset: '-50%',
              content: '{value}',
              style: {
                textAlign: 'center',
                fontSize: 14,
              },
            }}
            data={pieCategories}
          />
        ) : null}
      </ContentBox>
      <ContentBox className={css.graphContainer} boxTitle="Рейтинг">
        {Object.keys(starsData).map((key) => (
          <div key={key} className={css.secondGraphItem}>
            <Rating rate={parseInt(key, 10)} disabled />
            {starsData[key]}
          </div>
        ))}
      </ContentBox>
      <ContentBox className={css.graphContainer} boxTitle="Недавно добавленные">
        {latestSkills.map(({ id, name, creationDate, rate }) => (
          <div key={id} className={css.secondGraphItem}>
            <Text>{`${name} (${formatDate(creationDate)})`}</Text>
            <Rating rate={rate} />
          </div>
        ))}
      </ContentBox>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pieCategories: selectCategroiesForPieGraph(state),
  starsData: selectDataForStarsGraph(state),
  latestSkills: selectLatest(state),
});

export const Graphics = connect(mapStateToProps, {})(GraphicsFC);
