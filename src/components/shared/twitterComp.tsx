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
      options={{ height: 'auto', width: 'auto'}}
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