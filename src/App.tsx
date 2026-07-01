import { useEffect } from 'react';
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
  useEffect(() => {
    const splash = document.getElementById('app-splash');
    if (!splash) return;

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      !!(navigator as unknown as { standalone?: boolean }).standalone;
    // No browser (não instalado): remove imediatamente — sem imagem carregada
    // a tempo, evita flash de arte que some antes de aparecer direito.
    // Em standalone: 900ms deixa a splash respirar como app nativo.
    const holdMs = isStandalone ? 900 : 0;

    const fadeTimer = window.setTimeout(() => {
      splash.style.opacity = '0';
      splash.style.pointerEvents = 'none';
      window.setTimeout(() => splash.remove(), 400);
    }, holdMs);

    return () => window.clearTimeout(fadeTimer);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/portal" replace />} />

      <Route element={<PublicLayout />}>
        <Route path="/privacidade" element={<PrivacyPolicy />} />
        <Route path="/termos" element={<TermsOfUse />} />
      </Route>

      {/* Portal de Materiais do Kit Pedagógico */}
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
