import React, { useEffect } from 'react';
import { Tabs, List, Input, Radio } from 'antd';

import { Dispatch } from 'src/utils/types';
import { connect } from 'src/utils/store';
import { Status } from 'src/store/types';
import { STATUS } from 'src/store/constants';

import { Skill, SkillCategory } from 'src/store/models/skills/types';
import { selectAddModalStatus, selectSkills } from 'src/store/models/skills/selectors';
import {
  groupByCategory,
  postAddSkill,
  changeModalStatus,
  searchSkill,
  sortByRate,
  putSkillRate,
  fetchSkills,
} from 'src/store/models/skills/actions';
import { Rating } from 'src/components/ui/Rating';
import { capitalizeFirstLetter } from 'src/utils';
import { setActiveCategory } from 'src/store/services/categories/actions';
import { SelectedCategories } from 'src/store/services/categories/types';
import { selectActiveCategory, selectCategories } from 'src/store/services/categories/selectors';

import { TabTitle } from './components/TabTitle';
import { AddSkillModal } from './components/AddSkillModal';
import { useDebounce } from 'src/utils/hooks';

import css from './styles.css';

const { TabPane } = Tabs;
const { Item } = List;

interface Props {
  skills: Skill[];
  categories: SelectedCategories[];
  modalStatus: Status;
  activeCategory: SelectedCategories['type'];
  // actions
  groupByCategory: Dispatch<typeof groupByCategory>;
  setActiveCategory: Dispatch<typeof setActiveCategory>;
  searchSkill: Dispatch<typeof searchSkill>;
  sortSkills: Dispatch<typeof sortByRate>;
  changeModalStatus: Dispatch<typeof changeModalStatus>;
  postAddSkill: Dispatch<typeof postAddSkill>;
  putSkillRate: Dispatch<typeof putSkillRate>;
  fetchSkills: Dispatch<typeof fetchSkills>;
}

const Skills = ({
  skills,
  categories,
  modalStatus,
  activeCategory,
  groupByCategory,
  setActiveCategory,
  searchSkill,
  sortSkills,
  postAddSkill,
  changeModalStatus,
  putSkillRate,
  fetchSkills,
}: Props): JSX.Element => {
  const debouncedSearch = useDebounce(searchSkill, 500);

  const sortOptions = [
    { label: 'По убыванию', value: 'DESC' },
    { label: 'По возрастанию', value: 'ASC' },
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <Tabs
      defaultActiveKey={activeCategory}
      onChange={(key: SelectedCategories['type']) => {
        setActiveCategory(key);
        groupByCategory(key);
      }}
      tabBarExtraContent={
        <AddSkillModal
          categories={categories.map((item) => item.type !== 'all' && item).filter(Boolean)}
          onHandleAdd={(name: string, category: SkillCategory['type']) => postAddSkill(name, category, activeCategory)}
          onResetModalStatus={() => changeModalStatus(STATUS.initial)}
          status={modalStatus}
        />
      }
    >
      {categories.map(({ type, title }) => (
        <TabPane key={type} tab={<TabTitle title={title} type={type} />}>
          <div className={css.toolbar}>
            <Input
              placeholder="Поиск"
              style={{ width: '40%' }}
              onChange={(e) => debouncedSearch(type, e.target.value)}
            />
            <Radio.Group optionType="button" options={sortOptions} onChange={(e) => sortSkills(e.target.value)} />
          </div>
          <List
            bordered
            dataSource={skills}
            renderItem={(item) => (
              <Item
                key={item.id}
                extra={<Rating rate={item.rate || 0} onChange={(val) => putSkillRate(item.id, val)} />}
              >
                {capitalizeFirstLetter(item.name)}
              </Item>
            )}
          />
        </TabPane>
      ))}
    </Tabs>
  );
};

const mapStateToProps = (state) => ({
  skills: selectSkills(state),
  categories: selectCategories(state),
  activeCategory: selectActiveCategory(state),
  modalStatus: selectAddModalStatus(state),
});

export default connect(mapStateToProps, {
  groupByCategory,
  postAddSkill,
  changeModalStatus,
  searchSkill,
  sortSkills: sortByRate,
  fetchSkills,
  putSkillRate,
  setActiveCategory,
})(Skills);
