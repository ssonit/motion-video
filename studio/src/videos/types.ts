import type React from 'react';

/** One registered composition: id = Remotion composition id used by tools/render.py. */
export type Comp = {id: string; component: React.FC; frames: number; width?: number; height?: number};
