'use client';
import useWindowSize from "@/lib/hooks/use-window-size";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const TwitterComp = () => {
  const { isSmallMobile } = useWindowSize();
  const result = ((!isSmallMobile) ? (
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName="f1"
      ariaPolite="assertive"
      theme="dark"
      options={{ height: '400', width: 'auto'}}
      tweetLimit={3}
    />
    ) : (
      <></>
    ));
  return (
  <>
    {result}
  </>
  );
};

export default TwitterComp;
