import "../../index.css"
import {useLottie} from "lottie-react";
import LoadingAnimation from "../../lottie/loading.json";

const Loading = () => {
    const options = {
        animationData: LoadingAnimation,
        loop: true
      };
    
      const { View } = useLottie(options);
    return (
        <div className='loading-container'>{View}</div>
    );
};

export default Loading;