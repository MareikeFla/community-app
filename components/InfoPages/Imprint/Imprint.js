import {
  Card,
  Paragraph,
  SectionTitle,
  SubTitle,
  Title,
} from "../InfoPages.styled";

export default function Imprint() {
  return (
    <Card>
      <Title>Impressum</Title>
      <SectionTitle>Pin & Join</SectionTitle>
      <SubTitle>Kontakt</SubTitle>
      <Paragraph>
        <a href="mailto:pinandjoin@gmail.com">pinandjoin@gmail.com</a>
      </Paragraph>
      <SubTitle>Design</SubTitle>
      <Paragraph>Annette Wöhler</Paragraph>
      <SubTitle>Konzeption und Entwicklung</SubTitle>
      <Paragraph>
        Annette Wöhler<br></br>Bruno Dill<br></br>Lea Mentz<br></br>Mareike
        Flachsenberg
      </Paragraph>
      <SectionTitle>Haftungsausschluss</SectionTitle>
      <Paragraph>
        Wir übernehmen keine Verantwortung oder Haftung für die Richtigkeit,
        Vollständigkeit, Rechtmäßigkeit oder Aktualität der von Benutzern
        erstellten Events oder der von externen APIs geladenen Inhalte. Jeder
        Benutzer ist allein verantwortlich für die von ihm erstellten Events,
        einschließlich der bereitgestellten Bilder, Beschreibungen und externen
        Links.
      </Paragraph>
      <Paragraph>
        Wir übernehmen keine Verantwortung für Schäden oder Verluste, die durch
        die Nutzung dieser Inhalte entstehen. Die Nutzung unserer App erfolgt
        auf eigene Gefahr.
      </Paragraph>
      <SectionTitle>Urheberrecht</SectionTitle>
      <Paragraph>
        Die Inhalte und Werke dieser App unterliegen dem deutschen Urheberrecht.
        Die Verwendung, Vervielfältigung oder Weiterverbreitung dieser Inhalte
        ohne ausdrückliche Genehmigung ist untersagt.
      </Paragraph>
      <SectionTitle>Bildquellen</SectionTitle>
      <Paragraph>
        Die für die einzelnen Kategorien verwendeten Bilder stammen von der
        Plattform Unsplash und unterliegen den Nutzungsbedingungen dieser
        Plattform.
      </Paragraph>
    </Card>
  );
}
