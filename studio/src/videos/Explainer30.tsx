import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {loadFont as loadBe} from '@remotion/google-fonts/BeVietnamPro';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';
import {Pop} from '../lib/Pop';
import {Mascot} from '../lib/Mascot';

export const FPS = 30;
export const DURATION = 30;

const be = loadBe('normal', {
  weights: ['500', '700', '800'],
  subsets: ['vietnamese', 'latin'],
});
const mono = loadMono('normal', {weights: ['500'], subsets: ['latin']});

export const C = {
  bg1: '#EEF0FF',
  bg2: '#F8F4FF',
  ink: '#14142B',
  mute: '#5C5F7A',
  blue: '#5B6BFF',
  mint: '#1FBF8F',
  orange: '#FF8A4C',
  pink: '#FF5FA2',
  card: '#FFFFFF',
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const typed = (text: string, frame: number, at: number, cps: number) =>
  text.slice(0, Math.max(0, Math.floor(((frame - at) / FPS) * cps)));

const Scene: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const o = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );
  return <AbsoluteFill style={{opacity: o}}>{children}</AbsoluteFill>;
};

const Sub: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [8, 18], [0, 1], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 48,
        display: 'flex',
        justifyContent: 'center',
        opacity: o,
      }}
    >
      <div
        style={{
          background: 'rgba(20,20,43,0.88)',
          color: '#fff',
          fontSize: 36,
          fontWeight: 700,
          padding: '14px 32px',
          borderRadius: 18,
          maxWidth: 1080,
          textAlign: 'center',
        }}
      >
        {text}
      </div>
    </div>
  );
};

