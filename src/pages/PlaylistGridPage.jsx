// src/pages/PlaylistGridPage.jsx
import Layout from "../layout/Layout";

import * as H from '../layout/header';

import HistoryPanel from "../layout/left/HistoryPanel";
import PlaylistGridMain from "../layout/main/PlaylistGridMain";
import QueuePanel from "../layout/right/QueuePanel";

import * as F from '../layout/footer';

export default function PlaylistGridPage() {
  return (
    <Layout
      headerLeft={<H.HeaderLeft />}
      headerCenter={<H.HeaderCenter />}
      headerRight={<H.HeaderRight />}

      left={<HistoryPanel />}
      main={<PlaylistGridMain />}
      right={<QueuePanel />}

      footerLeft={<F.FooterLeft />}
      footerCenter={<F.FooterCenter />}
      footerRight={<F.FooterRight />}
    />
  );
}
