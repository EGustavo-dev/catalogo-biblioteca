import { ArrowUp, BookOpen, LibraryBig, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";

const links = [
  { title: "Pesquisar livros", href: "/#search", Icon: Search },
  { title: "Prateleiras", href: "/#shelvesSection", Icon: LibraryBig },
  { title: "Política de privacidade", href: "/privacidade/", Icon: ShieldCheck },
];

export default function FooterSection({ privacyPage = false } = {}) {
  return (
    <footer className="bml-footer">
      <div className="bml-footer-inner">
        <Link href="/" className="bml-footer-brand">
          <span className="bml-footer-mark"><BookOpen size={23} aria-hidden="true" /></span>
          <strong>Biblioteca Monteiro Lobato</strong>
        </Link>
        <p>Escola Estadual Prof. Gastão Valle</p>
        <nav className="bml-footer-nav" aria-label="Links do rodapé">
          {links.map(({ title, href, Icon }) => (
            <Link key={href} href={privacyPage ? href : href.replace(/^\/#/, "#")}
              aria-current={privacyPage && href === "/privacidade/" ? "page" : undefined}>
              <Icon size={17} aria-hidden="true" /> {title}
            </Link>
          ))}
          <a href="#inicio"><ArrowUp size={17} aria-hidden="true" /> Voltar ao topo</a>
        </nav>
        <div className="bml-footer-meta">
          <span>Catálogo digital da biblioteca escolar</span>
          {!privacyPage && <a href="https://openlibrary.org/" data-openlibrary-credit="">
            Capas também fornecidas pela Open Library
          </a>}
        </div>
      </div>
    </footer>
  );
}
