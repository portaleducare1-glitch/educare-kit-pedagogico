import { Navigate, Route, Routes } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { PortalLayout } from '@/features/portal-materiais/components/PortalLayout';
import { PortalHome } from '@/features/portal-materiais/pages/PortalHome';
import { PortalAcervo } from '@/features/portal-materiais/pages/PortalAcervo';
import { PortalMaterial } from '@/features/portal-materiais/pages/PortalMaterial';
import { PortalFavoritos } from '@/features/portal-materiais/pages/PortalFavoritos';
import { PortalInstalar } from '@/features/portal-materiais/pages/PortalInstalar';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { TermsOfUse } from '@/pages/TermsOfUse';
import { NotFound } from '@/pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/portal" replace />} />

      <Route element={<PublicLayout />}>
        <Route path="/privacidade" element={<PrivacyPolicy />} />
        <Route path="/termos" element={<TermsOfUse />} />
      </Route>

      {/* Portal Assistente Pedagogico */}
      <Route path="/portal" element={<PortalLayout />}>
        <Route index element={<PortalHome />} />
        <Route path="acervo" element={<PortalAcervo />} />
        <Route path="favoritos" element={<PortalFavoritos />} />
        <Route path="instalar" element={<PortalInstalar />} />
        <Route path="m/:id" element={<PortalMaterial />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
