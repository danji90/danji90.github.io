import React from 'react';
import { useSelector } from 'react-redux';
import { FaGraduationCap } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';

import Container from '../Container/Container';

const useStyles = makeStyles((theme) => ({
  eduItem: {
    marginBottom: 10,
  },
  eduItemHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  eduItemDetail: {
    marginLeft: 50,
    padding: '4px 0 4px 0',
  },
}));

function Education(props) {
  const classes = useStyles();
  const educationItems = useSelector((state) => state.educationItems);
  const section = useSelector((state) => state.sections).find(
    (sect) => sect.id === 'education',
  );

  return (
    <Container id={section.id} title="Education">
      {educationItems.map((item) => {
        return (
          <div className={classes.eduItem} key={item.id}>
            <div className={classes.eduItemHeader}>
              <div style={{ margin: 10 }}>
                <FaGraduationCap size={30} />
              </div>
              <h3>{item.title}</h3>
            </div>
            {Object.keys(item.details).map((detail, index) => {
              const key = `${item.id}-${index}`;
              return (
                <div className={classes.eduItemDetail} key={key}>
                  {item.details[detail]}
                </div>
              );
            })}
          </div>
        );
      })}
    </Container>
  );
}

export default Education;
