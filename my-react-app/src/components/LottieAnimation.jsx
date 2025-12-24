import Lottie from 'lottie-react';
import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const LottieAnimation = forwardRef(function LottieAnimation({ animationData, className, loop = true, autoplay = true }, ref) {
  const lottieRef = useRef(null);

  // Expose the lottie instance to parent via ref
  useImperativeHandle(ref, () => lottieRef.current, []);

  useEffect(() => {
    if (lottieRef.current && animationData) {
      if (autoplay) {
        lottieRef.current.play();
      } else {
        lottieRef.current.pause();
      }
    }
  }, [animationData, autoplay]);

  if (!animationData) {
    return null;
  }

  return (
    <div className={className} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%', maxWidth: '100%' }}
      />
    </div>
  );
});

export default LottieAnimation;
