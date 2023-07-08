'use client';
import { TwitterTimelineEmbed } from "react-twitter-embed";

const TwitterComp = () => {
  return (
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName="f1"
      ariaPolite="assertive"
      theme="dark"
      onLoad={function noRefCheck(){}}
      options={{ height: 400, width: 'auto'}}
    />
  );
};

export default TwitterComp;