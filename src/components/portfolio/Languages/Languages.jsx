/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Icon } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';

import Container from '../Container';

const getLangLevel = (stars) => {
  switch (stars) {
    case 5:
      return 'Native Speaker';
    case 4:
      return 'Proficiency';
    case 3:
      return 'Intermediate';
    case 2:
      return 'Basic';
    default:
      return 'Beginner';
  }
};

function Languages() {
  const section = useSelector((state) => state.portfolio.sections).find(
    (sect) => sect.id === 'languages',
  );
  const languages = useSelector((state) => state.portfolio.languages);
  return (
    <Container title={section.name} id={section.id}>
      {languages.map((item) => {
        return (
          <div key={item.id}>
            <Typography color="textPrimary" variant="h3">
              {item.name}
              {` (${getLangLevel(item.stars)})`}
            </Typography>
            {[...Array(item.stars)].map((e, i) => (
              <Icon key={`${item.id}-${i}`} color="primary">
                <GradeIcon />
              </Icon>
            ))}
          </div>
        );
      })}
    </Container>
  );
}

export default Languages;
