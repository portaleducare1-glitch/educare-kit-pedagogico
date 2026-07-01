"""
Suite de testes E2E — Portal de Materiais do Kit Pedagógico Educare
Playwright (Python, headless Chromium)

Execução:
  python3 scripts/with_server.py --server "npm run dev" --port 3000 \
    -- python3 src/test/e2e/portal.test.py

Cobertura:
  - Raiz (/): redireciona para /portal (validador de certificados é repo separado desde 11/06)
  - Portal Home (/portal): saudação, chips, busca, cards
  - Acervo (/portal/acervo): filtros, busca textual
  - Ficha de material (/portal/m/:id): ações, favorito, campos
  - Favoritos: toggle + persistência no localStorage
  - Navegação: redirecionar /validar, 404, privacidade, termos
  - Acessibilidade: title, lang, meta viewport
  - Responsividade: sem scroll horizontal (mobile 390px e desktop 1280px)
"""

import os
import sys
import json
from playwright.sync_api import sync_playwright, expect

ENGINE = os.environ.get('BROWSER', 'chromium')  # BROWSER=webkit pra rodar no motor do Safari
BASE = 'http://localhost:3000'
MOBILE_VP  = {'width': 390, 'height': 844}
DESKTOP_VP = {'width': 1280, 'height': 900}

PASS = '\033[92m✓\033[0m'
FAIL = '\033[91m✗\033[0m'
results = []

def run(label, fn):
    try:
        fn()
        print(f'  {PASS} {label}')
        results.append((label, True, None))
    except Exception as e:
        print(f'  {FAIL} {label}')
        print(f'      → {e}')
        results.append((label, False, str(e)))

# ─── Suite ───────────────────────────────────────────────────────────────────

