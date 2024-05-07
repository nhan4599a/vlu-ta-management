import "../../index.css";
import { useLottie } from "lottie-react";
import LoadingAnimation from "../../lottie/loading.json";
import { useAppSelector } from "../../features/hooks";
import { selectLoadingState } from "../../features/slices/loading.slice";
import { useEffect, useMemo } from "react";
  
const options = {
  animationData: LoadingAnimation,
  loop: true
};

const Loading = () => {
  const isOpen = useAppSelector(selectLoadingState)

  const { View, animationItem } = useLottie(options);

  const style = useMemo(() => {
    if (!isOpen) {
      return {
        display: 'none'
      }
    }

    return undefined
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      animationItem?.play()
    } else {
      animationItem?.pause()
    }
  }, [isOpen, animationItem])

  useEffect(() => {
    return () => {
      animationItem?.destroy()
    }
  }, [animationItem])
  
  return <div style={style} className="loading-container">{View}</div>;
};

export default Loading;
