import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import Container from '../Container/Container';

function AboutMe() {
  const section = useSelector((state) => state.portfolio.sections).find(
    (sect) => sect.id === 'about',
  );
  return (
    <Container title="About me" id={section.id}>
      <Typography>
        Hi, I&apos;m Daniel! I am from Bolzano, a small town in the Italian
        Alps. Bolzano province is a bilingual melting pot between Italian and
        Austrian culture due to its history. My father is British, so one could
        say I am a half-British, German-speaking Italian, moulded by a
        multicultural and multilingual environment.
      </Typography>
      <br />
      <Typography>
        In the professional and academic world I describe myself as a passionate
        geo-information researcher, developer and tech lover. With an
        environmental sciences and geographical technology background, my main
        interests lie in nature, environmental monitoring, sensors, open data
        and open hardware, the Internet of Things, interoperability and
        geospatial web development.
      </Typography>
      <br />
      <Typography>
        I have travelled and lived in several countries and continents, and
        would include my open-mindedness and friendly nature to my core skills.
        My multilingual background and my travels contributed to my advanced
        language skills. Fluent in four languages and currently learning more, I
        count linguistics as a hobby and skill alike. I enjoy different kinds of
        sports, and having grown up in the alps, I love mountaineering and
        outdoor activities. Currently you&apos;ll find me mostly rock climbing
        and mountain biking in my free time. My artistic side lies in my passion
        for the guitar and music in general, which I have been developing since
        I was 14 years old.
      </Typography>
    </Container>
  );
}

export default AboutMe;
