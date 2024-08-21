import React from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
// import { pauseImg, playImg, replayImg } from "../utils";

 const hightlightsSlides = [
  {
    id: 1,
    textLists: [
      "Enter A17 Pro.",
      "Game‑changing chip.",
      "Groundbreaking performance.",
    ],
    video: highlightFirstVideo,
    videoDuration: 4,
  },
  {
    id: 2,
    textLists: ["Titanium.", "So strong. So light. So Pro."],
    video: highlightSecondVideo,
    videoDuration: 5,
  },
  {
    id: 3,
    textLists: [
      "iPhone 15 Pro Max has the",
      "longest optical zoom in",
      "iPhone ever. Far out.",
    ],
    video: highlightThirdVideo,
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: ["All-new Action button.", "What will yours do?."],
    video: highlightFourthVideo,
    videoDuration: 3.63,
  },
];

import highlightFirstVideo from "/assets/videos/highlight-first.mp4";
import highlightSecondVideo from "/assets/videos/hightlight-third.mp4";
import highlightThirdVideo from "/assets/videos/hightlight-sec.mp4";
import highlightFourthVideo from "/assets/videos/hightlight-fourth.mp4";


const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  // video and indicator
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;
// slider animation to move the video out of the screen and bring the next video in
  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });
    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        togggleActions: 'restart none none none '
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);


  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData])
  useEffect(() => {
    const currentProgress =  0;
    let span = videoSpanRef.current;

    if(span[videoId]){
      // animate the progress of video
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                  ? "10vw" // tablet
                  : "4vw", // laptop
            });

            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId == 0) {
        anim.restart();
      }

      // update the progress bar
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate);
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

   // vd id is the id for every video until id becomes number 3
   const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  
  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);
  return (
    <>
    <div className='flex items-center'>
      {hightlightsSlides.map((list, i) => (
        <div key={list.id} id = "slider">
          <div className="video-carousel_container">
            <div className="w-full h-full flex-centre rounded-3xl overflow-hidden bg-black ">
              <video id = "video" 
               playsInline={true}
               className={`${
                list.id === 2 && "translate-x-44"
              } pointer-events-none`}
               preload = 'auto'
               muted 
               ref={(el) => (videoRef.current[i] = el)}
               onEnded={() =>
                i !== 3
                  ? handleProcess("video-end", i)
                  : handleProcess("video-last")
              }
               onPlay={() => {
                setVideo((prevVideo) => ({
                  ...prevVideo, isPlaying: true
                }))}}
               onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}>
                <source src={list.video} type = "video/mp4"/>
                {/* <source src="/assets/videos/hightlight-sec.mp4" type = "video/mp4"/> */}
              </video>
            </div>
            <div className="absolute top-12 left-[5%] z-10">
            {list.textLists.map((text, i) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                
              />
            </span>
          ))}
      </div>
      <button className="control-btn">
          <img
            src={isLastVideo ? "/assets/images/replay.svg" : !isPlaying ? "/assets/images/play.svg" : "/assets/images/pause.svg"}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
    </div>
    </>
  )
}

export default VideoCarousel
