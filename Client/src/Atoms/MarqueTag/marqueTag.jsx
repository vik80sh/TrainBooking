
import React from 'react';

import './marque.scss';

const MarqueeTag = ({ simpleText,boldText}) =>
    <marquee>{simpleText} <span>{boldText}</span> </marquee>
export default MarqueeTag;
