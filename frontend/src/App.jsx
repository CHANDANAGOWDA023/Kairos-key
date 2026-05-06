import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AppShell from "./layouts/AppShell";
import ArtifactAudio from "./pages/ArtifactAudio";
import AuthenticityScore from "./pages/AuthenticityScore";
import BrainstormingGame from "./pages/BrainstormingGame";
import ClicheDetection from "./pages/ClicheDetection";
import CulturalContext from "./pages/CulturalContext";
import Dashboard from "./pages/Dashboard";
import EssayBuilder from "./pages/EssayBuilder";
import EssayConsistency from "./pages/EssayConsistency";
import FinalReview from "./pages/FinalReview";
import HiddenStoryDetector from "./pages/HiddenStoryDetector";
import LandingPage from "./pages/LandingPage";
import ReviewPage from "./pages/ReviewPage";
import ScholarshipOptimizer from "./pages/ScholarshipOptimizer";
import ShowDontTell from "./pages/ShowDontTell";
import StoryDiscovery from "./pages/StoryDiscovery";
import ThematicThreading from "./pages/ThematicThreading";
import Timeline from "./pages/Timeline";
import UniversityMatch from "./pages/UniversityMatch";
import VoiceLab from "./pages/VoiceLab";
import WhatNotToWrite from "./pages/WhatNotToWrite";

function RoutedPages() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <AppShell withSidebar={!isLanding}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/story-discovery" element={<StoryDiscovery />} />
          <Route path="/hidden-story" element={<HiddenStoryDetector />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/thematic-threading" element={<ThematicThreading />} />
          <Route path="/essay-builder" element={<EssayBuilder />} />
          <Route path="/show-dont-tell" element={<ShowDontTell />} />
          <Route path="/cliche-detect" element={<ClicheDetection />} />
          <Route path="/voice-lab" element={<VoiceLab />} />
          <Route path="/authenticity-score" element={<AuthenticityScore />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/university-match" element={<UniversityMatch />} />
          <Route path="/essay-consistency" element={<EssayConsistency />} />
          <Route path="/cultural-context" element={<CulturalContext />} />
          <Route path="/scholarship" element={<ScholarshipOptimizer />} />
          <Route path="/artifact-audio" element={<ArtifactAudio />} />
          <Route path="/brainstorming-game" element={<BrainstormingGame />} />
          <Route path="/what-not-to-write" element={<WhatNotToWrite />} />
          <Route path="/final-review" element={<FinalReview />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </AppShell>
  );
}

export default function App() {
  return <RoutedPages />;
}
