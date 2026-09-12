import { useScrollScene } from './useScrollScene';

export default function EmptyReturn() {
  const ref = useScrollScene();
  return <section className="freight-story empty-scene" ref={ref} aria-labelledby="empty-title">
    <picture className="empty-road"><source media="(max-width:640px)" srcSet="/freight-night-960.webp" /><img src="/freight-night-1920.webp" alt="A solitary freight truck on a desert highway after dark" width="1672" height="941" loading="lazy" decoding="async" /></picture>
    <div className="empty-shade" />
    <div className="story-chapter"><span><b>03</b> / THE RETURN JOURNEY</span><span>THE COST YOU CARRY BACK.</span></div>
    <h2 id="empty-title"><span data-reveal>AN EMPTY TRUCK</span><span data-reveal>ISN’T EMPTY.</span><span data-reveal>IT’S <em>LOST TIME.</em></span></h2>
    <div className="empty-bottom"><p>The delivery is done.<br />The cost of the journey isn’t.</p><div className="empty-losses"><span><b>01</b> LOST FUEL.</span><span><b>02</b> LOST REVENUE.</span><span><b>03</b> LOST MILES.</span></div></div>
    <div className="story-bottom-rule"><span>THE RETURN SHOULD BE AN OPPORTUNITY.</span><span>NOT AN AFTERTHOUGHT. <b>↘</b></span></div>
  </section>;
}
