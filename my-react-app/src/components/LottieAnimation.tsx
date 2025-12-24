import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface LottieRef {
  play: () => void;
  pause: () => void;
  goToAndPlay: (frame: number) => void;
}

interface LottieAnimationProps {
  animationData: unknown;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAnimation = forwardRef<LottieRef, LottieAnimationProps>(
  function LottieAnimation({ animationData, className, loop = true, autoplay = true }, ref) {
    const lottieRef = useRef<LottieRefCurrentProps>(null as any);

    // Expose the lottie instance to parent via ref
    useImperativeHandle(ref, () => ({
      play: () => lottieRef.current?.play(),
      pause: () => lottieRef.current?.pause(),
      goToAndPlay: (frame: number) => lottieRef.current?.goToAndPlay(frame),
    }), []);

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
  }
);

export default LottieAnimation;