const StepChip: React.FC<{n: number; label: string}> = ({n, label}) => (
  <Pop at={4} style={{position: 'absolute', left: 80, top: 52}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          background: C.blue,
          color: '#fff',
          fontWeight: 800,
          fontSize: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {n}
      </div>
      <div style={{fontSize: 32, fontWeight: 800, color: C.ink}}>{label}</div>
    </div>
  </Pop>
);

/* ---------- Cảnh 1: mở đầu ---------- */
const Hook: React.FC = () => (
  <Scene>
    <Pop at={4} style={{position: 'absolute', left: 96, top: 120}}>
      <div
        style={{
          display: 'inline-block',
          background: C.ink,
          color: '#fff',
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 3,
          padding: '8px 18px',
          borderRadius: 999,
        }}
      >
        VIDEO AI · 30 GIÂY
      </div>
    </Pop>
    <Pop at={14} style={{position: 'absolute', left: 96, top: 200}}>
      <div style={{fontSize: 104, fontWeight: 800, color: C.ink, lineHeight: 1.08}}>
        Video này
      </div>
    </Pop>
    <Pop at={26} style={{position: 'absolute', left: 96, top: 316}}>
      <div style={{fontSize: 104, fontWeight: 800, color: C.blue, lineHeight: 1.08}}>
        không ai dựng.
      </div>
    </Pop>
    <Pop at={44} style={{position: 'absolute', left: 100, top: 456}}>
      <div style={{fontSize: 38, fontWeight: 500, color: C.mute}}>
        AI viết code, máy render ra mp4.
      </div>
    </Pop>
    <Pop at={20} style={{position: 'absolute', right: 150, top: 250}}>
      <Mascot color={C.ink} size={250} satellite />
    </Pop>
    <Pop at={34} style={{position: 'absolute', right: 140, top: 440}}>
      <Mascot color={C.blue} size={130} phase={20} />
    </Pop>
    <Sub text="Video này không có ai ngồi dựng cả." />
  </Scene>
);

/* ---------- Cảnh 2: nói ý tưởng ---------- */
const USER_MSG = 'Làm video 30 giây giải thích cách AI dựng video. Phong cách sáng, có phụ đề.';

const Chat: React.FC = () => {
  const frame = useCurrentFrame();
  const shown = typed(USER_MSG, frame, 24, 20);
  return (
    <Scene>
      <StepChip n={1} label="Nói ý tưởng cho agent" />
      <Pop at={6} style={{position: 'absolute', left: 140, top: 130, width: 1000}}>
        <div
          style={{
            background: C.card,
            borderRadius: 28,
            boxShadow: '0 24px 70px rgba(91,107,255,0.18)',
            height: 440,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div style={{width: 14, height: 14, borderRadius: 7, background: C.mint}} />
            <div style={{fontSize: 22, fontWeight: 700, color: C.mute}}>Agent video · đang chạy</div>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', minHeight: 150}}>
            <div
              style={{
                background: C.blue,
                color: '#fff',
                fontSize: 34,
                fontWeight: 500,
                lineHeight: 1.35,
                padding: '20px 28px',
                borderRadius: '26px 26px 6px 26px',
                maxWidth: 780,
                visibility: shown.length ? 'visible' : 'hidden',
              }}
            >
              {shown || ' '}
              {shown.length < USER_MSG.length && (
                <span style={{opacity: Math.floor(frame / 8) % 2 ? 0 : 1}}>|</span>
              )}
            </div>
          </div>
          <Pop at={150} style={{display: 'flex', gap: 18, alignItems: 'flex-end'}}>
            <Mascot color={C.ink} size={84} />
            <div
              style={{
                background: '#F1F2FB',
                color: C.ink,
                fontSize: 34,
                fontWeight: 500,
                padding: '18px 26px',
                borderRadius: '26px 26px 26px 6px',
              }}
            >
              Nhận rồi! Mình viết kịch bản và code từng cảnh.
            </div>
          </Pop>
        </div>
      </Pop>
      <Sub text="Bước một: nói ý tưởng cho agent, như nhắn tin." />
    </Scene>
  );
};

/* ---------- Cảnh 3: agent viết code ---------- */
const CODE: {text: string; color: string}[] = [
  {text: 'const video = compose({ fps: 30 });', color: '#C9CCFF'},
  {text: 'video.scene("hook",    0,  5);', color: '#9BE7C8'},
  {text: 'video.scene("chat",    5, 12);', color: '#9BE7C8'},
  {text: 'video.scene("code",   12, 19);', color: '#9BE7C8'},
  {text: 'video.scene("render", 19, 25);', color: '#9BE7C8'},
  {text: 'video.render("ai30.mp4");', color: '#FFB98A'},
];
const TILE_COLORS = [C.blue, C.mint, C.orange, C.pink];

const Code: React.FC = () => (
  <Scene>
    <StepChip n={2} label="Agent viết code" />
    <Pop at={6} style={{position: 'absolute', left: 80, top: 130}}>
      <div
        style={{
          width: 700,
          height: 440,
          background: C.ink,
          borderRadius: 24,
          padding: '32px 34px',
          boxShadow: '0 24px 70px rgba(20,20,43,0.3)',
          fontFamily: mono.fontFamily,
          fontSize: 27,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        {CODE.map((l, i) => (
          <Pop key={i} at={22 + i * 22}>
            <div style={{color: l.color, whiteSpace: 'pre'}}>{l.text}</div>
          </Pop>
        ))}
      </div>
    </Pop>
    <Pop at={14} style={{position: 'absolute', left: 830, top: 130}}>
      <div
        style={{
          width: 370,
          height: 440,
          background: C.card,
          borderRadius: 24,
          padding: 26,
          boxShadow: '0 24px 70px rgba(91,107,255,0.18)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{fontSize: 22, fontWeight: 700, color: C.mute}}>Xem trước</div>
        {TILE_COLORS.map((c, i) => (
          <Pop key={i} at={44 + i * 22}>
            <div
              style={{
                height: 62,
                borderRadius: 16,
                background: c,
                color: '#fff',
                fontSize: 26,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                padding: '0 22px',
              }}
            >
              Cảnh {i + 1}
            </div>
          </Pop>
        ))}
        <Pop at={132}>
          <div
            style={{
              background: C.ink,
              color: '#fff',
              fontSize: 26,
              fontWeight: 700,
              padding: '12px 0',
              borderRadius: 16,
              textAlign: 'center',
            }}
          >
            ai30.mp4
          </div>
        </Pop>
      </div>
    </Pop>
    <Sub text="Bước hai: agent viết code cho từng cảnh." />
  </Scene>
);

/* ---------- Cảnh 4: render ---------- */
const CLIPS = [
  {w: 5, c: C.ink, n: 'Mở đầu'},
  {w: 7, c: C.blue, n: 'Chat'},
  {w: 7, c: C.mint, n: 'Code'},
  {w: 6, c: C.orange, n: 'Render'},
  {w: 5, c: C.pink, n: 'Kết'},
];

const Render: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [16, 140], [0, 1], clamp);
  const done = frame >= 146;
  const total = FPS * DURATION;
  const trackW = 1080;
  return (
    <Scene>
      <StepChip n={3} label="Máy render ra video" />
      <Pop at={6} style={{position: 'absolute', left: 100, top: 160}}>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 24}}>
          <div style={{fontSize: 150, fontWeight: 800, color: C.ink, lineHeight: 1}}>
            {Math.round(p * 100)}%
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 500,
              color: C.mute,
              fontFamily: mono.fontFamily,
              paddingBottom: 14,
            }}
          >
            frame {Math.round(p * total)} / {total}
          </div>
        </div>
      </Pop>
      <Pop at={14} style={{position: 'absolute', left: 100, top: 370, width: trackW}}>
        <div style={{position: 'relative'}}>
          <div style={{display: 'flex', gap: 6}}>
            {CLIPS.map((cl) => (
              <div
                key={cl.n}
                style={{
                  flex: cl.w,
                  height: 90,
                  borderRadius: 16,
                  background: cl.c,
                  color: '#fff',
                  fontSize: 26,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cl.n}
              </div>
            ))}
          </div>
          <div
            style={{
              position: 'absolute',
              top: -16,
              left: p * trackW - 3,
              width: 6,
              height: 122,
              borderRadius: 3,
              background: C.orange,
            }}
          />
        </div>
        <div
          style={{
            marginTop: 40,
            height: 22,
            borderRadius: 11,
            background: '#DDE0F5',
            overflow: 'hidden',
          }}
        >
          <div style={{width: `${p * 100}%`, height: '100%', background: C.blue}} />
        </div>
      </Pop>
      {done && (
        <Pop at={146} style={{position: 'absolute', left: 100, top: 560}}>
          <div
            style={{
              display: 'inline-block',
              background: C.mint,
              color: '#fff',
              fontSize: 34,
              fontWeight: 800,
              padding: '12px 28px',
              borderRadius: 18,
            }}
          >
            ✓ Xong · ai30.mp4 · 30 giây
          </div>
        </Pop>
      )}
      <Sub text="Bước ba: máy render từng khung hình ra file mp4." />
    </Scene>
  );
};

/* ---------- Cảnh 5: kết ---------- */
const FLOW = ['Ý tưởng', 'Agent', 'Code', 'Video'];

const Outro: React.FC = () => (
  <Scene>
    <Pop at={4} style={{position: 'absolute', left: 96, top: 150}}>
      <div style={{fontSize: 100, fontWeight: 800, color: C.ink, lineHeight: 1.08}}>
        Bạn chỉ cần
      </div>
    </Pop>
    <Pop at={16} style={{position: 'absolute', left: 96, top: 262}}>
      <div style={{fontSize: 100, fontWeight: 800, color: C.blue, lineHeight: 1.08}}>
        một ý tưởng.
      </div>
    </Pop>
    <div style={{position: 'absolute', left: 100, top: 440, display: 'flex', gap: 14, alignItems: 'center'}}>
      {FLOW.map((f, i) => (
        <React.Fragment key={f}>
          <Pop at={34 + i * 12}>
            <div
              style={{
                background: i === 0 ? C.blue : C.card,
                color: i === 0 ? '#fff' : C.ink,
                fontSize: 32,
                fontWeight: 700,
                padding: '12px 26px',
                borderRadius: 16,
                boxShadow: '0 10px 30px rgba(91,107,255,0.15)',
              }}
            >
              {f}
            </div>
          </Pop>
          {i < FLOW.length - 1 && (
            <Pop at={40 + i * 12}>
              <div style={{fontSize: 34, color: C.mute}}>→</div>
            </Pop>
          )}
        </React.Fragment>
      ))}
    </div>
    <Pop at={14} style={{position: 'absolute', right: 130, top: 180}}>
      <Mascot color={C.ink} size={250} satellite />
    </Pop>
    <Pop at={26} style={{position: 'absolute', right: 150, top: 450}}>
      <Mascot color={C.blue} size={130} phase={20} />
    </Pop>
    <Sub text="Bạn chỉ cần ý tưởng. Phần còn lại giao cho agent." />
  </Scene>
);

export const Explainer30: React.FC = () => {
  const frame = useCurrentFrame();
  const total = FPS * DURATION;
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${C.bg1}, ${C.bg2})`,
        fontFamily: be.fontFamily,
      }}
    >
      <Sequence from={0} durationInFrames={150}>
        <Hook />
      </Sequence>
      <Sequence from={150} durationInFrames={210}>
        <Chat />
      </Sequence>
      <Sequence from={360} durationInFrames={210}>
        <Code />
      </Sequence>
      <Sequence from={570} durationInFrames={180}>
        <Render />
      </Sequence>
      <Sequence from={750} durationInFrames={150}>
        <Outro />
      </Sequence>
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: 8,
          width: `${(frame / total) * 100}%`,
          background: C.blue,
        }}
      />
    </AbsoluteFill>
  );
};