with sync_playwright() as p:
    browser = getattr(p, ENGINE).launch(headless=True)

    # ── 1. Raiz (/) — redireciona pro Portal ───────────────────────────────────
    # Validador de Certificados saiu deste repo em 11/06/2026 (produto separado).
    # "/" hoje é <Navigate to="/portal" replace /> (ver App.tsx) — testar isso,
    # não o produto antigo.
    print('\n[1] Raiz (/)')
    page = browser.new_page(viewport=MOBILE_VP)
    page.goto(BASE)
    page.wait_for_load_state('networkidle')

    run('"/" redireciona para /portal',
        lambda: expect(page).to_have_url(f'{BASE}/portal'))
    run('título correto',
        lambda: expect(page).to_have_title('Kit Pedagógico · Portal de Materiais'))
    run('rodapé com CNPJ',
        lambda: expect(page.locator('text=28.719.923').first).to_be_visible())
    run('link Privacidade (LGPD) → /privacidade', lambda:
        expect(page.get_by_role('link', name='Política de Privacidade')).to_have_attribute('href', '/privacidade'))
    run('link Termos de Uso → /termos', lambda:
        expect(page.get_by_role('link', name='Termos de Uso')).to_have_attribute('href', '/termos'))

    def test_lang():
        lang = page.evaluate("document.documentElement.lang")
        assert lang == 'pt-BR', f'Expected pt-BR, got {lang}'
    def test_viewport():
        meta = page.evaluate("document.querySelector('meta[name=viewport]')?.content")
        assert meta and 'width=device-width' in meta
    run('html lang="pt-BR"', test_lang)
    run('meta viewport com width=device-width', test_viewport)
    page.close()

    # ── 2. Portal Home (/portal) ──────────────────────────────────────────────
    print('\n[2] Portal Home (/portal)')
    page = browser.new_page(viewport=MOBILE_VP)
    page.goto(f'{BASE}/portal')
    page.wait_for_load_state('networkidle')

    run('h1 "Olá, professora"',
        lambda: expect(page.get_by_role('heading', level=1)).to_contain_text('Olá, professora'))

    def test_count_label():
        # Número de materiais cresce com o catálogo — checar o padrão, não um
        # total fixo (já ficou desatualizado 2x: 136 → 220 → ...).
        import re
        el = page.locator('p').filter(has_text=re.compile(r'\d+ materiais do Kit Pedagógico')).first
        expect(el).to_be_visible()
    run('exibe "N materiais do Kit Pedagógico"', test_count_label)

    def test_situation_chips():
        # Chips de situação: botões na section "O que você precisa hoje"
        section = page.locator('section').filter(has_text='O que você precisa hoje').first
        chips = section.locator('button').all()
        assert len(chips) >= 5, f'Esperado ≥5 chips, encontrado {len(chips)}'
    run('chips de situação presentes (≥5)', test_situation_chips)

    def test_search_bar():
        inp = page.locator('input[aria-label="Buscar materiais pedagógicos"]')
        expect(inp).to_be_visible()
    run('campo de busca com aria-label correto', test_search_bar)

    def test_bottom_nav():
        # Nav usa aria-label; localizar pelo href para evitar colisão com cards
        expect(page.locator('nav a[href="/portal"]').first).to_be_visible()
        expect(page.locator('nav a[href="/portal/acervo"]').first).to_be_visible()
        expect(page.locator('nav a[href="/portal/favoritos"]').first).to_be_visible()
    run('bottom nav: Início / Acervo / Favoritos', test_bottom_nav)

    def test_material_cards():
        cards = page.locator('a[href*="/portal/m/"]').all()
        assert len(cards) >= 4, f'Esperado ≥4 cards, encontrado {len(cards)}'
    run('cards de materiais presentes (≥4)', test_material_cards)

    def test_chip_navigates():
        # Clicar num chip navega para /portal/acervo (com querystring)
        chip = page.locator('button').filter(has_text='Preciso de atividade').first
        chip.click()
        page.wait_for_load_state('networkidle')
        assert page.url.startswith(f'{BASE}/portal/acervo'), \
            f'Esperado /portal/acervo, got {page.url}'
    run('chip de situação → /portal/acervo', test_chip_navigates)

    def test_search_navigates():
        page.goto(f'{BASE}/portal')
        page.wait_for_load_state('networkidle')
        inp = page.locator('input[aria-label="Buscar materiais pedagógicos"]')
        inp.fill('autismo')
        # Submeter o form (Enter ou clique no botão Buscar)
        page.locator('form').locator('button[type="submit"]').click()
        page.wait_for_load_state('networkidle')
        assert page.url.startswith(f'{BASE}/portal/acervo'), \
            f'Esperado /portal/acervo, got {page.url}'
    run('busca textual → /portal/acervo', test_search_navigates)

    def test_acervo_tab():
        page.goto(f'{BASE}/portal')
        page.wait_for_load_state('networkidle')
        page.locator('nav a[href="/portal/acervo"]').first.click()
        page.wait_for_load_state('networkidle')
        expect(page).to_have_url(f'{BASE}/portal/acervo')
    run('tab Acervo no nav → /portal/acervo', test_acervo_tab)

    page.close()

    # ── 3. Acervo (/portal/acervo) ────────────────────────────────────────────
    print('\n[3] Acervo (/portal/acervo)')
    page = browser.new_page(viewport=MOBILE_VP)
    page.goto(f'{BASE}/portal/acervo')
    page.wait_for_load_state('networkidle')

    run('título "Todos os materiais · Educare"',
        lambda: expect(page).to_have_title('Todos os materiais · Educare'))

    def test_acervo_cards():
        count = page.locator('a[href*="/portal/m/"]').count()
        assert count >= 10, f'Esperado ≥10 cards, encontrado {count}'
    run('exibe ≥10 cards', test_acervo_cards)

    def test_acervo_search():
        inp = page.locator('input[type="search"], input[type="text"]').first
        expect(inp).to_be_visible()
        inp.fill('autismo')
        page.wait_for_timeout(500)
        count = page.locator('a[href*="/portal/m/"]').count()
        assert count > 0, 'Busca "autismo" não retornou resultados'
        inp.clear()
        page.wait_for_timeout(300)
    run('busca por "autismo" retorna resultados', test_acervo_search)

    def test_acervo_section_filter():
        btn = page.locator('button').filter(has_text='Apostilas').first
        btn.click()
        page.wait_for_timeout(400)
        count = page.locator('a[href*="/portal/m/"]').count()
        assert count > 0, 'Filtro Apostilas retornou 0 cards'
        # Limpar filtro
        btn.click()
        page.wait_for_timeout(300)
    run('filtro de seção "Apostilas" funciona', test_acervo_section_filter)

    def test_acervo_click_card():
        first_card = page.locator('a[href*="/portal/m/"]').first
        href = first_card.get_attribute('href')
        first_card.click()
        page.wait_for_load_state('networkidle')
        assert page.url == f'{BASE}{href}', f'Esperado {href}, got {page.url}'
    run('clicar em card navega para ficha do material', test_acervo_click_card)

    page.close()

    # ── 4. Ficha de material (/portal/m/apostila-bncc-2026) ────────────────────────────
    print('\n[4] Ficha de material (/portal/m/apostila-bncc-2026)')
    page = browser.new_page(viewport=MOBILE_VP)
    page.goto(f'{BASE}/portal/m/apostila-bncc-2026')
    page.wait_for_load_state('networkidle')

    run('título "Apostila BNCC 2026 · Educare"',
        lambda: expect(page).to_have_title('Apostila BNCC 2026 · Educare'))
    run('h1 "Apostila BNCC 2026"',
        lambda: expect(page.get_by_role('heading', level=1)).to_contain_text('Apostila BNCC 2026'))
    run('botão "Ver PDF"',
        lambda: expect(page.get_by_role('button', name='Ver PDF')).to_be_visible())
    run('botão "Baixar PDF"',
        lambda: expect(page.get_by_role('button', name='Baixar PDF')).to_be_visible())
    run('botão "Compartilhar"',
        lambda: expect(page.get_by_role('button', name='Compartilhar')).to_be_visible())
    run('botão "Salvar nos favoritos"',
        lambda: expect(page.get_by_role('button', name='Salvar nos favoritos')).to_be_visible())
    run('seção "Quando usar"',
        lambda: expect(page.get_by_text('Quando usar')).to_be_visible())
    run('seção "Como usar em sala"',
        lambda: expect(page.get_by_text('Como usar em sala')).to_be_visible())
    run('label de seção "Apostilas de Estudo"',
        # Texto real do DOM é "Apostilas de Estudo" — o caixa-alta é só CSS
        # (uppercase), get_by_text compara o texto real, não o visual
        lambda: expect(page.get_by_text('Apostilas de Estudo')).to_be_visible())

    def test_back_button_visible():
        # Botão Voltar tem span sr-only "Voltar" — localizar pelo aria
        btn = page.locator('button').filter(has=page.locator('span:has-text("Voltar")')).first
        expect(btn).to_be_visible()
    run('botão Voltar (ArrowLeft) visível', test_back_button_visible)

    def test_back_navigates():
        # Estabelece histórico: acervo → material → clica Voltar → acervo
        page.goto(f'{BASE}/portal/acervo')
        page.wait_for_load_state('networkidle')
        page.goto(f'{BASE}/portal/m/apostila-bncc-2026')
        page.wait_for_load_state('networkidle')
        btn = page.locator('button').filter(has=page.locator('span:has-text("Voltar")')).first
        btn.click()
        page.wait_for_url(f'{BASE}/portal/acervo')
    run('botão Voltar navega para rota anterior', test_back_navigates)

    def test_favorite_toggle():
        page.goto(f'{BASE}/portal/m/apostila-bncc-2026')
        page.wait_for_load_state('networkidle')
        # Salvar
        page.get_by_role('button', name='Salvar nos favoritos').click()
        page.wait_for_timeout(300)
        expect(page.get_by_role('button', name='Remover dos favoritos')).to_be_visible()
        # Remover
        page.get_by_role('button', name='Remover dos favoritos').click()
        page.wait_for_timeout(300)
        expect(page.get_by_role('button', name='Salvar nos favoritos')).to_be_visible()
    run('toggle favorito: salvar → remover → salvar', test_favorite_toggle)

    page.close()

    # ── 5. Favoritos — persistência localStorage ──────────────────────────────
    print('\n[5] Favoritos — persistência')
    page = browser.new_page(viewport=MOBILE_VP)

    def test_fav_empty():
        page.goto(f'{BASE}/portal/favoritos')
        page.wait_for_load_state('networkidle')
        cards = page.locator('a[href*="/portal/m/"]').all()
        assert len(cards) == 0, f'Esperado 0 favoritos, encontrado {len(cards)}'
    run('favoritos vazio no início', test_fav_empty)

    def test_fav_after_save():
        page.goto(f'{BASE}/portal/m/apostila-bncc-2026')
        page.wait_for_load_state('networkidle')
        page.get_by_role('button', name='Salvar nos favoritos').click()
        page.wait_for_timeout(300)
        # Usar o link do bottom nav (visível em mobile; header link é hidden sm:flex)
        page.locator('nav a[href="/portal/favoritos"]').click()
        page.wait_for_load_state('networkidle')
        cards = page.locator('a[href*="/portal/m/"]').all()
        assert len(cards) >= 1, 'Material favoritado não apareceu em Favoritos'
    run('favoritar material → aparece em /portal/favoritos', test_fav_after_save)

    def test_fav_persists():
        # Ir para home e voltar — favorito deve persistir
        page.locator('nav a[href="/portal"]').click()
        page.wait_for_load_state('networkidle')
        page.locator('nav a[href="/portal/favoritos"]').click()
        page.wait_for_load_state('networkidle')
        cards = page.locator('a[href*="/portal/m/"]').all()
        assert len(cards) >= 1, 'Favoritos não persistiram após navegação'
    run('favoritos persistem após navegação', test_fav_persists)

    def test_fav_localstorage():
        data = page.evaluate("localStorage.getItem('portal-favoritos')")
        assert data is not None, 'localStorage "portal-favoritos" está vazio'
        parsed = json.loads(data)
        assert 'apostila-bncc-2026' in parsed, f'"apostila-bncc-2026" não encontrado em {parsed}'
    run('localStorage "portal-favoritos" contém ID correto', test_fav_localstorage)

    page.close()

    # ── 6. Navegação e 404 ────────────────────────────────────────────────────
    print('\n[6] Navegação e 404')
    page = browser.new_page(viewport=MOBILE_VP)

    def test_validar_404():
        # /validar era do Validador de Certificados (repo separado desde
        # 11/06) — não existe rota aqui, cai no catch-all "*" → NotFound.
        page.goto(f'{BASE}/validar')
        page.wait_for_load_state('networkidle')
        expect(page.get_by_text('Página não encontrada')).to_be_visible()
    run('/validar → página de 404 (produto mudou de repo)', test_validar_404)

    def test_404_unknown():
        page.goto(f'{BASE}/rota-inexistente-xyzxyz')
        page.wait_for_load_state('networkidle')
        content = page.content().lower()
        assert 'não encontrad' in content or '404' in content or 'not found' in content
    run('rota desconhecida → página de 404', test_404_unknown)

    def test_404_material():
        page.goto(f'{BASE}/portal/m/id-inexistente-xyz')
        page.wait_for_load_state('networkidle')
        expect(page.get_by_text('Material não encontrado')).to_be_visible()
    run('/portal/m/id-inexistente → "Material não encontrado"', test_404_material)

    def test_privacy():
        page.goto(f'{BASE}/privacidade')
        page.wait_for_load_state('networkidle')
        assert page.url == f'{BASE}/privacidade'
    run('/privacidade carrega sem erro', test_privacy)

    def test_terms():
        page.goto(f'{BASE}/termos')
        page.wait_for_load_state('networkidle')
        assert page.url == f'{BASE}/termos'
    run('/termos carrega sem erro', test_terms)

    page.close()

    # ── 7. Responsividade ─────────────────────────────────────────────────────
    print('\n[7] Responsividade')

    def test_desktop_portal():
        p2 = browser.new_page(viewport=DESKTOP_VP)
        p2.goto(f'{BASE}/portal')
        p2.wait_for_load_state('networkidle')
        expect(p2.get_by_role('heading', level=1)).to_contain_text('Olá, professora')
        p2.close()
    run('portal carrega em 1280px', test_desktop_portal)

    def test_desktop_preview():
        p2 = browser.new_page(viewport=DESKTOP_VP)
        p2.goto(f'{BASE}/portal/m/apostila-bncc-2026')
        p2.wait_for_load_state('networkidle')
        iframe = p2.locator('iframe').first
        expect(iframe).to_be_visible()
        p2.close()
    run('iframe de pré-visualização visível em desktop', test_desktop_preview)

    def test_no_hscroll_desktop():
        p2 = browser.new_page(viewport=DESKTOP_VP)
        p2.goto(f'{BASE}/portal')
        p2.wait_for_load_state('networkidle')
        sw = p2.evaluate("document.body.scrollWidth")
        cw = p2.evaluate("document.body.clientWidth")
        p2.close()
        assert sw <= cw + 5, f'Scroll horizontal em desktop: scrollWidth={sw} > clientWidth={cw}'
    run('sem scroll horizontal em desktop (1280px)', test_no_hscroll_desktop)

    def test_no_hscroll_mobile():
        p2 = browser.new_page(viewport=MOBILE_VP)
        p2.goto(f'{BASE}/portal')
        p2.wait_for_load_state('networkidle')
        sw = p2.evaluate("document.body.scrollWidth")
        cw = p2.evaluate("document.body.clientWidth")
        p2.close()
        assert sw <= cw + 5, f'Scroll horizontal em mobile: scrollWidth={sw} > clientWidth={cw}'
    run('sem scroll horizontal em mobile (390px)', test_no_hscroll_mobile)

    browser.close()

# ── Sumário ───────────────────────────────────────────────────────────────────
total  = len(results)
passed = sum(1 for _, ok, _ in results if ok)
failed = total - passed

print(f'\n{"─"*55}')
print(f'  Resultado: {passed}/{total} passaram', end='')
if failed:
    print(f'  ({failed} falharam)')
    print('\n  Falhas:')
    for label, ok, err in results:
        if not ok:
            print(f'    ✗ {label}')
            if err:
                print(f'      {err[:120]}')
else:
    print(' ✓ todos passaram')
print(f'{"─"*55}')

sys.exit(0 if failed == 0 else 1)
