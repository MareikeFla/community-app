import {
  Card,
  List,
  Paragraph,
  SectionTitle,
  StyledLink,
  Title,
} from "../InfoPages.styled";

export default function PrivacyPolicy() {
  return (
    <Card>
      <Title>Datenschutzrichtlinie</Title>
      <Paragraph>
        Diese Datenschutzrichtlinie beschreibt, wie wir Informationen sammeln,
        verwenden und offenlegen, wenn Sie unsere App nutzen und erklärt Ihre
        Datenschutzrechte und wie das Gesetz Sie schützt.
      </Paragraph>
      <SectionTitle>1. Erfasste Informationen</SectionTitle>
      <Paragraph>
        Wenn Sie sich mit Ihrem GitHub-Account anmelden, speichern wir die
        folgenden Informationen:
      </Paragraph>
      <List>
        <li>Ihren GitHub Namen</li>
        <li>Ihre E-Mail</li>
        <li>Die URL ihres GitHub Avatars</li>
      </List>
      <Paragraph>
        Sie können Ihren Namen und Ihre E-Mail-Adresse jederzeit über die
        Profilseite ändern.
      </Paragraph>
      <Paragraph>
        Wenn Sie unsere App nutzen und interagieren, speichern wir ggf. diese
        zusätzlichen Informationen:
      </Paragraph>
      <List>
        <li>Von Ihnen erstellte Events und Kommentare</li>
        <li>Ihre Interaktionen mit Events und Kommentaren</li>
      </List>
      <SectionTitle>2. Verwendung der Informationen</SectionTitle>
      <Paragraph>Wir verwenden die oben genannten Informationen, um:</Paragraph>
      <List>
        <li>Ihnen eine personalisierte Erfahrung in der App zu bieten</li>
        <li>
          Ihnen relevante Inhalte und Funktionen basierend auf Ihren
          Interaktionen bereitzustellen
        </li>
      </List>
      <SectionTitle>3. Offenlegung von Informationen</SectionTitle>
      <Paragraph>
        Wir geben Ihre persönlichen Daten nicht an Dritte weiter, außer:
      </Paragraph>
      <List>
        <li>
          Wenn dies gesetzlich vorgeschrieben ist oder wir dazu verpflichtet
          sind
        </li>
        <li>Um unsere Rechte zu schützen oder durchzusetzen</li>
      </List>
      <SectionTitle>4. Ihre Rechte</SectionTitle>
      <Paragraph>
        Sie haben das Recht, auf Ihre persönlichen Daten zuzugreifen, sie zu
        korrigieren, zu aktualisieren oder zu löschen. Sie können auch Ihre
        Interaktionen mit Kommentaren und Events verwalten, indem Sie
        entsprechende Funktionen in der App verwenden.
      </Paragraph>
      <SectionTitle>5. Kontaktieren Sie uns</SectionTitle>
      <Paragraph>
        Wenn Sie Fragen zu unseren Datenschutzpraktiken haben oder Ihre Rechte
        ausüben möchten, kontaktieren Sie uns bitte unter{" "}
        <StyledLink href="mailto:pinandjoin@gmail.com">
          pinandjoin@gmail.com
        </StyledLink>
        .
      </Paragraph>
      <SectionTitle>6. Aktualisierungen der Datenschutzrichtlinie</SectionTitle>
      <Paragraph>
        Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren.
        Wir empfehlen Ihnen, diese Seite regelmäßig auf Änderungen zu
        überprüfen. Ihre fortgesetzte Nutzung der App nach Veröffentlichung von
        Änderungen dieser Richtlinie bedeutet, dass Sie diese Änderungen
        akzeptieren.
      </Paragraph>
    </Card>
  );
}
