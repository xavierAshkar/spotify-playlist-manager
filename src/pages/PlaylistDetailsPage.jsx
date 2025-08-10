// src/pages/PlaylistDetailsPage.jsx
import Layout from "../layout/Layout";

import * as H from '../layout/header';

import HistoryPanel from "../layout/left/HistoryPanel";
import PlaylistDetailsMain from "../layout/main/PlaylistDetailsMain";
import QueuePanel from "../layout/right/QueuePanel";

import * as F from '../layout/footer';

export default function PlaylistDetailsPage() {
  return (
    <Layout
      headerLeft={<H.HeaderLeft />}
      headerCenter={<H.HeaderCenter />}
      headerRight={<H.HeaderRight />}

      left={<HistoryPanel />}
      main={<PlaylistDetailsMain />}
      right={<QueuePanel />}

      footerLeft={<F.FooterLeft />}
      footerCenter={<F.FooterCenter />}
      footerRight={<F.FooterRight />}
    />
  );
}
